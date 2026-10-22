<h2>Standardized Uptake Value (SUV)</h2>
<div class="eq lead" data-tex="\mathrm{SUV}=\frac{C_{\text{tissue}}(t)}{A_{\text{inj}}(t)\,/\,\mathrm{BW}}"></div>
<div class="legend">
<span class="k inline" data-tex="C_{\text{tissue}}"></span><span class="v">activity concentration (kBq/mL)</span>
<span class="k inline" data-tex="A_{\text{inj}}"></span><span class="v">injected activity, decay-corrected (MBq)</span>
<span class="k inline" data-tex="\mathrm{BW}"></span><span class="v">body weight (kg)</span>
<span class="k inline" data-tex="t"></span><span class="v">time of the scan</span>
</div>
<div class="eq sm" data-tex="A_{\text{inj}}(t)=A_0\,e^{-\ln 2\, t/T_{1/2}}\qquad\mathrm{SUV}=\frac{30\ \text{kBq/mL}}{300\ \text{MBq}\,/\,75\ \text{kg}}=7.5"></div>
<p class="sub">SUV = 1: uptake equal to the tracer spread evenly through the whole body · SUV = 7.5: seven and a half times that</p>

Note:
The SUV divides the tissue concentration by the injected activity per unit body
weight. Units: kBq/mL divided by MBq/kg, which is kBq/g; assuming tissue density of
about 1 g/mL, the SUV is dimensionless.

The injected activity has to be decay-corrected to the time of the scan, because
the F-18 keeps decaying during the uptake period: after 60 minutes only about 68 % of
the injected F-18 is left. (Equivalently, the image can be decay-corrected back to
the injection time.)

Interpretation: if the tracer were spread perfectly evenly through the body, every
tissue would have SUV = 1. A cortex SUV of 7.5 means that tissue holds seven and a
half times its "fair share" of FDG.

Common variants: SUVmax (the hottest voxel in a region) and SUVmean (the average).
In brain studies, values are often also divided by a reference region such as the
cerebellum or pons, giving an SUV ratio (SUVR), which removes remaining global
differences between subjects. Measured in which region? That is where MRI and
registration come in.
