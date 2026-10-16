<h2>The Optimization Loop</h2>
<figure>
<svg viewBox="0 0 1100 200" width="1100">
<g fill="none" stroke="#E5E7EB" stroke-width="1.5">
<rect x="16" y="20" width="128" height="62" rx="6" /><rect x="171" y="20" width="128" height="62" rx="6" />
<rect x="326" y="20" width="128" height="62" rx="6" /><rect x="481" y="20" width="128" height="62" rx="6" />
<rect x="636" y="20" width="128" height="62" rx="6" /><rect x="791" y="20" width="128" height="62" rx="6" />
<rect x="946" y="20" width="128" height="62" rx="6" />
</g>
<g font-family="Inter, system-ui, sans-serif" font-size="15" fill="#1A1A1A" text-anchor="middle">
<text x="80" y="46">SH coefficients</text><text x="235" y="46">deformation</text>
<text x="390" y="46">residuals</text><text x="545" y="46">Jacobians</text>
<text x="700" y="46">g and H</text><text x="855" y="46">LM step</text>
<text x="1010" y="46">update</text>
</g>
<g font-family="IBM Plex Mono, monospace" font-size="13" fill="#6B7280" text-anchor="middle">
<text x="80" y="68">c</text><text x="235" y="68">M(p) = R p</text><text x="390" y="68">R<tspan font-size="10" dy="3">f</tspan><tspan dy="-3">, R</tspan><tspan font-size="10" dy="3">d</tspan></text>
<text x="545" y="68">J<tspan font-size="10" dy="3">f</tspan><tspan dy="-3">, J</tspan><tspan font-size="10" dy="3">d</tspan></text><text x="700" y="68">Eqs. 27, 28</text><text x="855" y="68">Δ</text>
<text x="1010" y="68">c + δΔ</text>
</g>
<g stroke="#6B7280" stroke-width="1.5">
<line x1="146" y1="51" x2="163" y2="51" /><line x1="301" y1="51" x2="318" y2="51" /><line x1="456" y1="51" x2="473" y2="51" />
<line x1="611" y1="51" x2="628" y2="51" /><line x1="766" y1="51" x2="783" y2="51" /><line x1="921" y1="51" x2="938" y2="51" />
</g>
<g fill="#6B7280">
<polygon points="169,51 161,47 161,55" /><polygon points="324,51 316,47 316,55" /><polygon points="479,51 471,47 471,55" />
<polygon points="634,51 626,47 626,55" /><polygon points="789,51 781,47 781,55" /><polygon points="944,51 936,47 936,55" />
</g>
<path d="M 1010 84 L 1010 128 L 80 128 L 80 92" fill="none" stroke="#C2410C" stroke-width="1.8" />
<polygon points="80,85 75,96 85,96" fill="#C2410C" />
<text x="545" y="152" font-family="Inter, system-ui, sans-serif" font-size="15" fill="#C2410C" text-anchor="middle">repeat until the energy changes by less than 10⁻⁵</text>
</svg>
</figure>
<p class="sub">degrees: start at l = 0, add one degree at a time, then optimize all coefficients together</p>
<p class="sub">features: lCurv (S = 2,562) → lSulc (10,242) → hSulc (40,962) → hCurv (163,842)</p>
<p class="takeaway">Coarse to fine twice over: in harmonic degree and in feature resolution.</p>

Note:
Put the pieces in one loop. The coefficients define the deformation; the
deformation defines where each subject's features are read and how far each vertex
leaves its rigid position — the residuals; differentiating gives the Jacobians;
those give the gradient and the Gauss–Newton Hessian; LM turns them into a step;
the step is applied with the triangle check; and we repeat until the energy changes
by less than 10^-5 (Sec. 2.4.3).

The loop is wrapped in two hierarchies. In harmonic degree: starting from l = 0,
the paper first optimises each degree on its own, giving a rough initial guess; the
population mean and variance are re-estimated after that guess; then all
coefficients are optimised together, so rigid and non-rigid parts are solved jointly
(Sec. 2.4.3, Algorithm 1). In feature resolution: four features with increasing
numbers of icosahedral sampling points, from inflated-surface curvature to full
mean curvature (Sec. 2.4.4). Each resolution starts from the coefficients found at
the previous one; all coefficients are initialised to zero once, at lCurv. The
reported experiments use degrees up to l = 15.

The reason for both hierarchies is the same: mean curvature is very local and the
energy is non-linear, so starting fine invites local optima. Global first, local
later — which is exactly what the harmonic degree was designed to control.
