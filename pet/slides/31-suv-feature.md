<h2>Uptake as a New Vertex Feature</h2>
<table class="iso">
<tr><th>vertex</th><th>curvature</th><th>sulcal depth</th><th>thickness (mm)</th><th style="color:#C2410C">SUV</th></tr>
<tr><td class="num">1</td><td class="num">0.12</td><td class="num">−0.41</td><td class="num">2.6</td><td class="num" style="color:#C2410C">7.8</td></tr>
<tr><td class="num">2</td><td class="num">−0.08</td><td class="num">0.73</td><td class="num">2.1</td><td class="num" style="color:#C2410C">6.4</td></tr>
<tr><td class="num">⋮</td><td class="num">⋮</td><td class="num">⋮</td><td class="num">⋮</td><td class="num" style="color:#C2410C">⋮</td></tr>
<tr><td class="num">≈150k</td><td class="num">…</td><td class="num">…</td><td class="num">…</td><td class="num" style="color:#C2410C">…</td></tr>
</table>
<p class="sub">FreeSurfer's geometric features describe the shape of the cortex — SUV adds how active it is, at the same vertex (example values)</p>

Note:
FreeSurfer already gives several values at every vertex that describe the cortex's
shape: curvature, sulcal depth, cortical thickness. These are the per-vertex features
used on the spherical mesh in the earlier decks.

Sampling the PET SUV at each vertex adds one more column: a functional feature — how
much glucose that piece of cortex used — aligned vertex by vertex with the geometric
ones. Because it sits on the same mesh, it inherits everything built for the mesh:
it can be inflated to the sphere, registered across subjects with the same spherical
registration, smoothed on the surface, and fed to a surface-based model as an extra
input channel next to curvature and sulcal depth.

The numbers in the table are illustrative, not from a real subject.
