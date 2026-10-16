<h2>Approximating the Hessian</h2>
<div class="eq sm lead" data-tex="R(\mathbf c+\Delta)\approx R(\mathbf c)+J\Delta"></div>
<div class="eq sm" data-tex="\frac12\big\|R+J\Delta\big\|^2=\frac12R^{T}R+\Delta^{T}J^{T}R+\frac12\Delta^{T}J^{T}J\,\Delta"></div>
<div class="eq" data-tex="H=\frac{1}{S}\,J_f^{T}J_f+\alpha\,\frac{1}{S_n}\,J_d^{T}J_d"></div>
<p class="ref">Eq. (28)</p>
<div class="compare">
<div><b>exact Hessian</b><span data-tex="J^{T}J+\sum_i r_i\,\nabla^2 r_i" class="inline"></span></div>
<div><b>Gauss–Newton</b><span data-tex="J^{T}J" class="inline"></span>  — drops the second term</div>
</div>
<p class="takeaway">Curvature from first derivatives only — no second derivatives needed.</p>

Note:
The gradient tells us which way is downhill, but not how far to go. For that we
need curvature. Linearise the residuals around the current coefficients:
R(c + Delta) is approximately R(c) + J Delta. Substitute into one-half the squared
norm and expand: a constant, a linear term Delta-transpose J-transpose R — that is
the gradient again — and a quadratic term one-half Delta-transpose J-transpose J
Delta. The matrix in the quadratic term is our curvature estimate. With both
energies and their constants, that is H in Eq. (28), a K-by-K matrix.

Be precise about what is approximated. The exact Hessian of one-half R-transpose R
is J-transpose J plus a sum of each residual times its own second-derivative
matrix. Gauss–Newton keeps only J-transpose J. That is accurate when the residuals
are small or the residuals are close to linear in the coefficients, and it has two
practical advantages: it needs only the Jacobians we already have, and it is
symmetric positive semi-definite. The paper calls this the second-order
approximation (Sec. 2.4.2).

Minimising the quadratic model gives J-transpose J Delta = minus J-transpose R —
the Gauss–Newton step. The next slide adds damping.
