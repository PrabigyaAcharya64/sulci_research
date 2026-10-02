<h2>Degree Controls Smoothness</h2>
<figure>
<svg viewBox="0 0 860 220" width="860">
<g fill="none" stroke="#E5E7EB" stroke-width="1.5">
<circle cx="110" cy="100" r="62" /><circle cx="330" cy="100" r="62" />
<circle cx="550" cy="100" r="62" /><circle cx="770" cy="100" r="62" />
</g>
<circle cx="110" cy="100" r="62" fill="#1D4ED8" fill-opacity="0.16" />
<path d="M 330 38 A 62 62 0 0 1 330 162 Z" fill="#1D4ED8" fill-opacity="0.16" />
<path d="M 550 100 L 550 38 A 62 62 0 0 1 612 100 Z" fill="#1D4ED8" fill-opacity="0.16" />
<path d="M 550 100 L 550 162 A 62 62 0 0 1 488 100 Z" fill="#1D4ED8" fill-opacity="0.16" />
<path d="M 770 100 L 770 38 A 62 62 0 0 1 801 46 Z" fill="#1D4ED8" fill-opacity="0.16" />
<path d="M 770 100 L 823 69 A 62 62 0 0 1 823 131 Z" fill="#1D4ED8" fill-opacity="0.16" />
<path d="M 770 100 L 801 154 A 62 62 0 0 1 739 154 Z" fill="#1D4ED8" fill-opacity="0.16" />
<path d="M 770 100 L 717 131 A 62 62 0 0 1 717 69 Z" fill="#1D4ED8" fill-opacity="0.16" />
<g font-family="Newsreader, Georgia, serif" font-style="italic" font-size="19" fill="#1A1A1A" text-anchor="middle">
<text x="110" y="196">l = 0</text><text x="330" y="196">l = 1</text>
<text x="550" y="196">l = 2</text><text x="770" y="196">l = 3</text>
</g>
<text x="110" y="216" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" fill="#C2410C">rigid rotation</text>
</svg>
</figure>
<div class="eq sm" data-tex="l=0\ \Longrightarrow\ \text{global rigid rotation};\qquad \text{higher } l\ \Longrightarrow\ \text{finer local detail}"></div>
<p class="takeaway">This is the hierarchy — truncate the degree, choose the smoothness.</p>

Note:
Why the method is called hierarchical. The basis functions are linearly independent,
so the degrees stack rather than interfere. Degree zero is a constant field, which
means a single rotation everywhere — exactly the rigid case from earlier, recovered
as a special case rather than bolted on. Each added degree introduces finer angular
variation. So the maximum degree you allow is a direct dial on how local the
deformation may be, and you can optimise coarse degrees first and refine, which is
what keeps the registration stable.
