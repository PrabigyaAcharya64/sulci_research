<h2>Precession — Move the Axis</h2>
<figure>
<svg viewBox="0 0 560 260" width="660">
<circle cx="280" cy="150" r="88" fill="none" stroke="#E5E7EB" stroke-width="2" />
<ellipse cx="280" cy="150" rx="88" ry="23" fill="none" stroke="#E5E7EB" stroke-width="1.5" />
<line x1="280" y1="150" x2="280" y2="52" stroke="#6B7280" stroke-width="2" />
<polygon points="280,44 275,56 285,56" fill="#6B7280" />
<line x1="280" y1="150" x2="196" y2="99" stroke="#1D4ED8" stroke-width="2" />
<polygon points="189,95 201,94 196,104" fill="#1D4ED8" />
<path d="M 280 72 A 80 80 0 0 0 212 110" fill="none" stroke="#C2410C" stroke-width="2" />
<polygon points="206,114 217,105 219,115" fill="#C2410C" />
<g font-family="Inter, system-ui, sans-serif" font-size="15" fill="#6B7280">
<text x="288" y="52">z</text><text x="170" y="92" fill="#1D4ED8">z̄</text>
<text x="232" y="80" fill="#C2410C">ω⊥</text>
</g>
</svg>
</figure>
<div class="eq" data-tex="R_1=\exp\!\left(\omega_\perp[z_\perp]_\times\right)=\exp\!\left([\,z\times z_T\,]_\times\right)"></div>
<p class="ref">Eq. (7) — [·]<sub>×</sub> is the skew-symmetric cross-product matrix</p>
<p class="takeaway">Tilt the reference axis until it points at the target.</p>

Note:
This is the first of the two rotations. Axis plus angle become a rotation matrix
through the matrix exponential — you do not need to derive that, only to know it
turns an axis and an angle into a matrix. Notice the second form: substituting the
simplified angle and axis makes the whole precession depend on nothing but z and
the tangent vector. The paper calls this precession by analogy with a spinning top,
whose axis itself sweeps around.
