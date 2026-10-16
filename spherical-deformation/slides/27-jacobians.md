<h2>Jacobian Matrices</h2>
<div class="eq lead" data-tex="J_f=\frac{\partial R_f}{\partial\mathbf c}\in\mathbb{R}^{S\times K},\qquad J_d=\frac{\partial R_d}{\partial\mathbf c}\in\mathbb{R}^{S_n\times K}"></div>
<figure>
<svg viewBox="0 0 900 230" width="860">
<rect x="250" y="34" width="400" height="176" fill="none" stroke="#6B7280" stroke-width="1.5" />
<g stroke="#E5E7EB" stroke-width="1.5"><line x1="383" y1="34" x2="383" y2="210" /><line x1="517" y1="34" x2="517" y2="210" /></g>
<rect x="250" y="112" width="400" height="14" fill="#E5E7EB" fill-opacity="0.6" />
<rect x="430" y="34" width="14" height="176" fill="#E5E7EB" fill-opacity="0.6" />
<rect x="430" y="112" width="14" height="14" fill="#C2410C" />
<g font-family="Newsreader, Georgia, serif" font-style="italic" font-size="20" text-anchor="middle">
<text x="316" y="24" fill="#1D4ED8">c<tspan font-size="14" dy="5">u₁</tspan></text>
<text x="450" y="24" fill="#1D4ED8">c<tspan font-size="14" dy="5">u₂</tspan></text>
<text x="583" y="24" fill="#C2410C">c<tspan font-size="14" dy="5">ω</tspan></text>
</g>
<g font-family="Inter, system-ui, sans-serif" font-size="14" fill="#6B7280">
<text x="236" y="123" text-anchor="end">residual i</text>
<text x="236" y="58" text-anchor="end">S rows (features)</text>
<text x="236" y="78" text-anchor="end">S<tspan font-size="11" dy="3">n</tspan><tspan dy="-3"> rows (distortion)</tspan></text>
<text x="450" y="228" text-anchor="middle">K = 3(L+1)² columns: (L+1)² per block</text>
</g>
<line x1="444" y1="119" x2="682" y2="119" stroke="#C2410C" stroke-width="1.2" />
<text x="690" y="124" font-family="IBM Plex Mono, monospace" font-size="15" fill="#C2410C">∂rᵢ / ∂cⱼ</text>
</svg>
</figure>
<div class="eq sm" data-tex="J_f=\big[\,J_{f,1},\ J_{f,2},\ J_{f,3}\,\big],\qquad J_d=\big[\,J_{d,1},\ J_{d,2},\ J_{d,3}\,\big]"></div>
<p class="ref">Eqs. (22), (25)</p>
<p class="takeaway">Row = one residual, column = one coefficient.</p>

Note:
The Jacobian collects every first derivative of the residual vector with respect to
the coefficient vector. Entry (i, j) answers one question: if I nudge coefficient j,
how fast does residual i change? So rows are residuals — S of them for features,
S_n for distortion — and columns are the K coefficients.

The columns come in three blocks, matching the three coefficient groups: the first
(L+1)² columns are the c_u1 coefficients, then c_u2, then c_omega. That is exactly
Eqs. (22) and (25): J = [J_1, J_2, J_3]. The paper prints the row count of J_d as
"S_i"; it is the number of vertices S_n.

Sizes, to make it concrete: at the final setting, K = 768 columns, while the
highest-resolution feature has S = 163,842 sampling points. The paper notes that
K is much smaller than S, which avoids rank deficiency — many more equations than
unknowns.
