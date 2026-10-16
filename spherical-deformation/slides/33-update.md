<h2>Updating the Coefficients</h2>
<div class="eq lead" data-tex="\mathbf c\leftarrow\mathbf c+\delta\,\Delta"></div>
<p class="ref">Eq. (29) — δ starts at 1 for each subject</p>
<figure>
<svg viewBox="0 0 820 200" width="820">
<defs>
<marker id="ab" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1D4ED8" /></marker>
<marker id="ao" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#C2410C" /></marker>
<marker id="ag" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#6B7280" /></marker>
</defs>
<polygon points="70,150 200,150 135,52" fill="#1D4ED8" fill-opacity="0.10" stroke="#1D4ED8" stroke-width="2" />
<path d="M 113 132 A 24 24 0 1 0 128 101" fill="none" stroke="#1D4ED8" stroke-width="1.6" marker-end="url(#ab)" />
<polygon points="330,100 460,100 395,22" fill="none" stroke="#E5E7EB" stroke-width="1.5" stroke-dasharray="4 4" />
<polygon points="330,100 460,100 395,176" fill="#C2410C" fill-opacity="0.10" stroke="#C2410C" stroke-width="2" />
<line x1="395" y1="30" x2="395" y2="162" stroke="#6B7280" stroke-width="1.2" stroke-dasharray="4 4" marker-end="url(#ag)" />
<path d="M 373 114 A 22 22 0 1 1 388 145" fill="none" stroke="#C2410C" stroke-width="1.6" marker-end="url(#ao)" />
<g font-family="Newsreader, Georgia, serif" font-style="italic" font-size="18" fill="#1A1A1A" text-anchor="middle">
<text x="60" y="168">a</text><text x="210" y="168">b</text><text x="135" y="44">c</text>
<text x="320" y="96">a</text><text x="470" y="96">b</text><text x="395" y="196">c</text>
</g>
<g font-family="Inter, system-ui, sans-serif" font-size="14" text-anchor="middle">
<text x="135" y="192" fill="#1D4ED8">positive area</text>
<text x="540" y="150" fill="#C2410C" text-anchor="start">c crossed edge ab:</text>
<text x="540" y="170" fill="#C2410C" text-anchor="start">negative area</text>
</g>
<line x1="540" y1="82" x2="600" y2="82" stroke="#6B7280" stroke-width="1.5" marker-end="url(#ag)" />
<g font-family="Inter, system-ui, sans-serif" font-size="16" text-anchor="start">
<text x="616" y="80" fill="#1A1A1A">δ ← δ / 2, retry</text>
<text x="616" y="102" fill="#6B7280" font-size="14">until no triangle is flipped</text>
</g>
</svg>
</figure>
<p class="sub">update c → rebuild rotations (Eqs. 15, 16) → move vertices (Eq. 10) → check every triangle</p>
<p class="takeaway">Shrink the step until every triangle keeps its orientation.</p>

Note:
The LM step gives a direction and a size. Before accepting it, the paper adds one
geometric safeguard. The coefficients are updated with a step scale delta, starting
at 1 for each subject. Then the local rotations are rebuilt from the harmonic
fields, the vertices are moved, and every triangle of the sphere mesh is checked.
If any triangle has negative area — it has flipped over, which means the mesh folds
locally and the map is no longer one-to-one there — delta is halved and the update
is tried again (Algorithm 1, lines 5 and 9–16).

Two points to mention. Delta is a local variable per subject (Sec. 2.4.3), so one
subject needing a small step does not slow the others. And the sentence right after
Eq. (29) in the paper names this step regulariser alpha; Algorithm 1 and Sec. 2.4.3
call it delta — it is the same quantity, and alpha elsewhere is the energy weight.

Be careful about what this guarantees. Sec. 4.7 is explicit that these safeguards
are empirical: they keep the discrete mesh orientable but do not prove a
diffeomorphism. Convergence is declared when the energy changes by less than 1e-5
between successive steps.
