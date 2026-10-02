<h2>The Problem</h2>
<figure>
<svg viewBox="0 0 900 190" width="900">
<g fill="none" stroke="#E5E7EB" stroke-width="2">
<circle cx="170" cy="95" r="46" /><circle cx="450" cy="95" r="46" /><circle cx="730" cy="95" r="46" />
</g>
<g fill="none" stroke="#E5E7EB" stroke-width="1.5">
<ellipse cx="170" cy="95" rx="46" ry="12" /><ellipse cx="450" cy="95" rx="46" ry="12" />
<ellipse cx="730" cy="95" rx="46" ry="12" />
</g>
<g fill="#C2410C">
<circle cx="144" cy="57" r="5" /><circle cx="485" cy="65" r="5" /><circle cx="749" cy="137" r="5" />
</g>
<g font-family="IBM Plex Mono, monospace" font-size="15" fill="#C2410C">
<text x="144" y="44" text-anchor="middle">p¹</text><text x="497" y="58">p²</text><text x="759" y="153">p³</text>
</g>
<g font-family="Inter, system-ui, sans-serif" font-size="15" fill="#6B7280" text-anchor="middle">
<text x="170" y="178">subject 1</text><text x="450" y="178">subject 2</text><text x="730" y="178">subject 3</text>
</g>
</svg>
</figure>
<div class="eq" data-tex="\textbf{Goal:}\qquad M^1(p^1)=M^2(p^2)=\cdots=M^N(p^N)"></div>
<p class="ref">Eq. (1)</p>
<p class="sub">M<sup>n</sup> is subject <em>n</em>'s own deformation; p<sup>n</sup> is where that landmark sits in subject <em>n</em></p>
<p class="takeaway">Send every subject's copy of a landmark to one common place.</p>

Note:
Every cortex has already been mapped to a sphere before we start — that part is
standard pipeline work, not this paper's contribution. The orange dot is the same
anatomical landmark, say one sulcus, in three people. Even on spheres it sits at a
different location in each subject: p1 in the first, p2 in the second, and so on.
Each subject gets its own deformation, M1 for the first, M2 for the second. The
goal line says that after deforming, all of those land on the same point. Note the
pairing — M1 acts on p1, M2 on p2. They are not one shared map applied to
everyone; each subject is moved by its own.
