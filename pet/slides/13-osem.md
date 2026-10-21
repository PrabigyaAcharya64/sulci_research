<h2>6 · Reconstruction — OSEM</h2>
<figure>
<svg viewBox="0 0 1000 200" width="980">
<g fill="none" stroke-width="1.5">
<rect x="40" y="70" width="190" height="60" rx="8" stroke="#1A1A1A" />
<rect x="300" y="6" width="190" height="60" rx="8" stroke="#E5E7EB" />
<rect x="560" y="70" width="190" height="60" rx="8" stroke="#E5E7EB" />
<rect x="300" y="134" width="190" height="60" rx="8" stroke="#E5E7EB" />
<rect x="800" y="70" width="170" height="60" rx="8" stroke="#1D4ED8" />
</g>
<g font-family="Inter, system-ui, sans-serif" font-size="16" fill="#1A1A1A" text-anchor="middle">
<text x="135" y="96">image estimate</text><text x="135" y="116" font-size="13" fill="#6B7280">start: uniform</text>
<text x="395" y="32">forward project</text><text x="395" y="52" font-size="13" fill="#6B7280">expected counts per line</text>
<text x="655" y="96">compare</text><text x="655" y="116" font-size="13" fill="#6B7280">measured ÷ expected</text>
<text x="395" y="160">back project</text><text x="395" y="180" font-size="13" fill="#6B7280">ratio → correct each voxel</text>
<text x="885" y="96" fill="#1D4ED8">measured</text><text x="885" y="116" font-size="13" fill="#6B7280">counts on each LOR</text>
</g>
<g fill="none" stroke="#6B7280" stroke-width="1.5">
<path d="M 135 68 L 135 36 L 292 36" /><path d="M 490 36 L 655 36 L 655 62" />
<path d="M 655 132 L 655 164 L 498 164" /><path d="M 300 164 L 135 164 L 135 138" />
<path d="M 798 100 L 758 100" />
</g>
<g fill="#6B7280">
<polygon points="300,36 290,31 290,41" /><polygon points="655,70 650,60 660,60" />
<polygon points="490,164 500,159 500,169" /><polygon points="135,130 130,140 140,140" />
<polygon points="750,100 760,95 760,105" />
</g>
</svg>
</figure>
<div class="eq sm" data-tex="\lambda_j^{\text{new}}=\frac{\lambda_j}{\sum_{i\in S_b}a_{ij}}\sum_{i\in S_b}a_{ij}\,\frac{y_i}{\sum_{k}a_{ik}\,\lambda_k}"></div>
<div class="legend">
<span class="k inline" data-tex="\lambda_j"></span><span class="v">activity in voxel j</span>
<span class="k inline" data-tex="y_i"></span><span class="v">counts measured on line i</span>
<span class="k inline" data-tex="a_{ij}"></span><span class="v">chance voxel j is seen on line i</span>
<span class="k inline" data-tex="S_b"></span><span class="v">one subset of the lines</span>
</div>
<p class="takeaway">Guess, compare, correct — repeat until the image explains the measured lines.</p>

Note:
We have counts on millions of lines of response; we want the voxel values that
produced them. OSEM — ordered subset expectation maximisation — solves this
iteratively.

Start with a flat image. Forward-project it: for every line, add up the activity of
the voxels it passes through (weighted by a_ij, the probability that a decay in voxel
j is detected on line i) — that is how many counts this image would have produced.
Compare with what was actually measured, line by line, as a ratio. Back-project those
ratios onto the voxels: a voxel whose lines measured more than expected is scaled up,
one whose lines measured less is scaled down. That is the update in the equation.

This is the classic MLEM algorithm, which assumes the counts follow Poisson
statistics. Its weakness is speed: every update uses every line. OSEM (Hudson and
Larkin, 1994) splits the lines into ordered subsets and updates the image after each
subset, so one pass through the data gives as many updates as there are subsets —
roughly that many times faster. Clinical scanners typically run a few iterations with
a few dozen subsets, and include corrections for attenuation (from the CT or MRI),
scatter, random coincidences and detector sensitivity inside the a_ij model.
