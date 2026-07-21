---
title: "The Honest State of NISQ: What Noisy Intermediate-Scale Quantum Computers Can and Cannot Do"
description: "John Preskill coined 'NISQ' in 2018 to describe the quantum processors of the near-term era — 50 to 1000 noisy qubits, too small for error correction, too large to fully simulate classically. Seven years later, the honest accounting is clearer: NISQ has produced important scientific insights and genuine hardware progress, but no quantum advantage on a practically useful problem. Here is exactly why, and what the path forward looks like."
pubDate: 'Sep 16 2025'
heroImage: '../../assets/hero-nisq.svg'
pillar: 'AI Integrations'
author: 'KhGh'
tags: ['NISQ', 'quantum advantage', 'quantum error mitigation', 'noisy quantum computing', 'circuit fidelity', 'AI integrations', 'near-term quantum computing']
sources:
  - title: 'Quantum Computing in the NISQ Era and Beyond'
    authors: 'John Preskill'
    venue: 'Quantum 2, 79; arXiv:1801.00862'
    year: 2018
    url: 'https://arxiv.org/abs/1801.00862'
  - title: 'Quantum Supremacy Using a Programmable Superconducting Processor'
    authors: 'Frank Arute, Kunal Arya, et al. (Google AI Quantum)'
    venue: 'Nature 574, 505'
    year: 2019
    url: 'https://www.nature.com/articles/s41586-019-1666-5'
  - title: 'Evidence for the Utility of Quantum Computing Before Fault Tolerance'
    authors: 'Youngseok Kim, Andrew Eddins, et al. (IBM Quantum)'
    venue: 'Nature 618, 500'
    year: 2023
    url: 'https://www.nature.com/articles/s41586-023-06096-3'
  - title: 'Quantum Error Correction Below the Surface Code Threshold'
    authors: 'Google Quantum AI'
    venue: 'Nature 638, 920; arXiv:2408.13687'
    year: 2024
    url: 'https://arxiv.org/abs/2408.13687'
---

In 2018, John Preskill gave a lecture coining a term that would define the next decade of quantum computing research: **NISQ** — Noisy Intermediate-Scale Quantum. The phrase captured something precise: the quantum processors coming online had more qubits than any classical computer could fully simulate, but far too much noise to implement the error-corrected algorithms that quantum computing theory promised. The intermediate scale was not an engineering accident; it was a physics constraint. And the noise was not a temporary imperfection; it was the defining challenge.

Seven years into the NISQ era, the honest assessment is more nuanced than either the optimists of 2018 or the sceptics predicted. NISQ devices have produced genuine scientific value — benchmark data on quantum hardware quality, demonstrations of quantum simulation for specific physical systems, and a rigorous empirical understanding of how noise propagates through circuits. They have also failed to demonstrate quantum advantage on any commercially relevant problem, and several of the most prominent "quantum supremacy" claims have been contested or superseded by improved classical algorithms.

Understanding why NISQ has the limitations it does requires understanding the physics of noise, the geometry of quantum circuits, and the mathematics of classical simulation. These are not separate problems — they are the same problem viewed from different angles.

<div style="border:1px solid var(--border);border-left:3px solid var(--accent);padding:1.25rem 1.5rem;margin:2rem 0;background:var(--bg-alt);">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem 0;">Key Concepts in This Article</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem 2rem;">
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Circuit Fidelity</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The probability that a circuit produces the correct output state. For a circuit with G two-qubit gates each failing with probability p, the total fidelity approximates (1−p)^G — decaying exponentially in gate count.</p></div>
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">SWAP Overhead</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The gate cost of routing a logical two-qubit operation between non-adjacent physical qubits on a constrained topology. One SWAP costs 3 CNOTs; routing a single long-range gate on a linear chain can require 10+ physical gates.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Classical Simulability Boundary</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The frontier beyond which classical computers cannot efficiently simulate a quantum circuit. Defined by circuit size and entanglement structure — not just qubit count. The "NISQ advantage zone" is the narrow band where circuits exceed this threshold yet remain executable on noisy hardware.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Error Mitigation</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">Classical post-processing techniques — zero-noise extrapolation, probabilistic error cancellation, symmetry verification — that partially compensate for noise without correcting it. Unlike error correction, mitigation cannot suppress errors below the physical rate; it trades additional circuit shots for reduced bias.</p></div>
  </div>
</div>

## The Gate Error Budget: Fidelity Decays Exponentially

The most fundamental limitation of NISQ computing is gate error. Every two-qubit gate — a CNOT, a CZ, an XX rotation — introduces a small but non-zero probability of error. On the best superconducting hardware today (IBM, Google), two-qubit gate error rates are approximately 0.1–0.3% per gate. On typical production hardware they are 0.3–0.8%. Trapped-ion systems achieve 0.1–0.5% with slower gates.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">CIRCUIT FIDELITY vs TWO-QUBIT GATE COUNT — F ≈ (1−p)^G</text>
  <!-- Axes -->
  <line x1="70" y1="25" x2="70"  y2="185" stroke="#374151" stroke-width="2"/>
  <line x1="70" y1="185" x2="648" y2="185" stroke="#374151" stroke-width="2"/>
  <text x="360" y="205" text-anchor="middle" font-size="9.5" fill="#6b7280">number of two-qubit gates G</text>
  <text x="20"  y="105" text-anchor="middle" font-size="9.5" fill="#6b7280" transform="rotate(-90 20 105)">circuit fidelity F</text>
  <!-- Y ticks -->
  <text x="64" y="188" text-anchor="end" font-size="8.5" fill="#6b7280">0</text>
  <text x="64" y="156" text-anchor="end" font-size="8.5" fill="#6b7280">0.2</text>
  <text x="64" y="124" text-anchor="end" font-size="8.5" fill="#6b7280">0.4</text>
  <text x="64" y="92"  text-anchor="end" font-size="8.5" fill="#6b7280">0.6</text>
  <text x="64" y="60"  text-anchor="end" font-size="8.5" fill="#6b7280">0.8</text>
  <text x="64" y="28"  text-anchor="end" font-size="8.5" fill="#6b7280">1.0</text>
  <line x1="68" y1="124" x2="72" y2="124" stroke="#374151" stroke-width="1"/>
  <line x1="68" y1="92"  x2="72" y2="92"  stroke="#374151" stroke-width="1"/>
  <line x1="68" y1="60"  x2="72" y2="60"  stroke="#374151" stroke-width="1"/>
  <!-- Grid -->
  <line x1="70" y1="124" x2="648" y2="124" stroke="#f3f4f6" stroke-width="1"/>
  <line x1="70" y1="92"  x2="648" y2="92"  stroke="#f3f4f6" stroke-width="1"/>
  <line x1="70" y1="60"  x2="648" y2="60"  stroke="#f3f4f6" stroke-width="1"/>
  <!-- X ticks -->
  <text x="70"  y="196" text-anchor="middle" font-size="8.5" fill="#6b7280">0</text>
  <text x="214" y="196" text-anchor="middle" font-size="8.5" fill="#6b7280">100</text>
  <text x="359" y="196" text-anchor="middle" font-size="8.5" fill="#6b7280">200</text>
  <text x="503" y="196" text-anchor="middle" font-size="8.5" fill="#6b7280">300</text>
  <text x="648" y="196" text-anchor="middle" font-size="8.5" fill="#6b7280">400</text>
  <!-- Useful threshold line at F=0.5 → y=185-0.5*160=105 -->
  <line x1="70" y1="105" x2="648" y2="105" stroke="#d97706" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="652" y="109" font-size="8" fill="#d97706">F=0.5</text>
  <!-- p=0.001 (dark blue) — best hardware today -->
  <!-- y = 185 - F*160, x = 70 + G*1.445 -->
  <!-- G=0:F=1→y=25, G=100:F=0.905→y=40, G=200:F=0.819→y=54, G=400:F=0.670→y=78 -->
  <polyline points="70,25 214,40 359,54 648,78" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="655" y="76" font-size="8.5" fill="#1d4ed8" font-weight="700">p=0.1%</text>
  <text x="655" y="87" font-size="8" fill="#1d4ed8">best hardware</text>
  <!-- p=0.003 (medium blue) -->
  <!-- G=0:1→25, G=50:0.861→47, G=100:0.741→67, G=200:0.549→97, G=300:0.407→120, G=400:0.302→137 -->
  <polyline points="70,25 142,47 214,67 359,97 503,120 648,137" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <text x="655" y="135" font-size="8.5" fill="#3b82f6" font-weight="700">p=0.3%</text>
  <text x="655" y="146" font-size="8" fill="#3b82f6">current best</text>
  <!-- p=0.005 (orange) -->
  <!-- G=0:1→25, G=50:0.779→60, G=100:0.607→88, G=200:0.368→126, G=300:0.223→149, G=400:0.135→163 -->
  <polyline points="70,25 142,60 214,88 359,126 503,149 648,163" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
  <text x="655" y="161" font-size="8.5" fill="#f59e0b" font-weight="700">p=0.5%</text>
  <text x="655" y="172" font-size="8" fill="#f59e0b">typical NISQ</text>
  <!-- p=0.01 (red) -->
  <!-- G=0:1→25, G=50:0.605→88, G=100:0.366→126, G=150:0.221→149, G=200:0.134→163 -->
  <polyline points="70,25 142,88 214,126 287,149 359,163 432,175 503,181" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <text x="510" y="179" font-size="8.5" fill="#dc2626" font-weight="700">p=1.0%</text>
  <!-- Useful algorithms region annotation -->
  <rect x="75" y="28" width="138" height="30" rx="3" fill="#dcfce7" opacity="0.7"/>
  <text x="144" y="42" text-anchor="middle" font-size="7.5" fill="#166534" font-weight="700">shallow circuits: useful</text>
  <text x="144" y="53" text-anchor="middle" font-size="7.5" fill="#166534">(F close to 1)</text>
  <!-- Deep circuit annotation -->
  <rect x="400" y="155" width="140" height="26" rx="3" fill="#fee2e2" opacity="0.7"/>
  <text x="470" y="167" text-anchor="middle" font-size="7.5" fill="#9b1c1c" font-weight="700">deep circuits: unusable</text>
  <text x="470" y="177" text-anchor="middle" font-size="7.5" fill="#9b1c1c">(F ≈ noise floor)</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — Circuit fidelity decay as F ≈ (1−p)^G, where p is the two-qubit gate error rate and G is the gate count. At p=0.5% (typical current NISQ hardware), a circuit with 200 two-qubit gates has fidelity only ~37% — the majority of output probability mass is on incorrect states. Even at the best demonstrated rates (p≈0.1%), useful fidelity (F > 0.5) is lost by ~350 gates. Shor's algorithm for RSA-2048 requires ~10¹¹ gates; Grover's search for 128-bit keys requires ~10¹⁹.</figcaption>
</figure>

These error rates look small. They are not. Circuit fidelity — the probability that a circuit produces the correct output — decays as approximately (1−p)^G, where p is the two-qubit gate error and G is the total gate count. At p = 0.5% and G = 200 gates, the fidelity is (0.995)²⁰⁰ ≈ 0.37. More than half the probability mass is on incorrect states. At G = 500 gates, it is 0.08. The circuit is producing mostly noise.

This is not fixable by running the same circuit repeatedly — more shots give more statistical precision for a fixed expected output, but if the expected output is noise, more shots give more precise noise. The noise is **systematic**: it shifts the expected measurement outcomes, not just adds statistical variance.

The immediately useful depth limit — where fidelity remains high enough to extract a meaningful signal — is roughly 50–200 two-qubit gates for current hardware, depending on the error rate and the algorithm's noise sensitivity. Shor's algorithm for RSA-2048 needs ~10¹¹ two-qubit gates. Grover's for a 128-bit key search needs ~10¹⁹. These are not in the same universe as NISQ capabilities.

## Connectivity Constraints: The SWAP Overhead Tax

NISQ processors impose a second severe limitation: physical qubit connectivity. Most superconducting architectures (IBM's heavy-hex, Google's Sycamore grid) connect each qubit to only 2–3 neighbours. Long-range two-qubit gates between non-adjacent qubits are not natively available.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">SWAP OVERHEAD — ROUTING A LONG-RANGE GATE ON A LINEAR CHAIN</text>
  <!-- TOP: desired operation -->
  <text x="100" y="38" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6b7280">DESIRED (logical)</text>
  <!-- Qubits in a chain -->
  <circle cx="60"  cy="70" r="18" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="160" cy="70" r="18" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <circle cx="260" cy="70" r="18" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <circle cx="360" cy="70" r="18" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <circle cx="460" cy="70" r="18" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="78"  y1="70" x2="142" y2="70" stroke="#e5e7eb" stroke-width="1.5"/>
  <line x1="178" y1="70" x2="242" y2="70" stroke="#e5e7eb" stroke-width="1.5"/>
  <line x1="278" y1="70" x2="342" y2="70" stroke="#e5e7eb" stroke-width="1.5"/>
  <line x1="378" y1="70" x2="442" y2="70" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="60"  y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">q₀</text>
  <text x="160" y="74" text-anchor="middle" font-size="10" fill="#6b7280">q₁</text>
  <text x="260" y="74" text-anchor="middle" font-size="10" fill="#6b7280">q₂</text>
  <text x="360" y="74" text-anchor="middle" font-size="10" fill="#6b7280">q₃</text>
  <text x="460" y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">q₄</text>
  <!-- CNOT arc between q0 and q4 -->
  <path d="M 60,52 Q 260,20 460,52" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-dasharray="6,3"/>
  <text x="260" y="18" text-anchor="middle" font-size="9.5" fill="#1d4ed8" font-weight="700">CNOT(q₀, q₄) — 1 logical gate</text>
  <!-- DOWN ARROW -->
  <line x1="340" y1="90" x2="340" y2="105" stroke="#374151" stroke-width="2" marker-end="url(#arrdk2)"/>
  <text x="400" y="100" font-size="9" fill="#374151">actual hardware circuit</text>
  <!-- BOTTOM: actual SWAP chain -->
  <text x="100" y="124" text-anchor="middle" font-size="9.5" font-weight="700" fill="#dc2626">ACTUAL (physical) — 13 physical gates</text>
  <!-- SWAP sequence below -->
  <rect x="30"  y="130" width="70" height="28" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="65"  y="148" text-anchor="middle" font-size="9" fill="#dc2626">SWAP(q₀,q₁)</text>
  <rect x="112" y="130" width="70" height="28" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="147" y="148" text-anchor="middle" font-size="9" fill="#dc2626">SWAP(q₁,q₂)</text>
  <rect x="194" y="130" width="70" height="28" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="229" y="148" text-anchor="middle" font-size="9" fill="#dc2626">SWAP(q₂,q₃)</text>
  <rect x="276" y="130" width="60" height="28" rx="3" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="306" y="148" text-anchor="middle" font-size="9" fill="#1d4ed8">CNOT</text>
  <rect x="348" y="130" width="70" height="28" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="383" y="148" text-anchor="middle" font-size="9" fill="#dc2626">SWAP(q₂,q₃)</text>
  <rect x="430" y="130" width="70" height="28" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="465" y="148" text-anchor="middle" font-size="9" fill="#dc2626">SWAP(q₁,q₂)</text>
  <rect x="512" y="130" width="70" height="28" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="547" y="148" text-anchor="middle" font-size="9" fill="#dc2626">SWAP(q₀,q₁)</text>
  <!-- Count label -->
  <text x="340" y="174" text-anchor="middle" font-size="9.5" fill="#dc2626" font-weight="700">6 SWAPs × 3 CNOTs + 1 CNOT = 19 physical two-qubit gates for 1 logical gate</text>
  <defs>
    <marker id="arrdk2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#374151"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — SWAP overhead on a linear connectivity chain. A single logical CNOT between qubits q₀ and q₄ (4 hops apart) requires 6 SWAP operations to route the qubits into adjacency and restore their positions afterwards — each SWAP decomposing into 3 CNOTs. What appears as 1 logical gate becomes 19 physical two-qubit gates. For algorithms requiring many long-range gates (Shor's, Grover's, quantum Fourier transform), SWAP overhead alone destroys circuit fidelity on constrained NISQ topologies.</figcaption>
</figure>

The routing problem is severe for algorithms that require all-to-all connectivity — exactly the algorithms most likely to demonstrate quantum advantage. The quantum Fourier transform, the heart of Shor's algorithm, requires gates between every pair of qubits. On a linear chain of n qubits, the SWAP overhead multiplies the gate count by O(n). For n=100 and a circuit already at the noise threshold, this O(100) overhead is fatal.

NISQ-friendly algorithms — VQE, QAOA, quantum kernels — are specifically designed around the hardware's native connectivity. Their circuits use only nearest-neighbour gates, trading algorithm optimality for hardware compatibility. This constraint is itself a limitation: the NISQ-optimised versions of algorithms may not be the most powerful versions.

Trapped-ion systems avoid this problem through all-to-all connectivity (via the shared motional mode) — but pay for it with slower gates (microseconds vs nanoseconds for superconducting) and a hard cap on simultaneous operations due to the shared phonon bus. Neutral atom arrays offer programmable connectivity via atom rearrangement, which is why they have emerged as a preferred platform for error correction demonstrations.

## The Classical Simulability Boundary

The promise of NISQ computing rests on a specific claim: that there exist quantum circuits which are both too complex for classical computers to simulate and shallow enough to run reliably on noisy hardware. This "quantum advantage zone" must be wide enough to contain circuits that solve useful problems.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 215" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">THE NISQ LANDSCAPE — CIRCUIT COMPLEXITY vs HARDWARE FEASIBILITY</text>
  <!-- Axes -->
  <line x1="70" y1="30" x2="70"  y2="190" stroke="#374151" stroke-width="2"/>
  <line x1="70" y1="190" x2="640" y2="190" stroke="#374151" stroke-width="2"/>
  <text x="355" y="208" text-anchor="middle" font-size="9.5" fill="#6b7280">number of qubits →</text>
  <text x="22"  y="110" text-anchor="middle" font-size="9.5" fill="#6b7280" transform="rotate(-90 22 110)">circuit depth →</text>
  <!-- Region 1: Classically simulable (lower left triangle) -->
  <polygon points="70,190 400,190 70,100" fill="#dcfce7" opacity="0.6"/>
  <text x="160" y="155" text-anchor="middle" font-size="9.5" fill="#166534" font-weight="700">Classically</text>
  <text x="160" y="168" text-anchor="middle" font-size="9.5" fill="#166534" font-weight="700">simulable</text>
  <text x="160" y="181" text-anchor="middle" font-size="8.5" fill="#166534">(tensor networks, MPS)</text>
  <!-- Region 2: NISQ noise wall (upper band) -->
  <polygon points="70,30 640,30 640,95 70,95" fill="#fee2e2" opacity="0.5"/>
  <text x="355" y="60" text-anchor="middle" font-size="9.5" fill="#9b1c1c" font-weight="700">NISQ noise wall — circuit too deep for reliable execution</text>
  <text x="355" y="75" text-anchor="middle" font-size="8.5" fill="#9b1c1c">fidelity ≈ 0 at current gate error rates</text>
  <!-- Region 3: Fault-tolerant target (far right) -->
  <polygon points="580,30 640,30 640,190 580,190" fill="#eff6ff" opacity="0.6"/>
  <text x="610" y="110" text-anchor="middle" font-size="8" fill="#1d4ed8" font-weight="700" transform="rotate(-90 610 110)">fault-tolerant regime</text>
  <!-- Diagonal: classical simulability boundary (tensor networks) -->
  <line x1="70" y1="100" x2="400" y2="190" stroke="#059669" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="270" y="148" font-size="8.5" fill="#059669" transform="rotate(-18 270 148)">classical simulability boundary</text>
  <!-- NISQ advantage zone (middle wedge) -->
  <polygon points="200,95 400,95 400,190 200,155" fill="#fef3c7" opacity="0.7"/>
  <text x="310" y="128" text-anchor="middle" font-size="9.5" fill="#92400e" font-weight="700">NISQ advantage zone</text>
  <text x="310" y="142" text-anchor="middle" font-size="8.5" fill="#92400e">(if it exists for useful</text>
  <text x="310" y="154" text-anchor="middle" font-size="8.5" fill="#92400e">problems)</text>
  <!-- Noise wall boundary (diagonal line) -->
  <line x1="70" y1="95" x2="580" y2="95" stroke="#dc2626" stroke-width="2" stroke-dasharray="6,3"/>
  <!-- Key points marked -->
  <!-- Google Sycamore 2019 (53 qubits, ~20 cycles) -->
  <circle cx="195" cy="160" r="7" fill="#7c3aed" stroke="#fff" stroke-width="1.5"/>
  <text x="195" y="148" text-anchor="middle" font-size="7.5" fill="#7c3aed" font-weight="700">Sycamore</text>
  <text x="195" y="140" text-anchor="middle" font-size="7.5" fill="#7c3aed">2019</text>
  <!-- IBM Eagle 127q VQE (shallow) -->
  <circle cx="310" cy="178" r="7" fill="#1d4ed8" stroke="#fff" stroke-width="1.5"/>
  <text x="310" y="168" text-anchor="middle" font-size="7.5" fill="#1d4ed8">NISQ VQE/QAOA</text>
  <!-- Fault-tolerant Shor's (thousands of logical qubits, millions of gates) -->
  <circle cx="612" cy="35" r="7" fill="#dc2626" stroke="#fff" stroke-width="1.5"/>
  <text x="612" y="28" text-anchor="middle" font-size="7.5" fill="#dc2626">Shor's (RSA)</text>
  <!-- X axis labels -->
  <text x="130" y="200" text-anchor="middle" font-size="8" fill="#6b7280">50</text>
  <text x="240" y="200" text-anchor="middle" font-size="8" fill="#6b7280">100</text>
  <text x="355" y="200" text-anchor="middle" font-size="8" fill="#6b7280">500</text>
  <text x="470" y="200" text-anchor="middle" font-size="8" fill="#6b7280">1000</text>
  <text x="585" y="200" text-anchor="middle" font-size="8" fill="#6b7280">10,000+</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — The NISQ landscape. The green region (lower left) is efficiently simulable classically using tensor network methods — no quantum advantage here. The red region (top) is beyond NISQ hardware's reliable depth at current error rates. The yellow wedge is the potential "NISQ advantage zone" — circuits beyond the classical simulability boundary yet within hardware reach. The critical question: does this zone contain any circuits that solve practically useful problems? Current evidence suggests it does for random circuit sampling (Google Sycamore, purple) but not for optimisation or machine learning tasks (blue, lower depth).</figcaption>
</figure>

The classical simulability boundary is not a fixed line — it depends on the circuit structure, not just qubit count and depth. Several classical methods can efficiently simulate circuits that naive state vector simulation cannot:

**Tensor network contraction**: circuits with low entanglement (measurable as the Schmidt rank or bond dimension of the output state) can be contracted efficiently as matrix product states (MPS) or more general tensor networks. Shallow circuits with limited two-qubit gate layers often fall into this category.

**Clifford simulation (Gottesman-Knill theorem)**: circuits consisting only of Clifford gates (H, CNOT, S, and their combinations) can be simulated in polynomial time on classical computers, regardless of qubit count. This eliminates a large class of circuits from the quantum advantage candidate pool.

**Approximate classical simulation**: for random circuits at moderate depth, classical tensor network algorithms can approximate the output distribution to an additive error that may be sufficient to match a quantum computer's performance (given its own noise). This is precisely what happened to Google's 2019 quantum supremacy claim: Pan and Zhang (2022) demonstrated that a classical algorithm running on a modern GPU cluster could simulate Sycamore-scale random circuits within the time originally claimed as quantum-exclusive, by exploiting the structure of the random circuit.

The NISQ advantage zone is narrower than it appeared in 2018. It may exist for specific physical simulation tasks — quantum chemistry near a phase transition, strongly correlated materials — where the physical structure of the problem matches the natural dynamics of a quantum processor. For general optimization and machine learning, the zone appears to close before reaching problems of practical interest.

## Error Mitigation: The NISQ Workaround and Its Limits

Unable to correct errors without fault-tolerant circuits, the NISQ field developed a different approach: **error mitigation** — classical post-processing techniques that partially compensate for noise without the qubit overhead of error correction.

**Zero-noise extrapolation (ZNE)**: run the same circuit at multiple noise levels (by intentionally amplifying noise through gate repetition or pulse stretching), then extrapolate the observed expectation value to the zero-noise limit. If the noise model is known and the noise level can be controlled, this extrapolation can recover the noiseless expectation value with reduced bias — at the cost of additional circuit executions.

**Probabilistic error cancellation (PEC)**: represent the ideal noiseless operation as a linear combination of noisy operations, and sample from this decomposition. Averaging over many such samples gives an unbiased estimate of the ideal expectation value. The overhead is exponential in the noise rate: to achieve precision ε on an n-gate circuit with error rate p per gate, PEC requires O(e^(cn·p)/ε²) circuit samples — exponential in the number of gates.

**Symmetry verification**: many quantum systems have exact symmetries (particle number conservation, parity, etc.) that noisy circuits violate. Post-selecting on outcomes that respect the symmetry removes noise-corrupted shots at the cost of reduced effective sample size.

**Dynamical decoupling**: applying periodic π-pulses to idle qubits refocuses dephasing noise that accumulates during circuit idle times. This reduces T2-limited errors without modifying the logical gate sequence.

The honest assessment of error mitigation: it can reduce systematic bias at the cost of increased statistical uncertainty and exponentially more circuit executions. For circuits with O(100) gates at current noise levels, PEC overhead is already a factor of 10–100× in shot count. For circuits with O(1000) gates, the overhead is astronomical. Error mitigation does not close the gap between NISQ and fault-tolerant computing — it extends the useful range of shallow circuits by perhaps a factor of 2–5× in depth, not the orders of magnitude needed for practically useful algorithms.

## The Quantum Advantage Record: An Honest Accounting

The history of NISQ quantum advantage claims is instructive.

**Google Sycamore (2019)**: claimed quantum supremacy for random circuit sampling — generating samples from the output distribution of a 53-qubit, 20-cycle random circuit in 200 seconds, versus an estimated 10,000 years for classical simulation. Within three years, classical algorithms had reduced that estimate to weeks, then days. By 2022, approximate classical simulation methods could match Sycamore's task within hours on a large GPU cluster. The claim was correct at the time of publication; the goalposts moved faster than expected.

**Xanadu Borealis (2022)**: claimed quantum advantage for Gaussian boson sampling using 216 photonic modes. Classical simulation of exact GBS is believed to be hard, and the experiment was technically impressive. Critics noted that approximate classical simulation of noisy GBS — which is what the physical device actually performs — may be significantly easier, and that no classical-hard useful computation is performed.

**IBM Utility-Scale (2023)**: demonstrated that a 127-qubit Eagle processor running a specific quantum simulation (kicked Ising model) with error mitigation produced results that disagreed with approximate classical simulation. This is a legitimate result, but the "classical simulation" used was itself approximate — exact classical simulation of 127 qubits is still intractable for that circuit depth, making the comparison complex.

None of these results demonstrates quantum advantage on a commercially or scientifically useful problem where classical methods are well-established and thoroughly optimised. Random circuit sampling and boson sampling are not themselves useful computations; they are benchmark tasks chosen specifically because classical simulation is hard. This is a valid scientific proof-of-principle but not the same as a practical speedup.

## What NISQ Might Actually Be Useful For

The honest near-term use cases for NISQ computing are narrower than early optimism suggested but more substantive than complete scepticism implies.

**Quantum simulation of quantum systems**: simulating the time evolution of quantum Hamiltonians on a quantum processor is the most natural use of NISQ hardware. A superconducting processor naturally implements certain Ising-like interactions; a trapped-ion processor naturally implements long-range spin models. Simulating a quantum magnet on a quantum magnet requires only that the hardware dynamics approximate the target dynamics — not full algorithmic universality. This is where NISQ devices can plausibly exceed classical methods for specific physical systems, particularly at the boundary between tractable and intractable classical simulation.

**Quantum chemistry at moderate system size**: for molecules with 10–30 active electrons in 20–60 spin-orbitals, VQE with hardware-efficient ansätze and error mitigation may provide useful ground state energy estimates that compete with or complement classical methods like CCSD(T) for specific molecular geometries. This is a narrow window, but it is scientifically meaningful — nitrogen fixation catalysis, transition metal chemistry, and photosynthesis involve exactly these system sizes.

**Quantum error correction demonstrations**: NISQ hardware is the experimental platform for learning how to do error correction. Google's below-threshold surface code demonstration (2023), QuEra's 48-logical-qubit demonstration (2023), and IBM's LDPC code experiments are all scientifically valuable independent of immediate utility — they establish the empirical error rates, decoders, and engineering challenges that will define fault-tolerant systems.

**Quantum hardware benchmarking**: NISQ processors have become precision instruments for measuring their own noise characteristics. Randomised benchmarking, cycle benchmarking, and tomography experiments reveal the noise models needed to design better error correction codes and mitigation strategies. This is a genuine scientific contribution even if no useful computation is performed.

## The Barren Plateau Ceiling

The variational algorithms designed for NISQ — VQE, QAOA, quantum kernel SVMs — face a fundamental scaling problem discussed in depth in this series' [barren plateau post](/blog/barren-plateaus): as circuit depth and qubit count grow, the gradient of the objective function vanishes exponentially. The classical optimizer cannot navigate a landscape where every direction looks flat.

This creates a ceiling on the practical scale of variational algorithms independent of hardware noise. Even on a noise-free quantum computer, training a hardware-efficient VQE ansatz for a 100-qubit system faces gradient magnitudes of order 2⁻⁵⁰ — effectively zero. The algorithms that are NISQ-compatible in terms of circuit depth are not NISQ-scalable in terms of trainability. These are two separate constraints, and both bite simultaneously.

Mitigation strategies — local cost functions, ADAPT-VQE's greedy ansatz construction, layerwise training — partially address this but do not eliminate it. A circuit that is shallow enough to run reliably and trainable enough to optimise is a circuit that is almost certainly shallow enough to simulate classically. The Venn diagram of "NISQ-executable," "trainable," and "classically hard" has a very small intersection.

## The Path Out: Early Fault-Tolerant Computing

The emerging consensus in the field points toward a path that skips the NISQ optimism of 2018 and aims for **early fault-tolerant (EFT) computing** — systems with a small number of fully error-corrected logical qubits running deeper logical circuits than any NISQ device, even if the total qubit count and logical gate throughput are modest.

The key enablers of EFT are visible in current hardware:

- Superconducting gate fidelities at 99.5–99.8% are approaching the sub-threshold regime for surface code operation (threshold ~99.0–99.5% for realistic noise).
- LDPC codes (IBM's gross code, bivariate bicycle codes) promise 10× better encoding efficiency than surface codes — fewer physical qubits per logical qubit.
- Neutral atom arrays with reconfigurable geometry can implement transversal logical gates directly, reducing T-factory overhead.
- Trapped-ion systems at 99.9% two-qubit fidelity are already below the fault-tolerant threshold by a significant margin.

The first EFT demonstrations — logical circuits outperforming physical circuits on the same hardware, for the same problem, without error mitigation — are likely within the next two to three years. When they arrive, they will not replace NISQ hardware; they will coexist with it, serving different problem classes, just as FPGAs and GPUs coexist with general-purpose CPUs.

NISQ is not a failure. It is the necessary experimental phase in which quantum hardware matured, error mitigation was invented and bounded, fault-tolerance thresholds were approached from below, and the community developed an honest understanding of where quantum algorithms can and cannot help. The algorithms that will run on fault-tolerant machines — Shor's for cryptography, QPE for quantum chemistry, quantum walks for search — are not NISQ algorithms. They require coherence that NISQ cannot provide.

What NISQ demonstrated, definitively, is that quantum processors can be built, calibrated, and operated at scales where classical simulation is genuinely hard. Whether they can be made useful at that scale without error correction — the original NISQ promise — remains unproven. Whether fault-tolerant systems will inherit NISQ's hardware progress and amplify it into practical advantage — that is the bet the field has collectively made, and the evidence is increasingly that it is a good one.
