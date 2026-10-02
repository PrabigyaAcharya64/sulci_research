<h2>Let the Three Numbers Vary</h2>
<figure>
<svg viewBox="0 0 560 250" width="660">
<circle cx="280" cy="125" r="92" fill="none" stroke="#E5E7EB" stroke-width="2" />
<ellipse cx="280" cy="125" rx="92" ry="24" fill="none" stroke="#E5E7EB" stroke-width="1.5" />
<g stroke="#C2410C" stroke-width="2">
<line x1="228" y1="62" x2="252" y2="54" /><line x1="300" y1="56" x2="336" y2="60" />
<line x1="206" y1="104" x2="228" y2="114" /><line x1="286" y1="100" x2="322" y2="92" />
<line x1="226" y1="150" x2="244" y2="162" /><line x1="306" y1="146" x2="332" y2="158" />
<line x1="252" y1="190" x2="286" y2="192" /><line x1="330" y1="186" x2="348" y2="176" />
</g>
<g fill="#C2410C">
<polygon points="259,51 248,51 252,60" /><polygon points="344,61 334,56 333,65" />
<polygon points="234,118 226,109 222,118" /><polygon points="330,90 320,87 321,96" />
<polygon points="249,168 240,160 238,169" /><polygon points="340,162 329,155 327,164" />
<polygon points="294,192 284,188 284,197" /><polygon points="355,172 345,172 348,181" />
</g>
</svg>
</figure>
<div class="eq sm" data-tex="c_{u_1}(\theta,\phi),\qquad c_{u_2}(\theta,\phi),\qquad \omega(\theta,\phi)"></div>
<p class="takeaway">Each location gets its own rotation — but neighbours must stay related.</p>

Note:
The extension is small to state and large in consequence: stop treating the three
numbers as constants and make them functions of position. Now vertex one can
receive a different rotation from vertex two, which is what non-rigid deformation
requires. But we must not hand the optimiser thousands of unrelated rotations —
that would tear the surface and overfit instantly. What we want is that nearby
locations receive nearby rotations. That requirement is precisely what spherical
harmonics deliver.
