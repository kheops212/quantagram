---
title: 'Quantum Gates Explained: The Logic Behind Quantum Circuits'
description: 'A practical deep-dive into quantum gates — the Hadamard, Pauli, and CNOT operations — and how combining just two of them creates entanglement, the most powerful resource in quantum computing.'
pubDate: 'Nov 14 2023'
heroImage: '../../assets/hero-quantum-gates.svg'
pillar: 'Quantum Algorithms'
author: 'KhGh'
tags: ['quantum gates', 'entanglement', 'quantum circuits', 'beginners']
series: 'Quantum 101'
seriesOrder: 2
sources:
  - title: 'Quantum Computation and Quantum Information (10th Anniversary Edition)'
    authors: 'Michael A. Nielsen, Isaac L. Chuang'
    venue: 'Cambridge University Press'
    year: 2010
  - title: 'Elementary Gates for Quantum Computation'
    authors: 'Adriano Barenco, Charles H. Bennett, et al.'
    venue: 'Physical Review A 52, 3457; arXiv:quant-ph/9503016'
    year: 1995
    url: 'https://arxiv.org/abs/quant-ph/9503016'
  - title: 'The Physical Implementation of Quantum Computation'
    authors: 'David P. DiVincenzo'
    venue: 'Fortschritte der Physik 48; arXiv:quant-ph/0002077'
    year: 2000
    url: 'https://arxiv.org/abs/quant-ph/0002077'
---

In Part 1 of this series we established that quantum computers use qubits — particles that can exist in superposition, encoding 0 and 1 simultaneously. We saw a variational quantum circuit containing Hadamard gates, rotation gates, and CNOT gates, and noted that these are the trainable operations at the heart of quantum machine learning. But what do those gates *actually do*? How does a Hadamard gate create superposition, and why does a CNOT gate produce entanglement?

This article opens the hood. By the end you will have a clear mental model of how quantum gates manipulate qubit states — and why that manipulation is computationally extraordinary.

## Gates as Rotations in State Space

In classical computing, a logic gate takes one or more bits and produces a fixed output: AND, OR, NOT. Quantum gates differ in two fundamental ways.

First, all quantum gates are **reversible**. Given the output, you can always reconstruct the input. This is not a design choice — it is a consequence of quantum mechanics itself. The mathematics describing quantum evolution is inherently invertible.

Second, quantum gates are **rotations**. The state of a single qubit can be visualised as a point on the surface of a unit sphere called the **Bloch sphere**. The north pole represents |0⟩; the south pole represents |1⟩; points on the equator represent superpositions of both. A quantum gate is a rotation that moves this point around the sphere.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;display:block;font-family:inherit">
  <!-- Sphere outline -->
  <ellipse cx="200" cy="130" rx="110" ry="110" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Equator (dashed) -->
  <ellipse cx="200" cy="130" rx="110" ry="28" fill="none" stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Axes -->
  <line x1="200" y1="20"  x2="200" y2="240" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="90"  y1="130" x2="310" y2="130" stroke="#e5e7eb" stroke-width="1"/>
  <!-- |0⟩ state at north pole -->
  <circle cx="200" cy="22" r="5" fill="#1d4ed8"/>
  <text x="214" y="27" font-size="14" font-weight="700" fill="#1d4ed8">|0⟩</text>
  <!-- |1⟩ state at south pole -->
  <circle cx="200" cy="238" r="5" fill="#111827"/>
  <text x="214" y="243" font-size="14" font-weight="700" fill="#111827">|1⟩</text>
  <!-- |+⟩ on equator -->
  <circle cx="310" cy="130" r="5" fill="#dc2626"/>
  <text x="318" y="135" font-size="13" font-weight="700" fill="#dc2626">|+⟩</text>
  <!-- H gate rotation arrow -->
  <path d="M 200,27 Q 270,60 305,125" fill="none" stroke="#1d4ed8" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="300,122 310,128 303,134" fill="#1d4ed8"/>
  <!-- H gate label on arrow -->
  <text x="268" y="80" font-size="13" font-weight="700" fill="#1d4ed8">H</text>
  <!-- Axis labels -->
  <text x="196" y="16" font-size="11" fill="#6b7280" text-anchor="middle">Z</text>
  <text x="318" y="154" font-size="11" fill="#6b7280">X</text>
  <!-- Key -->
  <rect x="370" y="60" width="170" height="130" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1"/>
  <text x="455" y="82" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.06em" fill="#6b7280">BLOCH SPHERE</text>
  <circle cx="390" cy="104" r="5" fill="#1d4ed8"/>
  <text x="402" y="108" font-size="12" fill="#111827">|0⟩  — north pole</text>
  <circle cx="390" cy="128" r="5" fill="#111827"/>
  <text x="402" y="132" font-size="12" fill="#111827">|1⟩  — south pole</text>
  <circle cx="390" cy="152" r="5" fill="#dc2626"/>
  <text x="402" y="156" font-size="12" fill="#111827">|+⟩ — equator</text>
  <line x1="382" y1="174" x2="396" y2="174" stroke="#1d4ed8" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="402" y="178" font-size="12" fill="#111827">H gate rotation</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — The Bloch sphere. Every pure qubit state is a point on the surface. The Hadamard gate (H) rotates the state from the north pole |0⟩ to the equator, creating equal superposition |+⟩ = (|0⟩ + |1⟩)/√2.</figcaption>
</figure>

This geometric picture is more than a metaphor. Every single-qubit gate corresponds to a specific rotation around one of the sphere's axes. Understanding which rotation does what is the foundation of circuit design.

## The Hadamard Gate: Creating Superposition

The most important single-qubit gate is the **Hadamard gate**, written as H. As Part 1 showed, every qubit in a variational circuit typically begins with one.

H rotates the north pole |0⟩ to the equator — creating a state of exactly equal superposition: a 50/50 probability of measuring 0 or 1. Applied twice, H undoes itself and the qubit returns to |0⟩. This self-reversing property is not a coincidence; it reflects the fact that rotating 180° twice returns you to the start.

The practical consequence: H gives quantum algorithms access to all possible inputs at once. Rather than evaluating a function for each input one at a time, a quantum computer with H-initialised qubits probes all inputs simultaneously — a property called **quantum parallelism**.

## The Pauli Gates: Flips and Phase Shifts

The Pauli family — X, Y, Z — are the three fundamental rotations of the Bloch sphere.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <!-- Header row -->
  <rect x="0" y="0" width="680" height="38" fill="#111827" rx="4"/>
  <text x="60"  y="24" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">GATE</text>
  <text x="195" y="24" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">INPUT</text>
  <text x="370" y="24" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">OUTPUT</text>
  <text x="570" y="24" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">EFFECT</text>
  <!-- Row 1: X gate -->
  <rect x="0" y="40" width="680" height="48" fill="#fff"/>
  <rect x="28" y="52" width="64" height="24" rx="3" fill="#1d4ed8"/>
  <text x="60" y="69" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">X</text>
  <text x="160" y="69" text-anchor="middle" font-size="14" fill="#111827">|0⟩  →</text>
  <text x="250" y="69" text-anchor="middle" font-size="14" fill="#111827">|1⟩</text>
  <text x="160" y="83" text-anchor="middle" font-size="14" fill="#111827">|1⟩  →</text>
  <text x="250" y="83" text-anchor="middle" font-size="14" fill="#111827">|0⟩</text>
  <text x="570" y="70" text-anchor="middle" font-size="13" fill="#6b7280">Quantum NOT — flips |0⟩ ↔ |1⟩</text>
  <line x1="0" y1="88" x2="680" y2="88" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 2: H gate -->
  <rect x="0" y="90" width="680" height="48" fill="#f9fafb"/>
  <rect x="28" y="102" width="64" height="24" rx="3" fill="#1d4ed8"/>
  <text x="60" y="119" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">H</text>
  <text x="160" y="116" text-anchor="middle" font-size="14" fill="#111827">|0⟩  →</text>
  <text x="264" y="116" text-anchor="middle" font-size="13" fill="#111827">(|0⟩+|1⟩)/√2</text>
  <text x="160" y="132" text-anchor="middle" font-size="14" fill="#111827">|1⟩  →</text>
  <text x="264" y="132" text-anchor="middle" font-size="13" fill="#111827">(|0⟩−|1⟩)/√2</text>
  <text x="570" y="128" text-anchor="middle" font-size="13" fill="#6b7280">Creates equal superposition</text>
  <line x1="0" y1="138" x2="680" y2="138" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 3: Z gate -->
  <rect x="0" y="140" width="680" height="48" fill="#fff"/>
  <rect x="28" y="152" width="64" height="24" rx="3" fill="#1d4ed8"/>
  <text x="60" y="169" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">Z</text>
  <text x="160" y="166" text-anchor="middle" font-size="14" fill="#111827">|0⟩  →</text>
  <text x="250" y="166" text-anchor="middle" font-size="14" fill="#111827">|0⟩</text>
  <text x="160" y="182" text-anchor="middle" font-size="14" fill="#111827">|1⟩  →</text>
  <text x="250" y="182" text-anchor="middle" font-size="14" fill="#111827">−|1⟩</text>
  <text x="570" y="170" text-anchor="middle" font-size="13" fill="#6b7280">Phase flip — sign of |1⟩ inverted</text>
  <text x="570" y="185" text-anchor="middle" font-size="12" fill="#6b7280">affects interference, not probability</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — The three most common single-qubit gates. The Z gate's phase flip does not change measurement probabilities directly but alters how states interfere — the mechanism by which quantum algorithms amplify correct answers.</figcaption>
</figure>

The Z gate deserves particular attention. Its output — adding a negative sign to |1⟩ — seems invisible, since measuring the qubit still yields 0 or 1 with the same probabilities. The phase only becomes observable when combined with subsequent gates that create interference. This is exactly how quantum algorithms work: carefully orchestrated phase relationships cancel out wrong answers and reinforce correct ones.

## CNOT: The Two-Qubit Gate That Creates Entanglement

The CNOT (Controlled-NOT) gate operates on two qubits — a **control** and a **target**. The rule is simple: if the control is |0⟩, leave the target alone; if the control is |1⟩, flip the target.

As a classical truth table, this is unremarkable. The quantum version changes everything. When the control qubit is in superposition — say, the equal superposition produced by H — the CNOT gate does not pick one branch. It processes both simultaneously. The result is a joint state that cannot be written as two independent qubits. The two particles are **entangled**.

## The Bell State: Entanglement from Two Gates

The canonical demonstration of entanglement uses exactly two gates applied to two qubits starting in |00⟩.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <!-- Step labels -->
  <text x="100" y="18" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.07em" fill="#6b7280">STEP 1: H GATE</text>
  <text x="280" y="18" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.07em" fill="#6b7280">STEP 2: CNOT</text>
  <text x="500" y="18" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.07em" fill="#6b7280">OUTPUT STATE</text>
  <!-- Qubit lines -->
  <line x1="30" y1="75"  x2="440" y2="75"  stroke="#e5e7eb" stroke-width="1.5"/>
  <line x1="30" y1="145" x2="440" y2="145" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Initial labels -->
  <text x="24" y="79"  text-anchor="end" font-size="13" font-weight="700" fill="#111827">q₁</text>
  <text x="24" y="149" text-anchor="end" font-size="13" font-weight="700" fill="#111827">q₂</text>
  <text x="26" y="93"  text-anchor="end" font-size="11" fill="#6b7280">|0⟩</text>
  <text x="26" y="163" text-anchor="end" font-size="11" fill="#6b7280">|0⟩</text>
  <!-- H gate on q1 -->
  <rect x="60" y="62" width="36" height="26" rx="3" fill="#1d4ed8"/>
  <text x="78" y="80" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">H</text>
  <!-- State after H -->
  <text x="115" y="69" font-size="11" fill="#1d4ed8" font-weight="600">|0⟩+|1⟩</text>
  <text x="124" y="80" font-size="11" fill="#1d4ed8">───</text>
  <text x="124" y="90" font-size="11" fill="#1d4ed8" font-weight="600">  √2</text>
  <text x="115" y="149" font-size="11" fill="#6b7280">|0⟩</text>
  <!-- CNOT gate -->
  <circle cx="295" cy="75" r="7" fill="#111827"/>
  <line x1="295" y1="82" x2="295" y2="133" stroke="#111827" stroke-width="1.5"/>
  <circle cx="295" cy="145" r="13" fill="none" stroke="#111827" stroke-width="1.5"/>
  <line x1="282" y1="145" x2="308" y2="145" stroke="#111827" stroke-width="1.5"/>
  <line x1="295" y1="132" x2="295" y2="158" stroke="#111827" stroke-width="1.5"/>
  <!-- Divider -->
  <line x1="450" y1="30" x2="450" y2="185" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- Bell state output box -->
  <rect x="460" y="50" width="210" height="120" rx="4" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="565" y="75" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.06em" fill="#1d4ed8">BELL STATE  |Φ⁺⟩</text>
  <text x="565" y="102" text-anchor="middle" font-size="18" font-weight="800" fill="#111827">|00⟩ + |11⟩</text>
  <line x1="490" y1="107" x2="640" y2="107" stroke="#1d4ed8" stroke-width="1"/>
  <text x="565" y="120" text-anchor="middle" font-size="15" fill="#111827">√2</text>
  <text x="565" y="148" text-anchor="middle" font-size="11" fill="#6b7280">50% chance of |00⟩</text>
  <text x="565" y="163" text-anchor="middle" font-size="11" fill="#6b7280">50% chance of |11⟩  — never |01⟩ or |10⟩</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — The Bell state circuit. H creates superposition on q₁; CNOT entangles q₁ and q₂. The output is the maximally entangled state |Φ⁺⟩ — measuring either qubit instantly determines the other, wherever it is.</figcaption>
</figure>

The result — (|00⟩ + |11⟩)/√2 — is called a **Bell state**, and it is maximally entangled. Measure q₁ and find 0: you instantly know q₂ is also 0. Find 1: q₂ is 1. The two qubits never disagree, regardless of the distance between them.

For quantum machine learning, entanglement is not a curiosity — it is a resource. Entangled qubits encode correlations between features of a dataset that would require exponentially many parameters to represent classically. When a variational quantum circuit creates and manipulates entanglement, it is exploring a feature space that no classical network can efficiently replicate.

## From Gates to Algorithms

Every quantum algorithm is a carefully designed sequence of these operations. Grover's algorithm uses H gates to initialise superposition, a phase oracle to mark the target state, and a sequence of reflections using H and Z gates to amplify the probability of finding the correct answer in √N steps instead of N.

In Part 3 of this series, we will trace Grover's algorithm step by step — following a single search problem through the full circuit and watching the probability of the correct answer grow from 1/N to near 1, in just a handful of gate applications.

Quantum gates are not magic. They are precise rotations in a well-defined mathematical space. The power emerges not from any single gate, but from the structure of what they do together — amplifying signal, cancelling noise, and exploiting correlations that exist nowhere in classical computation.
