"""TestSpec'ten JMeter .jmx test planı üretir."""
from __future__ import annotations

from urllib.parse import urlsplit
from xml.sax.saxutils import escape

from .spec import RequestSpec, TestSpec


def _s(name: str, value) -> str:
    return f'<stringProp name="{name}">{escape("" if value is None else str(value))}</stringProp>'


def _b(name: str, value: bool) -> str:
    return f'<boolProp name="{name}">{"true" if value else "false"}</boolProp>'


def _header_manager(headers: dict[str, str], testname: str) -> str:
    items = "".join(
        f'<elementProp name="" elementType="Header">{_s("Header.name", k)}{_s("Header.value", v)}</elementProp>'
        for k, v in headers.items()
    )
    return (
        f'<HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="{escape(testname)}">'
        f'<collectionProp name="HeaderManager.headers">{items}</collectionProp></HeaderManager><hashTree/>'
    )


def _status_assertion(codes: list[int]) -> str:
    strings = "".join(f'<stringProp name="{c}">{c}</stringProp>' for c in codes)
    return (
        '<ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Status code">'
        f'<collectionProp name="Asserion.test_strings">{strings}</collectionProp>'
        f'{_s("Assertion.custom_message", "")}{_s("Assertion.test_field", "Assertion.response_code")}'
        f'{_b("Assertion.assume_success", True)}'
        '<intProp name="Assertion.test_type">40</intProp>'  # EQUALS | OR
        '</ResponseAssertion><hashTree/>'
    )


def _sampler(req: RequestSpec, index: int, spec: TestSpec) -> str:
    u = urlsplit(req.url)
    path = u.path or "/"
    if u.query:
        path += "?" + u.query
    port = u.port or (443 if u.scheme == "https" else 80)
    label = req.label or f"{index:02d} {req.method} {u.hostname}{u.path or '/'}"

    body = ""
    if req.body is not None:
        body = (
            '<elementProp name="" elementType="HTTPArgument">'
            f'{_b("HTTPArgument.always_encode", False)}{_s("Argument.value", req.body)}{_s("Argument.metadata", "=")}'
            '</elementProp>'
        )

    children = ""
    if req.headers:
        children += _header_manager(req.headers, "Request headers")
    codes = req.expected_status or spec.expected_status
    if codes:
        children += _status_assertion(codes)

    return (
        f'<HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="{escape(label)}">'
        f'{_s("HTTPSampler.domain", u.hostname)}{_s("HTTPSampler.port", port)}'
        f'{_s("HTTPSampler.protocol", u.scheme)}{_s("HTTPSampler.path", path)}'
        f'{_s("HTTPSampler.method", req.method)}{_s("HTTPSampler.contentEncoding", "UTF-8")}'
        f'{_b("HTTPSampler.follow_redirects", True)}{_b("HTTPSampler.use_keepalive", True)}'
        f'{_b("HTTPSampler.postBodyRaw", req.body is not None)}'
        '<elementProp name="HTTPsampler.Arguments" elementType="Arguments">'
        f'<collectionProp name="Arguments.arguments">{body}</collectionProp></elementProp>'
        f'</HTTPSamplerProxy><hashTree>{children}</hashTree>'
    )


def build_jmx(spec: TestSpec) -> str:
    loops = spec.loops if spec.loops else -1
    scheduler = spec.duration is not None

    group_children = (
        '<ConfigTestElement guiclass="HttpDefaultsGui" testclass="ConfigTestElement" testname="HTTP Defaults">'
        '<elementProp name="HTTPsampler.Arguments" elementType="Arguments"><collectionProp name="Arguments.arguments"/></elementProp>'
        f'{_s("HTTPSampler.connect_timeout", spec.timeout_ms)}{_s("HTTPSampler.response_timeout", spec.timeout_ms)}'
        f'{_s("HTTPSampler.implementation", "HttpClient4")}'
        '</ConfigTestElement><hashTree/>'
        '<CookieManager guiclass="CookiePanel" testclass="CookieManager" testname="Cookies">'
        f'<collectionProp name="CookieManager.cookies"/>{_b("CookieManager.clearEachIteration", True)}'
        '</CookieManager><hashTree/>'
    )
    if spec.headers:
        group_children += _header_manager(spec.headers, "Global headers")
    if spec.think_time_ms:
        group_children += (
            '<ConstantTimer guiclass="ConstantTimerGui" testclass="ConstantTimer" testname="Think time">'
            f'{_s("ConstantTimer.delay", spec.think_time_ms)}</ConstantTimer><hashTree/>'
        )
    if spec.target_rps:
        # Constant Throughput Timer dakika başına çalışır; calcMode=2 => tüm aktif thread'ler paylaşır
        group_children += (
            '<ConstantThroughputTimer guiclass="TestBeanGUI" testclass="ConstantThroughputTimer" testname="Target RPS">'
            '<intProp name="calcMode">2</intProp>'
            f'<doubleProp><name>throughput</name><value>{spec.target_rps * 60}</value><savedValue>0.0</savedValue></doubleProp>'
            '</ConstantThroughputTimer><hashTree/>'
        )
    group_children += "".join(_sampler(r, i + 1, spec) for i, r in enumerate(spec.requests))

    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3"><hashTree>'
        f'<TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="{escape(spec.name)}">'
        f'{_b("TestPlan.functional_mode", False)}{_b("TestPlan.serialize_threadgroups", False)}'
        '<elementProp name="TestPlan.user_defined_variables" elementType="Arguments"><collectionProp name="Arguments.arguments"/></elementProp>'
        '</TestPlan><hashTree>'
        '<ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Virtual users">'
        f'{_s("ThreadGroup.on_sample_error", "continue")}'
        '<elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController">'
        f'{_b("LoopController.continue_forever", False)}{_s("LoopController.loops", loops)}</elementProp>'
        f'{_s("ThreadGroup.num_threads", spec.users)}{_s("ThreadGroup.ramp_time", spec.ramp_up)}'
        f'{_b("ThreadGroup.scheduler", scheduler)}{_s("ThreadGroup.duration", spec.duration or "")}'
        f'{_s("ThreadGroup.delay", "")}{_b("ThreadGroup.same_user_on_next_iteration", True)}'
        f'</ThreadGroup><hashTree>{group_children}</hashTree>'
        '</hashTree></hashTree></jmeterTestPlan>\n'
    )
