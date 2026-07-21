---
title: "Inside the Dilution Refrigerator: The Extreme Engineering of Superconducting Qubits"
description: "Every superconducting quantum processor requires a machine the size of a chandelier, operating 150 times colder than deep space, threaded with hundreds of precision microwave cables. Here is what is actually happening inside."
pubDate: 'Mar 12 2024'
heroImage: '../../assets/hero-superconducting.svg'
pillar: 'Quantum Hardware'
author: 'KhGh'
tags: ['superconducting qubits', 'Josephson junction', 'dilution refrigerator', 'transmon', 'quantum hardware']
sources:
  - title: 'Charge-Insensitive Qubit Design Derived from the Cooper Pair Box (the transmon)'
    authors: 'Jens Koch, Terri M. Yu, Jay Gambetta, et al.'
    venue: 'Physical Review A 76, 042319; arXiv:cond-mat/0703002'
    year: 2007
    url: 'https://arxiv.org/abs/cond-mat/0703002'
  - title: 'Superconducting Circuits for Quantum Information: An Outlook'
    authors: 'M. H. Devoret, R. J. Schoelkopf'
    venue: 'Science 339, 1169'
    year: 2013
    url: 'https://www.science.org/doi/10.1126/science.1231930'
  - title: "A Quantum Engineer's Guide to Superconducting Qubits"
    authors: 'Philip Krantz, Morten Kjaergaard, et al.'
    venue: 'Applied Physics Reviews 6, 021318; arXiv:1904.06560'
    year: 2019
    url: 'https://arxiv.org/abs/1904.06560'
---

Every time IBM or Google announces a new quantum processor, the headline focuses on qubit count. What the press release does not convey is the engineering required to make those qubits work: a machine the size of a chandelier, operating at fifteen millikelvin — a temperature 150 times colder than deep space and 20,000 times colder than your living room — threaded with hundreds of hand-soldered coaxial cables, shielded from every stray electromagnetic field and ambient vibration, all to preserve a quantum state in a circuit smaller than a human fingernail for a few hundred microseconds.

Superconducting quantum computers are the dominant platform in the industry today. Understanding why requires going inside the hardware — down to the Josephson junction.

## The Josephson Junction: An Artificial Atom

At the heart of every superconducting qubit is a **Josephson junction**: two pieces of superconducting metal separated by a barrier roughly two nanometres thick — a few dozen atoms of aluminium oxide. In ordinary metals, electrons scatter off atomic vibrations and impurities, dissipating energy as heat. Below a critical temperature (1.2 K for aluminium), electrons pair up into **Cooper pairs** and flow without resistance through a different quantum mechanical mechanism.

The effect at a Josephson junction is stranger still. Cooper pairs can tunnel through the insulating barrier — quantum mechanically crossing a gap they have no classical energy to traverse. This tunnelling creates a supercurrent whose magnitude depends on the quantum phase difference across the junction according to a nonlinear relationship described by the Josephson equations.

That nonlinearity is the critical ingredient. A simple LC circuit — an inductor and capacitor in a resonant loop — has uniformly spaced energy levels: the energy required to go from level 0 to 1 is identical to going from 1 to 2, 2 to 3, and so on. This uniformity makes it impossible to isolate a two-level qubit: microwave pulses addressing the |0⟩→|1⟩ transition would simultaneously drive |1⟩→|2⟩. The Josephson junction acts as a nonlinear inductor that distorts the energy ladder, making each rung a different height. Only the lowest two levels are addressed — |0⟩ and |1⟩ — and the qubit is defined.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="200" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">JOSEPHSON JUNCTION (CROSS-SECTION)</text>
  <text x="510" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#1d4ed8">TRANSMON CIRCUIT</text>
  <line x1="340" y1="0" x2="340" y2="210" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="5,3"/>
  <!-- Junction cross-section -->
  <rect x="60" y="60" width="260" height="70" rx="3" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="190" y="83" text-anchor="middle" font-size="12" font-weight="700" fill="#1d4ed8">Superconductor (Al)</text>
  <rect x="60" y="92" width="260" height="12" fill="#fde68a" stroke="#d97706" stroke-width="1"/>
  <text x="190" y="102" text-anchor="middle" font-size="9" font-weight="700" fill="#92400e">AlOₓ barrier (~2 nm)</text>
  <rect x="60" y="104" width="260" height="36" rx="0" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5" rx="0" ry="0"/>
  <rect x="60" y="104" width="260" height="26" fill="#dbeafe"/>
  <text x="190" y="120" text-anchor="middle" font-size="12" font-weight="700" fill="#1d4ed8">Superconductor (Al)</text>
  <!-- Cooper pair tunnelling arrows -->
  <line x1="130" y1="85" x2="130" y2="110" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#ap)"/>
  <line x1="190" y1="88" x2="190" y2="107" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#ap)"/>
  <line x1="250" y1="85" x2="250" y2="110" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#ap)"/>
  <text x="190" y="155" text-anchor="middle" font-size="11" fill="#7c3aed" font-weight="600">Cooper pairs tunnel through barrier</text>
  <text x="190" y="170" text-anchor="middle" font-size="10" fill="#6b7280">creating a nonlinear supercurrent</text>
  <!-- Transmon circuit -->
  <!-- Capacitor (large shunt) -->
  <line x1="390" y1="50" x2="390" y2="90" stroke="#111827" stroke-width="2"/>
  <line x1="370" y1="90" x2="410" y2="90" stroke="#111827" stroke-width="2.5"/>
  <line x1="370" y1="100" x2="410" y2="100" stroke="#111827" stroke-width="2.5"/>
  <line x1="390" y1="100" x2="390" y2="140" stroke="#111827" stroke-width="2"/>
  <text x="420" y="97" font-size="12" fill="#111827" font-weight="600">C<tspan font-size="9" dy="2">shunt</tspan></text>
  <text x="416" y="116" font-size="10" fill="#6b7280">(large)</text>
  <!-- Parallel Josephson element -->
  <line x1="480" y1="50" x2="480" y2="78" stroke="#111827" stroke-width="2"/>
  <rect x="462" y="78" width="36" height="40" rx="3" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="480" y="94" text-anchor="middle" font-size="10" font-weight="700" fill="#92400e">JJ</text>
  <text x="480" y="108" text-anchor="middle" font-size="9" fill="#92400e">E<tspan font-size="7" dy="2">J</tspan></text>
  <line x1="480" y1="118" x2="480" y2="140" stroke="#111827" stroke-width="2"/>
  <!-- Connecting lines -->
  <line x1="390" y1="50" x2="480" y2="50" stroke="#111827" stroke-width="2"/>
  <line x1="390" y1="140" x2="480" y2="140" stroke="#111827" stroke-width="2"/>
  <!-- Resonator/readout line -->
  <line x1="530" y1="95" x2="600" y2="95" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="610" y="90" font-size="10" fill="#1d4ed8">readout</text>
  <text x="610" y="103" font-size="10" fill="#1d4ed8">resonator</text>
  <text x="435" y="165" text-anchor="middle" font-size="11" fill="#111827" font-weight="600">Transmon: JJ shunted by large C</text>
  <text x="435" y="180" text-anchor="middle" font-size="10" fill="#6b7280">reduces charge noise, improves coherence</text>
  <defs>
    <marker id="ap" markerWidth="5" markerHeight="5" refX="3" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6 Z" fill="#7c3aed"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — Left: a Josephson junction cross-section. Cooper pairs tunnel through the ~2 nm aluminium oxide barrier, creating a nonlinear supercurrent that distorts the energy level spacing. Right: the transmon circuit — a Josephson junction shunted by a large capacitor — which suppresses charge noise while preserving the anharmonicity needed to define a qubit.</figcaption>
</figure>

## The Transmon: Engineering Stability

The most widely deployed superconducting qubit design is the **transmon**, developed at Yale in 2007. Its key insight: shunting the Josephson junction with a large capacitor reduces the qubit's sensitivity to charge fluctuations — the dominant decoherence source in earlier designs — at the cost of slightly reducing the anharmonicity (the unevenness of energy spacing). The trade-off is overwhelmingly worthwhile. Transmon coherence times have improved from nanoseconds in early Cooper-pair-box qubits to hundreds of microseconds today — a factor of over 100,000 over two decades.

A transmon resonates at 4–8 GHz and executes single-qubit gates in 10–50 nanoseconds. Two-qubit gates run in 100–400 nanoseconds. With T1 and T2 coherence times around 200–500 microseconds on current chips, there is time for thousands of gate operations before the quantum state degrades irreversibly. IBM's Eagle, Osprey, Condor, and Heron processors are all transmon-based. So is Google's Sycamore.

## The Dilution Refrigerator: 20,000 Times Colder Than Room Temperature

Transmon qubits must be operated at 10–20 millikelvin. The reason is quantitative: at 15 mK, thermal energy kT ≈ 1.3 × 10⁻²⁵ joules. The qubit transition energy at 5 GHz is roughly 3.3 × 10⁻²⁴ joules — about 25 times larger. This means thermal fluctuations cannot spontaneously excite the qubit from |0⟩ to |1⟩ with any significant probability. At 300 K, they absolutely would.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">DILUTION REFRIGERATOR — THERMAL STAGES</text>
  <!-- Stage backgrounds (left side = temp, right side = contents) -->
  <!-- 300 K -->
  <rect x="80" y="28" width="520" height="34" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="160" y="41" text-anchor="middle" font-size="13" font-weight="800" fill="#dc2626">300 K</text>
  <text x="160" y="55" text-anchor="middle" font-size="10" fill="#dc2626">Room temperature</text>
  <text x="430" y="49" text-anchor="middle" font-size="11" fill="#111827">Electronics rack, signal generators, control computers</text>
  <!-- 4 K -->
  <rect x="80" y="68" width="520" height="34" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="160" y="81" text-anchor="middle" font-size="13" font-weight="800" fill="#d97706">4 K</text>
  <text x="160" y="95" text-anchor="middle" font-size="10" fill="#d97706">Liquid helium stage</text>
  <text x="430" y="89" text-anchor="middle" font-size="11" fill="#111827">HEMT amplifiers, radiation shields, cable anchoring</text>
  <!-- 800 mK -->
  <rect x="80" y="108" width="520" height="34" rx="3" fill="#ecfccb" stroke="#65a30d" stroke-width="1.5"/>
  <text x="160" y="121" text-anchor="middle" font-size="13" font-weight="800" fill="#65a30d">800 mK</text>
  <text x="160" y="135" text-anchor="middle" font-size="10" fill="#65a30d">Still stage</text>
  <text x="430" y="129" text-anchor="middle" font-size="11" fill="#111827">³He/⁴He mixture separation begins; attenuators</text>
  <!-- 100 mK -->
  <rect x="80" y="148" width="520" height="34" rx="3" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="160" y="161" text-anchor="middle" font-size="13" font-weight="800" fill="#1d4ed8">100 mK</text>
  <text x="160" y="175" text-anchor="middle" font-size="10" fill="#1d4ed8">Cold plate</text>
  <text x="430" y="169" text-anchor="middle" font-size="11" fill="#111827">Infrared filters, magnetic shielding, cable attenuation</text>
  <!-- 15 mK -->
  <rect x="80" y="188" width="520" height="50" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="160" y="205" text-anchor="middle" font-size="14" font-weight="800" fill="#1d4ed8">10–20 mK</text>
  <text x="160" y="222" text-anchor="middle" font-size="10" fill="#1d4ed8">Mixing chamber</text>
  <text x="160" y="233" text-anchor="middle" font-size="10" fill="#1d4ed8">base plate</text>
  <text x="430" y="208" text-anchor="middle" font-size="11" fill="#111827" font-weight="600">Quantum processor chip</text>
  <text x="430" y="224" text-anchor="middle" font-size="10" fill="#6b7280">Transmon qubits, readout resonators, coupling elements</text>
  <!-- Arrow -->
  <line x1="50" y1="35" x2="50" y2="225" stroke="#e5e7eb" stroke-width="2"/>
  <polygon points="44,220 50,235 56,220" fill="#e5e7eb"/>
  <text x="34" y="135" text-anchor="middle" font-size="10" fill="#6b7280" transform="rotate(-90 34 135)">decreasing temperature</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — The five thermal stages of a dilution refrigerator. Each stage intercepts heat before it reaches the one below. The mixing chamber at the base exploits phase separation of helium-3 and helium-4 isotopes to reach base temperatures below 20 mK — where the quantum processor lives.</figcaption>
</figure>

The machine achieving this is a **dilution refrigerator**, and its operating principle is quantum mechanical. At temperatures below 870 mK, a mixture of helium-3 and helium-4 isotopes spontaneously separates into two phases. Pumping the helium-3-rich phase away forces ³He atoms to cross the phase boundary, absorbing latent heat with extraordinary efficiency. The "mixing chamber" at the bottom of this process reaches base temperatures below 10 mK.

Surrounding the processor are concentric radiation shields at each thermal stage. Stray infrared photons from room-temperature components carry enough energy to excite the qubit; even the thermal radiation of a 4 K shield must be blocked. Every electrical signal line entering the fridge is thermally anchored at each stage through attenuators and filters. A thousand-qubit processor requires hundreds of such lines — each a potential heat leak.

## Microwave Control and the Wiring Problem

Qubit operations arrive as microwave pulses — precisely shaped envelopes at 4–8 GHz, generated by room-temperature electronics, attenuated at each thermal stage, and finally delivered to the chip. A single-qubit gate is a nanosecond-scale Gaussian-shaped pulse. A two-qubit gate — the cross-resonance gate used by IBM, or the controlled-Z gate used by Google — couples two qubits through a shared resonator or direct capacitive interaction.

Reading out a qubit's state requires a separate microwave tone, a coupled readout resonator per qubit, and a chain of amplifiers working upward from the mixing chamber. The first amplifier — a Josephson parametric amplifier — must operate at millikelvin and add almost no noise. Each qubit thus requires multiple dedicated signal lines threading the entire thermal stack.

Scaling this to a million qubits — the number most estimates require for fault-tolerant factoring of RSA-2048 — is the defining engineering challenge of superconducting quantum computing. IBM and Google are pursuing multiplexed control lines, cryogenic classical electronics, and modular multi-chip architectures. None has yet demonstrated the techniques at scale. The physics is understood. The engineering is not solved.

## The Path Forward

Superconducting quantum processors are extraordinary machines. Their qubit counts, gate fidelities, and cycle times have improved roughly exponentially for fifteen years. The engineering required to go further — cryogenic interconnects, on-chip control circuits, multi-chip entanglement — is largely a matter of systems integration rather than fundamental physics.

Whether superconducting systems reach the qubit counts needed for fault-tolerant computation before competing platforms — trapped ions, neutral atoms, photonics — depends on progress in three areas: coherence at scale, wiring density at millikelvin, and error correction overhead. The next five years will determine which constraints are surmountable and which are not.
