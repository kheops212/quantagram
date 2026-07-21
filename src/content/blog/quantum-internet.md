---
title: "The Quantum Internet: How Entanglement Will Rewire Global Communication"
description: "The quantum internet is not a faster version of the internet we have. It is a parallel communication layer built on entanglement — and it will enable capabilities that classical physics makes impossible."
pubDate: 'Jul 15 2022'
heroImage: '../../assets/hero-quantum-internet.svg'
pillar: 'Future Tech'
author: 'KhGh'
tags: ['quantum internet', 'QKD', 'quantum networking', 'entanglement', 'future tech']
sources:
  - title: 'The Quantum Internet'
    authors: 'H. J. Kimble'
    venue: 'Nature 453, 1023; arXiv:0806.4195'
    year: 2008
    url: 'https://arxiv.org/abs/0806.4195'
  - title: 'Quantum Internet: A Vision for the Road Ahead'
    authors: 'Stephanie Wehner, David Elkouss, Ronald Hanson'
    venue: 'Science 362, eaam9288'
    year: 2018
    url: 'https://www.science.org/doi/10.1126/science.aam9288'
  - title: 'Satellite-Based Entanglement Distribution Over 1200 Kilometers'
    authors: 'Juan Yin, Yuan Cao, et al.'
    venue: 'Science 356, 1140'
    year: 2017
    url: 'https://www.science.org/doi/10.1126/science.aan3211'
---

When people hear "quantum internet," they typically assume it means a faster internet. It does not. Quantum networks will not stream video more smoothly or reduce the latency of your video calls. What they will do is something far stranger and more consequential: distribute entanglement across physical distances, enabling communication tasks that are provably impossible with any classical technology.

This is not engineering hyperbole. It is a statement with a mathematical proof behind it. The quantum internet is a genuinely new layer of global infrastructure — and the first pieces of it are already being built.

## What Makes It Fundamentally Different

The classical internet transmits information by encoding it as electromagnetic signals — light pulses in fibre, radio waves through the air — and routing copies of those signals through a global network of switches and amplifiers. The ability to copy is central to how it works. Routers read, duplicate, and forward data billions of times per second.

Quantum information cannot be copied. This is the **no-cloning theorem**, one of the most important results in quantum mechanics: an arbitrary unknown quantum state cannot be perfectly duplicated. This single fact makes classical internet architecture completely inapplicable to quantum communication.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 195" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="170" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">CLASSICAL REPEATER</text>
  <text x="510" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#1d4ed8">QUANTUM REPEATER</text>
  <line x1="340" y1="0" x2="340" y2="195" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="5,3"/>
  <!-- Classical side -->
  <circle cx="40"  cy="95" r="18" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="40"  cy="95" text-anchor="middle" font-size="11" fill="#111827" dy="4">A</text>
  <circle cx="170" cy="95" r="18" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="170" cy="95" text-anchor="middle" font-size="10" fill="#6b7280" dy="4">amp</text>
  <circle cx="300" cy="95" r="18" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="300" cy="95" text-anchor="middle" font-size="11" fill="#111827" dy="4">B</text>
  <line x1="58" y1="95" x2="152" y2="95" stroke="#e5e7eb" stroke-width="2"/>
  <line x1="188" y1="95" x2="282" y2="95" stroke="#e5e7eb" stroke-width="2"/>
  <text x="170" y="130" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="600">✓ copies &amp; amplifies signal</text>
  <text x="170" y="147" text-anchor="middle" font-size="10" fill="#6b7280">works at continental scale</text>
  <!-- Quantum side -->
  <circle cx="380" cy="95" r="18" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="380" cy="95" text-anchor="middle" font-size="11" fill="#1d4ed8" dy="4">A</text>
  <rect x="455" y="77" width="60" height="36" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="485" y="93" text-anchor="middle" font-size="9" fill="#111827">Bell</text>
  <text x="485" y="106" text-anchor="middle" font-size="9" fill="#111827">measure</text>
  <circle cx="640" cy="95" r="18" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="640" cy="95" text-anchor="middle" font-size="11" fill="#1d4ed8" dy="4">B</text>
  <!-- Entangled pairs wavy lines -->
  <path d="M 398,88 C 415,80 430,70 455,80" fill="none" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="4,2"/>
  <path d="M 515,80 C 540,70 580,78 622,88" fill="none" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="430" y="65" text-anchor="middle" font-size="9" fill="#1d4ed8">entangled pair</text>
  <text x="570" y="65" text-anchor="middle" font-size="9" fill="#1d4ed8">entangled pair</text>
  <text x="510" y="130" text-anchor="middle" font-size="11" fill="#dc2626" font-weight="600">✗ cannot copy quantum state</text>
  <text x="510" y="147" text-anchor="middle" font-size="10" fill="#6b7280">must teleport via entanglement swap</text>
  <!-- 2 classical bits -->
  <path d="M 485,113 L 485,155 L 620,155 L 620,113" fill="none" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="555" y="170" text-anchor="middle" font-size="9" fill="#6b7280">+ 2 classical bits</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — Classical repeaters amplify and copy signals freely. Quantum repeaters cannot copy quantum states (no-cloning theorem) and must instead perform entanglement swapping — a Bell measurement plus two classical bits — to extend entanglement across each segment.</figcaption>
</figure>

Instead of copying, quantum networks use **entanglement swapping** and **quantum teleportation** to extend entanglement across distances. A quantum repeater node holds a pair of entangled qubits — one facing each direction in the network — performs a Bell measurement that fuses the entanglement, and transmits the classical result to the endpoint. The quantum state is never copied; it is transferred. This distinction is not semantic. It is physically enforced.

## Quantum Key Distribution: The First Application

The most mature application of quantum networking is **quantum key distribution (QKD)**: using the quantum channel to establish cryptographic keys whose security is guaranteed by physics rather than computational hardness. As covered in this publication's article on post-quantum cryptography, RSA and ECC are vulnerable to Shor's algorithm. QKD offers an alternative that no quantum computer can break — because an eavesdropper physically disturbs the quantum channel and can be detected.

The BB84 protocol, proposed by Bennett and Brassard in 1984, encodes key bits in the polarisation states of individual photons. Any attempt to intercept a photon and measure it collapses its quantum state, introducing detectable errors in the key. The communicating parties compare a sample of their results; if the error rate is below a threshold, they know the channel is secure.

QKD networks are operational today. China has deployed a 2,000-kilometre ground-based QKD backbone between Beijing and Shanghai, and its **Micius satellite** has demonstrated intercontinental QKD between China and Austria at a distance of 7,600 kilometres. The European Quantum Internet Alliance is funding metropolitan QKD networks in Madrid, Amsterdam, and London. The US Department of Energy operates a 52-node quantum network testbed connecting national laboratories.

## The Quantum Repeater Problem

QKD through fibre is limited by photon loss. Optical fibres attenuate signals exponentially; beyond roughly 300 kilometres, the loss rate makes quantum communication impractical without repeaters. Building a truly global quantum network requires quantum repeaters that can extend entanglement across arbitrary distances.

This is the central unsolved engineering challenge of the quantum internet. Unlike classical amplifiers, quantum repeaters must store entangled states in **quantum memories** — physical systems that hold quantum states for long enough to synchronise operations across the network. The requirements are severe: high efficiency, long coherence times, and compatibility with telecommunications wavelengths.

Several approaches are being pursued: nitrogen-vacancy centres in diamond, rare-earth atoms in crystal, and atomic ensembles using electromagnetically induced transparency. Each has demonstrated pieces of the required functionality in the laboratory. None has yet delivered a repeater capable of operating in a deployed network at the required fidelity and speed. This is where the next decade of quantum networking research will be fought.

## A Layered Architecture

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="38" rx="4" fill="#111827"/>
  <text x="340" y="24" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">QUANTUM INTERNET APPLICATION STACK</text>
  <!-- Layers bottom to top -->
  <rect x="10" y="48"  width="660" height="34" rx="3" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1"/>
  <text x="340" y="61" text-anchor="middle" font-size="11" font-weight="700" fill="#6b7280">PHYSICAL LAYER</text>
  <text x="340" y="75" text-anchor="middle" font-size="10" fill="#6b7280">Photon transmission — fibre optic, free-space, satellite</text>
  <rect x="10" y="88"  width="660" height="34" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1"/>
  <text x="340" y="101" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">ENTANGLEMENT DISTRIBUTION</text>
  <text x="340" y="115" text-anchor="middle" font-size="10" fill="#6b7280">Quantum repeaters, entanglement swapping, quantum memory</text>
  <rect x="10" y="128" width="660" height="34" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="340" y="141" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">QUANTUM KEY DISTRIBUTION</text>
  <text x="340" y="155" text-anchor="middle" font-size="10" fill="#6b7280">Physics-guaranteed secure key exchange — deployable today</text>
  <rect x="10" y="168" width="660" height="28" rx="3" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="200" y="177" text-anchor="middle" font-size="10" font-weight="700" fill="#15803d">Blind Quantum Computing</text>
  <text x="200" y="190" text-anchor="middle" font-size="9" fill="#6b7280">delegate to untrusted server</text>
  <text x="440" y="177" text-anchor="middle" font-size="10" font-weight="700" fill="#15803d">Distributed Quantum Computing</text>
  <text x="440" y="190" text-anchor="middle" font-size="9" fill="#6b7280">link quantum processors globally</text>
  <line x1="340" y1="168" x2="340" y2="196" stroke="#e5e7eb" stroke-width="1"/>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — The quantum internet layer stack. QKD operates on the third layer and is deployable with today's technology. The applications at the top — blind quantum computing and distributed quantum computing — require the full repeater infrastructure of layers one and two.</figcaption>
</figure>

## Beyond Key Distribution

QKD is the first application, not the final one. A fully realised quantum internet enables capabilities that have no classical analogue.

**Blind quantum computing** allows a client with no quantum hardware to delegate computation to a remote quantum server without revealing either the program or the data. The server performs the computation but learns nothing about what it computed. This is cryptographically impossible classically — it requires quantum mechanics to achieve.

**Distributed quantum computing** allows multiple quantum processors to be linked over a quantum network, pooling their qubit counts beyond what any single device can achieve. As quantum processors scale, network-connected distributed quantum computers may reach computational power that monolithic hardware cannot.

**Quantum sensor networks** use entanglement to synchronise clocks and sensors at precisions beyond any classical reference frame — enabling GPS-independent navigation, new gravitational wave detectors, and geological monitoring at previously unachievable sensitivity.

## The Road Ahead

The quantum internet will not arrive in a single transition. It will emerge incrementally: QKD networks expanding in metropolitan and national scale over the next five years, early repeater experiments in the following decade, and full-stack quantum networking applications arriving in the 2030s and beyond.

What makes this trajectory different from most infrastructure projects is that some of what the quantum internet enables — physics-guaranteed secure communication, verifiable blind computation — cannot be achieved by scaling classical technology. The quantum internet is not a better version of the internet we have. It is the beginning of something genuinely new.
