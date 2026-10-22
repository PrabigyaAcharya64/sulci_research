<h2>From PET Volume to the Cortical Mesh</h2>
<figure>
<svg viewBox="0 0 1100 260" width="1100">
<g font-family="Inter, system-ui, sans-serif" text-anchor="middle">
<g fill="none" stroke-width="1.5">
<rect x="20" y="20" width="200" height="70" rx="8" stroke="#1A1A1A" /><rect x="300" y="20" width="230" height="70" rx="8" stroke="#E5E7EB" />
<rect x="610" y="20" width="250" height="70" rx="8" stroke="#1A1A1A" />
<rect x="20" y="170" width="200" height="70" rx="8" stroke="#C2410C" /><rect x="300" y="170" width="230" height="70" rx="8" stroke="#E5E7EB" />
<rect x="900" y="95" width="180" height="70" rx="8" stroke="#1D4ED8" />
</g>
<text x="120" y="50" font-size="17" fill="#1A1A1A">MRI (T1)</text><text x="120" y="72" font-size="13" fill="#6B7280">subject's anatomy</text>
<text x="415" y="50" font-size="17" fill="#1A1A1A">FreeSurfer</text><text x="415" y="72" font-size="13" fill="#6B7280">recon-all</text>
<text x="735" y="50" font-size="17" fill="#1A1A1A">cortical mesh</text><text x="735" y="72" font-size="13" fill="#6B7280">≈ 150,000 vertices / hemisphere</text>
<text x="120" y="200" font-size="17" fill="#C2410C">PET (SUV)</text><text x="120" y="222" font-size="13" fill="#6B7280">voxel grid</text>
<text x="415" y="200" font-size="17" fill="#1A1A1A">registration</text><text x="415" y="222" font-size="13" fill="#6B7280">final matrix T</text>
<text x="990" y="125" font-size="17" fill="#1D4ED8">SUV at every</text><text x="990" y="147" font-size="17" fill="#1D4ED8">vertex</text>
<line x1="222" y1="55" x2="286" y2="55" stroke="#6B7280" stroke-width="1.5" /><polygon points="294,55 285,50 285,60" fill="#6B7280" /><line x1="532" y1="55" x2="596" y2="55" stroke="#6B7280" stroke-width="1.5" /><polygon points="604,55 595,50 595,60" fill="#6B7280" /><line x1="222" y1="205" x2="286" y2="205" stroke="#6B7280" stroke-width="1.5" /><polygon points="294,205 285,200 285,210" fill="#6B7280" />
<path d="M 862 55 L 880 55 L 880 120 L 892 120" fill="none" stroke="#6B7280" stroke-width="1.5" /><polygon points="899,120 890,115 890,125" fill="#6B7280" />
<path d="M 532 205 L 880 205 L 880 140 L 892 140" fill="none" stroke="#6B7280" stroke-width="1.5" /><polygon points="899,140 890,135 890,145" fill="#6B7280" />
</g>
</svg>
</figure>
<p class="sub">FreeSurfer builds the cortical surface from the MRI; its vertices are positions in millimetres in MRI space — the same space T maps PET into</p>

Note:
FreeSurfer's recon-all reconstructs the cortex from the subject's T1 MRI as triangle
meshes: the white surface (grey/white boundary) and the pial surface (outer edge of
the cortex), each with roughly 150,000 vertices per hemisphere. These are the same
meshes the earlier decks worked with — the ones inflated to a sphere and labelled.

Each vertex is a 3D position in millimetres in the MRI's coordinate space. The PET
image, after registration, is tied to that same space by the final matrix T. So for
any vertex we can ask: which PET location is underneath it, and what is the SUV
there? Doing that for every vertex turns the PET volume into one SUV value per vertex
of the mesh.
