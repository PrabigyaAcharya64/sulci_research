<h2>Distortion Jacobian</h2>
<div class="eq sm lead" data-tex="r_i=\frac{\arccos(x_i)}{\sigma_{d,\hat p_i}},\qquad x_i=\hat p_i^{T}\cdot\tilde p_i"></div>
<div class="eq" data-tex="\frac{\partial r_i}{\partial c_j}=\underbrace{\frac{\partial\hat p_i^{T}}{\partial c_j}\cdot\tilde p_i}_{\partial x_i/\partial c_j}\cdot\underbrace{\frac{-1}{\sqrt{1-\big(\hat p_i^{T}\cdot\tilde p_i\big)^2}}}_{d\arccos(x)/dx}\cdot\frac{1}{\sigma_{d,\hat p_i}}"></div>
<p class="ref">Eq. (24) — assuming <span class="inline" data-tex="\tilde p"></span> and σ<sub>d</sub><sup>2</sup> are constant</p>
<p class="sub">columns again split into the three blocks: J<sub>d</sub> = [J<sub>d,1</sub>, J<sub>d,2</sub>, J<sub>d,3</sub>]</p>
<p class="takeaway">How fast the arc to the rigid position grows when one coefficient moves.</p>

Note:
Same recipe for the distortion residual. Write it as arccos of x over sigma-d, with
x the dot product between the deformed position p-hat and the rigid-only position
p-tilde. The paper holds p-tilde and sigma-d constant when differentiating.

Three factors again, read left to right. How the dot product changes: since only
p-hat moves, that is the location derivative from Eq. (20) dotted with p-tilde. The
derivative of arccos: minus one over the square root of one minus x squared. And the
constant scale one over sigma-d. That is Eq. (24), entry by entry, and the blocks
are assembled as in Eq. (25).

A numerical remark, ours rather than the paper's: when p-hat equals p-tilde — for
example with only the degree-zero part active — x equals one and both the numerator
and the square root vanish. The product tends to a finite directional derivative,
but an implementation has to handle that 0/0 case explicitly.
