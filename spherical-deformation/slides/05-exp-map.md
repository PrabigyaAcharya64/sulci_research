<h2>From the Plane Back to the Sphere</h2>
<figure>
<svg viewBox="0 0 560 290" width="660">
<circle cx="280" cy="185" r="92" fill="none" stroke="#E5E7EB" stroke-width="2" />
<ellipse cx="280" cy="185" rx="92" ry="24" fill="none" stroke="#E5E7EB" stroke-width="1.5" />
<polygon points="215,49 415,85 345,137 145,101" fill="none" stroke="#E5E7EB" stroke-width="1.5" />
<line x1="280" y1="93" x2="365" y2="81" stroke="#C2410C" stroke-width="2.5" />
<polygon points="365,81 356,87 354,78" fill="#C2410C" />
<path d="M 280 93 Q 331 94 359 138" fill="none" stroke="#1D4ED8" stroke-width="2" stroke-dasharray="5 4" />
<circle cx="280" cy="93" r="4.5" fill="#1A1A1A" />
<circle cx="359" cy="138" r="5" fill="#1D4ED8" />
<g font-family="Inter, system-ui, sans-serif" font-size="15" fill="#6B7280">
<text x="266" y="112" text-anchor="end">z</text>
<text x="370" y="70" fill="#C2410C">z<tspan font-size="11" dy="4">T</tspan></text>
<text x="372" y="146" fill="#1D4ED8">z̄</text>
<text x="300" y="118" text-anchor="end">geodesic</text>
</g>
</svg>
</figure>
<div class="eq" data-tex="\bar z=\exp_z(z_T)=\exp_z\!\left(c_{u_1}u_1+c_{u_2}u_2\right)"></div>
<p class="ref">Eq. (4)</p>
<p class="takeaway">Walk from <em>z</em> along the sphere, in the direction and distance the vector gives.</p>

Note:
The tangent vector is not itself a point of the sphere — its tip floats off the
surface. The exponential map is what brings it back: take the direction and the
length encoded by the vector, and walk that far along the great circle starting at
z. Where you stop is the new axis z-bar. Notice the walk heads the same way the
orange vector points. So the two flat coefficients now specify a genuine point on
the sphere, with no reference to theta or phi at all. If you have seen z-prime in
other notes, that is this same z-bar.
