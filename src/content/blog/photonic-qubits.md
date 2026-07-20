---
title: "Light as a Qubit: The Physics and Promise of Photonic Quantum Computing"
description: "Photons are the only qubits that can travel through optical fibre, operate at room temperature without any cryogenics, and be manufactured on silicon chips in commercial CMOS fabs. The catch: photons don't interact with each other. Here is how the field is engineering around that fundamental constraint."
pubDate: 'Aug 20 2024'
heroImage: '../../assets/hero-photonic.svg'
pillar: 'Quantum Hardware'
author: 'KhGh'
tags: ['photonic qubits', 'silicon photonics', 'linear optics', 'PsiQuantum', 'Xanadu', 'quantum hardware', 'KLM', 'boson sampling']
---

PsiQuantum's pitch to investors is straightforward: the only path to a million-qubit fault-tolerant quantum computer runs through a silicon wafer fab. Their quantum processor is not a chandelier-sized dilution refrigerator or a rack of laser optics — it is a silicon chip, manufactured by GlobalFoundries using the same processes that make CMOS image sensors, with waveguides etched at the nanometre scale and single-photon detectors integrated on-chip. If it works, it sidesteps the two most painful scaling problems in quantum hardware: the wiring bottleneck of superconducting systems at millikelvin temperatures, and the laser complexity of trapped ion and neutral atom arrays. The qubits are photons — particles of light, immune to thermal noise at room temperature, naturally compatible with optical fibre, and already manufactured at scale in photonic integrated circuits.

The difficulty is that photons do not interact with each other. In a superconducting processor, a two-qubit gate exploits the physical coupling between two microwave resonators. In a trapped ion system, ions entangle through the shared vibration of their crystal. Photons passing through the same optical element simply pass through each other, oblivious. Every architecture in photonic quantum computing is, at its core, a response to this single physical constraint.

<div style="border:1px solid var(--border);border-left:3px solid var(--accent);padding:1.25rem 1.5rem;margin:2rem 0;background:var(--bg-alt);">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem 0;">Key Concepts in This Article</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem 2rem;">
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Dual-Rail Encoding</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A single photon occupying one of two waveguide paths encodes |0⟩ and |1⟩. The superposition is the photon being in both paths simultaneously.</p></div>
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Beam Splitter</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A 50:50 beam splitter on a dual-rail qubit implements a Hadamard gate — the fundamental single-qubit rotation in linear optical circuits.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">KLM Theorem</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">Knill, Laflamme and Milburn proved in 2001 that linear optics plus single-photon detection is sufficient for universal quantum computation — but two-qubit gates are inherently probabilistic.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Fusion Gate</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A measurement-based two-photon operation that probabilistically joins two small entangled resource states into a larger one — the building block of fusion-based quantum computing.</p></div>
  </div>
</div>

## Why Light? The Case for Photons as Qubits

Every qubit platform must solve three problems: creating the qubit, controlling it, and protecting it from the environment. Photons solve the third problem essentially for free. A photon travelling through a waveguide does not interact with thermal vibrations — the energy of a single near-infrared photon (∼1 eV at 1550 nm) is roughly 40 times the thermal energy at room temperature, so ambient heat cannot spontaneously create or destroy photons in the signal band. Decoherence through the thermal channel is not a concern.

This has an immediate engineering consequence: no cryogenics for the qubits themselves. Superconducting processors require the entire chip to sit at 15 millikelvin — a millikelvin below the cosmic microwave background. Photonic processors can run the qubit chip at room temperature. (The photon detectors, which require superconducting nanowires to achieve single-photon sensitivity, typically need cooling to 3–4 K — achievable with a compact cryocooler far simpler than a dilution refrigerator.)

The second advantage is compatibility with existing infrastructure. Telecommunications wavelengths around 1550 nm propagate through optical fibre with loss as low as 0.2 dB/km. A photonic quantum processor is naturally a node in a quantum network — quantum states generated on-chip can be transmitted, in principle, over fibre links spanning continents. No other qubit platform shares this property.

The third advantage is fabrication. Silicon photonic waveguides are fabricated by the same lithographic processes used to make CMOS image sensors and silicon microphones. A wafer fab already knows how to pattern silicon to nanometre precision at scale. PsiQuantum's core bet is that this existing industrial infrastructure — not bespoke quantum hardware — determines who wins the race to scale.

## Encoding Information in Light

The most widely used encoding for photonic qubits is **dual-rail encoding**. A single photon occupies one of two spatial waveguide modes. If the photon is in the upper waveguide, the qubit state is |0⟩. If it is in the lower waveguide, it is |1⟩. A superposition — the photon quantum mechanically in both waveguides simultaneously — is the qubit in an arbitrary state α|0⟩ + β|1⟩.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">DUAL-RAIL ENCODING AND BEAM SPLITTER GATE</text>
  <!-- Left section: encoding -->
  <line x1="20" y1="200" x2="660" y2="200" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="340" y="215" text-anchor="middle" font-size="9" fill="#6b7280">divider</text>
  <!-- |0> state -->
  <text x="100" y="42" text-anchor="middle" font-size="11" font-weight="700" fill="#6b7280">|0⟩ state</text>
  <!-- Upper rail (has photon) -->
  <line x1="20" y1="70" x2="200" y2="70" stroke="#1d4ed8" stroke-width="2.5"/>
  <circle cx="110" cy="70" r="10" fill="#1d4ed8"/>
  <text x="110" y="74" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">γ</text>
  <!-- Lower rail (empty) -->
  <line x1="20" y1="110" x2="200" y2="110" stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Labels -->
  <text x="14" y="74" text-anchor="end" font-size="10" fill="#1d4ed8">rail 0</text>
  <text x="14" y="114" text-anchor="end" font-size="10" fill="#9ca3af">rail 1</text>
  <text x="205" y="92" font-size="10" fill="#6b7280">photon in upper rail</text>
  <!-- |1> state -->
  <text x="100" y="145" text-anchor="middle" font-size="11" font-weight="700" fill="#6b7280">|1⟩ state</text>
  <line x1="20" y1="163" x2="200" y2="163" stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="20" y1="188" x2="200" y2="188" stroke="#1d4ed8" stroke-width="2.5"/>
  <circle cx="110" cy="188" r="10" fill="#1d4ed8"/>
  <text x="110" y="192" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">γ</text>
  <text x="14" y="167" text-anchor="end" font-size="10" fill="#9ca3af">rail 0</text>
  <text x="14" y="192" text-anchor="end" font-size="10" fill="#1d4ed8">rail 1</text>
  <text x="205" y="178" font-size="10" fill="#6b7280">photon in lower rail</text>
  <!-- Divider -->
  <line x1="320" y1="25" x2="320" y2="205" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- Right section: beam splitter gate -->
  <text x="500" y="42" text-anchor="middle" font-size="11" font-weight="700" fill="#6b7280">50:50 Beam Splitter = Hadamard</text>
  <!-- Input rails -->
  <line x1="340" y1="80" x2="430" y2="80" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="340" y1="130" x2="430" y2="130" stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="334" y="84" text-anchor="end" font-size="10" fill="#1d4ed8">|0⟩</text>
  <text x="334" y="134" text-anchor="end" font-size="10" fill="#9ca3af">|0⟩</text>
  <!-- Beam splitter box -->
  <rect x="430" y="62" width="80" height="86" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="470" y="98" text-anchor="middle" font-size="11" font-weight="700" fill="#92400e">BS</text>
  <text x="470" y="114" text-anchor="middle" font-size="9" fill="#92400e">50:50</text>
  <text x="470" y="127" text-anchor="middle" font-size="9" fill="#92400e">θ = π/4</text>
  <!-- Output rails -->
  <line x1="510" y1="80" x2="650" y2="80" stroke="#7c3aed" stroke-width="2"/>
  <line x1="510" y1="130" x2="650" y2="130" stroke="#7c3aed" stroke-width="2"/>
  <text x="655" y="84" font-size="10" fill="#7c3aed">(|0⟩+|1⟩)/√2</text>
  <text x="655" y="134" font-size="10" fill="#7c3aed">(|0⟩−|1⟩)/√2</text>
  <!-- Superposition indicator -->
  <text x="500" y="172" text-anchor="middle" font-size="10" fill="#7c3aed">photon now in superposition</text>
  <text x="500" y="186" text-anchor="middle" font-size="9" fill="#6b7280">of both output modes</text>
  <defs>
    <marker id="arrowgray" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9ca3af"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — Dual-rail encoding. A single photon in the upper rail encodes |0⟩; in the lower rail, |1⟩. A 50:50 beam splitter acting on the two rails implements the Hadamard gate, placing the photon in a superposition of both output modes. Phase shifters on individual rails implement arbitrary single-qubit rotations.</figcaption>
</figure>

**Polarisation encoding** uses horizontal and vertical polarisation of a single photon in one spatial mode: |0⟩ = |H⟩, |1⟩ = |V⟩. This is compact but difficult to integrate on-chip, since polarisation-maintaining waveguides require precise birefringence control. **Time-bin encoding** uses the arrival time of a photon — early or late in a defined time window — and is particularly robust over fibre but requires fast switching.

Dual-rail is preferred for integrated photonic processors because beam splitters and phase shifters map directly onto directional couplers and thermo-optic phase shifters — standard components in a silicon photonic foundry.

## The Beam Splitter: A Universal Single-Qubit Gate

A **beam splitter** in integrated photonics is a directional coupler: two waveguides brought close enough that the evanescent fields of their guided modes overlap, causing light to tunnel between them. The coupling ratio — how much light transfers from one waveguide to the other — is determined by the coupling length and the gap between waveguides. A 50:50 directional coupler, where 50% of the optical power crosses over, implements a transformation mathematically identical to the Hadamard gate.

A **phase shifter** applies a relative phase to one rail. In silicon photonics, the most common implementation heats the waveguide with a resistive element: silicon's refractive index is temperature-dependent, and a change in refractive index shifts the optical phase of light passing through. Thermo-optic phase shifters are slow (millisecond timescales) but reliable; electro-optic phase shifters using the Pockels effect in lithium niobate on insulator (LNOI) operate at GHz speeds.

Any single-qubit gate — any rotation on the Bloch sphere — can be decomposed into beam splitters and phase shifters. For single-qubit operations, photonic circuits are universal, efficient, and deterministic. The engineering is well-understood, and integrated photonic circuits with hundreds of such elements on a single chip are routinely fabricated.

## The Fundamental Problem: Photons Don't Interact

The trouble begins with two-qubit gates. A CZ gate or CNOT gate requires one qubit to conditionally flip another — the state of the control qubit must influence the evolution of the target. In a superconducting system, this happens because the two transmon qubits are physically coupled through a shared microwave resonator. In a neutral atom system, it happens because Rydberg excitation creates a real interaction that shifts energy levels.

Photons, in vacuum or in a dielectric waveguide, do not interact with each other. Two photons passing through the same beam splitter do not exchange any information unless a nonlinear optical medium mediates an interaction between them. Natural optical nonlinearities — the Kerr effect in glass, for example — are so weak that achieving a π phase shift (the interaction required for a CZ gate) on a single photon requires photon densities that no available medium can sustain without destroying the waveguide.

This is not a temporary engineering problem. It is a fundamental property of quantum electrodynamics in transparent media: the nonlinear interaction between single photons is suppressed by a factor of the fine-structure constant, roughly 1/137, at every order. Engineers have pursued giant optical nonlinearities using cavity quantum electrodynamics — coupling single photons to single atoms or quantum dots inside high-finesse optical cavities — but achieving the coupling strengths required at the single-photon level remains technically demanding and has not yet been demonstrated at the scale needed for programmable computation.

## KLM: Measurement as a Gate

In 2001, Emanuel Knill, Raymond Laflamme, and Gerard Milburn published a theorem that transformed the field: **linear optics, single-photon sources, and photon-number-resolving detectors are sufficient for universal quantum computation**. The insight is that photon measurement — the act of detecting whether a photon is present — is itself a nonlinear operation, and this measurement-induced nonlinearity can substitute for a physical photon-photon interaction.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">MEASUREMENT-BASED TWO-QUBIT GATE (KLM PRINCIPLE)</text>
  <!-- Signal qubits -->
  <text x="50" y="50" text-anchor="middle" font-size="10" font-weight="700" fill="#6b7280">SIGNAL</text>
  <line x1="20" y1="70"  x2="200" y2="70"  stroke="#1d4ed8" stroke-width="2"/>
  <line x1="20" y1="105" x2="200" y2="105" stroke="#1d4ed8" stroke-width="2"/>
  <text x="14" y="74"  text-anchor="end" font-size="10" fill="#1d4ed8">q₁</text>
  <text x="14" y="109" text-anchor="end" font-size="10" fill="#1d4ed8">q₂</text>
  <!-- Ancilla photons -->
  <text x="50" y="135" text-anchor="middle" font-size="10" font-weight="700" fill="#059669">ANCILLA</text>
  <line x1="20" y1="148" x2="200" y2="148" stroke="#059669" stroke-width="1.5" stroke-dasharray="5,2"/>
  <line x1="20" y1="175" x2="200" y2="175" stroke="#059669" stroke-width="1.5" stroke-dasharray="5,2"/>
  <text x="14" y="152" text-anchor="end" font-size="10" fill="#059669">a₁</text>
  <text x="14" y="179" text-anchor="end" font-size="10" fill="#059669">a₂</text>
  <!-- Linear optical network box -->
  <rect x="200" y="52" width="200" height="140" rx="4" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="300" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">Linear Optical</text>
  <text x="300" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">Network</text>
  <text x="300" y="136" text-anchor="middle" font-size="9" fill="#6b7280">(beam splitters +</text>
  <text x="300" y="149" text-anchor="middle" font-size="9" fill="#6b7280">phase shifters)</text>
  <!-- Outputs from network -->
  <line x1="400" y1="80"  x2="480" y2="80"  stroke="#1d4ed8" stroke-width="2"/>
  <line x1="400" y1="115" x2="480" y2="115" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="400" y1="150" x2="480" y2="150" stroke="#059669" stroke-width="1.5"/>
  <line x1="400" y1="177" x2="480" y2="177" stroke="#059669" stroke-width="1.5"/>
  <!-- Detectors on ancilla rails -->
  <rect x="480" y="138" width="36" height="26" rx="3" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="498" y="154" text-anchor="middle" font-size="10" font-weight="700" fill="#92400e">D</text>
  <rect x="480" y="165" width="36" height="26" rx="3" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="498" y="181" text-anchor="middle" font-size="10" font-weight="700" fill="#92400e">D</text>
  <!-- Measurement result feed-forward -->
  <line x1="516" y1="151" x2="570" y2="80" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#arroworange)"/>
  <text x="550" y="130" text-anchor="middle" font-size="9" fill="#d97706">feed-forward</text>
  <text x="550" y="142" text-anchor="middle" font-size="9" fill="#d97706">(classical)</text>
  <!-- Signal outputs -->
  <line x1="480" y1="80"  x2="650" y2="80"  stroke="#1d4ed8" stroke-width="2"/>
  <line x1="480" y1="115" x2="650" y2="115" stroke="#1d4ed8" stroke-width="2"/>
  <text x="655" y="84"  font-size="10" fill="#1d4ed8">q₁ out</text>
  <text x="655" y="119" font-size="10" fill="#1d4ed8">q₂ out</text>
  <!-- Success probability label -->
  <text x="300" y="205" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="700">Gate succeeds with probability p &lt; 1</text>
  <text x="300" y="218" text-anchor="middle" font-size="9" fill="#6b7280">Ancilla measurement outcome determines success/failure</text>
  <defs>
    <marker id="arroworange" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d97706"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — The KLM gate principle. Signal qubits and ancilla photons enter a linear optical network together. Measuring the ancilla outputs collapses the joint state in a way that can, with some probability, implement the desired two-qubit gate on the signal qubits. When the measurement indicates failure, the gate is repeated or the computation is redirected. Feed-forward of classical measurement results enables error correction of gate failures.</figcaption>
</figure>

The original KLM proposal had one severe practical limitation: the success probability of a two-qubit gate with ancilla assistance was low, and boosting it to near-unity required exponentially many ancilla photons. A series of subsequent theoretical advances — most notably measurement-based and cluster-state approaches — replaced the KLM circuit model with a different computational paradigm where the probabilistic nature of photon gates is absorbed into the preparation of a large entangled resource state. Once the resource is built, computation proceeds by adaptive single-photon measurement, and the probabilistic elements are handled offline before the computation begins.

## Fusion-Based Quantum Computing: The PsiQuantum Approach

PsiQuantum's architecture, developed by founders Jeremy O'Brien, Terry Rudolph, Pete Shadbolt, and Mark Thompson, is built on a specific variant of this idea called **fusion-based quantum computing (FBQC)**.

The core primitive is a **fusion gate** — a two-photon Bell measurement implemented by a beam splitter and two photon detectors. A Type-II fusion gate succeeds with probability 50%, and when it fails, the measurement result reveals which of four possible outcomes occurred. Small entangled states called **resource states** — clusters of 4–6 photons prepared deterministically by a dedicated sub-circuit — are fused together by fusion gates to build a large cluster state, which is then consumed by single-photon measurements to execute the computation.

The probabilistic nature of fusion gates turns out to be manageable: because you know which fusions failed (from the detector outcomes), you can treat failed fusions as erasure errors — errors with known locations — and design the error-correcting code to tolerate a certain fraction of them. Analysis shows that fusion-based quantum computers can tolerate fusion success probabilities as low as about 73%, well above the 50% baseline, by using redundant resource states and classical post-processing.

The entire stack — resource state generators, fusion circuits, detectors — is designed to be manufacturable in a silicon photonic process, which is why PsiQuantum's partnership with GlobalFoundries is central to their roadmap. The argument is that once the per-component error rates hit the required thresholds, industrial-scale fabrication can produce the millions of components required for a fault-tolerant machine without the yield problems that would plague bespoke quantum hardware.

## Gaussian Boson Sampling: The Xanadu Approach

Xanadu, the Canadian photonic quantum computing company, takes a different architectural route. Rather than encoding information in single-photon dual-rail qubits, they work in the **continuous-variable (CV)** regime, encoding quantum information in the quadratures of the electromagnetic field — the quantum analogues of the position and momentum of a harmonic oscillator.

The resource states in Xanadu's architecture are **squeezed states of light**: quantum states where the uncertainty in one field quadrature is reduced below the vacuum level at the expense of increased uncertainty in the conjugate quadrature. Squeezed states are generated by non-linear optical processes (optical parametric oscillation) and are well-understood in quantum optics. Gaussian operations on these states — beam splitters and phase shifters — are all that is needed for the CV equivalent of single-qubit gates.

In 2022, Xanadu demonstrated **Borealis**, a 216-mode programmable Gaussian boson sampling (GBS) machine. GBS is a computational task — sampling from the output distribution of a specific linear optical circuit acting on squeezed states — that is believed to be hard for classical computers. Xanadu claimed quantum computational advantage on this task, an argument that is ongoing in the academic literature, though most reviewers accept that Borealis is in a regime where exact classical simulation is not currently feasible.

The path from GBS to universal fault-tolerant computation in the CV model requires the addition of non-Gaussian resource states — specifically **GKP (Gottesman-Kitaev-Preskill) states**, which are superpositions of coherent states on a grid in phase space. These are extraordinarily difficult to produce and remain a frontier of experimental physics rather than a commercial capability.

## Silicon Photonics: The Manufacturing Argument

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">SILICON PHOTONIC CHIP — KEY COMPONENTS</text>
  <!-- Chip substrate -->
  <rect x="20" y="35" width="640" height="160" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
  <!-- BOX layer -->
  <rect x="20" y="155" width="640" height="40" rx="0" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="340" y="180" text-anchor="middle" font-size="10" fill="#64748b">Silicon substrate + buried oxide (BOX)</text>
  <!-- Waveguide -->
  <rect x="60" y="125" width="130" height="20" rx="3" fill="#1d4ed8"/>
  <text x="125" y="139" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">Si waveguide</text>
  <text x="125" y="155" text-anchor="middle" font-size="8" fill="#64748b">500 × 220 nm</text>
  <!-- Directional coupler (beam splitter) -->
  <rect x="220" y="108" width="120" height="16" rx="2" fill="#1d4ed8"/>
  <rect x="220" y="134" width="120" height="16" rx="2" fill="#1d4ed8"/>
  <text x="280" y="100" text-anchor="middle" font-size="9" font-weight="700" fill="#1d4ed8">Directional Coupler</text>
  <text x="280" y="160" text-anchor="middle" font-size="8" fill="#64748b">(beam splitter)</text>
  <!-- Gap label -->
  <line x1="240" y1="124" x2="240" y2="134" stroke="#dc2626" stroke-width="1" stroke-dasharray="2,1"/>
  <text x="218" y="131" text-anchor="end" font-size="8" fill="#dc2626">gap ~100 nm</text>
  <!-- Phase shifter -->
  <rect x="375" y="112" width="80" height="28" rx="3" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="415" y="124" text-anchor="middle" font-size="9" font-weight="700" fill="#92400e">Phase</text>
  <text x="415" y="136" text-anchor="middle" font-size="9" font-weight="700" fill="#92400e">Shifter</text>
  <text x="415" y="155" text-anchor="middle" font-size="8" fill="#64748b">thermo-optic</text>
  <!-- Grating coupler -->
  <rect x="490" y="55" width="80" height="50" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="530" y="76" text-anchor="middle" font-size="9" font-weight="700" fill="#166534">Grating</text>
  <text x="530" y="89" text-anchor="middle" font-size="9" font-weight="700" fill="#166534">Coupler</text>
  <text x="530" y="115" text-anchor="middle" font-size="8" fill="#64748b">fibre I/O</text>
  <!-- Fibre arrow -->
  <line x1="530" y1="55" x2="530" y2="40" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="530" y="34" text-anchor="middle" font-size="9" fill="#16a34a">optical fibre</text>
  <!-- SNSPD detector -->
  <rect x="580" y="108" width="68" height="40" rx="3" fill="#fce7f3" stroke="#9d174d" stroke-width="1.5"/>
  <text x="614" y="123" text-anchor="middle" font-size="8" font-weight="700" fill="#9d174d">SNSPD</text>
  <text x="614" y="135" text-anchor="middle" font-size="8" fill="#9d174d">detector</text>
  <text x="614" y="155" text-anchor="middle" font-size="8" fill="#64748b">cooled to ~3 K</text>
  <!-- Connecting waveguide lines -->
  <line x1="190" y1="125" x2="220" y2="116" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="340" y1="116" x2="375" y2="126" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="455" y1="126" x2="580" y2="128" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="490" y1="105" x2="490" y2="125" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="3,2"/>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — Key components of a silicon photonic quantum chip. Silicon waveguides (500 × 220 nm) guide photons on-chip. Directional couplers with a ~100 nm gap implement beam splitters by evanescent coupling. Thermo-optic phase shifters tune the optical phase. Grating couplers couple light in and out of optical fibre. SNSPDs (superconducting nanowire single-photon detectors) provide near-unity-efficiency photon detection but require cooling to ~3 K.</figcaption>
</figure>

A silicon photonic waveguide confines light in a silicon ridge 500 nm wide and 220 nm tall, surrounded by silicon dioxide cladding. The high index contrast between silicon (n ≈ 3.47) and oxide (n ≈ 1.44) at 1550 nm confines the optical mode to a sub-micrometre cross-section — tight enough that waveguides can be routed at micrometre pitch without cross-coupling. The same lithographic tools used to pattern 7 nm transistors can define these structures with nanometre precision.

The manufacturing case comes down to component count. A fault-tolerant quantum computer using fusion-based quantum computing is estimated to require on the order of 10⁹ to 10¹² photonic components — beam splitters, phase shifters, detectors, photon sources — per logical qubit rack. No bespoke quantum hardware process can reach that scale. Silicon CMOS fabs routinely fabricate billions of transistors per chip. The argument is that the same yield engineering, process control, and unit economics that make modern silicon chips affordable will, eventually, make photonic quantum processors affordable — provided the error rates of individual photonic components fall within fault-tolerance thresholds.

## How the Platforms Compare

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 238" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="34" rx="4" fill="#111827"/>
  <text x="340" y="22" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">PLATFORM COMPARISON: FOUR-WAY</text>
  <rect x="0" y="34" width="680" height="28" fill="#f9fafb"/>
  <text x="130" y="52" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.05em" fill="#6b7280">METRIC</text>
  <text x="290" y="52" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#1d4ed8">SUPERCONDUCTING</text>
  <text x="415" y="52" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#7c3aed">TRAPPED ION</text>
  <text x="530" y="52" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#059669">NEUTRAL ATOM</text>
  <text x="630" y="52" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#9d174d">PHOTONIC</text>
  <line x1="0" y1="62" x2="680" y2="62" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="62" width="680" height="28" fill="#fff"/>
  <text x="130" y="80" text-anchor="middle" font-size="10" fill="#111827">Qubit medium</text>
  <text x="290" y="80" text-anchor="middle" font-size="10" fill="#1d4ed8">Josephson circuit</text>
  <text x="415" y="80" text-anchor="middle" font-size="10" fill="#7c3aed">Atomic levels</text>
  <text x="530" y="80" text-anchor="middle" font-size="10" fill="#059669">Atomic levels</text>
  <text x="630" y="80" text-anchor="middle" font-size="10" fill="#9d174d">Photon modes</text>
  <line x1="0" y1="90" x2="680" y2="90" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="90" width="680" height="28" fill="#f9fafb"/>
  <text x="130" y="108" text-anchor="middle" font-size="10" fill="#111827">Operating temp.</text>
  <text x="290" y="108" text-anchor="middle" font-size="10" fill="#1d4ed8">10–20 mK</text>
  <text x="415" y="108" text-anchor="middle" font-size="10" fill="#7c3aed">Room temp.</text>
  <text x="530" y="108" text-anchor="middle" font-size="10" fill="#059669">Room temp.</text>
  <text x="630" y="108" text-anchor="middle" font-size="10" fill="#9d174d" font-weight="700">Room temp.*</text>
  <line x1="0" y1="118" x2="680" y2="118" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="118" width="680" height="28" fill="#fff"/>
  <text x="130" y="136" text-anchor="middle" font-size="10" fill="#111827">Gate speed</text>
  <text x="290" y="136" text-anchor="middle" font-size="10" fill="#1d4ed8" font-weight="700">10–400 ns</text>
  <text x="415" y="136" text-anchor="middle" font-size="10" fill="#7c3aed">1–100 µs</text>
  <text x="530" y="136" text-anchor="middle" font-size="10" fill="#059669">0.1–1 µs</text>
  <text x="630" y="136" text-anchor="middle" font-size="10" fill="#9d174d">~1 ns (photon)</text>
  <line x1="0" y1="146" x2="680" y2="146" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="146" width="680" height="28" fill="#f9fafb"/>
  <text x="130" y="164" text-anchor="middle" font-size="10" fill="#111827">2-qubit gate type</text>
  <text x="290" y="164" text-anchor="middle" font-size="10" fill="#1d4ed8">Deterministic</text>
  <text x="415" y="164" text-anchor="middle" font-size="10" fill="#7c3aed">Deterministic</text>
  <text x="530" y="164" text-anchor="middle" font-size="10" fill="#059669">Deterministic</text>
  <text x="630" y="164" text-anchor="middle" font-size="10" fill="#dc2626">Probabilistic</text>
  <line x1="0" y1="174" x2="680" y2="174" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="174" width="680" height="28" fill="#fff"/>
  <text x="130" y="192" text-anchor="middle" font-size="10" fill="#111827">Scaling path</text>
  <text x="290" y="192" text-anchor="middle" font-size="10" fill="#1d4ed8">Cryo wiring</text>
  <text x="415" y="192" text-anchor="middle" font-size="10" fill="#7c3aed">Trap modules</text>
  <text x="530" y="192" text-anchor="middle" font-size="10" fill="#059669">Tweezer count</text>
  <text x="630" y="192" text-anchor="middle" font-size="10" fill="#9d174d" font-weight="700">CMOS fab</text>
  <line x1="0" y1="202" x2="680" y2="202" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="202" width="680" height="36" fill="#f9fafb"/>
  <text x="630" y="228" text-anchor="middle" font-size="8" fill="#64748b">*Detectors require ~3 K</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 4 — Four-way platform comparison. Photonic systems are unique in operating room temperature (modulo detector cooling), having the fastest individual photon transit times, and offering a CMOS fab scaling path. The fundamental distinguishing disadvantage is the probabilistic nature of photon-photon interactions — two-qubit gates cannot be made deterministic without either a very strong optical nonlinearity or a measurement-based workaround.</figcaption>
</figure>

## What Remains Hard

Photonic quantum computing has several unsolved engineering challenges that other platforms do not share.

**On-demand single-photon sources.** A photonic quantum computer requires single, indistinguishable photons produced on demand — the same photon wavepacket, with the same frequency, polarisation, and timing, every time. Spontaneous parametric down-conversion (SPDC) sources produce photon pairs probabilistically — useful for heralded single photons but intrinsically non-deterministic. Quantum dot sources, particularly InAs dots in photonic crystal cavities, produce on-demand photons with indistinguishability above 99% but require cryogenic cooling and remain difficult to manufacture with consistent frequency. The absence of a deterministic, room-temperature, wafer-scale single-photon source is the single largest gap between current demonstrations and the PsiQuantum roadmap.

**Photon loss.** Every optical component — a coupler, a phase shifter, a detector — introduces some insertion loss. In a classical optical system, loss is compensated by amplification. Amplifying a single quantum photon without measuring it is forbidden by the no-cloning theorem. Loss in a photonic quantum computer is therefore an error, and it accumulates across every component in the circuit. Current silicon photonic waveguide propagation losses are around 1–3 dB/cm — acceptable for small circuits but formidable across the thousands of components a fault-tolerant computation would require.

**Detector efficiency and dark counts.** Superconducting nanowire single-photon detectors (SNSPDs) achieve detection efficiencies above 98% with negligible dark counts, but they require cooling to 3 K and cannot yet be integrated directly on silicon photonic chips at high density. Room-temperature single-photon avalanche diodes (SPADs) are detectable on silicon but have lower efficiency and higher noise. Integrating efficient cryogenic detectors at the density required for a million-component circuit remains unsolved.

**The gap between quantum advantage and useful computation.** Xanadu's Borealis demonstrates quantum advantage in Gaussian boson sampling — but GBS, in its current form, does not directly solve problems of commercial value. The path from demonstrating sampling advantage to performing fault-tolerant universal computation requires non-Gaussian resource states (GKP states), which are extraordinarily difficult to prepare with the fidelity needed for error correction. PsiQuantum's approach sidesteps this by targeting fault-tolerant computation directly from the start, rather than claiming intermediate advantage — but this raises the bar for the first demonstration considerably.

## The Long Game

Photonic quantum computing is the platform most explicitly designed for scale rather than near-term performance. PsiQuantum has never claimed to be competitive on NISQ benchmarks — small-scale variational algorithms, sampling experiments, or quantum simulation tasks. Their argument is binary: either silicon photonics reaches the component quality thresholds required for fault-tolerant computation, in which case CMOS fabrication gives them an insurmountable manufacturing advantage over every other platform, or it does not, in which case the company's primary bet fails.

This framing is unusual in the quantum hardware landscape, where most competitors point to current demonstrations as evidence of progress. PsiQuantum's progress is largely invisible precisely because their milestones are component-level — single-photon source indistinguishability, waveguide propagation loss, detector efficiency — rather than system-level qubit counts. Whether that invisibility reflects genuine progress toward a transformative threshold or a bet that has not yet paid off is, as of mid-2024, genuinely uncertain.

What is not uncertain is that if the component challenges are solved, photons offer something no other qubit platform does: a computational substrate that travels at the speed of light, connects naturally to global fibre infrastructure, and can be manufactured by an industry that has already demonstrated the ability to put billions of transistors on a chip.

The physics of photons is not the constraint. Whether the engineering follows is the open question.
