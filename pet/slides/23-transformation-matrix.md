<h2>The Transformation Matrix</h2>
<div class="eq lead" data-tex="\begin{bmatrix}x'\\ y'\\ z'\\ 1\end{bmatrix}=\underbrace{\begin{bmatrix}r_{11}&r_{12}&r_{13}&t_x\\ r_{21}&r_{22}&r_{23}&t_y\\ r_{31}&r_{32}&r_{33}&t_z\\ 0&0&0&1\end{bmatrix}}_{T}\begin{bmatrix}x\\ y\\ z\\ 1\end{bmatrix}"></div>
<div class="eq sm" data-tex="R=R_z(\gamma)\,R_y(\beta)\,R_x(\alpha),\qquad R_x(\alpha)=\begin{bmatrix}1&0&0\\ 0&\cos\alpha&-\sin\alpha\\ 0&\sin\alpha&\cos\alpha\end{bmatrix}"></div>
<p class="sub">12 numbers in the matrix, but only 6 are free: R must be a rotation (R<sup>T</sup>R = I, det R = 1)</p>

Note:
Writing the point with an extra 1 (homogeneous coordinates) lets the rotation and
the translation be packed into a single 4 × 4 matrix T: the upper-left 3 × 3 block is
the rotation, the last column is the translation, and the bottom row is fixed. One
matrix multiplication then applies the whole rigid transform, and transforms can be
chained by multiplying their matrices — for example combining T with the voxel-to-mm
matrices of the two images.

The rotation is built from the three angles: one rotation about each axis,
multiplied together (the order matters; here x first, then y, then z). R_x is shown;
R_y and R_z have the same pattern on the other axes. So although T has twelve entries,
they are all determined by the six parameters from the previous slide.
