$old_files = @(
"ai-production-house-demo-reel.mp4",
"ai-social-media-video-ad.mp4",
"ai-explainer-short-video.mp4",
"ai-creative-brand-storytelling.mp4",
"ai-music-video-cinematic.mp4",
"AI SPA basen.mp4",
"beauty skincare.mp4",
"miasto AI ferrari.mp4"
)
foreach ($old in $old_files) {
    if (Test-Path $old) { Remove-Item $old -Force }
}

$new_files = @(
"BEAUTY_OLEJEK.mp4",
"CYPRUS.mp4",
"DENZA.mp4",
"MODA.mp4",
"PHARMA_OTC_PODANIE LEKU.mp4",
"PORSCHE.mp4",
"REAL_ESTATE_APARTAMENT.mp4",
"REAL_ESTATE_FILM.mp4"
)

New-Item -ItemType Directory -Force -Path "optimized"
foreach ($file in $new_files) {
    if (Test-Path $file) {
        ffmpeg -i $file -vcodec libx264 -crf 24 -preset fast -c:a aac -b:a 128k -movflags +faststart -y "optimized\$file"
    }
}
Move-Item "optimized\*.mp4" "." -Force
Remove-Item "optimized" -Force
