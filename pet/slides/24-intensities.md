<h2>Why PET and MRI Intensities Cannot Be Compared Directly</h2>
<table class="iso">
<tr><th>tissue</th><th>T1 MRI</th><th>FDG PET</th></tr>
<tr><td>white matter</td><td><span class="sw" style="background:#E5E7EB"></span>bright</td><td><span class="sw" style="background:#3DBB4A"></span>moderate</td></tr>
<tr><td>grey matter</td><td><span class="sw" style="background:#9CA3AF"></span>grey</td><td><span class="sw" style="background:#E3261C"></span>high</td></tr>
<tr><td>CSF (ventricles)</td><td><span class="sw" style="background:#1A1A1A"></span>dark</td><td><span class="sw" style="background:#4B2C91"></span>very low</td></tr>
</table>
<p class="sub">the brightest tissue in one image is not the brightest in the other — subtracting or correlating the images does not measure alignment</p>

Note:
For two images of the same kind, registration can simply compare intensities voxel by
voxel: when aligned, the difference is smallest. PET and MRI measure different things,
so that fails.

In a T1-weighted MRI, white matter is brightest, grey matter is grey and CSF is dark.
In FDG PET, grey matter is the hottest, white matter is moderate and CSF is nearly
empty. The ordering is different: there is no single scale factor or straight-line
relationship between the two. A difference or correlation measure would not reach its
best value at correct alignment.

What does hold is a consistent relationship: when the images are aligned, each tissue
type pairs a typical MRI value with a typical PET value. Mutual information measures
exactly how consistent that pairing is, without needing to know what it is.
