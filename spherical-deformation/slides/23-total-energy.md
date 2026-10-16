<h2>Total Energy</h2>
<div class="eq lead" data-tex="E(\mathbf c_{u_1},\mathbf c_{u_2},\mathbf c_{\omega})=E_f+\alpha\,E_d,\qquad \alpha\in\mathbb{R}^{+}"></div>
<p class="ref">Eq. (19) — α = 1 in the experiments</p>
<div class="compare">
<div><b>smaller α</b>features dominate<br>more local deformation, better matching</div>
<div><b>larger α</b>distortion dominates<br>closer to a rigid rotation</div>
</div>
<p class="sub">one objective for the whole group: both terms sum over all N subjects</p>
<p class="takeaway">Align the features, but pay for every bit of non-rigid distortion.</p>

Note:
The two energies are added, with a weight alpha on the distortion term. The paper
describes the total energy as leveraging between feature alignment and rigidity of
the deformation, and in the experiments balances the two with alpha = 1.

The intuition for the trade-off: with a small alpha the optimizer is free to bend
the sphere wherever that improves feature agreement; with a large alpha it stays
close to the rigid alignment and accepts some feature mismatch. Note that sigma-d
inside E_d also acts like a weight on the same term.

Emphasise the scope: E is a group-wise objective — the sums run over all N subjects
and the reference is the population mean. On the next slides we will see how that
single group objective turns into one least-squares problem per subject.
