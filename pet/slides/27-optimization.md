<h2>Optimization of Registration</h2>
<figure>
<svg viewBox="0 0 1100 200" width="1100">
<g font-family="Inter, system-ui, sans-serif">
<rect x="30" y="30" width="170" height="64" rx="8" fill="none" stroke="#1A1A1A" stroke-width="1.5" /><text x="115" y="58" text-anchor="middle" font-size="16" fill="#1A1A1A">parameters θ</text><text x="115" y="79" text-anchor="middle" font-size="13" fill="#6B7280">t, α, β, γ</text><rect x="250" y="30" width="170" height="64" rx="8" fill="none" stroke="#E5E7EB" stroke-width="1.5" /><text x="335" y="58" text-anchor="middle" font-size="16" fill="#1A1A1A">build T(θ)</text><text x="335" y="79" text-anchor="middle" font-size="13" fill="#6B7280">4 × 4 matrix</text><rect x="470" y="30" width="170" height="64" rx="8" fill="none" stroke="#E5E7EB" stroke-width="1.5" /><text x="555" y="58" text-anchor="middle" font-size="16" fill="#1A1A1A">move PET onto</text><text x="555" y="79" text-anchor="middle" font-size="13" fill="#6B7280">MRI grid (interpolate)</text><rect x="690" y="30" width="170" height="64" rx="8" fill="none" stroke="#E5E7EB" stroke-width="1.5" /><text x="775" y="58" text-anchor="middle" font-size="16" fill="#1A1A1A">joint histogram</text><text x="775" y="79" text-anchor="middle" font-size="13" fill="#6B7280">p(a, b)</text><rect x="910" y="30" width="170" height="64" rx="8" fill="none" stroke="#1D4ED8" stroke-width="1.5" /><text x="995" y="58" text-anchor="middle" font-size="16" fill="#1A1A1A">mutual information</text><text x="995" y="79" text-anchor="middle" font-size="13" fill="#6B7280">MI(θ)</text><line x1="202" y1="62" x2="240" y2="62" stroke="#6B7280" stroke-width="1.5" /><polygon points="248,62 239,57 239,67" fill="#6B7280" /><line x1="422" y1="62" x2="460" y2="62" stroke="#6B7280" stroke-width="1.5" /><polygon points="468,62 459,57 459,67" fill="#6B7280" /><line x1="642" y1="62" x2="680" y2="62" stroke="#6B7280" stroke-width="1.5" /><polygon points="688,62 679,57 679,67" fill="#6B7280" /><line x1="862" y1="62" x2="900" y2="62" stroke="#6B7280" stroke-width="1.5" /><polygon points="908,62 899,57 899,67" fill="#6B7280" />
<path d="M 995 96 L 995 150 L 115 150 L 115 104" fill="none" stroke="#C2410C" stroke-width="1.8" />
<polygon points="115,96 110,107 120,107" fill="#C2410C" />
<text x="555" y="176" text-anchor="middle" font-size="15" fill="#C2410C">optimizer adjusts θ to increase MI — repeat until it stops improving</text>
</g>
</svg>
</figure>
<div class="eq" data-tex="\hat\theta=\arg\max_{\theta}\ \mathrm{MI}\big(\text{MRI},\ \text{PET}\circ T(\theta)\big),\qquad \theta=(t_x,t_y,t_z,\alpha,\beta,\gamma)"></div>
<p class="sub">searched coarse to fine: blurred, downsampled images first, then full resolution, to avoid getting stuck</p>

Note:
Registration is now an optimisation problem over six numbers. Start from an initial
guess (often just matching the image centres). For the current parameters, build the
matrix T, use it to move the PET image onto the MRI grid — each MRI voxel position is
mapped into the PET image and the PET value there is interpolated — build the joint
histogram of the overlapping voxels, and compute MI.

An optimiser then changes the six parameters in the direction that increases MI —
for example Powell's method, which searches one direction at a time, or a
gradient-based method — and the loop repeats until MI stops improving.

Because MI can have local maxima, the search usually runs coarse to fine: first on
blurred, downsampled images where the MI landscape is smoother, then refined at full
resolution. The parameters that give the maximum MI define the final transformation.
