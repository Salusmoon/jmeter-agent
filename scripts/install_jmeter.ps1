# Apache JMeter'i proje içine (tools/) indirir. Kullanım: powershell -File scripts/install_jmeter.ps1
param([string]$Version = "5.6.3")
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$tools = Join-Path $root "tools"
New-Item -ItemType Directory -Force $tools | Out-Null
$zip = Join-Path $tools "apache-jmeter-$Version.zip"
$url = "https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-$Version.zip"
Write-Host "Indiriliyor: $url"
Invoke-WebRequest -Uri $url -OutFile $zip
Expand-Archive -Path $zip -DestinationPath $tools -Force
Remove-Item $zip
Write-Host "Kuruldu: $tools\apache-jmeter-$Version"
