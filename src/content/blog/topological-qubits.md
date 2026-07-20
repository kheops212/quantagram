---
title: "The Topological Bet: How Microsoft Is Building Qubits That Are Physically Immune to Errors"
description: "Every other qubit platform corrects errors in software, paying a price of hundreds of physical qubits per logical qubit. Microsoft's topological qubit encodes information in the non-local parity of Majorana zero modes — a quantum property that local noise physically cannot disturb. Here is the physics, the hardware, the controversy, and where the approach stands after the February 2025 Nature paper."
pubDate: 'Feb 19 2025'
heroImage: '../../assets/hero-topological.svg'
pillar: 'Quantum Hardware'
author: 'KhGh'
tags: ['topological qubits', 'Majorana zero modes', 'Microsoft', 'topological superconductor', 'anyons', 'braiding', 'quantum hardware']
---

Every qubit platform discussed in this series carries the same hidden cost: hundreds or thousands of imperfect physical qubits are required to produce one reliable logical qubit, because quantum error correction corrects in software what the hardware cannot prevent in physics. A superconducting processor needs roughly 500–1,000 physical qubits per logical qubit. A million-qubit fault-tolerant machine therefore requires a billion physical components. The engineering overhead is staggering, and the power, cooling, and wiring infrastructure it implies may ultimately be the binding constraint on what fault-tolerant quantum computers can practically do.

Microsoft is making a different bet. Rather than accepting hardware errors and correcting them in software, their topological qubit program aims to build qubits that are physically immune to local errors by construction — not through engineering precision, but through the fundamental mathematics of topology. If the approach works, the overhead collapses. A topological qubit might need only a handful of physical components per logical qubit rather than hundreds, because the error protection comes from the laws of physics rather than from redundancy.

In February 2025, Microsoft published a paper in *Nature* claiming the first demonstration of a functional topological qubit. Whether that claim holds under scrutiny — and whether the approach can scale — is the most consequential open question in quantum hardware today.

<div style="border:1px solid var(--border);border-left:3px solid var(--accent);padding:1.25rem 1.5rem;margin:2rem 0;background:var(--bg-alt);">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem 0;">Key Concepts in This Article</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem 2rem;">
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Majorana Zero Mode</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A quasiparticle that is its own antiparticle, appearing at the ends of a topological superconductor. A pair of spatially separated Majorana modes together encodes one qubit non-locally.</p></div>
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Topological Protection</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A qubit whose state depends on the global, non-local parity of a widely separated pair. Local noise can disturb one end of the pair but cannot flip the qubit without affecting both ends simultaneously.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Non-Abelian Anyon</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A 2D quasiparticle whose exchange (braiding) implements a matrix operation on the qubit space — not just a phase. Different braid sequences produce different, non-commuting gates.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Topological Gap</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The energy separation between the topological ground state (where the qubit lives) and excited states. Perturbations below this energy scale cannot cause errors. Closing the gap destroys the protection.</p></div>
  </div>
</div>

## Why Locality Is the Enemy

In a conventional qubit — whether a transmon, a trapped ion, or a neutral atom — the quantum information is stored in a local physical degree of freedom: the charge state of a Josephson junction, the internal electronic level of a single atom. The qubit lives at a specific location, and any environmental perturbation at that location can interact with it and cause an error.

This locality is not a fixable engineering flaw. It reflects a fundamental feature of how quantum information is physically instantiated: something, somewhere, must differ between the |0⟩ and |1⟩ states, and whatever that something is, it can in principle be disturbed.

The insight at the heart of topological quantum computing is that this constraint can be circumvented if the distinguishing feature is not local but **non-local** — spread across space in a way that no physically bounded perturbation can reach.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 195" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="155" y="16" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.07em" fill="#6b7280">CONVENTIONAL — LOCAL</text>
  <text x="510" y="16" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.07em" fill="#6b7280">TOPOLOGICAL — NON-LOCAL</text>
  <line x1="330" y1="0" x2="330" y2="195" stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- LEFT PANEL: conventional qubit -->
  <rect x="10" y="22" width="310" height="165" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Central qubit -->
  <circle cx="155" cy="100" r="30" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="155" y="96" text-anchor="middle" font-size="14" font-weight="700" fill="#1d4ed8">|ψ⟩</text>
  <text x="155" y="112" text-anchor="middle" font-size="9" fill="#1d4ed8">local state</text>
  <!-- Noise arrows from 4 directions -->
  <line x1="60"  y1="100" x2="118" y2="100" stroke="#dc2626" stroke-width="2" marker-end="url(#arrred)"/>
  <line x1="250" y1="100" x2="192" y2="100" stroke="#dc2626" stroke-width="2" marker-end="url(#arrred)"/>
  <line x1="155" y1="40"  x2="155" y2="65"  stroke="#dc2626" stroke-width="2" marker-end="url(#arrred)"/>
  <line x1="155" y1="160" x2="155" y2="135" stroke="#dc2626" stroke-width="2" marker-end="url(#arrred)"/>
  <text x="40"  y="95"  font-size="9" fill="#dc2626" font-weight="700">noise</text>
  <text x="254" y="95"  font-size="9" fill="#dc2626" font-weight="700">noise</text>
  <text x="165" y="36"  font-size="9" fill="#dc2626" font-weight="700">noise</text>
  <text x="165" y="176" font-size="9" fill="#dc2626" font-weight="700">noise</text>
  <text x="155" y="186" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="700">any perturbation → potential error</text>
  <!-- RIGHT PANEL: topological qubit -->
  <rect x="345" y="22" width="325" height="165" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Nanowire bar -->
  <rect x="375" y="88" width="265" height="28" rx="6" fill="#1e3a5f" stroke="#374151" stroke-width="1.5"/>
  <text x="508" y="106" text-anchor="middle" font-size="9" fill="#94a3b8">topological superconductor</text>
  <!-- Majorana modes at ends -->
  <!-- γ₁ left -->
  <polygon points="375,72 387,88 363,88" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <text x="375" y="67" text-anchor="middle" font-size="11" font-weight="700" fill="#d97706">γ₁</text>
  <!-- γ₂ right -->
  <polygon points="640,72 652,88 628,88" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <text x="640" y="67" text-anchor="middle" font-size="11" font-weight="700" fill="#d97706">γ₂</text>
  <!-- Non-local parity brace -->
  <path d="M 375,125 Q 375,140 508,140 Q 640,140 640,125" fill="none" stroke="#059669" stroke-width="1.5"/>
  <text x="508" y="158" text-anchor="middle" font-size="9" fill="#059669" font-weight="700">qubit = non-local parity of (γ₁, γ₂)</text>
  <!-- Noise arrow hitting only γ₁ -->
  <line x1="355" y1="60" x2="370" y2="75" stroke="#dc2626" stroke-width="2" marker-end="url(#arrred)"/>
  <text x="343" y="55" text-anchor="end" font-size="9" fill="#dc2626" font-weight="700">noise</text>
  <!-- Shield / checkmark at γ₂ -->
  <circle cx="640" cy="52" r="12" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="640" y="57" text-anchor="middle" font-size="12" fill="#16a34a" font-weight="700">✓</text>
  <text x="640" y="40" text-anchor="middle" font-size="8.5" fill="#059669">γ₂ unaffected</text>
  <text x="508" y="186" text-anchor="middle" font-size="9" fill="#059669" font-weight="700">local noise touches one end — qubit protected</text>
  <defs>
    <marker id="arrred" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — The core distinction between local and topological qubit encoding. In a conventional qubit (left), the quantum state lives at a single point — any local perturbation can cause an error. In a topological qubit (right), the quantum information is the non-local parity of a pair of Majorana zero modes (γ₁, γ₂) at the opposite ends of a wire, which may be micrometres apart. A local disturbance can disturb one Majorana mode but cannot alone flip the qubit state, which requires simultaneous action at both ends.</figcaption>
</figure>

## Majorana Zero Modes: The Physical Ingredient

The theoretical foundation comes from a 2001 paper by Alexei Kitaev, who proposed that a specific one-dimensional model of a spinless superconductor — now called the Kitaev chain — hosts a special type of excitation at its ends: **Majorana zero modes** (MZMs).

A Majorana fermion is a particle that is its own antiparticle. In high-energy physics, no confirmed Majorana elementary particle exists. But in condensed matter physics, the relevant objects are not fundamental particles but quasiparticles — collective excitations of a many-body system that behave, in all measurable respects, as if they were particles with specific properties. Kitaev showed that in the topological phase of his chain, two Majorana quasiparticles appear at opposite ends and are pinned to exactly zero energy — they are stable features of the ground state, not fluctuations.

The qubit is encoded in the **parity** of this Majorana pair: even parity (zero electrons shared between the two modes, schematically) corresponds to |0⟩, odd parity to |1⟩. This parity is non-local — it is a joint property of both ends of the wire. Measuring it requires probing both endpoints simultaneously. A local perturbation at either end alone cannot change the parity, because changing the parity requires moving an electron between the two modes, and those modes are physically separated by the length of the wire.

The protection is not absolute. It holds as long as two conditions are maintained: the two Majorana modes remain spatially separated (do not overlap), and the temperature is well below the **topological gap** — the energy required to excite the system out of the topological phase into the trivial phase where the protection disappears. As long as perturbations are below the gap energy and local, the qubit is exponentially protected: the error rate decays exponentially with the ratio of the gap to the temperature and with the wire length.

## Microsoft's Hardware: Semiconductor-Superconductor Nanowires

The Kitaev chain requires a topological superconductor — a material that does not exist naturally. Microsoft's approach engineers one by combining three ingredients.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">MICROSOFT TOPOLOGICAL QUBIT DEVICE — CROSS-SECTION</text>
  <!-- Substrate -->
  <rect x="30" y="160" width="620" height="30" rx="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="340" y="179" text-anchor="middle" font-size="10" fill="#64748b">InAs semiconductor substrate (gate-tuneable)</text>
  <!-- Gate electrodes below nanowire -->
  <rect x="90"  y="135" width="60" height="25" rx="2" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <rect x="290" y="135" width="60" height="25" rx="2" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <rect x="490" y="135" width="60" height="25" rx="2" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="120" y="151" text-anchor="middle" font-size="8" fill="#92400e">gate</text>
  <text x="320" y="151" text-anchor="middle" font-size="8" fill="#92400e">gate</text>
  <text x="520" y="151" text-anchor="middle" font-size="8" fill="#92400e">gate</text>
  <!-- InAs nanowire -->
  <rect x="60" y="100" width="560" height="32" rx="4" fill="#1e3a5f" stroke="#374151" stroke-width="2"/>
  <text x="340" y="120" text-anchor="middle" font-size="10" fill="#93c5fd">InAs nanowire (strong spin-orbit coupling)</text>
  <!-- Al epitaxial shell on top -->
  <rect x="60" y="86" width="560" height="16" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  <text x="340" y="97" text-anchor="middle" font-size="9" fill="#334155">Al epitaxial shell (proximity-induced superconductivity)</text>
  <!-- Magnetic field arrow -->
  <line x1="60" y1="58" x2="620" y2="58" stroke="#7c3aed" stroke-width="2" marker-end="url(#arrpurp)"/>
  <text x="340" y="50" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700">B-field (Zeeman splitting drives topological phase transition)</text>
  <!-- Majorana modes at wire ends -->
  <polygon points="60,86 75,100 45,100" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <text x="60" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="#d97706">γ₁</text>
  <polygon points="620,86 635,100 605,100" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <text x="620" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="#d97706">γ₂</text>
  <!-- Temperature label -->
  <text x="340" y="196" text-anchor="middle" font-size="9" fill="#64748b">Operating temperature: 30–50 mK (dilution refrigerator)</text>
  <defs>
    <marker id="arrpurp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — Microsoft's topological qubit device architecture. An indium arsenide (InAs) nanowire, chosen for its strong spin-orbit coupling, is coated on one face with an epitaxial aluminium shell. Proximity to the superconducting Al induces superconducting correlations in the InAs. An applied magnetic field drives the system into the topological phase through a Zeeman splitting of the spin bands. Gate electrodes below tune the chemical potential of the nanowire, controlling which regions are topological and where the Majorana modes (γ₁, γ₂) are localised.</figcaption>
</figure>

**InAs semiconductor nanowire.** Indium arsenide has exceptionally strong spin-orbit coupling — the interaction between an electron's spin and its orbital motion — which is necessary to create the effective spinless fermion system the Kitaev model requires. InAs nanowires can be grown with very clean surfaces and interfaces.

**Epitaxial aluminium shell.** A thin layer of aluminium is grown epitaxially on one face of the nanowire — the crystal lattices are aligned at the atomic scale, producing an interface of unprecedented cleanliness. Aluminium is a conventional s-wave superconductor below 1.2 K. Through the proximity effect, the superconducting correlations leak into the adjacent InAs, inducing effective p-wave superconductivity in the semiconductor.

**Applied magnetic field.** A magnetic field applied along the wire axis causes a Zeeman splitting of the electronic spin states. When the field exceeds a critical value — the topological phase transition — the system crosses from a trivial superconducting phase into the topological phase. Majorana modes appear at the wire ends. Below the transition, nothing special happens. Above it, the qubit is born.

The entire device must operate at 30–50 millikelvin — well below the aluminium critical temperature and well below the topological gap (typically a fraction of a millikelvin to a few millikelvin, depending on device quality). This requires a dilution refrigerator, though the operating temperature is similar to superconducting qubit processors, which already run at 10–20 mK.

## Braiding: Gates From Topology

Performing quantum gates on topological qubits does not involve microwave pulses, laser beams, or Rydberg excitations. It requires physically moving the Majorana modes around each other — a process called **braiding**.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 195" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">BRAIDING MAJORANA MODES — SPACETIME WORLDLINES</text>
  <!-- Left panel: T-junction for braiding -->
  <rect x="10" y="28" width="300" height="158" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="160" y="44" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.06em" fill="#6b7280">T-JUNCTION WIRE NETWORK</text>
  <!-- T-junction wires -->
  <rect x="50"  y="90" width="220" height="18" rx="4" fill="#1e3a5f"/>
  <rect x="148" y="58" width="26" height="50" rx="4" fill="#1e3a5f"/>
  <!-- Majorana positions -->
  <polygon points="50,80 63,90 37,90"   fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <polygon points="270,80 283,90 257,90" fill="#7c3aed" stroke="#5b21b6" stroke-width="1.5"/>
  <text x="50"  y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#d97706">γ₁</text>
  <text x="270" y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#7c3aed">γ₂</text>
  <!-- γ₂ moves up through junction -->
  <line x1="270" y1="88" x2="162" y2="88" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="5,2" marker-end="url(#arrpurp2)"/>
  <line x1="162" y1="88" x2="162" y2="58" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="5,2" marker-end="url(#arrpurp2)"/>
  <text x="162" y="47" text-anchor="middle" font-size="9" fill="#7c3aed">γ₂ moves</text>
  <text x="162" y="37" text-anchor="middle" font-size="9" fill="#7c3aed">through junction</text>
  <!-- γ₁ moves right -->
  <line x1="50" y1="96" x2="140" y2="96" stroke="#d97706" stroke-width="1.5" stroke-dasharray="5,2" marker-end="url(#arryel)"/>
  <text x="95" y="125" text-anchor="middle" font-size="9" fill="#d97706">γ₁ takes γ₂'s place</text>
  <text x="160" y="155" text-anchor="middle" font-size="9" fill="#6b7280">One full exchange = braid</text>
  <text x="160" y="170" text-anchor="middle" font-size="9" fill="#059669" font-weight="700">→ implements unitary gate U</text>
  <!-- Right panel: spacetime worldline diagram -->
  <rect x="345" y="28" width="325" height="158" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="508" y="44" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.06em" fill="#6b7280">SPACETIME BRAID DIAGRAM</text>
  <!-- Axes -->
  <line x1="380" y1="165" x2="380" y2="56" stroke="#d1d5db" stroke-width="1.5" marker-end="url(#arrgray)"/>
  <line x1="380" y1="165" x2="650" y2="165" stroke="#d1d5db" stroke-width="1.5"/>
  <text x="373" y="52" text-anchor="end" font-size="9" fill="#6b7280">time</text>
  <text x="650" y="175" font-size="9" fill="#6b7280">space</text>
  <!-- γ₁ worldline (orange) — starts left, stays left, then moves right -->
  <path d="M 420,158 L 420,110 Q 420,90 480,90 Q 540,90 540,70 L 540,55" fill="none" stroke="#f59e0b" stroke-width="3"/>
  <!-- γ₂ worldline (purple) — starts right, crosses under γ₁ -->
  <path d="M 540,158 L 540,110 Q 540,90 480,90 Q 420,90 420,70 L 420,55" fill="none" stroke="#7c3aed" stroke-width="3" stroke-dasharray="8,3"/>
  <text x="415" y="168" text-anchor="middle" font-size="9" fill="#d97706">γ₁</text>
  <text x="545" y="168" text-anchor="middle" font-size="9" fill="#7c3aed">γ₂</text>
  <text x="608" y="90" font-size="8.5" fill="#111827">braid: γ₁ goes</text>
  <text x="608" y="102" font-size="8.5" fill="#111827">over γ₂</text>
  <text x="508" y="178" text-anchor="middle" font-size="8.5" fill="#059669" font-weight="700">gate depends only on braid topology — not speed or path</text>
  <defs>
    <marker id="arrpurp2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed"/></marker>
    <marker id="arryel"   markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d97706"/></marker>
    <marker id="arrgray"  markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d1d5db"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — Braiding Majorana modes. Left: in a T-junction wire network, γ₂ is moved through the junction while γ₁ advances to fill its place. One complete exchange = one braid. Right: the spacetime worldline representation. The two Majorana worldlines cross, implementing a unitary matrix on the qubit space. The critical property: the gate implemented depends only on how many times the worldlines cross and in which direction — not on the speed of movement, the precise path, or microscopic details. This topological invariance is what makes the gate inherently robust.</figcaption>
</figure>

Majorana zero modes in wire networks behave as **non-abelian anyons** — particles in two dimensions whose exchange implements a matrix transformation rather than just a phase. Swapping two non-abelian anyons in 2D space produces a different result depending on which anyon goes "over" the other in the spacetime path — an operation called a braid. Different braid sequences produce different, non-commuting unitary matrices on the encoded qubit space.

The topological invariance of braiding is what makes these gates robust. The gate operation depends only on the **topology** of the braid — the number of crossings, and whether each crossing is over or under. It does not depend on how fast the movement happened, the precise path taken, or microscopic fluctuations in the control voltages. This is the quantum computing equivalent of tying a knot: the knot type is an invariant that does not change under continuous deformation of the rope.

In Microsoft's wire network architecture, gates are performed by moving Majorana modes along wire segments and through junctions in a choreographed sequence. The device geometry — a network of T-junctions — provides the space needed to route Majorana modes without them annihilating each other or becoming confused.

**One significant limitation:** braiding Majorana modes in the available wire geometries can implement only the Clifford group of gates — the same subset that can be performed transversally in the surface code. The T gate, required for universal computation, cannot be implemented by braiding alone. It requires either injection of magic states (the same overhead problem faced by the surface code), or more exotic anyon types — **Fibonacci anyons** — which are topologically universal but have not yet been realised in any physical system. Microsoft's near-term architecture therefore still requires T-gate injection, though the Clifford overhead is eliminated.

## The February 2025 Nature Paper

On 19 February 2025, Microsoft published a paper in *Nature* titled "Observation of topological superconductivity in a semiconductor–superconductor hybrid device" along with a companion engineering paper describing their topological core chip. The central claim: a functioning topological qubit realised in an InAs/Al heterostructure, with Majorana parity lifetime exceeding 1 millisecond — a coherence time competitive with the best superconducting transmons.

The key technical achievement was the implementation of a **topological gap protocol (TGP)** — a battery of measurements designed to rule out non-topological explanations for zero-bias conductance peaks, which are signatures of Majorana modes but can be mimicked by other phenomena (Andreev bound states, smooth confining potentials, disorder-induced subgap states). Prior Microsoft results, most notoriously a 2018 *Science* paper that was subsequently retracted in 2021 after an investigation found evidence of data manipulation in the original figures, had relied on conductance signatures that were insufficient to establish topological origin. The TGP provides a more complete diagnostic.

The 2025 result passed peer review at *Nature* and represents a substantial methodological advance. Several independent quantum information researchers who reviewed the paper acknowledged it as the most rigorous topological qubit demonstration to date. At the same time, the broader community remains cautious: the history of premature announcements in this subfield — not unique to Microsoft — has calibrated expectations. The 2025 result demonstrates topological signatures and parity readout; it does not demonstrate gate operations, multi-qubit entanglement, or below-threshold error rates on logical qubits. These milestones remain ahead.

## How the Platforms Compare

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 228" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="30" rx="4" fill="#111827"/>
  <text x="340" y="20" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">FIVE-PLATFORM COMPARISON</text>
  <rect x="0" y="30" width="680" height="26" fill="#f9fafb"/>
  <text x="80"  y="47" text-anchor="middle" font-size="8.5" font-weight="700" letter-spacing="0.05em" fill="#6b7280">METRIC</text>
  <text x="210" y="47" text-anchor="middle" font-size="8"   font-weight="700" letter-spacing="0.04em" fill="#1d4ed8">SUPERCONDUCTING</text>
  <text x="330" y="47" text-anchor="middle" font-size="8"   font-weight="700" letter-spacing="0.04em" fill="#7c3aed">TRAPPED ION</text>
  <text x="445" y="47" text-anchor="middle" font-size="8"   font-weight="700" letter-spacing="0.04em" fill="#059669">NEUTRAL ATOM</text>
  <text x="548" y="47" text-anchor="middle" font-size="8"   font-weight="700" letter-spacing="0.04em" fill="#9d174d">PHOTONIC</text>
  <text x="638" y="47" text-anchor="middle" font-size="8"   font-weight="700" letter-spacing="0.04em" fill="#d97706">TOPOLOGICAL</text>
  <line x1="0" y1="56" x2="680" y2="56" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 1 -->
  <rect x="0" y="56" width="680" height="26" fill="#fff"/>
  <text x="80"  y="73" text-anchor="middle" font-size="9.5" fill="#111827">Error protection</text>
  <text x="210" y="73" text-anchor="middle" font-size="9.5" fill="#1d4ed8">Software QEC</text>
  <text x="330" y="73" text-anchor="middle" font-size="9.5" fill="#7c3aed">Software QEC</text>
  <text x="445" y="73" text-anchor="middle" font-size="9.5" fill="#059669">Software QEC</text>
  <text x="548" y="73" text-anchor="middle" font-size="9.5" fill="#9d174d">Software QEC</text>
  <text x="638" y="73" text-anchor="middle" font-size="9.5" fill="#d97706" font-weight="700">Hardware</text>
  <line x1="0" y1="82" x2="680" y2="82" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 2 -->
  <rect x="0" y="82" width="680" height="26" fill="#f9fafb"/>
  <text x="80"  y="99" text-anchor="middle" font-size="9.5" fill="#111827">Operating temp.</text>
  <text x="210" y="99" text-anchor="middle" font-size="9.5" fill="#1d4ed8">10–20 mK</text>
  <text x="330" y="99" text-anchor="middle" font-size="9.5" fill="#7c3aed">Room temp.</text>
  <text x="445" y="99" text-anchor="middle" font-size="9.5" fill="#059669">Room temp.</text>
  <text x="548" y="99" text-anchor="middle" font-size="9.5" fill="#9d174d">Room temp.*</text>
  <text x="638" y="99" text-anchor="middle" font-size="9.5" fill="#d97706">30–50 mK</text>
  <line x1="0" y1="108" x2="680" y2="108" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 3 -->
  <rect x="0" y="108" width="680" height="26" fill="#fff"/>
  <text x="80"  y="125" text-anchor="middle" font-size="9.5" fill="#111827">Gate mechanism</text>
  <text x="210" y="125" text-anchor="middle" font-size="9.5" fill="#1d4ed8">Microwave pulse</text>
  <text x="330" y="125" text-anchor="middle" font-size="9.5" fill="#7c3aed">Laser / Mølmer-S.</text>
  <text x="445" y="125" text-anchor="middle" font-size="9.5" fill="#059669">Rydberg blockade</text>
  <text x="548" y="125" text-anchor="middle" font-size="9.5" fill="#9d174d">Beam splitter / fusion</text>
  <text x="638" y="125" text-anchor="middle" font-size="9.5" fill="#d97706" font-weight="700">Braiding</text>
  <line x1="0" y1="134" x2="680" y2="134" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 4 -->
  <rect x="0" y="134" width="680" height="26" fill="#f9fafb"/>
  <text x="80"  y="151" text-anchor="middle" font-size="9.5" fill="#111827">Phys. qubits / logical</text>
  <text x="210" y="151" text-anchor="middle" font-size="9.5" fill="#1d4ed8">~500–1000</text>
  <text x="330" y="151" text-anchor="middle" font-size="9.5" fill="#7c3aed">~500–1000</text>
  <text x="445" y="151" text-anchor="middle" font-size="9.5" fill="#059669">~500–1000</text>
  <text x="548" y="151" text-anchor="middle" font-size="9.5" fill="#9d174d">~500–1000</text>
  <text x="638" y="151" text-anchor="middle" font-size="9.5" fill="#d97706" font-weight="700">~10 (if proven)</text>
  <line x1="0" y1="160" x2="680" y2="160" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 5 -->
  <rect x="0" y="160" width="680" height="26" fill="#fff"/>
  <text x="80"  y="177" text-anchor="middle" font-size="9.5" fill="#111827">Hardware maturity</text>
  <text x="210" y="177" text-anchor="middle" font-size="9.5" fill="#1d4ed8" font-weight="700">High</text>
  <text x="330" y="177" text-anchor="middle" font-size="9.5" fill="#7c3aed" font-weight="700">High</text>
  <text x="445" y="177" text-anchor="middle" font-size="9.5" fill="#059669">Medium</text>
  <text x="548" y="177" text-anchor="middle" font-size="9.5" fill="#9d174d">Medium–low</text>
  <text x="638" y="177" text-anchor="middle" font-size="9.5" fill="#dc2626">Very low</text>
  <line x1="0" y1="186" x2="680" y2="186" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="186" width="680" height="42" fill="#f9fafb"/>
  <text x="340" y="208" text-anchor="middle" font-size="8.5" fill="#64748b">*Photonic qubits room temp.; SNSPDs require ~3 K. Topological overhead estimate assumes full Clifford protection via braiding; T-gate still requires injection.</text>
  <text x="340" y="222" text-anchor="middle" font-size="8.5" fill="#64748b">Physical qubit counts are rough estimates for factoring RSA-2048; actual overhead depends on noise model, code choice, and decoder performance.</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 4 — Five-platform comparison. The topological column is unique in its "hardware" error protection column entry and the dramatically lower physical-qubit-per-logical-qubit estimate — but both of these entries are conditional on the approach working at scale, which remains undemonstrated. Every other platform has demonstrated multi-qubit entanglement, gate fidelity benchmarks, and error correction experiments. Topological qubits have demonstrated none of these yet.</figcaption>
</figure>

## What Remains Unproven

The gap between the 2025 result and a functioning topological quantum computer spans multiple unsolved problems.

**Gate operations have not been demonstrated.** The February 2025 result shows topological qubit readout — measuring the parity state of a Majorana pair. It does not show a gate: no braiding operation has been experimentally implemented that demonstrably changes the parity state in a topologically protected way and can be verified against the gate's expected unitary action. This is the immediate next milestone.

**Multi-qubit entanglement is absent.** A quantum computer requires at least two logical qubits that can be entangled. No entanglement between topological qubits has been demonstrated. The wire network architecture required to braid multiple Majorana pairs across two or more logical qubits is substantially more complex than the single-qubit device demonstrated so far.

**Quasiparticle poisoning remains a concern.** Even in the topological phase, stray electrons from the substrate or the environment can tunnel into the wire and change its parity — a process called quasiparticle poisoning. This is not prevented by the topological gap; it is an error that the topological protection does not cover. In the 2025 device, the measured parity lifetime of ~1 ms is likely limited by quasiparticle poisoning. Managing this at the device and materials level is an engineering challenge with no proven solution at scale.

**The gap magnitudes are small.** Reported topological gaps in InAs/Al devices are typically 0.05–0.2 meV — corresponding to temperatures of 0.6–2.3 K. Operating well below the gap requires mK temperatures, comparable to superconducting processors. There is no room-temperature advantage, and the topological protection window is narrow. Larger gaps require different materials; indium antimonide (InSb) and certain 2D semiconductor platforms show promise but are less mature.

**The retraction shadow.** The 2018 retraction was consequential not just scientifically but reputationally. The quantum computing community now holds Microsoft's topological claims to a higher evidentiary standard than it would hold claims from groups without a retraction in their history. This is a reasonable response to prior events and affects how collaborators, reviewers, and potential competitors interpret new results. The 2025 paper was designed with this scrutiny in mind — its methods section is unusually thorough — but the trust deficit will take years of replication and multi-qubit demonstrations to close.

## The Architecture of a Long Bet

Microsoft has been funding topological quantum computing research since 2005, when Fields Medal winner Michael Freedman established Station Q at UC Santa Barbara. For twenty years, the program has produced exceptional theoretical physics — the connection between topological quantum field theory, non-abelian anyons, and fault-tolerant quantum computation is largely due to work by Freedman, Kitaev, and their collaborators — while delivering less experimental progress than competing platforms.

The strategic logic is unchanged: if topological qubits reduce the physical-to-logical qubit ratio from ~1000:1 to ~10:1, the hardware required for a fault-tolerant quantum computer drops by two orders of magnitude. That is not a marginal improvement — it is the difference between a machine requiring ten billion physical qubits and one requiring ten million. The first platform to achieve fault-tolerant computation with a manageable physical qubit count wins the market that matters.

Whether topological qubits can deliver that ratio in practice — with real noise, real materials, real gate operations, and real multi-qubit systems — remains the open question that the 2025 result has moved fractionally closer to answering. The physics is compelling. The engineering history is humbling. The bet is still live.
