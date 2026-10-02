<h2>The Whole Idea</h2>
<figure>
<svg viewBox="0 0 1000 120" width="1000">
<g font-family="Inter, system-ui, sans-serif" font-size="17" fill="#1A1A1A" text-anchor="middle">
<text x="92" y="52">two numbers</text><text x="330" y="52">a point on the sphere</text>
<text x="590" y="52">two rotations</text><text x="862" y="52">a smooth field</text>
</g>
<g font-family="Inter, system-ui, sans-serif" font-size="13" fill="#6B7280" text-anchor="middle">
<text x="92" y="78">in a flat plane</text><text x="330" y="78">via the exponential map</text>
<text x="590" y="78">precession, then spin</text><text x="862" y="78">via spherical harmonics</text>
</g>
<g stroke="#6B7280" stroke-width="1.5">
<line x1="172" y1="46" x2="216" y2="46" /><line x1="452" y1="46" x2="496" y2="46" />
<line x1="692" y1="46" x2="736" y2="46" />
</g>
<g fill="#6B7280">
<polygon points="224,46 212,41 212,51" /><polygon points="504,46 492,41 492,51" />
<polygon points="744,46 732,41 732,51" />
</g>
</svg>
</figure>
<div class="eq" data-tex="M(p)=R\!\left(c_{u_1}(\theta,\phi),\,c_{u_2}(\theta,\phi),\,\omega(\theta,\phi)\right)p"></div>
<p class="takeaway">No polar coordinates, three parameters per location, smoothness built in.</p>

Note:
Read the chain backwards if you want the motivation and forwards if you want the
construction. Two coefficients in a flat tangent plane avoid the coordinate problem.
The exponential map turns them into a genuine spherical location. Precession plus
intrinsic rotation turn that location into a full rotation, with one extra angle.
Making all three coefficients spherical-harmonic fields turns a rigid rotation into
a smooth non-rigid deformation, with degree zero recovering the rigid case exactly.
That is hierarchical spherical deformation.
