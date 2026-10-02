<h2>A Flat Plane Touching the Sphere</h2>
<figure>
<svg viewBox="0 0 560 300" width="660">
<circle cx="280" cy="195" r="92" fill="none" stroke="#E5E7EB" stroke-width="2" />
<ellipse cx="280" cy="195" rx="92" ry="24" fill="none" stroke="#E5E7EB" stroke-width="1.5" />
<polygon points="215,59 415,95 345,147 145,111" fill="none" stroke="#6B7280" stroke-width="1.5" />
<line x1="280" y1="195" x2="280" y2="103" stroke="#6B7280" stroke-width="1.5" stroke-dasharray="4 4" />
<g stroke="#E5E7EB" stroke-width="1.5" stroke-dasharray="4 3">
<line x1="335" y1="113" x2="365" y2="91" /><line x1="309" y1="81" x2="365" y2="91" />
</g>
<g stroke="#1D4ED8" stroke-width="2">
<line x1="280" y1="103" x2="335" y2="113" /><line x1="280" y1="103" x2="325" y2="69" />
</g>
<polygon points="335,113 325,115 327,108" fill="#1D4ED8" />
<polygon points="325,69 320,78 315,71" fill="#1D4ED8" />
<line x1="280" y1="103" x2="365" y2="91" stroke="#C2410C" stroke-width="2.5" />
<polygon points="365,91 356,97 354,88" fill="#C2410C" />
<circle cx="280" cy="103" r="4.5" fill="#1A1A1A" />
<g font-family="Inter, system-ui, sans-serif" font-size="15" fill="#6B7280">
<text x="266" y="124" text-anchor="end">z</text>
<text x="344" y="127" fill="#1D4ED8">u₁</text>
<text x="331" y="62" fill="#1D4ED8">u₂</text>
<text x="370" y="80" fill="#C2410C">z<tspan font-size="11" dy="4">T</tspan></text>
</g>
</svg>
</figure>
<div class="eq" data-tex="z_T=c_{u_1}u_1+c_{u_2}u_2"></div>
<p class="takeaway">Two numbers describe the displacement — ordinary flat coordinates.</p>

Note:
Pick any reference axis z on the sphere. At z, build the tangent plane: all vectors
perpendicular to z. Choose two orthonormal directions u1 and u2 in that plane. Now
any vector in the plane is c1 times u1 plus c2 times u2 — exactly like writing a
point as x times e1 plus y times e2 in ordinary 2D. Trace the two faint dashed
lines: the orange vector sits between u1 and u2 because it is built from both of
them, and the dashed lines complete the parallelogram that adds them. The two
coefficients are our displacement parameters, and they carry no coordinate
singularity. The choice of u1 and u2 is only a reference frame and has no effect
on the geodesics. This is a tangent plane, a vector space — not a sampling grid.
