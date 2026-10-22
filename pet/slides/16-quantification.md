<h2>PET Image Quantification</h2>
<p class="lead-text">Quantification = converting voxel values to a <b>proper unit</b> and <b>normalizing</b> them so subjects can be compared.</p>
<figure>
<svg viewBox="0 0 1000 150" width="1000">
<g font-family="Inter, system-ui, sans-serif" text-anchor="middle">
<g fill="none" stroke-width="1.5"><rect x="20" y="30" width="250" height="80" rx="8" stroke="#E5E7EB" /><rect x="375" y="30" width="250" height="80" rx="8" stroke="#1A1A1A" /><rect x="730" y="30" width="250" height="80" rx="8" stroke="#1D4ED8" /></g>
<text x="145" y="66" font-size="18" fill="#1A1A1A">voxel values</text><text x="145" y="90" font-size="14" fill="#6B7280">from reconstruction</text>
<text x="500" y="66" font-size="18" fill="#1A1A1A">physical unit</text><text x="500" y="90" font-size="14" fill="#6B7280">Bq/mL</text>
<text x="855" y="66" font-size="18" fill="#1D4ED8">normalized</text><text x="855" y="90" font-size="14" fill="#6B7280">SUV</text>
<line x1="276" y1="70" x2="360" y2="70" stroke="#6B7280" stroke-width="1.5" /><polygon points="368,70 359,65 359,75" fill="#6B7280" /><line x1="631" y1="70" x2="715" y2="70" stroke="#6B7280" stroke-width="1.5" /><polygon points="723,70 714,65 714,75" fill="#6B7280" />
<text x="322" y="56" font-size="13" fill="#6B7280">convert</text><text x="677" y="56" font-size="13" fill="#6B7280">normalize</text>
</g>
</svg>
</figure>

Note:
The reconstructed voxel values are converted by the scanner software into a physical
unit — activity concentration in becquerels per millilitre (1 Bq = one decay per
second). That number still depends on how much tracer was injected and on the
size of the body it spread through, so it is normalized: dividing by the injected
dose per body weight gives the standardized uptake value (SUV), which can be compared
between people. The next slide gives the formula.
