<h2>PET–MRI Registration</h2>
<figure>
<svg viewBox="0 0 1000 360" width="1000">
<g font-family="Inter, system-ui, sans-serif">
<clipPath id="regA"><rect x="110" y="10" width="300" height="300" rx="10" /></clipPath>
<g clip-path="url(#regA)">
<image href="images/mri-axial.jpg" x="110" y="10" width="300" height="300" />
<image href="images/fdg-brain-slice.png" x="200.8" y="46.5" width="171.7" height="198.0" preserveAspectRatio="none" opacity="0.55" transform="rotate(13 286.6 145.5)" />
</g>
<text x="260.0" y="340" text-anchor="middle" font-size="17" fill="#1A1A1A">before: PET and MRI misaligned</text>
<line x1="430" y1="160" x2="562" y2="160" stroke="#6B7280" stroke-width="1.5" /><polygon points="570,160 561,155 561,165" fill="#6B7280" />
<text x="500" y="148" text-anchor="middle" font-size="15" fill="#6B7280">rigid transform</text>
<clipPath id="regB"><rect x="590" y="10" width="300" height="300" rx="10" /></clipPath>
<g clip-path="url(#regB)">
<image href="images/mri-axial.jpg" x="590" y="10" width="300" height="300" />
<image href="images/fdg-brain-slice.png" x="656.8" y="64.5" width="171.7" height="198.0" preserveAspectRatio="none" opacity="0.55" transform="rotate(0 742.6 163.5)" />
</g>
<text x="740.0" y="340" text-anchor="middle" font-size="17" fill="#1D4ED8">after: PET registered to MRI</text>
</g>
</svg>
</figure>
<p class="sub">goal: find the transformation that puts every PET voxel on the right anatomy, so uptake can be measured in MRI-defined regions</p>

Note:
PET shows function but little anatomy; the MRI of the same person shows anatomy in
detail. Registration finds the spatial transformation that maps one onto the other.
Once aligned we can say which gyrus a hot spot sits in, define regions of interest on
the MRI (for example from a FreeSurfer segmentation) and read the PET SUV inside
them, and correct for partial-volume effects using the anatomy.

Because it is the same person and the brain is enclosed by the skull, the brain does
not change shape between the two scans — it has only been positioned differently in
each scanner. So a rigid transformation (a rotation plus a translation) is enough;
no stretching or warping is needed. (Registering to a template or to another person
would need more flexible transforms.)

On the slide: the grey image is an axial MRI slice (anatomy) and the colour image is
the FDG PET slice (function) laid over it at partial transparency — rotated and
shifted before registration, lined up after. The two images come from different
people, so the overlay is illustrative; in a real study both scans are of the same
subject.
