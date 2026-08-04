$files = Get-ChildItem -Path "C:\Users\IT\Documents\Anti Gravity\Haven Spring LLC" -Filter "service*.html"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    $content = $content -ireplace 'We provide a holistic range', 'Our planned services intend to offer a holistic range'
    $content = $content -ireplace 'Our trained professionals are here around the clock', 'We aim to have trained professionals available as needed'
    $content = $content -ireplace 'ensuring immediate assistance', 'aiming to provide immediate assistance'
    $content = $content -ireplace 'designed to preserve', 'intended to preserve'
    $content = $content -ireplace 'to maintain stress-free', 'to support stress-free'
    $content = $content -ireplace '\bWe provide\b', 'We aim to offer'
    $content = $content -ireplace '\bensures\b', 'aims to support'
    $content = $content -ireplace '\bguarantee\b', 'support'
    $content = $content -ireplace '\bguaranteed\b', 'planned'
    $content = $content -ireplace '\bexceptional\b', 'thoughtful'
    $content = $content -ireplace 'best in class', 'supportive'
    $content = $content -ireplace 'state of the art', 'well-equipped'
    $content = $content -ireplace '\bpremier\b', 'thoughtfully designed'
    $content = $content -ireplace 'we are committed to', 'our goal is to'

    Set-Content -Path $file.FullName -Value $content
}
