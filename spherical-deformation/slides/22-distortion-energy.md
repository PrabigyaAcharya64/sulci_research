<h2>Distortion Energy</h2>
<figure>
<svg viewBox="0 0 640 210" width="760">
<circle cx="320" cy="112" r="92" fill="none" stroke="#E5E7EB" stroke-width="2" />
<ellipse cx="320" cy="112" rx="92" ry="24" fill="none" stroke="#E5E7EB" stroke-width="1.5" />
<path d="M 262 86 Q 290 48 334 46" fill="none" stroke="#6B7280" stroke-width="2" stroke-dasharray="5 4" />
<path d="M 262 86 Q 318 112 372 94" fill="none" stroke="#C2410C" stroke-width="2" />
<path d="M 334 46 Q 368 58 372 94" fill="none" stroke="#1D4ED8" stroke-width="3" />
<circle cx="262" cy="86" r="5" fill="#1A1A1A" /><circle cx="334" cy="46" r="5" fill="#6B7280" /><circle cx="372" cy="94" r="5.5" fill="#C2410C" />
<g font-family="Newsreader, Georgia, serif" font-style="italic" font-size="19" text-anchor="middle">
<text x="246" y="84" fill="#1A1A1A">p</text>
<text x="300" y="32" fill="#6B7280">p</text><text x="301" y="20" fill="#6B7280" font-style="normal">~</text>
<text x="392" y="115" fill="#C2410C">p</text><text x="393" y="108" fill="#C2410C" font-style="normal" font-size="15">^</text>
</g>
<g font-family="Inter, system-ui, sans-serif" font-size="14">
<text x="290" y="31" text-anchor="end" fill="#6B7280">rigid part only (l = 0)</text>
<text x="404" y="115" fill="#C2410C">all degrees</text>
<text x="384" y="62" fill="#1D4ED8">geodesic distance</text>
</g>
</svg>
</figure>
<div class="eq" data-tex="E_d(\mathbf c_{u_1},\mathbf c_{u_2},\mathbf c_{\omega})=\frac{1}{2N}\sum_{n=1}^{N}\frac{1}{S_n}\sum_{i=1}^{S_n}\frac{\arccos^2\!\big(\hat p_i^{\,nT}\cdot\tilde p_i^{\,n}\big)}{\sigma^2_{d,\hat p_i^{\,n}}}"></div>
<p class="ref">Eq. (18) — S<sub>n</sub> vertices of subject n; σ<sub>d</sub> = 0.04</p>
<p class="takeaway">Features alone would accept any distortion — so we charge for it.</p>

Note:
Why we need a second term. The feature energy only cares about what value lands on
each sampling point; it says nothing about how violently the sphere was distorted to
get there. The paper states that the rigidity in E_f is only implicit, and in
Sec. 4.6 notes that an unconstrained objective can be minimised by expanding less
variable regions, which produces large registration distortion. With hundreds of
free coefficients, the optimizer would happily do that.

The distortion energy fixes this explicitly. For every vertex of subject n — note:
the S_n mesh vertices, not the sampling points — compare two positions. p-tilde is
where the vertex would be using only the degree-zero, rigid part of the coefficients
(the paper: the reconstructed location at l = 0). p-hat is where it actually goes
with all degrees. Because both are unit vectors, arccos of their dot product is the
geodesic distance between them, the blue arc. Square it, divide by the distortion
prior sigma-d squared, average over vertices and subjects.

If the deformation is purely rigid, p-hat equals p-tilde and E_d is zero. So the
energy measures only the non-rigid part. sigma-d is a single constant for the whole
cortex because it is hard to estimate; the paper sets sigma-d = 0.04, about four
times the average edge length (0.01) of the unit-sphere mesh (Sec. 4.6). Smaller
sigma-d pushes the solution towards a rigid rotation.
