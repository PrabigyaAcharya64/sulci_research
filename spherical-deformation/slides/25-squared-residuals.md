<h2>Energy as a Sum of Squared Residuals</h2>
<div class="eq sm lead" data-tex="R^{T}R=\begin{bmatrix}0.5 & -1 & 2\end{bmatrix}\begin{bmatrix}0.5\\ -1\\ 2\end{bmatrix}=0.25+1+4=5.25=\sum_i r_i^2"></div>
<div class="eq" data-tex="E^{(n)}=\frac{1}{2S}\,R_f^{T}R_f+\alpha\,\frac{1}{2S_n}\,R_d^{T}R_d"></div>
<div class="eq sm" data-tex="E=\frac{1}{N}\sum_{n=1}^{N}E^{(n)}"></div>
<p class="ref">Eqs. (17)–(19) regrouped by subject</p>
<p class="takeaway">The group objective splits into one least-squares problem per subject.</p>

Note:
The small example is just to make the notation concrete: a row vector times the
same column vector multiplies each entry with itself and adds them up — the sum of
squares. So R_f-transpose R_f is exactly the sum of the S squared standard scores
for one subject.

Now regroup the paper's energies by subject. E_f has 1/(2NS) in front of a double
sum; pull out 1/N and what is left for subject n is (1/2S) R_f-transpose R_f. E_d
has 1/(2N) and an inner 1/S_n; what is left is (1/2S_n) R_d-transpose R_d. So the
total energy is the average over subjects of a per-subject energy E^(n). This is
our own regrouping of Eqs. (17)–(19), not a new formula.

This is the bridge between group-wise and per-subject. The objective E is
group-wise. But the coefficients are independent between subjects (Sec. 2.4.2), and
f-bar and sigma are held fixed during an update, so the derivative of E with respect
to subject n's coefficients involves only E^(n). Each subject therefore gets its
own Jacobians and its own step; the common factor 1/N cancels out of that step,
which is why it does not appear in Eq. (27). The subjects stay coupled through the
population mean f-bar and through the energy check that adjusts the damping.
