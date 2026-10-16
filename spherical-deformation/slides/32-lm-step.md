<h2>Levenberg–Marquardt Step</h2>
<div class="eq lead" data-tex="\Delta=-\big(H+\lambda\,\operatorname{diag}(H)\big)^{-1}g"></div>
<p class="ref">Eq. (27), with g and H from the previous two slides</p>
<div class="compare">
<div><b>λ → 0</b>Gauss–Newton step<br><span data-tex="\Delta\approx-H^{-1}g" class="inline"></span></div>
<div><b>λ large</b>short, scaled gradient step<br><span data-tex="\Delta\approx-\tfrac{1}{\lambda}\operatorname{diag}(H)^{-1}g" class="inline"></span></div>
</div>
<p class="sub">start λ = 0.001 at each degree  ·  E decreased → λ ← λ/2  ·  otherwise → λ ← 2λ</p>
<p class="takeaway">Damping blends a fast Gauss–Newton step with a cautious gradient step.</p>

Note:
This is the update the paper uses, Eq. (27). Three pieces.

The minus sign: g points uphill, so we move against it. The approximate Hessian H
rescales that direction — coefficients along which the energy curves sharply get a
small step, flat directions a larger one. Without damping this is the Gauss–Newton
step from the last slide.

Why damping: Gauss–Newton trusts the linearisation fully. Far from the minimum, or
where H is poorly conditioned, that step can overshoot and the energy goes up.
Adding lambda times diag(H) does two things: it makes the matrix better
conditioned, and as lambda grows the step shrinks and turns towards the gradient
direction, scaled per coefficient by its own curvature — that per-coefficient
scaling is Marquardt's diag(H). So lambda slides between the two regimes on the
slide.

The schedule, from Algorithm 1: lambda starts at 0.001 for each degree. After the
spheres are updated, if the total energy decreased, lambda is halved — trust the
model more; otherwise it is doubled — be more careful. The paper describes only
this adjustment; it does not describe rejecting steps.
