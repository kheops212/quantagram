---
title: "E91: The Protocol That Turns Bell's Theorem Into an Eavesdropping Detector"
description: "Where BB84 detects eavesdroppers by watching for measurement disturbances on individual photons, E91 — proposed by Artur Ekert in 1991 — detects them by testing whether quantum correlations between entangled photon pairs violate a Bell inequality. If they do, no eavesdropper could have intervened. Here is the physics, the mathematics of the CHSH test, and why E91's entanglement-based approach leads directly to device-independent quantum cryptography."
pubDate: 'Jun 24 2025'
heroImage: '../../assets/hero-e91.svg'
pillar: 'Quantum Cryptography'
author: 'KhGh'
tags: ['E91', 'quantum entanglement', 'Bell inequality', 'CHSH', 'QKD', 'quantum cryptography', 'device-independent', 'EPR pairs']
---

The security of BB84 rests on a specific physical claim: any attempt to measure a quantum state disturbs it, and that disturbance is detectable. The argument is tight, but it requires you to trust your photon source, trust your detectors, and trust that the photons travelling through your optical fibre are genuinely in the polarisation states you prepared them in.

Artur Ekert's 1991 protocol takes a different approach. Rather than using individual photons, E91 uses **entangled photon pairs**: pairs of particles whose quantum states are correlated in a way that has no classical explanation. Security is certified not by watching for measurement disturbances but by performing a **Bell inequality test** on the measurement outcomes. If the correlations between Alice's and Bob's results violate a specific mathematical inequality — the CHSH inequality — it proves that no local, classical eavesdropper could have interfered with the key exchange. The security proof is grounded in Bell's theorem rather than in the physics of individual photon measurements.

This distinction matters beyond one protocol. E91's approach leads directly to **device-independent quantum cryptography** — a regime where you do not need to trust your measurement devices at all, because the Bell violation itself certifies that the devices are producing genuine quantum correlations.

<div style="border:1px solid var(--border);border-left:3px solid var(--accent);padding:1.25rem 1.5rem;margin:2rem 0;background:var(--bg-alt);">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem 0;">Key Concepts in This Article</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem 2rem;">
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Bell State</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">One of four maximally entangled two-qubit states. In the singlet state |Ψ⁻⟩ = (|01⟩−|10⟩)/√2, measuring one particle in any basis instantly determines the other's outcome — the particles are correlated regardless of distance or the basis chosen.</p></div>
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">CHSH Inequality</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A mathematical bound on correlations achievable by any local classical theory: |S| ≤ 2. Quantum mechanics allows |S| ≤ 2√2 ≈ 2.828. Observing $|S| > 2$ certifies quantum entanglement and rules out local hidden variable eavesdroppers.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Tsirelson's Bound</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The maximum value of the CHSH correlator achievable by any quantum state: 2√2 ≈ 2.828. Maximally entangled Bell states with optimally chosen measurement angles achieve exactly this bound.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Device-Independent QKD</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A protocol where security is certified by Bell inequality violation alone, without trusting the measurement devices. Even if the devices are supplied by the adversary, a loophole-free Bell test guarantees no information leaked.</p></div>
  </div>
</div>

## Bell States: The Raw Material

E91 requires entangled photon pairs — specifically, pairs in a **Bell state**, one of four maximally entangled two-qubit states:

- $|\Phi^+\rangle = (|00\rangle + |11\rangle)/\sqrt{2}$
- $|\Phi^-\rangle = (|00\rangle - |11\rangle)/\sqrt{2}$
- $|\Psi^+\rangle = (|01\rangle + |10\rangle)/\sqrt{2}$
- $|\Psi^-\rangle = (|01\rangle - |10\rangle)/\sqrt{2}$

Ekert's original protocol uses the **singlet state** $|\Psi^-\rangle = (|01\rangle - |10\rangle)/\sqrt{2}$. This state has a remarkable property: when Alice and Bob both measure in the **same** basis, their outcomes are always **perfectly anticorrelated** — if Alice measures 0, Bob measures 1, and vice versa, regardless of which basis they choose. This anticorrelation is the source of the shared key.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 195" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">E91 SETUP — ENTANGLED PAIR SOURCE</text>
  <!-- Central source -->
  <circle cx="340" cy="105" r="30" fill="#fef3c7" stroke="#d97706" stroke-width="2.5"/>
  <text x="340" y="101" text-anchor="middle" font-size="9.5" font-weight="700" fill="#92400e">EPR</text>
  <text x="340" y="114" text-anchor="middle" font-size="9.5" font-weight="700" fill="#92400e">Source</text>
  <!-- Photon flying to Alice (left) -->
  <line x1="308" y1="105" x2="160" y2="105" stroke="#7c3aed" stroke-width="2.5" marker-end="url(#arrpurp)"/>
  <circle cx="210" cy="105" r="8" fill="#7c3aed"/>
  <text x="210" y="91" text-anchor="middle" font-size="9" fill="#7c3aed">γ₁</text>
  <!-- Photon flying to Bob (right) -->
  <line x1="372" y1="105" x2="520" y2="105" stroke="#1d4ed8" stroke-width="2.5" marker-end="url(#arrblue)"/>
  <circle cx="470" cy="105" r="8" fill="#1d4ed8"/>
  <text x="470" y="91" text-anchor="middle" font-size="9" fill="#1d4ed8">γ₂</text>
  <!-- Alice's measurement device -->
  <rect x="30"  y="70" width="110" height="70" rx="5" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2"/>
  <text x="85" y="92" text-anchor="middle" font-size="10" font-weight="700" fill="#7c3aed">ALICE</text>
  <text x="85" y="107" text-anchor="middle" font-size="8.5" fill="#7c3aed">settings: a₁, a₂, a₃</text>
  <text x="85" y="120" text-anchor="middle" font-size="8.5" fill="#7c3aed">0°, 45°, 90°</text>
  <text x="85" y="133" text-anchor="middle" font-size="8.5" fill="#7c3aed">outcome: ±1</text>
  <!-- Bob's measurement device -->
  <rect x="540" y="70" width="110" height="70" rx="5" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="595" y="92" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">BOB</text>
  <text x="595" y="107" text-anchor="middle" font-size="8.5" fill="#1d4ed8">settings: b₁, b₂, b₃</text>
  <text x="595" y="120" text-anchor="middle" font-size="8.5" fill="#1d4ed8">45°, 90°, 135°</text>
  <text x="595" y="133" text-anchor="middle" font-size="8.5" fill="#1d4ed8">outcome: ±1</text>
  <!-- State label -->
  <text x="340" y="155" text-anchor="middle" font-size="10" fill="#374151" font-weight="700">|Ψ⁻⟩ = (|01⟩ − |10⟩)/√2</text>
  <!-- Entanglement arc -->
  <path d="M 85,140 Q 340,175 595,140" fill="none" stroke="#059669" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="340" y="175" text-anchor="middle" font-size="9" fill="#059669" font-weight="700">perfect anticorrelation when same basis — regardless of distance</text>
  <!-- Correlation examples -->
  <text x="85"  y="186" text-anchor="middle" font-size="9" fill="#7c3aed">Alice measures: 0</text>
  <text x="595" y="186" text-anchor="middle" font-size="9" fill="#1d4ed8">Bob measures: 1</text>
  <text x="340" y="195" text-anchor="middle" font-size="9" fill="#6b7280">(when both use same basis)</text>
  <defs>
    <marker id="arrpurp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed"/></marker>
    <marker id="arrblue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — E91 protocol setup. A central EPR source produces entangled photon pairs in the singlet state |Ψ⁻⟩ and sends one photon to Alice and one to Bob. Alice and Bob each independently choose one of three measurement angles and record their outcomes. When both choose the same basis, their outcomes are perfectly anticorrelated — this correlation is the raw material for the key. The source can be untrusted; the Bell inequality test certifies that genuine entanglement was distributed.</figcaption>
</figure>

Entangled pairs are produced experimentally by **spontaneous parametric down-conversion (SPDC)**: a pump photon passing through a nonlinear crystal (typically BBO or KTP) is converted into two lower-energy photons with correlated polarisations. The pair emerges with their polarisations entangled, and the spatial modes are arranged so that one photon travels toward Alice and one toward Bob — who may be separated by metres, kilometres, or, in principle, arbitrary distances.

## The Protocol: Three Bases, Two Functions

Each measurement round proceeds as follows:

1. The source emits an entangled pair and sends one photon to each party.
2. Alice independently and randomly selects one of three measurement angles: **a₁ = 0°, a₂ = 45°, a₃ = 90°**.
3. Bob independently and randomly selects one of three measurement angles: **b₁ = 45°, b₂ = 90°, b₃ = 135°**.
4. Both parties measure and record their outcomes (+1 for one polarisation, −1 for the other).
5. Over a public authenticated channel, they announce their chosen bases (but not their outcomes).
6. The rounds are split into two groups:
   - **Key rounds**: when Alice chose a₂ = 45° and Bob chose b₁ = 45°, or Alice chose a₃ = 90° and Bob chose b₂ = 90° — overlapping bases that give anticorrelated outcomes. Bob inverts his bits. The remaining correlated pairs form the raw key.
   - **Test rounds**: all other angle combinations. The outcomes of these rounds are publicly revealed and used to compute the CHSH correlator S.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">MEASUREMENT ANGLES AND BASIS ASSIGNMENT</text>
  <!-- Left: angle circle showing all settings -->
  <rect x="10" y="26" width="310" height="178" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="165" y="44" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6b7280">MEASUREMENT ANGLES (POLARISATION BASIS)</text>
  <circle cx="165" cy="125" r="68" fill="none" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Alice angles: 0, 45, 90 -->
  <!-- 0°: east (right) -->
  <line x1="165" y1="125" x2="233" y2="125" stroke="#7c3aed" stroke-width="2.5"/>
  <circle cx="233" cy="125" r="5" fill="#7c3aed"/>
  <text x="242" y="129" font-size="9" fill="#7c3aed" font-weight="700">a₁ = 0°</text>
  <!-- 45°: northeast -->
  <line x1="165" y1="125" x2="213" y2="77" stroke="#7c3aed" stroke-width="2.5"/>
  <circle cx="213" cy="77" r="5" fill="#7c3aed"/>
  <text x="218" y="73" font-size="9" fill="#7c3aed" font-weight="700">a₂ = 45°</text>
  <!-- 90°: north -->
  <line x1="165" y1="125" x2="165" y2="57" stroke="#7c3aed" stroke-width="2.5"/>
  <circle cx="165" cy="57" r="5" fill="#7c3aed"/>
  <text x="115" y="53" font-size="9" fill="#7c3aed" font-weight="700">a₃ = 90°</text>
  <!-- Bob angles: 45, 90, 135 -->
  <!-- 45°: same as Alice a₂ -->
  <circle cx="213" cy="77" r="9" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <text x="218" y="60" font-size="8.5" fill="#1d4ed8">b₁ = 45°</text>
  <!-- 90°: same as Alice a₃ -->
  <circle cx="165" cy="57" r="9" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <!-- 135°: northwest -->
  <line x1="165" y1="125" x2="117" y2="77" stroke="#1d4ed8" stroke-width="2.5"/>
  <circle cx="117" cy="77" r="5" fill="#1d4ed8"/>
  <text x="48" y="73" font-size="9" fill="#1d4ed8" font-weight="700">b₃ = 135°</text>
  <text x="80" y="60" font-size="8.5" fill="#1d4ed8">b₂ = 90°</text>
  <!-- Legend -->
  <line x1="20" y1="175" x2="40" y2="175" stroke="#7c3aed" stroke-width="2.5"/>
  <text x="45" y="179" font-size="8.5" fill="#7c3aed">Alice's bases (a₁, a₂, a₃)</text>
  <circle cx="22" cy="190" r="5" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <text x="30" y="194" font-size="8.5" fill="#1d4ed8">Bob's overlapping bases</text>
  <!-- Right: basis combination table -->
  <rect x="340" y="26" width="330" height="178" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="505" y="44" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6b7280">WHAT EACH ANGLE PAIR IS USED FOR</text>
  <!-- Header row -->
  <rect x="350" y="50" width="310" height="22" fill="#f1f5f9"/>
  <text x="415" y="64" text-anchor="middle" font-size="8" font-weight="700" fill="#6b7280">ALICE \ BOB</text>
  <text x="500" y="64" text-anchor="middle" font-size="8" font-weight="700" fill="#1d4ed8">b₁ = 45°</text>
  <text x="565" y="64" text-anchor="middle" font-size="8" font-weight="700" fill="#1d4ed8">b₂ = 90°</text>
  <text x="630" y="64" text-anchor="middle" font-size="8" font-weight="700" fill="#1d4ed8">b₃ = 135°</text>
  <!-- Row a₁ -->
  <text x="415" y="88" text-anchor="middle" font-size="8.5" fill="#7c3aed" font-weight="700">a₁ = 0°</text>
  <rect x="466" y="72" width="68" height="22" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
  <text x="500" y="86" text-anchor="middle" font-size="8.5" fill="#92400e">TEST</text>
  <rect x="534" y="72" width="62" height="22" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
  <text x="565" y="86" text-anchor="middle" font-size="8.5" fill="#92400e">TEST</text>
  <rect x="596" y="72" width="58" height="22" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
  <text x="625" y="86" text-anchor="middle" font-size="8.5" fill="#92400e">TEST</text>
  <!-- Row a₂ -->
  <text x="415" y="114" text-anchor="middle" font-size="8.5" fill="#7c3aed" font-weight="700">a₂ = 45°</text>
  <rect x="466" y="98" width="68" height="22" rx="2" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="500" y="112" text-anchor="middle" font-size="8.5" fill="#16a34a" font-weight="700">KEY ✓</text>
  <rect x="534" y="98" width="62" height="22" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
  <text x="565" y="112" text-anchor="middle" font-size="8.5" fill="#92400e">TEST</text>
  <rect x="596" y="98" width="58" height="22" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
  <text x="625" y="112" text-anchor="middle" font-size="8.5" fill="#92400e">TEST</text>
  <!-- Row a₃ -->
  <text x="415" y="140" text-anchor="middle" font-size="8.5" fill="#7c3aed" font-weight="700">a₃ = 90°</text>
  <rect x="466" y="124" width="68" height="22" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
  <text x="500" y="138" text-anchor="middle" font-size="8.5" fill="#92400e">TEST</text>
  <rect x="534" y="124" width="62" height="22" rx="2" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="565" y="138" text-anchor="middle" font-size="8.5" fill="#16a34a" font-weight="700">KEY ✓</text>
  <rect x="596" y="124" width="58" height="22" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
  <text x="625" y="138" text-anchor="middle" font-size="8.5" fill="#92400e">TEST</text>
  <text x="505" y="168" text-anchor="middle" font-size="8.5" fill="#6b7280">KEY rounds: same basis → anticorrelated outcomes</text>
  <text x="505" y="180" text-anchor="middle" font-size="8.5" fill="#6b7280">TEST rounds: different angles → measure CHSH correlators</text>
  <text x="505" y="192" text-anchor="middle" font-size="8.5" fill="#059669" font-weight="700">Expected key fraction: 2/9 per round</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — Measurement angles and basis assignment. Alice and Bob each choose from three angles. When they independently select the same angle (a₂=b₁=45° or a₃=b₂=90°), their outcomes are perfectly anticorrelated — these rounds generate the raw key. All other angle combinations produce test rounds whose outcomes are publicly revealed to compute the CHSH correlator S. The key generation efficiency is approximately 2/9 of all rounds.</figcaption>
</figure>

## The CHSH Inequality: A Bell Test as a Security Proof

The central mathematical object in E91 is the **CHSH correlator**, introduced by Clauser, Horne, Shimony, and Holt in 1969:

$$
S = E(a_1, b_1) - E(a_1, b_3) + E(a_3, b_1) + E(a_3, b_3)
$$

where $E(a_i, b_j)$ is the **correlation coefficient** for measurement settings $a_i$ and $b_j$:

$$
E(a_i, b_j) = P(\text{same outcome}) - P(\text{different outcome})
$$

**Bell's theorem** states that for any local hidden variable theory — any classical model where Alice's and Bob's outcomes are determined by pre-existing values that do not depend on the other party's measurement choice — the CHSH correlator satisfies:

$$
|S| \leq 2
$$

This is the **CHSH inequality**, one of the Bell inequalities. Quantum mechanics, however, allows violations of this bound. For the singlet state $|\Psi^-\rangle$ with optimal measurement settings:

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 215" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">QUANTUM vs CLASSICAL CORRELATIONS — THE BELL TEST</text>
  <!-- Left: correlation table -->
  <rect x="10" y="26" width="300" height="183" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="160" y="44" text-anchor="middle" font-size="9" font-weight="700" fill="#6b7280">CHSH CORRELATORS FOR |Ψ⁻⟩</text>
  <!-- Table header -->
  <rect x="20" y="50" width="280" height="22" fill="#f1f5f9"/>
  <text x="100" y="64" text-anchor="middle" font-size="8.5" font-weight="700" fill="#6b7280">PAIR</text>
  <text x="200" y="64" text-anchor="middle" font-size="8.5" font-weight="700" fill="#6b7280">ANGLE DIFF</text>
  <text x="275" y="64" text-anchor="middle" font-size="8.5" font-weight="700" fill="#6b7280">E(a,b)</text>
  <!-- Row 1: a₁=0, b₁=45 -->
  <rect x="20" y="72" width="280" height="22" fill="#fff"/>
  <text x="100" y="86" text-anchor="middle" font-size="9" fill="#111827">a₁=0°, b₁=45°</text>
  <text x="200" y="86" text-anchor="middle" font-size="9" fill="#6b7280">45°</text>
  <text x="275" y="86" text-anchor="middle" font-size="9.5" fill="#1d4ed8" font-weight="700">−1/√2 ≈ −0.707</text>
  <!-- Row 2: a₁=0, b₃=135 -->
  <rect x="20" y="94" width="280" height="22" fill="#f9fafb"/>
  <text x="100" y="108" text-anchor="middle" font-size="9" fill="#111827">a₁=0°, b₃=135°</text>
  <text x="200" y="108" text-anchor="middle" font-size="9" fill="#6b7280">135°</text>
  <text x="275" y="108" text-anchor="middle" font-size="9.5" fill="#1d4ed8" font-weight="700">+1/√2 ≈ +0.707</text>
  <!-- Row 3: a₃=90, b₁=45 -->
  <rect x="20" y="116" width="280" height="22" fill="#fff"/>
  <text x="100" y="130" text-anchor="middle" font-size="9" fill="#111827">a₃=90°, b₁=45°</text>
  <text x="200" y="130" text-anchor="middle" font-size="9" fill="#6b7280">45°</text>
  <text x="275" y="130" text-anchor="middle" font-size="9.5" fill="#1d4ed8" font-weight="700">−1/√2 ≈ −0.707</text>
  <!-- Row 4: a₃=90, b₃=135 -->
  <rect x="20" y="138" width="280" height="22" fill="#f9fafb"/>
  <text x="100" y="152" text-anchor="middle" font-size="9" fill="#111827">a₃=90°, b₃=135°</text>
  <text x="200" y="152" text-anchor="middle" font-size="9" fill="#6b7280">45°</text>
  <text x="275" y="152" text-anchor="middle" font-size="9.5" fill="#1d4ed8" font-weight="700">−1/√2 ≈ −0.707</text>
  <!-- S computation -->
  <rect x="20" y="168" width="280" height="32" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="160" y="182" text-anchor="middle" font-size="9" fill="#1d4ed8" font-weight="700">S = E₁₁ − E₁₃ + E₃₁ + E₃₃</text>
  <text x="160" y="195" text-anchor="middle" font-size="9.5" fill="#1d4ed8" font-weight="700">= −1/√2 − (1/√2) + (−1/√2) + (−1/√2) = −2√2 ≈ −2.828</text>
  <!-- Right: correlation graph -->
  <rect x="330" y="26" width="340" height="183" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="500" y="44" text-anchor="middle" font-size="9" font-weight="700" fill="#6b7280">CORRELATION vs ANGLE DIFFERENCE</text>
  <!-- Axes -->
  <line x1="360" y1="155" x2="655" y2="155" stroke="#374151" stroke-width="1.5"/>
  <line x1="360" y1="40"  x2="360" y2="175" stroke="#374151" stroke-width="1.5"/>
  <!-- Y ticks -->
  <text x="356" y="158" text-anchor="end" font-size="8">−1</text>
  <text x="356" y="99"  text-anchor="end" font-size="8">0</text>
  <text x="356" y="44"  text-anchor="end" font-size="8">+1</text>
  <line x1="358" y1="99"  x2="362" y2="99"  stroke="#374151" stroke-width="1"/>
  <!-- X ticks: 0, 45, 90, 135, 180 -->
  <text x="360" y="168" text-anchor="middle" font-size="7.5" fill="#6b7280">0°</text>
  <text x="432" y="168" text-anchor="middle" font-size="7.5" fill="#6b7280">45°</text>
  <text x="508" y="168" text-anchor="middle" font-size="7.5" fill="#6b7280">90°</text>
  <text x="580" y="168" text-anchor="middle" font-size="7.5" fill="#6b7280">135°</text>
  <text x="650" y="168" text-anchor="middle" font-size="7.5" fill="#6b7280">180°</text>
  <text x="508" y="178" text-anchor="middle" font-size="7.5" fill="#6b7280">angle difference θ</text>
  <!-- Quantum: E(θ) = -cos(θ) -->
  <!-- Points: 0°→-1 (y=158), 45°→-0.707 (y=127), 90°→0 (y=99), 135°→+0.707 (y=71), 180°→+1 (y=44) -->
  <polyline points="360,158 432,127 508,99 580,71 650,44" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="658" y="40" font-size="9" fill="#1d4ed8" font-weight="700">quantum</text>
  <text x="658" y="52" font-size="8.5" fill="#1d4ed8">E = −cos(θ)</text>
  <!-- Classical bound: piecewise linear -->
  <!-- Classical: best local model is linear from -1 at 0° to +1 at 180° but constrained to |S|≤2 -->
  <!-- Classical maximum correlation = piecewise: -1 at 0°, 0 at 90°, +1 at 180°, linear -->
  <polyline points="360,158 508,99 650,44" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="658" y="70" font-size="9" fill="#dc2626">classical</text>
  <text x="658" y="82" font-size="8.5" fill="#dc2626">|S|≤2</text>
  <!-- Tsirelson bound label -->
  <line x1="432" y1="60" x2="432" y2="170" stroke="#d97706" stroke-width="1" stroke-dasharray="3,2"/>
  <circle cx="432" cy="127" r="5" fill="#1d4ed8" stroke="#fff" stroke-width="1.5"/>
  <text x="420" y="56" text-anchor="middle" font-size="7.5" fill="#d97706">45° gap =</text>
  <text x="420" y="66" text-anchor="middle" font-size="7.5" fill="#d97706">quantum</text>
  <text x="420" y="76" text-anchor="middle" font-size="7.5" fill="#d97706">advantage</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — Left: CHSH correlator computation for |Ψ⁻⟩. Each E(aᵢ, bⱼ) = −cos(angle difference) for the singlet state. With angles 0°, 45°, 90°, 135°, the sum gives |S| = 2√2 ≈ 2.828 — exceeding the classical bound of 2. Right: correlation vs angle difference. The quantum curve (blue) follows −cos(θ), while the best classical local hidden variable model (red dashed) is piecewise linear and constrained to |S| ≤ 2. The gap between them at 45° and 135° is what the CHSH test detects.</figcaption>
</figure>

With settings $a_1 = 0^\circ$, $a_3 = 90^\circ$, $b_1 = 45^\circ$, $b_3 = 135^\circ$, the correlations for $|\Psi^-\rangle$ are $E(a_i, b_j) = -\cos(a_i - b_j)$, giving:

$$
\begin{aligned}
S &= E(0^\circ, 45^\circ) - E(0^\circ, 135^\circ) + E(90^\circ, 45^\circ) + E(90^\circ, 135^\circ) \\
  &= -\cos(-45^\circ) - (-\cos(-135^\circ)) + (-\cos(45^\circ)) + (-\cos(-45^\circ)) \\
  &= -\tfrac{1}{\sqrt{2}} - \tfrac{1}{\sqrt{2}} - \tfrac{1}{\sqrt{2}} - \tfrac{1}{\sqrt{2}} = -2\sqrt{2}
\end{aligned}
$$

So $|S| = 2\sqrt{2} \approx 2.828$ — larger than 2. The CHSH inequality is violated, certifying that the correlations cannot have come from any classical local hidden variable model.

## Why an Eavesdropper Cannot Hide

The security argument in E91 is elegant and physically direct. Suppose an eavesdropper Eve intercepts both photons, measures them in some basis, and resends replacement photons to Alice and Bob.

When Eve intercepts and measures a photon, she necessarily disturbs its quantum state — she collapses the entangled pair into a product state. After Eve's intervention, Alice's and Bob's particles are no longer entangled with each other; at best, they are classically correlated by whatever information Eve's measurements gave her. The correlations between Alice's and Bob's outcomes then obey classical statistics — and therefore must satisfy $|S| \leq 2$.

Alice and Bob compute S from their test rounds. If $|S| > 2$, the Bell inequality is violated — the correlations are provably non-classical, entanglement is intact, and **no eavesdropper could have introduced the correlations they observe**. They proceed to use the key rounds.

If $|S| \leq 2$, the violation has disappeared. This could mean Eve has intercepted; or that the channel is too noisy to maintain entanglement. Either way, Alice and Bob abort.

The security proof is not just heuristic — it is rooted in Bell's theorem, one of the most thoroughly tested results in physics. Any eavesdropping strategy that preserves $|S| > 2$ while simultaneously extracting information is prohibited by quantum mechanics itself. This provides a fundamentally different security proof from BB84's single-photon disturbance argument.

## E91 vs BB84: Two Routes to the Same Destination

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="30" rx="4" fill="#111827"/>
  <text x="340" y="20" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">E91 vs BB84 — PROTOCOL COMPARISON</text>
  <rect x="0" y="30" width="680" height="26" fill="#f9fafb"/>
  <text x="160" y="47" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">PROPERTY</text>
  <text x="390" y="47" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#7c3aed">BB84</text>
  <text x="575" y="47" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#1d4ed8">E91</text>
  <line x1="0" y1="56" x2="680" y2="56" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="56" width="680" height="26" fill="#fff"/>
  <text x="160" y="73" text-anchor="middle" font-size="10" fill="#111827">Quantum resource</text>
  <text x="390" y="73" text-anchor="middle" font-size="10" fill="#7c3aed">Single photons (prepared states)</text>
  <text x="575" y="73" text-anchor="middle" font-size="10" fill="#1d4ed8">Entangled photon pairs</text>
  <line x1="0" y1="82" x2="680" y2="82" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="82" width="680" height="26" fill="#f9fafb"/>
  <text x="160" y="99" text-anchor="middle" font-size="10" fill="#111827">Security principle</text>
  <text x="390" y="99" text-anchor="middle" font-size="10" fill="#7c3aed">Measurement disturbs quantum state</text>
  <text x="575" y="99" text-anchor="middle" font-size="10" fill="#1d4ed8" font-weight="700">Bell inequality violation</text>
  <line x1="0" y1="108" x2="680" y2="108" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="108" width="680" height="26" fill="#fff"/>
  <text x="160" y="125" text-anchor="middle" font-size="10" fill="#111827">Source trust required</text>
  <text x="390" y="125" text-anchor="middle" font-size="10" fill="#7c3aed">Yes — Alice prepares states</text>
  <text x="575" y="125" text-anchor="middle" font-size="10" fill="#1d4ed8" font-weight="700">No — source can be untrusted</text>
  <line x1="0" y1="134" x2="680" y2="134" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="134" width="680" height="26" fill="#f9fafb"/>
  <text x="160" y="151" text-anchor="middle" font-size="10" fill="#111827">Device-independent possible?</text>
  <text x="390" y="151" text-anchor="middle" font-size="10" fill="#dc2626">No (without extensions)</text>
  <text x="575" y="151" text-anchor="middle" font-size="10" fill="#059669" font-weight="700">Yes — inherent to protocol</text>
  <line x1="0" y1="160" x2="680" y2="160" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="160" width="680" height="26" fill="#fff"/>
  <text x="160" y="177" text-anchor="middle" font-size="10" fill="#111827">Hardware complexity</text>
  <text x="390" y="177" text-anchor="middle" font-size="10" fill="#059669" font-weight="700">Lower — single photon sources</text>
  <text x="575" y="177" text-anchor="middle" font-size="10" fill="#dc2626">Higher — entangled pair sources</text>
  <line x1="0" y1="186" x2="680" y2="186" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="186" width="680" height="24" fill="#f9fafb"/>
  <text x="160" y="201" text-anchor="middle" font-size="10" fill="#111827">Commercial deployment</text>
  <text x="390" y="201" text-anchor="middle" font-size="10" fill="#059669" font-weight="700">Wide (Toshiba, ID Quantique, etc.)</text>
  <text x="575" y="201" text-anchor="middle" font-size="10" fill="#d97706">Limited (research / satellite)</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 4 — Protocol comparison. BB84 and E91 reach the same goal — quantum-secure key distribution — through different physical mechanisms. BB84 is simpler and more commercially deployed. E91 carries the deeper theoretical advantage: the source can be untrusted, and the protocol naturally extends to device-independent quantum key distribution (DIQKD) without modification.</figcaption>
</figure>

Both BB84 and E91 produce information-theoretically secure keys — keys whose security is guaranteed by physics, not by computational hardness. The choice between them is largely a hardware and architecture question.

**BB84** requires Alice to prepare and send single photons in specific polarisation states. The source and Alice's preparation apparatus must be trusted. If Eve tampers with Alice's preparation device, the security proof may not hold. BB84 is simpler to implement — single photon sources are more mature than entangled pair sources — and is the dominant protocol in deployed QKD systems from Toshiba, ID Quantique, QuantumCTek, and others.

**E91** requires a source of entangled pairs, which may be anywhere on the channel (including in an untrusted third party's hands). If Alice and Bob observe Bell inequality violation, the security argument holds regardless of who generated the pairs. The source's trustworthiness is irrelevant; physics certifies the security. This is a stronger guarantee than BB84.

## Device-Independent Quantum Cryptography: E91's Deeper Promise

The most significant theoretical advantage of E91 is its natural pathway to **device-independent quantum key distribution (DIQKD)**.

In any quantum cryptography protocol, some level of device trust is required. In BB84, you must trust that your photon detector is operating correctly — that a "click" in detector 0 really corresponds to a |0⟩ polarisation measurement, not a signal being manipulated by a sophisticated adversary with access to your lab. Similarly, the photon source must behave as specified.

In E91, the Bell inequality test certifies the security purely from the observed statistics — no assumption about the internal workings of the detectors is required. If Alice and Bob observe $|S| > 2$ in a **loophole-free** Bell test (one where the detection and locality loopholes are both closed), then:

1. The correlations they observe cannot have been produced by any local classical mechanism — including a compromised device.
2. An eavesdropper who controlled both Alice's and Bob's devices, and also controlled the source, still cannot have produced $|S| > 2$ while extracting information about the key, because doing so would require either signalling faster than light or breaking quantum mechanics.

The security proof requires **no assumptions about the devices beyond** that they produce outcomes (±1) when a measurement setting is chosen. This is an extraordinary guarantee — the closest thing to "security from first principles" in cryptography.

The first experimental loophole-free Bell tests were performed in 2015 (Hensen et al., Delft using NV centres in diamond; and independently by groups in NIST and Vienna). The detection efficiencies and spatial separations required to close all loopholes simultaneously make DIQKD experiments extremely challenging. Practical DIQKD over metropolitan-scale fibre links remains a research target rather than a deployed technology.

## The Entanglement Distribution Challenge

E91's practical limitation is the difficulty of distributing entanglement over long distances. Entangled photon pairs are generated by SPDC sources, but photons carrying the entanglement suffer the same losses in optical fibre as BB84 photons — the transmission probability decays exponentially with distance, roughly halving every 15 km at telecom wavelengths. At 150 km, the raw pair transmission rate drops to around 2⁻¹⁰ ≈ 0.1% of the source rate, making key generation slow.

The solution at long distances is the **quantum repeater** — a device that extends quantum entanglement over long distances by creating short-range entanglement, swapping it through intermediate nodes, and eventually linking end nodes without transmitting photons the full distance. Building a practical quantum repeater requires quantum memories with long coherence times, high-fidelity Bell state measurements, and real-time classical feed-forward. No fully functional quantum repeater network has been demonstrated at the scale needed for metropolitan QKD; this remains an active research area.

**Satellite-based QKD** sidesteps the fibre loss problem by distributing entangled pairs through free space. The Chinese Micius satellite, launched in 2016, demonstrated entanglement distribution over 1200 km and has since enabled intercontinental QKD experiments — using E91-like entanglement verification to certify the key distribution. Satellite QKD is the current frontier for long-distance entanglement-based cryptography.

## What E91 Means for the Field

E91 matters beyond the specific protocol for two reasons.

First, it demonstrated that quantum entanglement — which Einstein dismissed as "spooky action at a distance" and which many physicists viewed as philosophically troubling but practically useless — is directly useful for information-theoretic security. The correlations that troubled Einstein are precisely the correlations that make E91 secure. Bell's theorem, originally a philosophical statement about the completeness of quantum mechanics, became an operational tool for certifying the security of a cryptographic key exchange.

Second, E91 opened the conceptual framework of device-independent cryptography, which has since expanded into device-independent randomness generation, device-independent quantum computing verification, and self-testing of quantum states. The idea that physical correlations can be used to certify the behaviour of untrusted devices — without looking inside them — has become one of the most productive concepts in quantum information theory.

Post-quantum cryptography (ML-KEM, ML-DSA) and quantum key distribution (BB84, E91) address the same cryptographic threat — secure key exchange in a world with quantum computers — through entirely different means. PQC is classical software running on classical hardware, secure against quantum computers. QKD is quantum hardware producing information-theoretically secure keys, secure against any adversary regardless of computational power. E91 specifically is QKD with the additional property that the security argument extends even to adversaries who supply the cryptographic hardware.

These approaches are not in competition. A system running ML-KEM for key exchange and E91 for long-term key material distribution would be secure against both a CRQC breaking RSA and a classical adversary exploiting side-channels in the PQC implementation. The two approaches are complementary, and understanding both requires understanding the physics that makes each one possible.
