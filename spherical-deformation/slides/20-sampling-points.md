<h2>Comparing Subjects at Common Points</h2>
<figure>
<svg viewBox="0 0 900 230" width="900">
<circle cx="170" cy="115" r="92" fill="none" stroke="#E5E7EB" stroke-width="2" />
<ellipse cx="170" cy="115" rx="92" ry="24" fill="none" stroke="#E5E7EB" stroke-width="1.5" />
<g fill="#9CA3AF">
<circle cx="120" cy="62" r="3.5" /><circle cx="170" cy="45" r="3.5" /><circle cx="222" cy="66" r="3.5" />
<circle cx="102" cy="112" r="3.5" /><circle cx="150" cy="104" r="3.5" /><circle cx="240" cy="116" r="3.5" />
<circle cx="126" cy="160" r="3.5" /><circle cx="180" cy="166" r="3.5" /><circle cx="226" cy="158" r="3.5" />
</g>
<circle cx="200" cy="96" r="6" fill="#C2410C" />
<text x="212" y="88" font-family="Inter, system-ui, sans-serif" font-size="15" fill="#C2410C">i</text>
<g stroke="#6B7280" stroke-width="1.5"><line x1="290" y1="115" x2="380" y2="115" /></g>
<polygon points="388,115 376,110 376,120" fill="#6B7280" />
<line x1="430" y1="120" x2="850" y2="120" stroke="#E5E7EB" stroke-width="2" />
<g fill="#1D4ED8"><circle cx="540" cy="120" r="6" /><circle cx="610" cy="120" r="6" /><circle cx="700" cy="120" r="6" /></g>
<g font-family="IBM Plex Mono, monospace" font-size="15" fill="#1D4ED8" text-anchor="middle">
<text x="540" y="100">f¹</text><text x="610" y="100">f²</text><text x="700" y="100">f³</text>
</g>
<line x1="617" y1="128" x2="617" y2="146" stroke="#C2410C" stroke-width="2.5" />
<text x="617" y="168" font-family="IBM Plex Mono, monospace" font-size="15" fill="#C2410C" text-anchor="middle">f̄ᵢ</text>
<g stroke="#6B7280" stroke-width="1.5" fill="none"><path d="M 552 186 L 552 194 L 682 194 L 682 186" /></g>
<text x="617" y="214" font-family="Inter, system-ui, sans-serif" font-size="14" fill="#6B7280" text-anchor="middle">spread σ<tspan font-size="11" dy="3">f</tspan></text>
<g font-family="Inter, system-ui, sans-serif" font-size="14" fill="#6B7280" text-anchor="middle">
<text x="170" y="226">S sampling points, same layout for every subject</text>
<text x="640" y="40">feature of each subject at point i</text>
</g>
</svg>
</figure>
<p class="sub"><span class="inline" data-tex="\bar f"></span> and σ<sub>f</sub><sup>2</sup> are population statistics: estimated from the subjects' maps, held fixed while coefficients are updated</p>
<p class="takeaway">Every subject is compared with the population at the same S points.</p>

Note:
Before writing the energy, the setup. There is no explicit correspondence between
the subjects' scalar maps — that is what we are trying to find. So the paper places
S icosahedral sampling points on the sphere, the same layout and the same index i
for every subject, and compares the deformed feature maps at those points
(Sec. 2.4.1). The features are scalar maps such as mean curvature and sulcal depth.

At sampling point i, each subject contributes one value — the blue dots. The
population mean at that point is f-bar-i, the orange tick, and the spread across
subjects gives the feature variance sigma-f squared. This is what makes the method
group-wise: each subject is pulled towards the population, not towards one chosen
subject (Sec. 4.6).

One detail worth mentioning: f-bar and sigma-f are not recomputed at every
iteration. They are estimated from the initial maps and updated once more after the
initial degree-by-degree guess (Sec. 2.4.3, 4.6). The paper explains why: a
population average that keeps chasing the current deformation can be "minimised"
by stretching less variable regions, which causes large distortion.
