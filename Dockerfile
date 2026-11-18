FROM python:3.11-slim

ARG JMETER_VERSION=5.6.3
RUN apt-get update && apt-get install -y --no-install-recommends openjdk-17-jre-headless curl unzip \
    && curl -fsSL https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-${JMETER_VERSION}.zip -o /tmp/jm.zip \
    && unzip -q /tmp/jm.zip -d /opt && rm /tmp/jm.zip \
    && apt-get purge -y curl unzip && rm -rf /var/lib/apt/lists/*

ENV JMETER_HOME=/opt/apache-jmeter-${JMETER_VERSION} \
    JMETER_AGENT_RUNS_DIR=/data/runs \
    PYTHONUNBUFFERED=1

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY jmeter_agent ./jmeter_agent

VOLUME /data
EXPOSE 8080 8090
# Varsayılan REST API; MCP için: docker run ... python -m jmeter_agent.mcp_server --http
CMD ["uvicorn", "jmeter_agent.api:app", "--host", "0.0.0.0", "--port", "8080"]
