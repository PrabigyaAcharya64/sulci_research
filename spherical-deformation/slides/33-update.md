<h2>Updating the Coefficients</h2>
<div class="eq lead" data-tex="\mathbf c\leftarrow\mathbf c+\delta\,\Delta"></div>
<p class="ref">Eq. (29) — δ starts at 1 for each subject</p>

Note:
The LM step gives a direction and a size. Before accepting it, the paper adds one
geometric safeguard. The coefficients are updated with a step scale delta, starting
at 1 for each subject. Then the local rotations are rebuilt from the harmonic
fields, the vertices are moved, and every triangle of the sphere mesh is checked.
If any triangle has negative area — it has flipped over, which means the mesh folds
locally and the map is no longer one-to-one there — delta is halved and the update
is tried again (Algorithm 1, lines 5 and 9–16).

Two points to mention. Delta is a local variable per subject (Sec. 2.4.3), so one
subject needing a small step does not slow the others. And the sentence right after
Eq. (29) in the paper names this step regulariser alpha; Algorithm 1 and Sec. 2.4.3
call it delta — it is the same quantity, and alpha elsewhere is the energy weight.

Be careful about what this guarantees. Sec. 4.7 is explicit that these safeguards
are empirical: they keep the discrete mesh orientable but do not prove a
diffeomorphism. Convergence is declared when the energy changes by less than 1e-5
between successive steps.
