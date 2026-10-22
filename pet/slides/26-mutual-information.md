<h2>Mutual Information</h2>
<div class="eq lead" data-tex="\mathrm{MI}(A,B)=\sum_a\sum_b p(a,b)\,\log_2\frac{p(a,b)}{p(a)\,p(b)}=H(A)+H(B)-H(A,B)"></div>
<div class="legend" style="grid-template-columns: max-content max-content;">
<span class="k inline" data-tex="p(a,b)"></span><span class="v">how often PET value a and MRI value b occur at the same voxel</span>
<span class="k inline" data-tex="p(a),\ p(b)"></span><span class="v">how often each value occurs in each image alone</span>
</div>
<p class="sub">how much knowing the MRI value tells you about the PET value — highest when the images are aligned</p>

Note:
For every overlapping voxel we read the PET value a and the MRI value b. Counting how
often each pair occurs gives the joint probability p(a, b); counting each image on
its own gives the marginal probabilities p(a) and p(b). Mutual information compares
the joint probability with what it would be if the two images were unrelated,
p(a) times p(b). If PET and MRI values were independent, the
ratio inside the log would be 1 everywhere and MI would be zero. The more
predictable one image is from the other, the larger MI becomes.

The second form says the same in terms of entropy (uncertainty): H(A) and H(B) are
the entropies of each image's histogram, H(A,B) the entropy of the joint histogram.
Alignment makes the joint histogram sharper, lowering H(A,B), and so raising MI —
while the individual histograms hardly change.

Crucially, MI never assumes which PET value goes with which MRI value; it only
rewards a consistent relationship. That is why it works across modalities
(Collignon et al. 1995; Wells et al. 1996; Maes et al. 1997). A normalised version,
NMI = (H(A) + H(B)) / H(A,B) (Studholme et al. 1999), is often used because it is less
sensitive to how much of the images overlap.
