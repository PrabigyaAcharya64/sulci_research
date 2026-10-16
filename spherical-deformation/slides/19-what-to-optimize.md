<h2>What the Optimizer Searches For</h2>
<div class="eq lead" data-tex="\mathbf c=\big[\,\mathbf c_{u_1},\ \mathbf c_{u_2},\ \mathbf c_{\omega}\,\big]\in\mathbb{R}^{K},\qquad K=3(L+1)^2"></div>
<p class="ref">one coefficient set per subject — Eqs. (15), (16)</p>
<figure>
<svg viewBox="0 0 900 150" width="900">
<g fill="none" stroke-width="2">
<rect x="60" y="14" width="230" height="58" rx="6" stroke="#1D4ED8" />
<rect x="335" y="14" width="230" height="58" rx="6" stroke="#1D4ED8" />
<rect x="610" y="14" width="230" height="58" rx="6" stroke="#C2410C" />
</g>
<g font-family="Newsreader, Georgia, serif" font-style="italic" font-size="24" text-anchor="middle">
<text x="175" y="51" fill="#1D4ED8">c<tspan font-size="16" dy="6">u₁</tspan></text>
<text x="450" y="51" fill="#1D4ED8">c<tspan font-size="16" dy="6">u₂</tspan></text>
<text x="725" y="51" fill="#C2410C">c<tspan font-size="16" dy="6">ω</tspan></text>
</g>
<g font-family="Inter, system-ui, sans-serif" font-size="14" fill="#6B7280" text-anchor="middle">
<text x="175" y="94">(L+1)² coefficients</text><text x="450" y="94">(L+1)² coefficients</text><text x="725" y="94">(L+1)² coefficients</text>
<text x="312" y="138">where the axis goes</text><text x="725" y="138">spin about it</text>
</g>
<g stroke="#E5E7EB" stroke-width="1.5" fill="none">
<path d="M 60 112 L 60 120 L 565 120 L 565 112" /><path d="M 610 112 L 610 120 L 840 120 L 840 112" />
</g>
</svg>
</figure>
<div class="eq sm" data-tex="\mathbf c\ \longrightarrow\ M(p)=\hat p\ \longrightarrow\ \text{where each subject's features land}"></div>
<p class="takeaway">How do we find the coefficients that bring every subject into correspondence?</p>

Note:
Quick recap before the new part. Each of the three fields from Eqs. (15) and (16)
— the two tangent coefficients and the spin angle — is a spherical-harmonic series
truncated at a maximum degree L. Up to degree L there are (L+1)² basis functions,
so each field has (L+1)² coefficients and one subject has K = 3(L+1)² numbers in
total. The paper writes this as 3(l+1)², using l for the maximum degree. In the
experiments the final degree is l = 15: 256 coefficients per field, 768 per subject
(Sec. 4.8).

Two things to say out loud. First, M(p) = p̂ is the paper's own notation for the
deformed location (Eq. 10) — we will use p̂ a lot from here on. Second, every basis
function covers the whole sphere, so changing any single coefficient moves every
vertex a little, and therefore changes where every feature lands.

So the question for the rest of the talk is: how do we choose those K numbers?
That needs two ingredients — an energy that scores an alignment, and a procedure
that improves it. This is Section 2.4 of the paper.
