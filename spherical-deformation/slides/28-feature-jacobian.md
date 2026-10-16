<h2>Feature Jacobian: the Chain Rule</h2>
<div class="eq sm lead" data-tex="r_i=\frac{f(\hat p_i)-\bar f_i}{\sigma_{f,\hat p_i}}"></div>
<div class="eq" data-tex="\frac{\partial r_i}{\partial c_j}=\underbrace{\frac{1}{\sigma_{f,\hat p_i}}}_{\text{normalization}}\ \underbrace{\nabla_{\hat p_i}f^{\,T}}_{\text{feature slope}}\ \underbrace{\frac{\partial\hat p_i}{\partial c_j}}_{\text{Eq. (20)}}"></div>
<div class="eq sm" data-tex="J_{f,1}=\frac{\partial\hat p_i^{T}}{\partial c_{u_1,j}}\cdot\nabla_{\hat p_i}f\cdot\frac{1}{\sigma_{f,\hat p_i}}\qquad(\text{same form for } J_{f,2},\,J_{f,3})"></div>
<p class="ref">Eq. (21) — assuming <span class="inline" data-tex="\bar f"></span> and σ<sub>f</sub><sup>2</sup> are constant</p>
<p class="takeaway">Feature change = slope of the map × motion of the location, in standard-score units.</p>

Note:
Differentiate one feature residual. The mean f-bar and the variance are treated as
constants — the paper states this assumption explicitly — so they contribute nothing
except the 1/sigma scale. What remains is the derivative of f(p-hat) with respect
to a coefficient, and p-hat is the only thing that depends on the coefficient.

So the chain rule has three factors. One over sigma: the normalisation carried over
from the energy. The gradient of the feature map at p-hat: how steeply the feature
changes as you move across the sphere. And the location derivative from Eq. (20):
how p-hat moves when coefficient j moves. Their product is a single number — entry
(i, j) of J_f. The bottom line is the paper's form of the same product, with the
location derivative written first as a row vector.

Two remarks. Because the location derivative is tangent to the sphere, only the
tangential (spherical) part of the feature gradient matters. And if the map is flat at a point, that row is zero: the
coefficient cannot improve a feature it cannot see changing.
