$content = Get-Content -Raw -Path "index.html"

$headerTpl = @"
<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>SIDEKAP</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="Style.css">
  <script src="Script.js" defer></script>
</head>
<body>
"@

$footerTpl = @"
</body>
</html>
"@

function Extract-Block {
    param($startMarker, $endMarker)
    $startIndex = $content.IndexOf($startMarker)
    if ($startIndex -eq -1) { return "" }
    $endIndex = $content.IndexOf($endMarker, $startIndex)
    if ($endIndex -eq -1) { $endIndex = $content.Length }
    return $content.Substring($startIndex, $endIndex - $startIndex)
}

function Write-Page {
    param($filename, $htmlContent)
    $finalContent = $headerTpl + "`n" + $htmlContent + "`n" + $footerTpl
    Set-Content -Path $filename -Value $finalContent -Encoding UTF8
}

$dashBlock = Extract-Block -startMarker '<div id="dashboardAdmin" class="page">' -endMarker '<!-- ══════════════════════════`n     TABEL PELAPORAN'
Write-Page "form_dashboard.html" ($dashBlock -replace 'class="page"', 'class="page active"')

$pelBlocks = Extract-Block -startMarker '<div id="tabelPelaporan" class="page">' -endMarker '<!-- ══════════════════════════`n     TABEL INVESTIGASI'
Write-Page "form_pelaporan.html" ($pelBlocks -replace 'class="page"', 'class="page active"')

$invBlock = Extract-Block -startMarker '<div id="tabelInvestigasi" class="page">' -endMarker '<!-- ══════════════════════════`n     MASTER DATA DINAMIS'
Write-Page "form_investigasi_sederhana.html" ($invBlock -replace 'class="page"', 'class="page active"')

$printBlock = Extract-Block -startMarker '<div id="print-pelaporan" class="page">' -endMarker '<!-- ══════════════════════════`n     MODALS'
Write-Page "print_pelaporan.html" ($printBlock -replace 'class="page"', 'class="page active"')

$pubBlock = Extract-Block -startMarker '<div id="formPublic" class="page">' -endMarker '<!-- ══════════════════════════`n     FORM TANPA PASIEN'
Write-Page "form_template_user.html" ($pubBlock -replace 'class="page"', 'class="page active"')

Write-Page "form_template.html" "<div class='admin-layout'><aside class='sidebar'></aside><div class='main-area'><!-- Content --></div></div>"

Set-Content -Path "nav_admin.html" -Value "<nav>Admin Sidebar</nav>"
Set-Content -Path "nav_user.html" -Value "<nav>User Navbar</nav>"

Write-Output "Splitting complete"
