<h2>Rigid Registration — Six Degrees of Freedom</h2>
<div class="eq lead" data-tex="\mathbf x'=R\,\mathbf x+\mathbf t"></div>
<div class="legend">
<span class="k inline" data-tex="\mathbf x"></span><span class="v">a point in the PET image (mm)</span>
<span class="k inline" data-tex="R"></span><span class="v">rotation — 3 angles α, β, γ</span>
<span class="k inline" data-tex="\mathbf t"></span><span class="v">translation — 3 shifts t<sub>x</sub>, t<sub>y</sub>, t<sub>z</sub></span>
<span class="k inline" data-tex="\mathbf x'"></span><span class="v">where that point lands on the MRI</span>
</div>
<p class="sub">3 rotations + 3 translations = 6 numbers to find</p>

Note:
A rigid transformation moves the image without changing its shape: rotate it, then
shift it. In 3D that is three rotation angles (about x, y and z) and three
translations (along x, y and z) — six numbers in total, the six degrees of freedom.

Every point x of the PET image is rotated by R and shifted by t, giving its position
x′ on the MRI. Because R is a pure rotation, all distances inside the brain are
preserved — right for two scans of the same head.
