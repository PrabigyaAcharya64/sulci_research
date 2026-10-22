<h2>The Final Transformation</h2>
<div class="eq lead" data-tex="\hat T=\begin{bmatrix}0.998&-0.053&-0.024&2.1\\ 0.052&0.998&-0.036&-4.3\\ 0.026&0.035&0.999&6.0\\ 0&0&0&1\end{bmatrix}"></div>
<p class="ref">example result: α = 2.0°, β = −1.5°, γ = 3.0° · t = (2.1, −4.3, 6.0) mm</p>

Note:
The optimiser returns six numbers, and from them the 4 × 4 matrix. The example here
corresponds to small rotations of 2°, −1.5° and 3° and a translation of a few
millimetres — typical of two scans of the same head taken in different scanners.
(Values are illustrative; the rotation block is computed from the angles, and it is a
true rotation — its determinant is 1.)

This matrix is the bridge between the two scans. Next we use it to read the PET SUV
at every vertex of the subject's FreeSurfer cortical mesh.
