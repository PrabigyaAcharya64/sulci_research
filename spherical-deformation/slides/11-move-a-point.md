<h2>Moving a Point</h2>
<div class="eq lead" data-tex="M(p)=R(c_{u_1},c_{u_2},\omega)\cdot p\qquad \forall p\in\mathbb{S}^2"></div>
<p class="ref">Eq. (10)</p>
<p class="takeaway">The deformation is just a matrix applied to each location.</p>

Note:
With the three parameters fixed, build the matrix and multiply. Every vertex of the
mesh goes through the same expression. Nothing here is iterative or approximate —
given the coefficients, the new position of a point is a single matrix product.
Keep that in mind, because in a moment the coefficients stop being constants and
this is the only line that has to change.
