<h2>From Fourier Series to the Sphere</h2>
<div class="eq lead" data-tex="f(x)=\sum_{n} c_n\,e^{inx}"></div>
<p class="sub">a periodic function on a circle, built from smooth basis waves</p>
<div class="eq" data-tex="f(\theta,\phi)=\sum_{l=0}^{\infty}\sum_{m=-l}^{l} c_{l}^{m}\,Y_{l,m}(\theta,\phi)"></div>
<p class="ref">Eq. (11), Eq. (14) — real spherical harmonics</p>
<p class="takeaway">The same idea, one dimension up: a smooth function from a few coefficients.</p>

Note:
Start from something familiar. A Fourier series writes a periodic function as a sum
of smooth waves, with low frequencies carrying the broad shape and high frequencies
the detail. Spherical harmonics are the same construction on the surface of a
sphere. The index l plays the role of frequency; for each l there are 2l+1 orders m.
The paper uses the real-valued form, which is sufficient here. The key property we
rely on is that each basis function is smooth over the whole sphere, so any finite
sum of them is smooth too.
