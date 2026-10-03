#requires -Version 5.1
<#
.SYNOPSIS
    Single source of truth for verifying the MomsBirds SPA.

.DESCRIPTION
    Runs the same checks locally (agent, before pushing) and in CI (GitHub Actions
    on ubuntu-latest via PowerShell Core): install, unit + integration tests, and the
    production webpack build. Fails on the first error so a red run blocks merge.

    Cross-platform: sets NODE_OPTIONS in-script rather than relying on the cmd-only
    `set VAR=...` syntax in package.json, so it works in pwsh on Windows and Linux.

.PARAMETER SkipInstall
    Skip `npm ci` (use when node_modules is already present, e.g. local iteration).
#>
[CmdletBinding()]
param(
    [switch] $SkipInstall
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Invoke-Step {
    param([string] $Name, [scriptblock] $Action)
    Write-Host "==> $Name" -ForegroundColor Cyan
    & $Action
    if ($LASTEXITCODE -ne 0) { throw "$Name failed (exit $LASTEXITCODE)." }
}

Push-Location $PSScriptRoot
try {
    if (-not $SkipInstall) {
        Invoke-Step 'npm ci' { npm ci }
    }

    # Tests run under Node's default provider; the legacy OpenSSL flag is only needed
    # by the webpack 4 build, so clear it here to avoid conflicts under modern Node.
    $env:NODE_OPTIONS = ''
    Invoke-Step 'npm test (unit + integration)' { npm test }

    # webpack 4 needs the legacy OpenSSL provider on Node 17+.
    $env:NODE_OPTIONS = '--openssl-legacy-provider'
    Invoke-Step 'production build' { npx webpack --config webpack.prod.js }

    Write-Host 'verify.ps1: PASS' -ForegroundColor Green
}
finally {
    Pop-Location
}
