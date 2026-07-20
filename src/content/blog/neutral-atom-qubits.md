---
title: "Atoms in a Grid: How Neutral Atom Quantum Computers Are Quietly Redefining Scale"
description: "Neutral atom quantum computers trap individual atoms with laser light, arrange them in arbitrary 2D patterns, and entangle them through a quantum mechanical phenomenon called the Rydberg blockade. QuEra recently demonstrated 48 logical qubits — the most ever achieved on any hardware platform. Here is exactly how the platform works."
pubDate: 'Jul 23 2024'
heroImage: '../../assets/hero-neutral-atom.svg'
pillar: 'Quantum Hardware'
author: 'KhGh'
tags: ['neutral atoms', 'optical tweezers', 'Rydberg blockade', 'QuEra', 'quantum hardware', 'Rydberg atoms', 'atom computing']
---

In a laboratory at Harvard, researchers load rubidium atoms from a hot vapour, cool them to a microkelvin, and arrange them into a precise two-dimensional grid using nothing but focused laser light. There is no dilution refrigerator. The apparatus runs at room temperature. Each atom is individually addressable, its quantum state controllable with single-photon precision, and the array can be reconfigured between computational shots into any geometry the algorithm demands. In 2023, the same group demonstrated 48 error-corrected logical qubits — the most ever achieved on any quantum hardware platform — by exploiting this reconfigurability to implement quantum error correction in a way no other platform could match.

Neutral atom quantum computers are the youngest of the three major hardware platforms and the one currently generating the most excitement among quantum error correction theorists. Understanding why requires going inside the trap.

<div style="border:1px solid var(--border);border-left:3px solid var(--accent);padding:1.25rem 1.5rem;margin:2rem 0;background:var(--bg-alt);">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem 0;">Key Concepts in This Article</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem 2rem;">
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Optical Tweezer</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A tightly focused laser beam that traps a neutral atom at its intensity maximum through the dipole force — no charge required.</p></div>
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Rydberg State</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A highly excited atomic state with principal quantum number n ≈ 50–100. Rydberg atoms are enormous — their electron clouds extend micrometres — and interact strongly at long range.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Rydberg Blockade</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">When one atom is excited to a Rydberg state, the strong dipole-dipole interaction shifts its neighbour's Rydberg level out of resonance — preventing simultaneous excitation. This is the basis for the two-qubit gate.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Clock State</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A pair of hyperfine ground states with identical first-order magnetic field sensitivity — the qubit is encoded here for long coherence times of seconds or more.</p></div>
  </div>
</div>

## Optical Tweezers: Trapping Atoms With Light

A neutral atom carries no net charge, so the electric and magnetic fields used to trap ions are useless here. What neutral atoms do have is a small electric dipole moment that can be induced by an external electromagnetic field. A focused laser beam creates an intense, spatially varying electric field. If the laser frequency is tuned slightly below an atomic resonance — *red-detuned* — the induced dipole is attracted toward the field maximum. At the focal point of a high-numerical-aperture lens, that maximum is a region roughly a wavelength across: about 800 nanometres for common rubidium experiments. A single atom is trapped there, suspended in three dimensions by a gradient force, with no physical walls and no cryogenic infrastructure.

This is an **optical tweezer** — a concept originating in the biophysics of Arthur Ashkin, who shared the 2018 Nobel Prize in Physics for it. In a quantum computing context, the key advance of the 2010s was that the same technique could be parallelised: project a thousand tweezers simultaneously using a spatial light modulator or acousto-optic deflector, each forming an individual trap site, and load one atom into each. The result is a programmable atom array.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">OPTICAL TWEEZER ARRAY — OVERVIEW</text>
  <!-- SLM box -->
  <rect x="20" y="35" width="100" height="50" rx="4" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="70" y="58" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">Laser</text>
  <text x="70" y="72" text-anchor="middle" font-size="9" fill="#1d4ed8">+ SLM</text>
  <!-- Arrow from SLM to lens -->
  <line x1="120" y1="60" x2="180" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#arrowblue)"/>
  <!-- Lens -->
  <ellipse cx="200" cy="60" rx="18" ry="30" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="200" y="108" text-anchor="middle" font-size="9" fill="#1d4ed8">objective</text>
  <text x="200" y="120" text-anchor="middle" font-size="9" fill="#1d4ed8">lens (NA 0.5)</text>
  <!-- Converging beams to atom plane -->
  <line x1="218" y1="42" x2="310" y2="90"  stroke="#7c3aed" stroke-width="1.2" stroke-dasharray="4,2"/>
  <line x1="218" y1="52" x2="310" y2="110" stroke="#7c3aed" stroke-width="1.2" stroke-dasharray="4,2"/>
  <line x1="218" y1="60" x2="310" y2="130" stroke="#7c3aed" stroke-width="1.5"/>
  <line x1="218" y1="68" x2="310" y2="150" stroke="#7c3aed" stroke-width="1.2" stroke-dasharray="4,2"/>
  <line x1="218" y1="78" x2="310" y2="170" stroke="#7c3aed" stroke-width="1.2" stroke-dasharray="4,2"/>
  <text x="260" y="200" text-anchor="middle" font-size="9" fill="#7c3aed">tweezer beams</text>
  <!-- Atom array plane -->
  <rect x="310" y="70" width="340" height="150" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="480" y="88" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#6b7280">ATOM ARRAY (TOP VIEW)</text>
  <!-- Atom grid 5x4 -->
  <!-- Row 1 -->
  <circle cx="355" cy="108" r="9" fill="#1d4ed8"/>
  <circle cx="395" cy="108" r="9" fill="#1d4ed8"/>
  <circle cx="435" cy="108" r="9" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
  <circle cx="475" cy="108" r="9" fill="#1d4ed8"/>
  <circle cx="515" cy="108" r="9" fill="#1d4ed8"/>
  <circle cx="555" cy="108" r="9" fill="#1d4ed8"/>
  <circle cx="595" cy="108" r="9" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
  <!-- Row 2 -->
  <circle cx="355" cy="148" r="9" fill="#1d4ed8"/>
  <circle cx="395" cy="148" r="9" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
  <circle cx="435" cy="148" r="9" fill="#1d4ed8"/>
  <circle cx="475" cy="148" r="9" fill="#dc2626"/>
  <circle cx="515" cy="148" r="9" fill="#1d4ed8"/>
  <circle cx="555" cy="148" r="9" fill="#1d4ed8"/>
  <circle cx="595" cy="148" r="9" fill="#1d4ed8"/>
  <!-- Row 3 -->
  <circle cx="355" cy="188" r="9" fill="#1d4ed8"/>
  <circle cx="395" cy="188" r="9" fill="#1d4ed8"/>
  <circle cx="435" cy="188" r="9" fill="#1d4ed8"/>
  <circle cx="475" cy="188" r="9" fill="#1d4ed8"/>
  <circle cx="515" cy="188" r="9" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
  <circle cx="555" cy="188" r="9" fill="#1d4ed8"/>
  <circle cx="595" cy="188" r="9" fill="#1d4ed8"/>
  <!-- Highlight addressed atom -->
  <circle cx="475" cy="148" r="13" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="505" y="144" font-size="9" fill="#dc2626" font-weight="700">addressed</text>
  <!-- Legend -->
  <circle cx="335" cy="230" r="6" fill="#1d4ed8"/>
  <text x="345" y="234" font-size="9" fill="#6b7280">atom (loaded)</text>
  <circle cx="435" cy="230" r="6" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
  <text x="445" y="234" font-size="9" fill="#6b7280">empty site</text>
  <defs>
    <marker id="arrowblue" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — A spatial light modulator splits a single laser beam into hundreds of independent tweezer beams, each focused by a high-NA objective to a submicrometre spot. Each spot traps one atom. Loading is probabilistic — roughly 50% of sites fill per shot — so empty sites (grey) appear and must be filled by atom sorting before computation begins. The red-circled atom is currently addressed by a gate laser.</figcaption>
</figure>

## Loading and Sorting: The Defect Problem

Loading from a cold atomic vapour is probabilistic. Each trap site independently captures an atom or not with roughly 50% probability per attempt — a consequence of light-assisted collisions that eject atoms when two arrive simultaneously at the same site. A raw 100-site array therefore contains only about 50 atoms after loading, scattered randomly across the grid.

This is solved by **atom sorting**: a dedicated set of movable tweezer beams picks up atoms from filled sites and repositions them to fill vacancies in the target region. The sorting is real-time, guided by a fluorescence image taken immediately after loading. On timescales of tens of milliseconds, the system assembles a defect-free subarray of whatever geometry the algorithm requires — a line, a grid, a graph, or any arbitrary connected pattern.

Sorting is one of the defining features of the neutral atom platform. Unlike trapped ion chains, which have a fixed linear geometry, or superconducting chips, whose connectivity is permanently etched in silicon, a neutral atom array can present a different physical graph to every circuit. This programmable geometry has direct consequences for error correction: transversal gates — operations that act on every qubit in a code block simultaneously, without spreading errors between them — become straightforward when you can physically arrange qubits into the right spatial pattern before the computation starts.

## Qubit Encoding: The Clock State

The qubit is encoded in two hyperfine ground states of the trapped atom. In rubidium-87, these are the |F=1, m_F=0⟩ and |F=2, m_F=0⟩ states, separated by 6.834 GHz. The m_F=0 designator is critical: states with zero magnetic quantum number have identical first-order sensitivity to magnetic fields, making the transition frequency immune to ambient field fluctuations to leading order. These are **clock states** — the same transitions used in atomic clocks.

Coherence times for clock-state qubits in optical tweezers routinely exceed one second, and times above ten seconds have been demonstrated in cryogenically isolated systems. For comparison, the best transmon qubits in superconducting processors achieve a few hundred microseconds. This five-order-of-magnitude difference has profound implications: a neutral atom system can execute vastly deeper circuits before the quantum state degrades, and it requires far less error correction overhead per logical operation.

Single-qubit gates are driven by microwave pulses at the hyperfine splitting frequency, or by two-photon Raman laser transitions, achieving fidelities above 99.9%.

## Rydberg States: An Atom Blown Up to Microscopic Scale

The qubit lives in the hyperfine ground states — but to perform two-qubit gates, the atom must be temporarily excited to a completely different regime: the **Rydberg state**.

A Rydberg atom is an ordinary atom with one electron promoted to an orbit with a very high principal quantum number, n ≈ 50 to 100. The size of an atomic orbital scales as n². At n=70, the electron orbits roughly (70)² = 4,900 times farther from the nucleus than in the ground state — a radius of about 260 nanometres. The atom has swollen from a subnanometre object into something visible under an electron microscope.

This enormous size has a critical consequence: Rydberg atoms interact with neighbouring atoms across distances of many micrometres through a dipole-dipole interaction that scales as n¹¹. Two ground-state rubidium atoms separated by 5 micrometres interact negligibly. Two Rydberg atoms at the same separation interact with an energy of hundreds of megahertz — large enough to completely dominate the system's dynamics.

## The Rydberg Blockade Gate

The gate that makes neutral atom quantum computing possible is built on a single physical principle: if one atom is excited to a Rydberg state, the strong interaction it exerts on its neighbours shifts their Rydberg energy levels far enough out of resonance that they cannot be excited simultaneously. Within the **blockade radius** — typically 5–15 micrometres — only one atom can occupy a Rydberg state at a time.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">RYDBERG BLOCKADE — CZ GATE MECHANISM</text>
  <!-- Left panel: both atoms ground -->
  <rect x="20" y="30" width="190" height="180" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="115" y="50" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.07em" fill="#6b7280">INITIAL STATE</text>
  <circle cx="80"  cy="110" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="150" cy="110" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="80"  cy="114" text-anchor="middle" font-size="11" fill="#1d4ed8" font-weight="700" y="114">|1⟩</text>
  <text x="150" cy="114" text-anchor="middle" font-size="11" fill="#1d4ed8" font-weight="700" y="114">|1⟩</text>
  <text x="80"  y="142" text-anchor="middle" font-size="9" fill="#6b7280">control</text>
  <text x="150" y="142" text-anchor="middle" font-size="9" fill="#6b7280">target</text>
  <text x="115" y="175" text-anchor="middle" font-size="9" fill="#6b7280">ground states,</text>
  <text x="115" y="188" text-anchor="middle" font-size="9" fill="#6b7280">no interaction</text>
  <!-- Middle panel: control excited, blockade -->
  <rect x="245" y="30" width="190" height="180" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="340" y="50" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.07em" fill="#6b7280">DURING GATE</text>
  <!-- Blockade sphere -->
  <circle cx="305" cy="110" r="55" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" stroke-dasharray="5,3" fill-opacity="0.5"/>
  <text x="305" y="175" text-anchor="middle" font-size="8" fill="#d97706">blockade radius</text>
  <!-- Control atom in Rydberg state -->
  <circle cx="305" cy="110" r="24" fill="#fde68a" stroke="#d97706" stroke-width="2.5"/>
  <text x="305" y="106" text-anchor="middle" font-size="10" fill="#92400e" font-weight="700">|r⟩</text>
  <text x="305" y="120" text-anchor="middle" font-size="8" fill="#92400e">Rydberg</text>
  <!-- Target atom blocked -->
  <circle cx="375" cy="110" r="20" fill="#fee2e2" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="375" y="114" text-anchor="middle" font-size="11" fill="#dc2626" font-weight="700">✗</text>
  <text x="375" y="140" text-anchor="middle" font-size="9" fill="#dc2626">blocked</text>
  <!-- Right panel: phase acquired -->
  <rect x="470" y="30" width="190" height="180" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="565" y="50" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.07em" fill="#6b7280">AFTER GATE</text>
  <circle cx="530" cy="110" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="600" cy="110" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="530" y="114" text-anchor="middle" font-size="11" fill="#1d4ed8" font-weight="700" y="114">|1⟩</text>
  <text x="600" y="114" text-anchor="middle" font-size="11" fill="#1d4ed8" font-weight="700" y="114">|1⟩</text>
  <text x="565" y="160" text-anchor="middle" font-size="10" fill="#059669" font-weight="700">−|11⟩</text>
  <text x="565" y="175" text-anchor="middle" font-size="9" fill="#6b7280">phase π acquired</text>
  <text x="565" y="188" text-anchor="middle" font-size="9" fill="#6b7280">only for |11⟩ input</text>
  <!-- Arrows between panels -->
  <text x="228" y="115" text-anchor="middle" font-size="18" fill="#9ca3af">→</text>
  <text x="455" y="115" text-anchor="middle" font-size="18" fill="#9ca3af">→</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — The CZ gate via Rydberg blockade. When the control atom is excited to the Rydberg state (middle), its interaction energy shifts the target atom's Rydberg level out of resonance — blocking simultaneous excitation. The gate sequence is designed so that only the |11⟩ input state acquires a phase of π, implementing a controlled-Z operation. The atoms return to their ground states; no population remains in the Rydberg state.</figcaption>
</figure>

The **CZ gate** sequence exploits this blockade in three pulses. First, a π-pulse on the control atom excites it from |1⟩ to the Rydberg state |r⟩ — if and only if the control is in |1⟩; if the control is in |0⟩ it is not resonant with the Rydberg transition and nothing happens. Second, a 2π-pulse on the target atom attempts to drive it to |r⟩ and back: if no blockade is present (control in |0⟩), the target completes the full rotation and returns to |1⟩ picking up a phase of 2π — which is equivalent to no phase. If the blockade is active (control in |r⟩), the target cannot be excited, and instead picks up a phase of π from the off-resonant drive. Third, a π-pulse returns the control atom from |r⟩ to |1⟩.

The net result: the |11⟩ state acquires a phase of π; all other computational basis states are unchanged. This is exactly the CZ gate. The Rydberg state is used only transiently — it is not the qubit; it is the interaction mechanism.

Two-qubit gate fidelities using this scheme have reached 99.5% in leading experimental groups. The interaction range — the blockade radius — can be tuned by adjusting the principal quantum number n, allowing entanglement between atoms separated by up to 20 micrometres without physically moving them.

## Programmable Connectivity and Mid-Circuit Operations

The most architecturally distinctive feature of neutral atom platforms is what happens between gates. Because atoms sit in independently steerable tweezers, they can be physically transported during the computation. This enables two capabilities no other platform easily provides.

**Programmable connectivity**: before a circuit begins, atoms are rearranged into the graph required by the algorithm — whether that is a square lattice for surface-code error correction, a heavy-hex layout, or a specific problem graph for optimisation. The physical topology matches the computational requirement, eliminating the overhead of SWAP gates that plague fixed-connectivity architectures.

**Mid-circuit measurement and reset**: individual atoms can be measured by collecting their fluorescence, and the result used to classically condition subsequent gate operations — all while the unmeasured qubits retain their quantum state. This is essential for quantum error correction, which requires repeated stabiliser measurements interleaved with logical operations. Demonstrating mid-circuit measurement without disturbing unmeasured qubits is one of the platform's most recent milestones.

## The 48-Logical-Qubit Milestone

In 2023, a collaboration led by Mikhail Lukin's group at Harvard and Dolev Bluvstein as first author demonstrated 48 logical qubits encoded in a 280-physical-qubit array, executing transversal logical gates across the entire register. The result was published in *Nature*.

What made this possible was atom sorting combined with transversal gates. The [[8,3,2]] code they used for a subset of the demonstration encodes 3 logical qubits in 8 physical qubits, with distance 2. Transversal gates — where a logical gate is implemented by applying the same physical gate to every qubit in the block simultaneously — work only if the physical qubits can be arranged so that the operation does not spread errors. In an atom array, you simply sort atoms into the required spatial pattern before applying a global laser pulse. In a superconducting or trapped ion processor with fixed connectivity, transversal gates require bespoke circuit compilation that scales poorly.

The demonstration did not implement fault-tolerant computation in the full sense — the logical error rates were not yet below the physical error rates for all operations — but it established neutral atom arrays as the first platform to demonstrate error-corrected logical circuits at this scale, and it did so through an architectural advantage rather than a hardware one.

## How the Platforms Compare

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 238" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="34" rx="4" fill="#111827"/>
  <text x="340" y="22" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">PLATFORM COMPARISON: THREE-WAY</text>
  <rect x="0" y="34" width="680" height="28" fill="#f9fafb"/>
  <text x="170" y="52" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#6b7280">METRIC</text>
  <text x="370" y="52" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#1d4ed8">SUPERCONDUCTING</text>
  <text x="510" y="52" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#7c3aed">TRAPPED ION</text>
  <text x="625" y="52" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#059669">NEUTRAL ATOM</text>
  <line x1="0" y1="62" x2="680" y2="62" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="62" width="680" height="28" fill="#fff"/>
  <text x="170" y="80" text-anchor="middle" font-size="11" fill="#111827">Qubit coherence (T2)</text>
  <text x="370" y="80" text-anchor="middle" font-size="11" fill="#1d4ed8">100–500 µs</text>
  <text x="510" y="80" text-anchor="middle" font-size="11" fill="#7c3aed">seconds – minutes</text>
  <text x="625" y="80" text-anchor="middle" font-size="11" fill="#059669" font-weight="700">seconds – minutes</text>
  <line x1="0" y1="90" x2="680" y2="90" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="90" width="680" height="28" fill="#f9fafb"/>
  <text x="170" y="108" text-anchor="middle" font-size="11" fill="#111827">Two-qubit gate fidelity</text>
  <text x="370" y="108" text-anchor="middle" font-size="11" fill="#1d4ed8">~99.5%</text>
  <text x="510" y="108" text-anchor="middle" font-size="11" fill="#7c3aed" font-weight="700">~99.9%</text>
  <text x="625" y="108" text-anchor="middle" font-size="11" fill="#059669">~99.5%</text>
  <line x1="0" y1="118" x2="680" y2="118" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="118" width="680" height="28" fill="#fff"/>
  <text x="170" y="136" text-anchor="middle" font-size="11" fill="#111827">Qubit connectivity</text>
  <text x="370" y="136" text-anchor="middle" font-size="11" fill="#1d4ed8">Nearest-neighbour</text>
  <text x="510" y="136" text-anchor="middle" font-size="11" fill="#7c3aed">All-to-all (chain)</text>
  <text x="625" y="136" text-anchor="middle" font-size="11" fill="#059669" font-weight="700">Programmable</text>
  <line x1="0" y1="146" x2="680" y2="146" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="146" width="680" height="28" fill="#f9fafb"/>
  <text x="170" y="164" text-anchor="middle" font-size="11" fill="#111827">Operating temperature</text>
  <text x="370" y="164" text-anchor="middle" font-size="11" fill="#1d4ed8">10–20 mK</text>
  <text x="510" y="164" text-anchor="middle" font-size="11" fill="#7c3aed">Room temp.</text>
  <text x="625" y="164" text-anchor="middle" font-size="11" fill="#059669">Room temp.</text>
  <line x1="0" y1="174" x2="680" y2="174" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="174" width="680" height="28" fill="#fff"/>
  <text x="170" y="192" text-anchor="middle" font-size="11" fill="#111827">Demonstrated qubit count</text>
  <text x="370" y="192" text-anchor="middle" font-size="11" fill="#1d4ed8" font-weight="700">1,000+ (IBM Condor)</text>
  <text x="510" y="192" text-anchor="middle" font-size="11" fill="#7c3aed">~50 (commercial)</text>
  <text x="625" y="192" text-anchor="middle" font-size="11" fill="#059669">1,180 (Atom Computing)</text>
  <line x1="0" y1="202" x2="680" y2="202" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="202" width="680" height="28" fill="#f9fafb"/>
  <text x="170" y="220" text-anchor="middle" font-size="11" fill="#111827">Gate speed</text>
  <text x="370" y="220" text-anchor="middle" font-size="11" fill="#1d4ed8" font-weight="700">10–400 ns</text>
  <text x="510" y="220" text-anchor="middle" font-size="11" fill="#7c3aed">1–100 µs</text>
  <text x="625" y="220" text-anchor="middle" font-size="11" fill="#059669">0.1–1 µs</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — Three-way platform comparison. Neutral atoms match trapped ions on coherence time, surpass them on demonstrated qubit count, and offer uniquely programmable connectivity. Superconducting systems retain a large advantage in gate speed — roughly 10–1,000× faster — and have the most mature industrial ecosystem.</figcaption>
</figure>

## What Remains Hard

The neutral atom platform has real limitations that are not yet engineered away.

**Loading is inherently probabilistic.** Every shot requires loading, imaging, sorting, and verifying the atom array before computation can begin. The overhead — typically 50–200 milliseconds per experimental cycle — limits the achievable gate rate for practical workloads. Increasing the repetition rate requires faster imaging and sorting, which in turn requires higher laser power and faster electronics.

**Atom loss during computation.** Unlike superconducting qubits, which remain in the circuit indefinitely (barring reset), atoms can be lost mid-computation through background gas collisions, heating, or off-resonant scattering. When an atom is lost, its qubit is simply gone — a catastrophic error distinct from the phase and bit-flip errors that quantum error correction normally handles. Detecting and correcting atom loss requires dedicated mid-circuit measurement and reloading protocols that add overhead.

**Two-qubit gate fidelity trails trapped ions.** At 99.5%, the Rydberg CZ gate is excellent — but it has not yet reached the 99.9% routinely demonstrated by trapped ion platforms. The gap matters enormously for the overhead of fault-tolerant quantum error correction. Closing it requires reducing technical noise in the gate lasers, improving the uniformity of the Rydberg interaction, and suppressing motional heating in the tweezers.

**The Rydberg coherence window is short.** The Rydberg state used for gating has a natural radiative lifetime of roughly 100–300 microseconds at n=70. Gates must complete well within this window. In practice, this limits circuit depth before re-cooling or mid-circuit reset is needed — a constraint that disappears as gate fidelity improves and fewer rounds of error correction are required.

## The Road Ahead

Three companies are now commercialising neutral atom quantum computers. **QuEra**, a spinout from Lukin's Harvard group, operates Aquila — a 256-atom device accessible via Amazon Braket — and is building toward 10,000-qubit systems with error correction as the primary target. **Atom Computing**, using ytterbium-171 rather than rubidium (a nuclear spin qubit with even longer coherence times), demonstrated 1,180 trapped atoms in 2023 — the largest atom array demonstrated to date. **Pasqal**, the French entrant, focuses on analogue quantum simulation and optimisation problems where the programmable geometry of atom arrays directly encodes problem structure.

The neutral atom platform occupies a unique position: it has matched trapped ions on coherence time, surpassed superconducting systems on qubit count in optical arrays, and demonstrated error-corrected logical circuits at a scale no other platform has reached. It has done this while running at room temperature, with hardware whose primary scaling lever — the number of tweezer beams the optics can support — does not require the engineering of millikelvin cryogenics or the microfabrication of thousands of nanoscale junctions.

The remaining obstacle is not physics but engineering: loading efficiency, gate fidelity, and atom-loss detection. Each is a solvable problem with understood solutions. Whether neutral atoms close the fidelity gap with trapped ions, and whether they do so before superconducting systems reach fault-tolerance through sheer qubit count — that contest is the most interesting open question in quantum hardware today.
