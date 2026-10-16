<h2>Feature Matching Energy</h2>
<div class="eq lead" data-tex="E_f(\mathbf c_{u_1},\mathbf c_{u_2},\mathbf c_{\omega})=\frac{1}{2NS}\sum_{n=1}^{N}\sum_{i=1}^{S}\frac{\big(f^n(\hat p_i^{\,n})-\bar f_i\big)^2}{\sigma^2_{f,\hat p_i^{\,n}}}"></div>
<p class="ref">Eq. (17)</p>
<div class="legend">
<span class="k inline" data-tex="N"></span><span class="v">subjects</span>
<span class="k inline" data-tex="S"></span><span class="v">sampling points</span>
<span class="k inline" data-tex="f^n"></span><span class="v">deformed feature map of subject n</span>
<span class="k inline" data-tex="\hat p_i^{\,n}"></span><span class="v">subject n's location at sampling point i</span>
<span class="k inline" data-tex="\bar f_i"></span><span class="v">population mean at point i</span>
<span class="k inline" data-tex="\sigma^2_{f}"></span><span class="v">feature variance there</span>
</div>
<p class="takeaway">Each term is a squared standard score — zero when a subject matches the population.</p>

Note:
Read the fraction first. The numerator is the difference between subject n's
feature value at its deformed location p-hat and the population mean at the same
sampling point. Dividing by the variance turns it into a squared standard score —
the paper describes the energy as the sum of standard scores. That normalisation
matters: in regions where cortical features naturally differ a lot between people,
a given mismatch counts less; in regions where everyone agrees, the same mismatch
counts more.

Then the sums: over all S sampling points and all N subjects, averaged by 1/(NS) so
the value does not grow with the number of points or subjects. The extra one-half
is only there to make the derivative clean later. For perfect feature matching
E_f is zero.

Where do the coefficients enter? Only through p-hat: the coefficients decide where
subject n's map is read, and that is the single path by which the optimizer can
change E_f. Keep that in mind for the Jacobian.
