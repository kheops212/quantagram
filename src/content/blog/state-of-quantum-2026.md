---
title: "State of Quantum Computing: Mid-2026 Edition"
description: "Five hardware platforms. Four NIST cryptographic standards. Two contested quantum advantage claims. One below-threshold error correction milestone. Seven years after the NISQ era began, quantum computing is at an inflection point. Here is a precise, unsentimental account of where every major platform stands, what has been proved, what remains unproven, and what the next decade realistically looks like."
pubDate: 'Jul 15 2026'
heroImage: '../../assets/hero-state-2026.svg'
pillar: 'Future Tech'
author: 'KhGh'
featured: true
tags: ['quantum computing', 'state of the field', 'quantum hardware', 'quantum algorithms', 'post-quantum cryptography', 'fault tolerance', 'NISQ', 'quantum advantage', 'future tech']
sources:
  - title: 'Quantum Error Correction Below the Surface Code Threshold (Willow)'
    authors: 'Google Quantum AI'
    venue: 'Nature 638, 920; arXiv:2408.13687'
    year: 2024
    url: 'https://arxiv.org/abs/2408.13687'
  - title: 'Logical Quantum Processor Based on Reconfigurable Atom Arrays'
    authors: 'Dolev Bluvstein, Simon J. Evered, et al.'
    venue: 'Nature 626, 58; arXiv:2312.03982'
    year: 2024
    url: 'https://arxiv.org/abs/2312.03982'
  - title: 'Interferometric Single-Shot Parity Measurement in InAs–Al Hybrid Devices'
    authors: 'Microsoft Azure Quantum'
    venue: 'Nature 638, 651; arXiv:2401.09549'
    year: 2025
    url: 'https://arxiv.org/abs/2401.09549'
  - title: 'Post-Quantum Cryptography Standards (FIPS 203, 204, 205)'
    authors: 'NIST'
    venue: 'NIST Post-Quantum Cryptography Project'
    year: 2024
    url: 'https://csrc.nist.gov/projects/post-quantum-cryptography'
  - title: 'Quantum Computing in the NISQ Era and Beyond'
    authors: 'John Preskill'
    venue: 'Quantum 2, 79; arXiv:1801.00862'
    year: 2018
    url: 'https://arxiv.org/abs/1801.00862'
---

Quantum computing in mid-2026 is a field defined by a specific tension: the underlying physics is mature, the engineering is accelerating, and the gap between what has been demonstrated and what is commercially useful remains stubbornly wide. The field is not stagnating — the rate of hardware improvement over the past three years has exceeded most roadmaps — but neither is it delivering on the applications that drove the investment wave of 2020–2023. Understanding the current state requires separating three distinct questions that are often conflated: what has been achieved, what is achievable in principle, and when the engineering will close the gap.

The answer to the first question is clearer than it has ever been. The answer to the third is more honest — and more cautious — than the optimism of 2018 would have predicted.

<div style="border:1px solid var(--border);border-left:3px solid var(--accent);padding:1.25rem 1.5rem;margin:2rem 0;background:var(--bg-alt);">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem 0;">What Changed in the Past Three Years</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem 2rem;">
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Error Correction Crossed the Threshold</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">Google's Willow processor (Dec 2024) and QuEra's 48-logical-qubit demonstration (2023) both showed logical error rates decreasing as code distance increases — the qualitative sign that error correction is working. This was the field's most important milestone since Shor's algorithm.</p></div>
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Post-Quantum Cryptography Is Deployed</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">NIST finalised ML-KEM, ML-DSA, SLH-DSA, and FN-DSA in August 2024. Apple, Google, Cloudflare, and all major browsers now deploy ML-KEM hybrid key exchange in production TLS. The cryptographic migration is underway — not theoretical.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Topological Qubits Got a First Foothold</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">Microsoft's February 2025 Nature paper demonstrated parity readout of a Majorana-based topological qubit with lifetime exceeding 1 ms. Gate operations and entanglement remain undemonstrated, but the qubit exists — a milestone that was far from certain two years ago.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Classical Algorithms Competed Back</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">Improved tensor network methods, GPU-accelerated simulation, and better approximate algorithms have repeatedly matched or exceeded NISQ quantum advantage claims. The classical simulation boundary is not static — it has moved substantially, narrowing the NISQ advantage window.</p></div>
  </div>
</div>

## The Hardware Scorecard: Five Platforms in Mid-2026

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="30" rx="4" fill="#111827"/>
  <text x="340" y="20" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">QUANTUM HARDWARE PLATFORM SCORECARD — MID-2026</text>
  <!-- Header -->
  <rect x="0" y="30" width="680" height="26" fill="#f1f5f9"/>
  <text x="90"  y="47" text-anchor="middle" font-size="8.5" font-weight="700" fill="#6b7280">METRIC</text>
  <text x="215" y="47" text-anchor="middle" font-size="8.5" font-weight="700" fill="#1d4ed8">SUPERCONDUCTING</text>
  <text x="325" y="47" text-anchor="middle" font-size="8.5" font-weight="700" fill="#7c3aed">TRAPPED ION</text>
  <text x="430" y="47" text-anchor="middle" font-size="8.5" font-weight="700" fill="#059669">NEUTRAL ATOM</text>
  <text x="535" y="47" text-anchor="middle" font-size="8.5" font-weight="700" fill="#9d174d">PHOTONIC</text>
  <text x="628" y="47" text-anchor="middle" font-size="8.5" font-weight="700" fill="#d97706">TOPOLOGICAL</text>
  <line x1="0" y1="56" x2="680" y2="56" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 1: 2Q gate fidelity -->
  <rect x="0" y="56" width="680" height="26" fill="#fff"/>
  <text x="90" y="73" text-anchor="middle" font-size="9" fill="#111827">Best 2Q fidelity</text>
  <rect x="162" y="60" width="106" height="18" rx="2" fill="#dcfce7"/>
  <text x="215" y="72" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">99.8%</text>
  <rect x="272" y="60" width="106" height="18" rx="2" fill="#dcfce7"/>
  <text x="325" y="72" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">99.9%</text>
  <rect x="378" y="60" width="104" height="18" rx="2" fill="#fef9c3"/>
  <text x="430" y="72" text-anchor="middle" font-size="9" fill="#92400e" font-weight="700">99.5%</text>
  <rect x="484" y="60" width="102" height="18" rx="2" fill="#fee2e2"/>
  <text x="535" y="72" text-anchor="middle" font-size="9" fill="#9b1c1c">N/A (gate QC)</text>
  <rect x="588" y="60" width="84" height="18" rx="2" fill="#fee2e2"/>
  <text x="628" y="72" text-anchor="middle" font-size="9" fill="#9b1c1c">Unproven</text>
  <line x1="0" y1="82" x2="680" y2="82" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 2: Coherence -->
  <rect x="0" y="82" width="680" height="26" fill="#f9fafb"/>
  <text x="90" y="99" text-anchor="middle" font-size="9" fill="#111827">Qubit coherence</text>
  <rect x="162" y="86" width="106" height="18" rx="2" fill="#fef9c3"/>
  <text x="215" y="98" text-anchor="middle" font-size="9" fill="#92400e" font-weight="700">100–500 µs</text>
  <rect x="272" y="86" width="106" height="18" rx="2" fill="#dcfce7"/>
  <text x="325" y="98" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">seconds–mins</text>
  <rect x="378" y="86" width="104" height="18" rx="2" fill="#dcfce7"/>
  <text x="430" y="98" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">seconds–mins</text>
  <rect x="484" y="86" width="102" height="18" rx="2" fill="#dcfce7"/>
  <text x="535" y="98" text-anchor="middle" font-size="9" fill="#166534">no thermal noise</text>
  <rect x="588" y="86" width="84" height="18" rx="2" fill="#fef9c3"/>
  <text x="628" y="98" text-anchor="middle" font-size="9" fill="#92400e">~1 ms parity</text>
  <line x1="0" y1="108" x2="680" y2="108" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 3: Scale -->
  <rect x="0" y="108" width="680" height="26" fill="#fff"/>
  <text x="90" y="125" text-anchor="middle" font-size="9" fill="#111827">Scale (2026 best)</text>
  <rect x="162" y="112" width="106" height="18" rx="2" fill="#dcfce7"/>
  <text x="215" y="124" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">5,000+ qubits</text>
  <rect x="272" y="112" width="106" height="18" rx="2" fill="#fef9c3"/>
  <text x="325" y="124" text-anchor="middle" font-size="9" fill="#92400e" font-weight="700">100 qubits</text>
  <rect x="378" y="112" width="104" height="18" rx="2" fill="#dcfce7"/>
  <text x="430" y="124" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">10,000+ atoms</text>
  <rect x="484" y="112" width="102" height="18" rx="2" fill="#fef9c3"/>
  <text x="535" y="124" text-anchor="middle" font-size="9" fill="#92400e">216 modes (CV)</text>
  <rect x="588" y="112" width="84" height="18" rx="2" fill="#fee2e2"/>
  <text x="628" y="124" text-anchor="middle" font-size="9" fill="#9b1c1c">1 qubit (demo)</text>
  <line x1="0" y1="134" x2="680" y2="134" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 4: Error correction -->
  <rect x="0" y="134" width="680" height="26" fill="#f9fafb"/>
  <text x="90" y="151" text-anchor="middle" font-size="9" fill="#111827">QEC readiness</text>
  <rect x="162" y="138" width="106" height="18" rx="2" fill="#dcfce7"/>
  <text x="215" y="150" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">Below threshold ✓</text>
  <rect x="272" y="138" width="106" height="18" rx="2" fill="#dcfce7"/>
  <text x="325" y="150" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">Below threshold ✓</text>
  <rect x="378" y="138" width="104" height="18" rx="2" fill="#dcfce7"/>
  <text x="430" y="150" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">48 logical q demo ✓</text>
  <rect x="484" y="138" width="102" height="18" rx="2" fill="#fee2e2"/>
  <text x="535" y="150" text-anchor="middle" font-size="9" fill="#9b1c1c">Not demonstrated</text>
  <rect x="588" y="138" width="84" height="18" rx="2" fill="#fef9c3"/>
  <text x="628" y="150" text-anchor="middle" font-size="9" fill="#92400e">Theoretical</text>
  <line x1="0" y1="160" x2="680" y2="160" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 5: Operating temp -->
  <rect x="0" y="160" width="680" height="26" fill="#fff"/>
  <text x="90" y="177" text-anchor="middle" font-size="9" fill="#111827">Operating temp.</text>
  <rect x="162" y="164" width="106" height="18" rx="2" fill="#fee2e2"/>
  <text x="215" y="176" text-anchor="middle" font-size="9" fill="#9b1c1c">10–20 mK</text>
  <rect x="272" y="164" width="106" height="18" rx="2" fill="#dcfce7"/>
  <text x="325" y="176" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">Room temp.</text>
  <rect x="378" y="164" width="104" height="18" rx="2" fill="#dcfce7"/>
  <text x="430" y="176" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">Room temp.</text>
  <rect x="484" y="164" width="102" height="18" rx="2" fill="#dcfce7"/>
  <text x="535" y="176" text-anchor="middle" font-size="9" fill="#166534">Room temp.*</text>
  <rect x="588" y="164" width="84" height="18" rx="2" fill="#fee2e2"/>
  <text x="628" y="176" text-anchor="middle" font-size="9" fill="#9b1c1c">30–50 mK</text>
  <line x1="0" y1="186" x2="680" y2="186" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 6: Availability -->
  <rect x="0" y="186" width="680" height="26" fill="#f9fafb"/>
  <text x="90" y="203" text-anchor="middle" font-size="9" fill="#111827">Commercial access</text>
  <rect x="162" y="190" width="106" height="18" rx="2" fill="#dcfce7"/>
  <text x="215" y="202" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">IBM / Google Cloud</text>
  <rect x="272" y="190" width="106" height="18" rx="2" fill="#dcfce7"/>
  <text x="325" y="202" text-anchor="middle" font-size="9" fill="#166534" font-weight="700">Quantinuum / IonQ</text>
  <rect x="378" y="190" width="104" height="18" rx="2" fill="#fef9c3"/>
  <text x="430" y="202" text-anchor="middle" font-size="9" fill="#92400e">QuEra / Pasqal</text>
  <rect x="484" y="190" width="102" height="18" rx="2" fill="#fef9c3"/>
  <text x="535" y="202" text-anchor="middle" font-size="9" fill="#92400e">Xanadu (CV)</text>
  <rect x="588" y="190" width="84" height="18" rx="2" fill="#fee2e2"/>
  <text x="628" y="202" text-anchor="middle" font-size="9" fill="#9b1c1c">Not available</text>
  <line x1="0" y1="212" x2="680" y2="212" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Legend -->
  <rect x="0" y="212" width="680" height="68" fill="#fff"/>
  <rect x="20"  y="224" width="14" height="14" rx="2" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="38"  y="235" font-size="8.5" fill="#166534" font-weight="700">Strong</text>
  <rect x="110" y="224" width="14" height="14" rx="2" fill="#fef9c3" stroke="#d97706" stroke-width="1"/>
  <text x="128" y="235" font-size="8.5" fill="#92400e" font-weight="700">Moderate</text>
  <rect x="215" y="224" width="14" height="14" rx="2" fill="#fee2e2" stroke="#dc2626" stroke-width="1"/>
  <text x="233" y="235" font-size="8.5" fill="#9b1c1c" font-weight="700">Weak / Undemonstrated</text>
  <text x="340" y="255" text-anchor="middle" font-size="8.5" fill="#6b7280">*Photonic qubits room temp.; SNSPDs require ~3 K. Superconducting scale reflects multi-chip modular systems; per-chip ~1,000 qubits. Photonic QC refers to gate-based universal computation; Xanadu's CV mode is available for Gaussian operations. Trapped ion "scale" reflects commercial systems; research systems target 500+ qubits by 2027.</text>
  <text x="340" y="270" text-anchor="middle" font-size="8.5" fill="#6b7280">Topological: Microsoft's Feb 2025 Nature paper demonstrated parity readout only; gate operations and multi-qubit entanglement remain future milestones.</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — Platform scorecard, mid-2026. Superconducting and trapped-ion systems lead on demonstrated error correction progress; neutral atoms lead on logical qubit demonstrations and scale; photonic systems remain competitive for quantum communication and CV computation but lag on gate-based universal QC; topological qubits are a distant but structurally important bet. No platform is dominant across all dimensions.</figcaption>
</figure>

## The Error Correction Inflection Point

The most consequential development in quantum computing since the NISQ era began is the empirical confirmation that error correction works as predicted. Until 2023, below-threshold operation — where adding more physical qubits actively reduces logical error rates — had never been demonstrated.

It has now been demonstrated on three separate hardware platforms.

**Google Willow (December 2024)**: a 105-qubit superconducting processor demonstrated that the logical error rate of a surface code decreased from distance d=3 to d=5 to d=7, with an error suppression factor of approximately 2.1× per unit of code distance. More dramatically, Willow solved a random circuit sampling task that Google estimated would require 10 septillion years of classical computation — a number large enough to be philosophically interesting even if the task itself is not practically useful. The combination — below-threshold QEC plus a meaningful quantum advantage claim — made Willow the most significant quantum hardware result since Shor's algorithm.

**QuEra / Harvard (2023)**: a 280-atom neutral atom array demonstrated 48 logical qubits with transversal logical gates — the largest number of logical qubits demonstrated on any platform. The result was achieved by exploiting the reconfigurable geometry of optical tweezer arrays, which allowed atom sorting into the exact spatial patterns required for transversal gate operations in specific error correcting codes. This is the record as of mid-2026.

**IBM (2024–2025)**: a series of demonstrations using IBM's Eagle and Heron processors showed logical circuits below the surface code threshold using bivariate bicycle LDPC codes, with encoding efficiency approximately 10× better than surface codes for the same logical error rate. IBM's LDPC work is particularly significant because it suggests a more resource-efficient path to fault tolerance than the standard surface code.

Together these results establish that fault-tolerant quantum computing is not just theoretically guaranteed by the threshold theorem — it is physically achievable with hardware available today. The remaining question is not whether error correction works, but whether it can be scaled to the millions of physical qubits required for practically useful computation.

## The Algorithm Landscape: What Is Actually Running

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">USE CASE READINESS MATRIX — MID-2026</text>
  <!-- Axes -->
  <line x1="60" y1="30" x2="60"  y2="188" stroke="#374151" stroke-width="2"/>
  <line x1="60" y1="188" x2="655" y2="188" stroke="#374151" stroke-width="2"/>
  <!-- Y axis labels -->
  <text x="50" y="60"  text-anchor="end" font-size="8" fill="#6b7280" transform="rotate(-90 50 60)">Impact</text>
  <text x="55" y="68"  text-anchor="end" font-size="8" fill="#059669">High</text>
  <text x="55" y="128" text-anchor="end" font-size="8" fill="#d97706">Med.</text>
  <text x="55" y="178" text-anchor="end" font-size="8" fill="#dc2626">Low</text>
  <!-- Y grid lines -->
  <line x1="60" y1="98"  x2="655" y2="98"  stroke="#f3f4f6" stroke-width="1.5"/>
  <line x1="60" y1="158" x2="655" y2="158" stroke="#f3f4f6" stroke-width="1.5"/>
  <!-- X axis: timeline zones -->
  <rect x="60"  y="188" width="147" height="8" fill="#dbeafe"/>
  <rect x="207" y="188" width="147" height="8" fill="#dcfce7"/>
  <rect x="354" y="188" width="147" height="8" fill="#fef9c3"/>
  <rect x="501" y="188" width="154" height="8" fill="#fee2e2"/>
  <text x="133" y="202" text-anchor="middle" font-size="8.5" fill="#1d4ed8" font-weight="700">Now — 2027</text>
  <text x="280" y="202" text-anchor="middle" font-size="8.5" fill="#059669" font-weight="700">2028–2030</text>
  <text x="428" y="202" text-anchor="middle" font-size="8.5" fill="#92400e" font-weight="700">2031–2035</text>
  <text x="578" y="202" text-anchor="middle" font-size="8.5" fill="#9b1c1c" font-weight="700">2036+</text>
  <!-- Vertical dividers -->
  <line x1="207" y1="30" x2="207" y2="188" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="354" y1="30" x2="354" y2="188" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="501" y1="30" x2="501" y2="188" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- Use case items (boxes) -->
  <!-- Now, High impact -->
  <rect x="66"  y="34" width="138" height="24" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="135" y="50" text-anchor="middle" font-size="8.5" fill="#166534" font-weight="700">PQC Migration (underway)</text>
  <!-- Now, Medium impact -->
  <rect x="66"  y="103" width="110" height="24" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="121" y="119" text-anchor="middle" font-size="8" fill="#1d4ed8">QKD / BB84 / E91</text>
  <rect x="66"  y="131" width="130" height="24" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="131" y="147" text-anchor="middle" font-size="8" fill="#1d4ed8">Quantum Benchmarking</text>
  <!-- Now, Low -->
  <rect x="66"  y="163" width="130" height="22" rx="3" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="131" y="178" text-anchor="middle" font-size="8" fill="#6b7280">NISQ Chemistry (small)</text>
  <!-- 2028-2030, High impact -->
  <rect x="213" y="34" width="135" height="24" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="280" y="50" text-anchor="middle" font-size="8" fill="#166534" font-weight="700">Early FT Demonstration</text>
  <!-- 2028-2030, Medium -->
  <rect x="213" y="103" width="135" height="24" rx="3" fill="#fef9c3" stroke="#d97706" stroke-width="1.5"/>
  <text x="280" y="119" text-anchor="middle" font-size="8" fill="#92400e">Quantum Simulation (physics)</text>
  <rect x="213" y="131" width="135" height="24" rx="3" fill="#fef9c3" stroke="#d97706" stroke-width="1.5"/>
  <text x="280" y="147" text-anchor="middle" font-size="8" fill="#92400e">NSA PQC Deadline</text>
  <!-- 2031-2035, High impact -->
  <rect x="360" y="34" width="135" height="24" rx="3" fill="#fef9c3" stroke="#d97706" stroke-width="1.5"/>
  <text x="427" y="50" text-anchor="middle" font-size="8" fill="#92400e" font-weight="700">FT Quantum Chemistry</text>
  <rect x="360" y="62" width="135" height="24" rx="3" fill="#fef9c3" stroke="#d97706" stroke-width="1.5"/>
  <text x="427" y="78" text-anchor="middle" font-size="8" fill="#92400e" font-weight="700">Materials Simulation</text>
  <!-- 2031-2035, Low-medium -->
  <rect x="360" y="131" width="135" height="24" rx="3" fill="#fef9c3" stroke="#d97706" stroke-width="1.5"/>
  <text x="427" y="147" text-anchor="middle" font-size="8" fill="#92400e">Quantum ML (narrow)</text>
  <!-- 2036+, High -->
  <rect x="507" y="34" width="142" height="24" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="578" y="50" text-anchor="middle" font-size="8" fill="#9b1c1c" font-weight="700">CRQC / RSA Breaking</text>
  <rect x="507" y="62" width="142" height="24" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="578" y="78" text-anchor="middle" font-size="8" fill="#9b1c1c" font-weight="700">Drug Discovery QC</text>
  <rect x="507" y="90" width="142" height="24" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="578" y="106" text-anchor="middle" font-size="8" fill="#9b1c1c" font-weight="700">Large-Scale Optimisation</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — Use case readiness matrix. The horizontal axis shows projected availability timeline; vertical axis shows potential impact. Green boxes are high-confidence near-term milestones; yellow are plausible on current trajectories; red are timeline-uncertain but high-stakes. Post-quantum cryptography migration is the only item in the "high impact, now" cell — it is underway and essential regardless of quantum hardware progress.</figcaption>
</figure>

The variational algorithms — VQE, QAOA, quantum kernel SVMs — that defined the NISQ era's application ambitions have not delivered the practical advantages their proponents hoped for. On every standard benchmark where classical methods are well-optimised, quantum variational algorithms perform comparably or worse, at substantially higher cost. The barren plateau problem imposes a training depth ceiling; circuit noise imposes a fidelity depth ceiling; and the intersection of "trainable," "runnable," and "classically hard" is narrow.

This is not a statement that these algorithms are unimportant — they drove the hardware benchmarking and calibration work that enabled the error correction demonstrations. But the honest assessment is that NISQ-era quantum machine learning and optimisation remain in the "interesting research direction" category, not the "practical advantage" category.

Where quantum computers are genuinely useful today is narrower: quantum simulation of specific physical systems on hardware that naturally implements the target Hamiltonian dynamics, and quantum cryptography experiments (QKD) for specialised use cases requiring information-theoretic security. These are real utilities, but they serve niche markets, not the enterprise software market that attracted the investment wave.

## The Cryptographic Transition: Already Happening

The most consequential near-term quantum impact is happening not on quantum computers but because of them.

NIST's August 2024 finalisation of ML-KEM (FIPS 203), ML-DSA (FIPS 204), SLH-DSA (FIPS 205), and the draft FN-DSA (FIPS 206) triggered an industry-wide migration. By mid-2026, ML-KEM hybrid key exchange is deployed in:
- **TLS 1.3** via X25519+ML-KEM-768 hybrid in Chrome, Safari, Firefox, and all major CDNs
- **Apple iMessage and iCloud**: end-to-end encryption updated to ML-KEM
- **Signal Protocol**: PQXDH upgrade deployed in Signal and WhatsApp
- **SSH**: OpenSSH 9.x with ML-KEM support widely deployed

Certificate signature migration (replacing ECDSA with ML-DSA in X.509 certificates) is substantially more complex due to PKI chain sizes and is progressing more slowly. The NSA's CNSA Suite 2.0 deadline of 2030 for national security systems is driving government migration; enterprise migration is at varying stages.

The SIKE collapse of 2022 — an isogeny-based NIST finalist broken in 62 minutes on a laptop — remains a cautionary reference for cryptographers evaluating the resilience of lattice-based standards to future mathematical attacks. No comparable attack on ML-KEM or ML-DSA has appeared, but the Hilbert space of possible cryptanalytic techniques is not fully explored.

The harvest-now-decrypt-later threat makes the migration timeline a present-day security concern, not a speculative future one. Any organisation with data that must remain confidential for more than ten years and that currently uses RSA or ECC key exchange is already accumulating risk.

## The Timeline: A Calibrated Projection

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">QUANTUM COMPUTING TIMELINE — MILESTONES PAST AND PROJECTED</text>
  <!-- Timeline bar -->
  <line x1="30" y1="90" x2="650" y2="90" stroke="#374151" stroke-width="3"/>
  <!-- NOW marker -->
  <line x1="330" y1="70" x2="330" y2="110" stroke="#dc2626" stroke-width="3"/>
  <text x="330" y="60" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="700">NOW</text>
  <text x="330" y="52" text-anchor="middle" font-size="8.5" fill="#dc2626">mid-2026</text>
  <!-- PAST milestones (left of NOW) -->
  <!-- 2019: Sycamore -->
  <line x1="80" y1="84" x2="80" y2="96" stroke="#6b7280" stroke-width="2"/>
  <text x="80" y="115" text-anchor="middle" font-size="7.5" fill="#6b7280">2019</text>
  <text x="80" y="76" text-anchor="middle" font-size="7.5" fill="#6b7280">Sycamore</text>
  <text x="80" y="66" text-anchor="middle" font-size="7.5" fill="#6b7280">supremacy</text>
  <!-- 2022: SIKE broken, QuEra 256 atoms -->
  <line x1="155" y1="84" x2="155" y2="96" stroke="#6b7280" stroke-width="2"/>
  <text x="155" y="115" text-anchor="middle" font-size="7.5" fill="#6b7280">2022</text>
  <text x="155" y="76" text-anchor="middle" font-size="7.5" fill="#6b7280">SIKE broken</text>
  <text x="155" y="66" text-anchor="middle" font-size="7.5" fill="#6b7280">QuEra 256 atoms</text>
  <!-- 2023: QuEra 48 logical qubits, Google below-threshold -->
  <line x1="215" y1="84" x2="215" y2="96" stroke="#6b7280" stroke-width="2"/>
  <text x="215" y="115" text-anchor="middle" font-size="7.5" fill="#6b7280">2023</text>
  <text x="215" y="145" text-anchor="middle" font-size="7.5" fill="#059669">48 logical qubits</text>
  <text x="215" y="135" text-anchor="middle" font-size="7.5" fill="#059669">(QuEra)</text>
  <!-- 2024: Google Willow + NIST PQC -->
  <line x1="270" y1="84" x2="270" y2="96" stroke="#6b7280" stroke-width="2"/>
  <text x="270" y="115" text-anchor="middle" font-size="7.5" fill="#6b7280">2024</text>
  <text x="270" y="76" text-anchor="middle" font-size="7.5" fill="#059669">Willow below-</text>
  <text x="270" y="66" text-anchor="middle" font-size="7.5" fill="#059669">threshold + PQC FIPS</text>
  <!-- 2025: Microsoft topological, Quantinuum fidelity -->
  <line x1="308" y1="84" x2="308" y2="96" stroke="#6b7280" stroke-width="2"/>
  <text x="308" y="115" text-anchor="middle" font-size="7.5" fill="#6b7280">2025</text>
  <text x="308" y="145" text-anchor="middle" font-size="7.5" fill="#059669">Microsoft topo.</text>
  <text x="308" y="135" text-anchor="middle" font-size="7.5" fill="#059669">qubit (Nature)</text>
  <!-- FUTURE milestones (right of NOW) -->
  <!-- 2027-2028: EFT -->
  <line x1="400" y1="84" x2="400" y2="96" stroke="#d97706" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="400" y="115" text-anchor="middle" font-size="7.5" fill="#d97706">2027–28</text>
  <text x="400" y="76" text-anchor="middle" font-size="7.5" fill="#d97706">Early fault-tolerant</text>
  <text x="400" y="66" text-anchor="middle" font-size="7.5" fill="#d97706">logical circuits</text>
  <!-- 2030: NSA deadline, 100k qubit target -->
  <line x1="490" y1="84" x2="490" y2="96" stroke="#d97706" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="490" y="115" text-anchor="middle" font-size="7.5" fill="#d97706">2030</text>
  <text x="490" y="145" text-anchor="middle" font-size="7.5" fill="#d97706">NSA PQC deadline</text>
  <text x="490" y="135" text-anchor="middle" font-size="7.5" fill="#d97706">IBM 100k target</text>
  <!-- 2033-2035+: FT chemistry, CRQC? -->
  <line x1="590" y1="84" x2="590" y2="96" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="590" y="115" text-anchor="middle" font-size="7.5" fill="#dc2626">2033–?</text>
  <text x="590" y="76" text-anchor="middle" font-size="7.5" fill="#dc2626">FT quantum chemistry</text>
  <text x="590" y="66" text-anchor="middle" font-size="7.5" fill="#dc2626">CRQC uncertain</text>
  <!-- Year scale -->
  <text x="30"  y="165" text-anchor="middle" font-size="7.5" fill="#6b7280">2018</text>
  <text x="650" y="165" text-anchor="middle" font-size="7.5" fill="#6b7280">2036+</text>
  <!-- Legend -->
  <text x="340" y="182" text-anchor="middle" font-size="8" fill="#6b7280">Solid markers: demonstrated milestones. Dashed: projected on current hardware trajectories. CRQC timeline is ±10 years — the widest uncertainty in the field.</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — Quantum computing timeline. Left of the red "NOW" line are confirmed milestones; right are projections based on current hardware trajectories and published roadmaps. The 2027–2028 early fault-tolerant window is the field's most agreed-upon near-term target. The CRQC arrival date — when a quantum computer could break RSA-2048 — carries the widest uncertainty: most credible estimates span 2035–2045, with outliers in both directions.</figcaption>
</figure>

The most honest projections in mid-2026 suggest the following milestones, in rough probability-weighted order:

**2027–2028 (high confidence)**: First demonstrations of early fault-tolerant quantum circuits — logical operations on 5–20 logical qubits with below-threshold error rates, performing computations that cannot be fully simulated classically. These will be scientifically significant but not commercially useful. IBM, Google, Quantinuum, and QuEra all have hardware that can reach this milestone on current trajectories.

**2028–2030 (moderate confidence)**: Quantum simulation of specific physical systems — condensed matter models, quantum chemistry near phase transitions — where quantum processors provide results that classical methods cannot match at any practical computing time. The problem must be carefully chosen: quantum simulation advantage is not universal, but specific regimes (strongly correlated systems with high entanglement) are genuine targets.

**2030 (high certainty — not a prediction, a deadline)**: NSA's CNSA Suite 2.0 requires all national security systems to have migrated to PQC algorithms. This deadline will be met with varying degrees of completeness across government agencies.

**2031–2035 (plausible, uncertain)**: Fault-tolerant quantum computing at scales useful for drug discovery, materials science, and financial modelling. IBM's roadmap targets 100,000 qubit systems by 2033; achieving the logical qubit fidelities and gate throughput needed for useful chemistry at this scale is the major uncertainty. The encoding efficiency of LDPC codes could dramatically reduce the physical-to-logical qubit ratio and accelerate this timeline.

**2035–2045 (wide uncertainty)**: A cryptographically relevant quantum computer (CRQC) capable of breaking RSA-2048 or 256-bit ECC. The physical qubit requirements (2–4 million), the logical gate counts (~10¹¹), and the T-factory overhead are all understood — the uncertainty is in the engineering timeline. Most serious researchers place this between 2035 and 2050; the harvest-now-decrypt-later threat makes the lower end of this range the relevant planning horizon for organisations with long-lived sensitive data.

## The Competitive Landscape

The quantum computing industry has consolidated significantly since 2023. Several well-funded startups have pivoted, merged, or quietly reduced hardware ambitions. The companies with the clearest hardware progress and most credible near-term roadmaps as of mid-2026 are:

**IBM** remains the most comprehensive quantum platform, with the largest installed base of cloud-accessible quantum hardware, the deepest software ecosystem (Qiskit), and an aggressive roadmap toward modular multi-chip systems. Their LDPC code work is theoretically the most important step toward efficient fault tolerance.

**Google Quantum AI** has the most dramatic headline results (Sycamore supremacy, Willow below-threshold QEC) and the deepest fundamental research investment. Their focus on superconducting systems with surface codes provides a clear, if resource-intensive, path to fault tolerance.

**Quantinuum** (formed by the merger of Cambridge Quantum and Honeywell Quantum Solutions) has the highest demonstrated gate fidelities on any commercial platform and a credible path to 100+ qubit trapped-ion systems with continued fidelity improvements. Their H-series systems are the current benchmark for gate quality.

**QuEra** has the most impressive error correction demonstration (48 logical qubits), enabled by neutral atom platform advantages that are increasingly clear. Their partnership with Amazon Braket provides cloud access; their roadmap targets thousands of logical qubits by 2026–2027.

**PsiQuantum** remains the most opaque and the most ambitious bet: wafer-scale silicon photonic manufacturing via GlobalFoundries, targeting fault-tolerant quantum computing through fusion-based quantum computation. As of mid-2026, no quantum computing results have been published; the company's value proposition rests entirely on manufacturing scale arguments.

**Microsoft** has the most distinctive technical bet and the most complicated credibility situation — the 2021 retraction of prior Majorana results cast a long shadow, which the 2025 Nature paper has partially lifted. If topological qubits scale as their theory predicts, Microsoft would have a 10–100× qubit overhead advantage over every competing platform. If they do not, the approach has consumed decades of R&D with limited transferable results.

## What the Series Has Covered — and What It Means

This series has traced the full stack of quantum computing: from the physics of individual qubit platforms ([superconducting](/blog/superconducting-qubits), [trapped ion](/blog/trapped-ion-qubits), [neutral atom](/blog/neutral-atom-qubits), [photonic](/blog/photonic-qubits), [topological](/blog/topological-qubits)), through the error correction infrastructure that bridges noisy hardware to reliable computation ([surface codes](/blog/quantum-error-correction)), to the algorithms that run on top ([Shor's](/blog/shors-algorithm), [Grover's](/blog/grovers-algorithm), [QAOA and VQE](/blog/qaoa-and-vqe), [quantum kernels](/blog/quantum-kernels)), the cryptographic implications ([BB84](/blog/bb84-protocol), [E91](/blog/e91-protocol), [post-quantum cryptography](/blog/post-quantum-cryptography)), and the honest accounting of current limitations ([barren plateaus](/blog/barren-plateaus), [NISQ limitations](/blog/nisq-era-limitations)).

The central through-line is a distinction that is easy to state and surprisingly hard to maintain in the face of press releases and investment pitches: the difference between **what quantum computers can compute in principle** and **what current quantum hardware can compute in practice**. Both matter, but they matter differently. The algorithmic results — Shor's exponential speedup, Grover's provable quadratic speedup, the no-cloning theorem that makes QKD possible, the threshold theorem that guarantees fault tolerance is achievable — are mathematically settled. They do not depend on engineering progress.

The engineering results are where the field actually lives, and where the honest scorecard matters most. Below-threshold error correction is demonstrated. Practical fault-tolerant computation is not. Post-quantum cryptography is deployed and effective. Quantum machine learning advantage on real datasets is not demonstrated. The quantum simulation of small molecules is possible on NISQ hardware. The quantum simulation of the molecules that would transform drug discovery is not.

The gap between these two columns is closing. The rate at which it closes — the next five to ten years — will determine whether quantum computing transforms multiple industries or remains a specialised scientific instrument for another generation. The physics says it will close. The timeline is what no one knows with confidence.

That uncertainty is itself information. It means the organisations best positioned for quantum's impact are not those betting on a specific arrival date, but those building infrastructure that works regardless: migrating cryptography now, developing quantum literacy across technical teams, and monitoring hardware progress at the level of actual gate fidelity and logical qubit demonstrations rather than headline qubit counts. The field rewards the technically informed and penalises the credulous in both directions — the dismissers who assume nothing will change, and the advocates who assume everything will change on schedule.

The physics is settled. The engineering is in progress. The applications are mostly ahead. That is the honest state of quantum computing in mid-2026.
