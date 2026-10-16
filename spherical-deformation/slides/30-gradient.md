<h2>The Gradient</h2>
<div class="eq sm lead" data-tex="\frac{\partial}{\partial c_j}\Big(\frac{1}{2}\sum_{i} r_i^2\Big)=\sum_{i} r_i\,\frac{\partial r_i}{\partial c_j}=\sum_{i} J_{ij}\,r_i=\big(J^{T}R\big)_j"></div>
<div class="eq" data-tex="g=\nabla_{\mathbf c}E^{(n)}=\frac{1}{S}\,J_f^{T}R_f+\alpha\,\frac{1}{S_n}\,J_d^{T}R_d"></div>
<div class="eq sm" data-tex="\underbrace{J_f^{T}}_{K\times S}\ \underbrace{R_f}_{S\times 1}=\underbrace{g_f}_{K\times 1}\qquad\underbrace{J_d^{T}}_{K\times S_n}\ \underbrace{R_d}_{S_n\times 1}=\underbrace{g_d}_{K\times 1}"></div>
<p class="ref">the bracketed term of Eq. (27)</p>
<p class="takeaway">Each entry of g is the energy's sensitivity to one coefficient.</p>

Note:
Differentiate the per-subject energy, one coefficient at a time. The derivative of
one-half r squared is r times the derivative of r — the one-half from the energy is
what cancels the 2. Summing over residuals, the derivative with respect to
coefficient j is the sum over i of r_i times J_ij.

That sum runs down column j of the Jacobian, over the row index i. An ordinary
product J times a vector sums across a row instead; summing down a column is what
J transpose times R does. So stacking all coefficients, the gradient is J-transpose
R. Check the shapes: K by S times S by 1 gives K by 1 — one number per coefficient.

Apply this to both terms of E^(n), with their constants 1/S and alpha/S_n, and you
get g, which is exactly the vector inside the brackets of Eq. (27).

Interpretation: g_j is the slope of the energy along coefficient j. A large positive
value means increasing that coefficient makes the alignment worse; a large negative
value means increasing it helps. The gradient points uphill, so any descent method
steps against it.
