<h2>How One Coefficient Moves a Location</h2>
<div class="eq sm lead" data-tex="\begin{aligned}\frac{\partial\hat p_i^{T}}{\partial c_{u_1,j}}&=Y_j(\theta_{\hat p_i},\phi_{\hat p_i})\cdot\big([z\times u_1]_\times\cdot\hat p_i\big)^{T}\\[12pt] \frac{\partial\hat p_i^{T}}{\partial c_{u_2,j}}&=Y_j(\theta_{\hat p_i},\phi_{\hat p_i})\cdot\big([z\times u_2]_\times\cdot\hat p_i\big)^{T}\\[12pt] \frac{\partial\hat p_i^{T}}{\partial c_{\omega,j}}&=Y_j(\theta_{\hat p_i},\phi_{\hat p_i})\cdot\big([\bar z]_\times\cdot\hat p_i\big)^{T}\end{aligned}"></div>
<p class="ref">Eq. (20) — derivation in Appendix A; Y<sub>j</sub> is the j-th basis function, 1 ≤ j ≤ (L+1)²</p>
<p class="sub">Y<sub>j</sub> — how strongly coefficient j acts here  ·  [a]<sub>×</sub><span class="inline" data-tex="\hat p"></span> — the direction <span class="inline" data-tex="\hat p"></span> slides on the sphere</p>
<p class="takeaway">Each coefficient nudges every location by a small rotation, weighted by its basis function.</p>

Note:
Everything that follows needs one ingredient: how a deformed location p-hat moves
when one coefficient moves. That is Eq. (20). Each line has two factors.

The scalar Y_j is the j-th spherical-harmonic basis function evaluated at the
point — the coefficients are flattened into one index j running over all (l, m) up
to degree L. It says how much coefficient j matters at this location: the chain
rule step d c_u1 / d c_(u1,j) = Y_j comes straight from the harmonic series,
Eqs. (15)–(16).

The vector [a]× p-hat is a cross product a × p-hat. It is perpendicular to p-hat,
so the point slides along the sphere, as an infinitesimal rotation about the axis a.
For the spin the axis is the local target axis z-bar (the paper writes it z-hat):
d p-hat / d omega = [z-bar]× p-hat, Appendix A.2. For the two tangent coefficients
the axis is z × u1 or z × u2, because z × z_T = c_u1 (z × u1) + c_u2 (z × u2).
Appendix A first swaps the order of the two rotations into an equivalent composite
(A.6) so the derivative can be taken cleanly.

Remark for the technical audience — our check, not a claim from the paper: the
spin derivative is exact; the tangent derivatives are exact when the tangent
displacement is zero (as at initialisation, where all coefficients are zero) and a
first-order approximation otherwise. We confirmed this numerically against finite
differences. The appendix's intermediate step writes the tangent generator
differently ([u1 × z_T]×); this slide follows Eq. (20) of the main text.
