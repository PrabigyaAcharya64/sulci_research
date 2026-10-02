<h2>Why Not Just Shift the Angles?</h2>
<div class="eq sm" data-tex="\varphi(\theta,\phi)=[\sin\theta\cos\phi,\ \sin\theta\sin\phi,\ \cos\theta]^{T}"></div>
<div class="eq sm" data-tex="\bar z=\varphi(\theta_z+\Delta\theta,\ \phi_z+\Delta\phi)"></div>
<p class="ref">Eq. (2), Eq. (3)</p>
<figure>
<svg viewBox="0 0 560 240" width="660">
<circle cx="280" cy="120" r="100" fill="none" stroke="#E5E7EB" stroke-width="2" />
<ellipse cx="280" cy="120" rx="100" ry="26" fill="none" stroke="#E5E7EB" stroke-width="1.5" />
<ellipse cx="280" cy="38" rx="57" ry="15" fill="none" stroke="#E5E7EB" stroke-width="1.5" />
<path d="M 280 146 A 100 26 0 0 0 367 133" fill="none" stroke="#C2410C" stroke-width="4" />
<path d="M 280 53 A 57 15 0 0 0 329 44" fill="none" stroke="#C2410C" stroke-width="4" />
<g font-family="Inter, system-ui, sans-serif" font-size="15" fill="#6B7280">
<text x="392" y="140">long</text><text x="346" y="40">short</text>
</g>
<text x="280" y="232" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="15" fill="#6B7280">the same change in longitude</text>
</svg>
</figure>
<p class="takeaway">The same angular step is a different distance depending on where you stand.</p>

Note:
The naive idea is to move a point by adding to its two angles. The paper rejects
this. Delta-theta and Delta-phi are dependent, and they vary with position for the
same geodesic distance — near the pole a given change in longitude is a tiny
movement, at the equator it is a large one. A parameterisation built on angles
would therefore mean something different at every location, and the optimiser
could not treat its parameters consistently. We need a displacement description
that is geometric, not coordinate-dependent.
