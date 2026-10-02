<h2>The Parameters Become Harmonic Series</h2>
<div class="eq sm lead" data-tex="\bar z(\theta,\phi)=\exp_z\!\left(\sum_{l=0}^{\infty}\sum_{m=-l}^{l}\left(c_{l,u_1}^{m}u_1+c_{l,u_2}^{m}u_2\right)Y_{l,m}(\theta,\phi)\right)"></div>
<p class="ref">Eq. (15)</p>
<div class="eq sm" data-tex="\omega(\theta,\phi)=\sum_{l=0}^{\infty}\sum_{m=-l}^{l}c_{l,\omega}^{m}\,Y_{l,m}(\theta,\phi)"></div>
<p class="ref">Eq. (16)</p>
<p class="takeaway">Smooth coefficients in, smoothly varying rotations out.</p>

Note:
This is the heart of the method. The two tangent coefficients and the spin angle
are each expanded in spherical harmonics. What the optimiser now searches for is
not a rotation per vertex, but one set of harmonic coefficients per subject. Because
the basis functions are smooth, the rotation field they generate is smooth
automatically — neighbouring vertices cannot fly apart. And because the number of
coefficients is small and controllable, the problem stays well posed.
