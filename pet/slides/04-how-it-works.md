<h2>How Does It Work?</h2>
<figure>
<svg viewBox="0 0 1140 190" width="1140">
<g fill="none" stroke="#E5E7EB" stroke-width="1.5">
<rect x="4" y="40" width="162" height="86" rx="8" /><rect x="198" y="40" width="162" height="86" rx="8" />
<rect x="392" y="40" width="162" height="86" rx="8" /><rect x="586" y="40" width="162" height="86" rx="8" />
<rect x="780" y="40" width="162" height="86" rx="8" /><rect x="974" y="40" width="162" height="86" rx="8" />
</g>
<g font-family="IBM Plex Mono, monospace" font-size="14" fill="#9CA3AF" text-anchor="middle">
<text x="85" y="28">1</text><text x="279" y="28">2</text><text x="473" y="28">3</text>
<text x="667" y="28">4</text><text x="861" y="28">5</text><text x="1055" y="28">6</text>
</g>
<g font-family="Inter, system-ui, sans-serif" font-size="18" fill="#1A1A1A" text-anchor="middle">
<text x="85" y="78">Tracer</text><text x="279" y="78">Uptake</text><text x="473" y="78">β⁺ decay</text>
<text x="667" y="78">Annihilation</text><text x="861" y="78">Detection</text><text x="1055" y="78">Reconstruction</text>
</g>
<g font-family="Inter, system-ui, sans-serif" font-size="14" fill="#6B7280" text-anchor="middle">
<text x="85" y="104">molecule + isotope</text><text x="279" y="104">cells absorb it</text><text x="473" y="104">positron released</text>
<text x="667" y="104">two gamma rays</text><text x="861" y="104">line of response</text><text x="1055" y="104">3D image (OSEM)</text>
</g>
<g stroke="#6B7280" stroke-width="1.5">
<line x1="168" y1="83" x2="190" y2="83" /><line x1="362" y1="83" x2="384" y2="83" /><line x1="556" y1="83" x2="578" y2="83" />
<line x1="750" y1="83" x2="772" y2="83" /><line x1="944" y1="83" x2="966" y2="83" />
</g>
<g fill="#6B7280">
<polygon points="196,83 188,78 188,88" /><polygon points="390,83 382,78 382,88" /><polygon points="584,83 576,78 576,88" />
<polygon points="778,83 770,78 770,88" /><polygon points="972,83 964,78 964,88" />
</g>
<g stroke="#E5E7EB" stroke-width="1.5" fill="none"><path d="M 4 150 L 4 158 L 748 158 L 748 150" /><path d="M 780 150 L 780 158 L 1136 158 L 1136 150" /></g>
<g font-family="Inter, system-ui, sans-serif" font-size="14" fill="#6B7280" text-anchor="middle">
<text x="376" y="182">inside the body</text><text x="958" y="182">scanner and computer</text>
</g>
</svg>
</figure>
<p class="takeaway">From a molecule in the blood to a 3D image.</p>

Note:
The whole process in one line — we will go through each box.

Inside the body: a tracer is injected, cells take it up according to their biology,
the radioactive atom in it decays and releases a positron, and within about a
millimetre the positron annihilates with an electron, producing two gamma rays that
leave the body.

Scanner and computer: the detector ring records the two gamma rays as a line, and a
computer combines millions of these lines into a 3D image with the OSEM algorithm.

We start with step 1, the tracer.
