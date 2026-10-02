<h2>The Length Is the Angle</h2>
<div class="eq sm lead" data-tex="z_\perp=\frac{z\times\bar z}{\|z\times\bar z\|},\qquad \omega_\perp=\arccos\!\left(z^{T}\!\cdot\bar z\right)"></div>
<p class="ref">Eq. (5)</p>
<div class="eq" data-tex="z_\perp=\frac{z\times z_T}{\sqrt{c_{u_1}^2+c_{u_2}^2}},\qquad \omega_\perp=\sqrt{c_{u_1}^2+c_{u_2}^2}"></div>
<p class="ref">Eq. (6) — because the map is exponential and z ⟂ z_T</p>
<p class="takeaway">How far you walk in the plane <em>is</em> how far the axis turns.</p>

Note:
To rotate z into z-bar we need an axis and an angle. The axis is perpendicular to
both, so it is their cross product. The angle is the angle between them. Then the
paper makes a simplification worth pausing on: because z is perpendicular to the
tangent vector and the map is the exponential map, the angle collapses to the plain
length of that tangent vector. So the two coefficients we chose are not an
indirect encoding — their magnitude is literally the rotation angle, and their
direction is literally the direction of travel. That is why this parameterisation
is well behaved for an optimiser.
