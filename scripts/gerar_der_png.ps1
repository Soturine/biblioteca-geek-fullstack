Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root "docs\DER.png"

$bitmap = New-Object System.Drawing.Bitmap 1200, 820
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.Clear([System.Drawing.Color]::White)

$fontTitle = New-Object System.Drawing.Font "Arial", 22, ([System.Drawing.FontStyle]::Bold)
$font = New-Object System.Drawing.Font "Arial", 10
$fontBold = New-Object System.Drawing.Font "Arial", 11, ([System.Drawing.FontStyle]::Bold)
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(49, 87, 213)), 3
$brushTitle = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(31, 41, 55))
$brushBox = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(238, 242, 255))
$brushText = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(31, 41, 55))

function Draw-Entity {
  param($name, $fields, $x, $y)

  $w = 260
  $h = 38 + ($fields.Count * 22)
  $rect = New-Object System.Drawing.Rectangle $x, $y, $w, $h
  $graphics.FillRectangle($brushBox, $rect)
  $graphics.DrawRectangle($pen, $rect)
  $graphics.DrawString($name, $fontBold, $brushText, ($x + 12), ($y + 10))
  $lineY = $y + 36
  $graphics.DrawLine($pen, $x, $lineY, ($x + $w), $lineY)
  for ($i = 0; $i -lt $fields.Count; $i++) {
    $graphics.DrawString($fields[$i], $font, $brushText, ($x + 12), ($lineY + 8 + ($i * 22)))
  }
}

$graphics.DrawString("DER - Biblioteca Geek", $fontTitle, $brushTitle, 420, 28)

Draw-Entity "usuarios" @("PK id_usuario", "nome", "email UNIQUE", "senha_hash", "perfil", "criado_em") 60 120
Draw-Entity "autores" @("PK id_autor", "nome", "nacionalidade") 470 120
Draw-Entity "categorias" @("PK id_categoria", "nome UNIQUE") 880 120
Draw-Entity "livros" @("PK id_livro", "titulo", "ano", "quantidade", "imagem", "FK id_autor", "FK id_categoria") 470 390
Draw-Entity "emprestimos" @("PK id_emprestimo", "FK id_usuario", "nome_leitor", "data_emprestimo", "data_devolucao", "status") 60 390
Draw-Entity "itens_emprestimo" @("PK id_item", "FK id_emprestimo", "FK id_livro", "quantidade") 470 650

$graphics.DrawLine($pen, 320, 210, 470, 470)
$graphics.DrawString("1:N", $fontBold, $brushText, 350, 320)
$graphics.DrawLine($pen, 730, 200, 470, 460)
$graphics.DrawString("1:N", $fontBold, $brushText, 610, 320)
$graphics.DrawLine($pen, 880, 200, 730, 460)
$graphics.DrawString("1:N", $fontBold, $brushText, 820, 320)
$graphics.DrawLine($pen, 320, 500, 470, 710)
$graphics.DrawString("1:N", $fontBold, $brushText, 355, 615)
$graphics.DrawLine($pen, 600, 620, 600, 650)
$graphics.DrawString("N:N via itens_emprestimo", $fontBold, $brushText, 690, 690)

$bitmap.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "DER gerado em $out"
