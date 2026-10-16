<h2>Residual Vectors</h2>
<div class="eq sm lead" data-tex="R_f=\left[\frac{f(\hat p_1)-\bar f_1}{\sigma_{f,\hat p_1}},\ \cdots,\ \frac{f(\hat p_S)-\bar f_S}{\sigma_{f,\hat p_S}}\right]^{T}\in\mathbb{R}^{S\times 1}"></div>
<p class="ref">Eq. (23)</p>
<div class="eq sm" data-tex="R_d=\left[\frac{\arccos\big(\hat p_1^{T}\cdot\tilde p_1\big)}{\sigma_{d,\hat p_1}},\ \cdots,\ \frac{\arccos\big(\hat p_{S_n}^{T}\cdot\tilde p_{S_n}\big)}{\sigma_{d,\hat p_{S_n}}}\right]^{T}\in\mathbb{R}^{S_n\times 1}"></div>
<p class="ref">Eq. (26)</p>
<p class="sub">one subject at a time — the superscript n is dropped, as in the paper</p>
<p class="takeaway">One normalized error per sampling point, and one per vertex.</p>

Note:
Now we change viewpoint from energies to vectors. Take one subject and drop the
superscript n, as the paper does from Sec. 2.4.2 on. Each squared term inside E_f
is the square of one number: the normalised feature difference at a sampling point.
Stack those S numbers into a column — that is the feature residual vector R_f,
S by 1.

Likewise, each term of E_d is the square of the normalised geodesic distance
between a vertex's full and rigid-only positions. Stacking those gives R_d, with
one entry per vertex, so it is S_n by 1. Note the two vectors have different
lengths: sampling points for features, mesh vertices for distortion.

Notice what we did not do: we did not square anything here. The residuals carry a
sign for the feature term, so the optimizer knows whether a feature is too high or
too low. Next slide shows that the energy is simply the squared length of these
vectors.
