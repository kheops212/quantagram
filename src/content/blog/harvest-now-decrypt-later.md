---
title: 'Harvest Now, Decrypt Later: The Quantum Threat Reshaping Global Cryptography'
description: 'Every encrypted message sent today could be stored by adversaries and decrypted once a sufficiently powerful quantum computer exists. The window to act is narrowing — here is what the world is doing about it.'
pubDate: 'Jun 19 2024'
heroImage: '../../assets/hero-hndl.svg'
pillar: 'Future Tech'
author: 'KhGh'
tags: ['post-quantum cryptography', 'security', 'NIST', 'future tech', 'encryption']
---

The encryption protecting your bank account, medical records, and private messages rests on a mathematical problem that classical computers cannot solve in any practical timeframe: factoring the product of two large prime numbers. RSA-2048, the standard underpinning much of the internet's security infrastructure, would take a classical computer longer than the age of the universe to crack.

A sufficiently powerful quantum computer running Shor's algorithm could do it in hours.

That quantum computer does not yet exist. But security experts are not waiting. **The threat is not future — it is already operational.** Nation-state actors and sophisticated adversaries are harvesting encrypted internet traffic today, storing it in massive data archives with a single intention: decrypt it later, once the quantum hardware exists. Classified diplomatic communications, commercial trade secrets, long-lived personal data — all of it is potentially sitting in someone's archive right now, waiting.

This is the "harvest now, decrypt later" attack, and it is the reason the world's cryptographic infrastructure is undergoing the most significant overhaul in the history of the internet.

## Why Quantum Computers Break RSA

The security of RSA depends on **integer factorisation**: given a number N = p × q (where p and q are large primes), finding p and q is computationally hard for classical machines. RSA-2048 uses numbers with 617 decimal digits. The best classical algorithms would require billions of years of computation.

In 1994, mathematician Peter Shor published an algorithm that runs on a quantum computer and factors integers in polynomial time — exponentially faster than any known classical method. For RSA-2048, a fault-tolerant quantum computer with roughly four thousand logical qubits could complete the factorisation in a matter of hours.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 178" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="178" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Classical side -->
  <rect x="20" y="20" width="290" height="138" rx="3" fill="#fff" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="165" y="46" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">CLASSICAL COMPUTER</text>
  <text x="165" y="72" text-anchor="middle" font-size="12" fill="#111827">Best algorithm: General Number</text>
  <text x="165" y="88" text-anchor="middle" font-size="12" fill="#111827">Field Sieve</text>
  <text x="165" y="120" text-anchor="middle" font-size="26" font-weight="800" fill="#111827">~10¹⁵ years</text>
  <text x="165" y="145" text-anchor="middle" font-size="11" fill="#6b7280">to factor RSA-2048</text>
  <!-- VS -->
  <text x="340" y="96" text-anchor="middle" font-size="18" font-weight="700" fill="#6b7280">vs</text>
  <!-- Quantum side -->
  <rect x="370" y="20" width="290" height="138" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="515" y="46" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#1d4ed8">QUANTUM COMPUTER</text>
  <text x="515" y="72" text-anchor="middle" font-size="12" fill="#111827">Shor's algorithm</text>
  <text x="515" y="88" text-anchor="middle" font-size="12" fill="#111827">(~4,000 logical qubits)</text>
  <text x="515" y="120" text-anchor="middle" font-size="26" font-weight="800" fill="#dc2626">~8 hours</text>
  <text x="515" y="145" text-anchor="middle" font-size="11" fill="#6b7280">to factor RSA-2048</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — The quantum threat to RSA-2048. Shor's algorithm reduces a problem that would take classical hardware longer than the age of the universe to one a fault-tolerant quantum computer could solve in hours.</figcaption>
</figure>

The same vulnerability applies to elliptic-curve cryptography (ECC), which secures TLS, SSH, and the vast majority of modern internet connections. Shor's algorithm breaks it too. The scope is total: every public-key cryptographic system in widespread use today is vulnerable to a sufficiently capable quantum computer. Symmetric encryption such as AES is less affected — Grover's algorithm halves its effective key length, a problem addressed simply by doubling key sizes — but the public-key layer that underpins authentication and key exchange faces existential threat.

## The Threat Is Already Operational

A full-scale quantum cryptographic attack requires hardware that does not yet exist at the required scale. But adversaries do not need a quantum computer today. They need only storage — and storage is cheap.

Intelligence services, nation-state hacking operations, and well-resourced criminal enterprises are capturing and archiving encrypted network traffic right now. Diplomatic cables, financial transactions, medical records transmitted with today's encryption are all candidates. When — not if — a cryptographically-relevant quantum computer emerges, the archive can be opened retroactively. Any data that must remain secret for ten, twenty, or thirty years is already exposed if it has crossed a compromised network.

This is why security agencies worldwide have been issuing urgent guidance since 2022. The NSA, the UK National Cyber Security Centre, the EU's ENISA, and equivalent bodies in Australia and Canada have all warned that organisations handling sensitive long-lived data must begin migration planning immediately, regardless of when quantum hardware actually arrives.

## NIST's Six-Year Competition

Recognising that standardising new cryptographic algorithms takes years of public analysis and global consensus, the US National Institute of Standards and Technology launched an open competition in 2016. Sixty-nine candidate algorithms were submitted from research teams in twenty-five countries. After six years of cryptanalysis, performance benchmarking, and public review, NIST published its first finalised post-quantum cryptographic standards in August 2024.

The winning algorithms are built on mathematical problems believed to be hard for both classical and quantum computers — a critical distinction, since the threat model includes adversaries with access to both.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 215" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="38" rx="4" fill="#111827"/>
  <text x="340" y="24" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">NIST POST-QUANTUM CRYPTOGRAPHY STANDARDS — FINALISED AUGUST 2024</text>
  <!-- Lattice box -->
  <rect x="8" y="48" width="448" height="158" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="232" y="70" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.07em" fill="#1d4ed8">LATTICE-BASED  (3 standards)</text>
  <!-- ML-KEM -->
  <rect x="18" y="80" width="134" height="116" rx="3" fill="#fff" stroke="#1d4ed8" stroke-width="1"/>
  <text x="85" y="101" text-anchor="middle" font-size="13" font-weight="800" fill="#111827">ML-KEM</text>
  <text x="85" y="116" text-anchor="middle" font-size="10" fill="#6b7280">(CRYSTALS-Kyber)</text>
  <text x="85" y="136" text-anchor="middle" font-size="10" fill="#6b7280">Key encapsulation</text>
  <text x="85" y="150" text-anchor="middle" font-size="10" fill="#6b7280">Replaces RSA / ECC</text>
  <text x="85" y="164" text-anchor="middle" font-size="10" fill="#6b7280">key exchange in TLS,</text>
  <text x="85" y="178" text-anchor="middle" font-size="10" fill="#6b7280">VPNs, email</text>
  <text x="85" y="192" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">Primary standard</text>
  <!-- ML-DSA -->
  <rect x="162" y="80" width="134" height="116" rx="3" fill="#fff" stroke="#1d4ed8" stroke-width="1"/>
  <text x="229" y="101" text-anchor="middle" font-size="13" font-weight="800" fill="#111827">ML-DSA</text>
  <text x="229" y="116" text-anchor="middle" font-size="10" fill="#6b7280">(CRYSTALS-Dilithium)</text>
  <text x="229" y="136" text-anchor="middle" font-size="10" fill="#6b7280">Digital signatures</text>
  <text x="229" y="150" text-anchor="middle" font-size="10" fill="#6b7280">Software signing,</text>
  <text x="229" y="164" text-anchor="middle" font-size="10" fill="#6b7280">authentication,</text>
  <text x="229" y="178" text-anchor="middle" font-size="10" fill="#6b7280">code certificates</text>
  <text x="229" y="192" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">Primary standard</text>
  <!-- FN-DSA -->
  <rect x="306" y="80" width="140" height="116" rx="3" fill="#fff" stroke="#1d4ed8" stroke-width="1"/>
  <text x="376" y="101" text-anchor="middle" font-size="13" font-weight="800" fill="#111827">FN-DSA</text>
  <text x="376" y="116" text-anchor="middle" font-size="10" fill="#6b7280">(FALCON)</text>
  <text x="376" y="136" text-anchor="middle" font-size="10" fill="#6b7280">Digital signatures</text>
  <text x="376" y="150" text-anchor="middle" font-size="10" fill="#6b7280">Compact signature</text>
  <text x="376" y="164" text-anchor="middle" font-size="10" fill="#6b7280">size — suited to</text>
  <text x="376" y="178" text-anchor="middle" font-size="10" fill="#6b7280">constrained devices</text>
  <text x="376" y="192" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">Alternative standard</text>
  <!-- Hash box -->
  <rect x="466" y="48" width="206" height="158" rx="3" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="569" y="70" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.07em" fill="#16a34a">HASH-BASED  (1 standard)</text>
  <rect x="476" y="80" width="186" height="116" rx="3" fill="#fff" stroke="#16a34a" stroke-width="1"/>
  <text x="569" y="101" text-anchor="middle" font-size="13" font-weight="800" fill="#111827">SLH-DSA</text>
  <text x="569" y="116" text-anchor="middle" font-size="10" fill="#6b7280">(SPHINCS+)</text>
  <text x="569" y="136" text-anchor="middle" font-size="10" fill="#6b7280">Digital signatures</text>
  <text x="569" y="150" text-anchor="middle" font-size="10" fill="#6b7280">Security reduces to</text>
  <text x="569" y="164" text-anchor="middle" font-size="10" fill="#6b7280">hash function security</text>
  <text x="569" y="178" text-anchor="middle" font-size="10" fill="#6b7280">only — most conservative</text>
  <text x="569" y="192" text-anchor="middle" font-size="10" font-weight="700" fill="#15803d">Conservative standard</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — NIST's four finalised post-quantum standards. Three rely on the hardness of lattice problems (Learning With Errors and its variants); one relies entirely on the security of cryptographic hash functions — a more conservative choice with a longer security track record.</figcaption>
</figure>

The lattice-based algorithms rely on the Learning With Errors problem: finding a hidden linear structure in a cloud of randomly noisy data. This problem has been studied extensively since the 1990s and no efficient quantum algorithm is known to solve it. SLH-DSA (SPHINCS+) takes a maximally conservative approach: its security reduces entirely to the collision resistance of cryptographic hash functions, which are not threatened by Shor's algorithm and have resisted decades of cryptanalytic pressure.

## The Transition Is Harder Than It Looks

Replacing cryptographic algorithms sounds like a software update. It is not.

**Performance overheads are real.** Post-quantum public keys and ciphertexts are substantially larger than their classical equivalents. An ML-KEM public key is roughly 1,184 bytes; a comparable ECC P-256 key is 64 bytes. In bandwidth-constrained environments — embedded systems, IoT sensors, satellite uplinks — this overhead is operationally significant.

**Legacy systems are ubiquitous.** Industrial control systems, medical devices, and critical infrastructure equipment often run on hardware and firmware that cannot be straightforwardly updated. Many have operational lifetimes measured in decades.

**Cryptographic agility is now a requirement.** The lesson of the past decade's cryptographic breaks — MD5, SHA-1, early elliptic curves — is that no algorithm can be assumed permanent. Systems must be built to swap cryptographic primitives without architectural overhaul, a property called cryptographic agility that most deployed systems currently lack entirely.

**The supply chain multiplies complexity.** Every library, framework, hardware security module, and certificate authority in the global public-key infrastructure must be updated in a coordinated sequence. The coordination challenge dwarfs any previous infrastructure migration.

## The Migration Timeline

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 128" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <line x1="40" y1="62" x2="640" y2="62" stroke="#e5e7eb" stroke-width="3"/>
  <circle cx="40"  cy="62" r="9" fill="#111827"/>
  <circle cx="190" cy="62" r="9" fill="#1d4ed8"/>
  <circle cx="370" cy="62" r="9" fill="#1d4ed8"/>
  <circle cx="520" cy="62" r="9" fill="#d97706"/>
  <circle cx="640" cy="62" r="9" fill="#dc2626"/>
  <text x="40"  y="44" text-anchor="middle" font-size="12" font-weight="700" fill="#111827">2024</text>
  <text x="190" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="#1d4ed8">2025–26</text>
  <text x="370" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="#1d4ed8">2026–28</text>
  <text x="520" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="#d97706">2028–30</text>
  <text x="640" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="#dc2626">2030+</text>
  <text x="40"  y="83" text-anchor="middle" font-size="10" fill="#6b7280">NIST standards</text>
  <text x="40"  y="97" text-anchor="middle" font-size="10" fill="#6b7280">published</text>
  <text x="190" y="83" text-anchor="middle" font-size="10" fill="#6b7280">Cryptographic inventory</text>
  <text x="190" y="97" text-anchor="middle" font-size="10" fill="#6b7280">&amp; pilot deployments</text>
  <text x="370" y="83" text-anchor="middle" font-size="10" fill="#6b7280">Primary migration</text>
  <text x="370" y="97" text-anchor="middle" font-size="10" fill="#6b7280">wave — TLS, PKI, VPN</text>
  <text x="520" y="83" text-anchor="middle" font-size="10" fill="#6b7280">Legacy system</text>
  <text x="520" y="97" text-anchor="middle" font-size="10" fill="#6b7280">remediation</text>
  <text x="640" y="83" text-anchor="middle" font-size="10" fill="#dc2626">Quantum threat</text>
  <text x="640" y="97" text-anchor="middle" font-size="10" fill="#dc2626">window opens</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — The post-quantum migration window. With NIST standards now finalised, 2026–2028 is the critical deployment period for internet-facing systems. Organisations handling long-lived sensitive data effectively have less time, since harvested data is already at risk.</figcaption>
</figure>

The US government has mandated that federal agencies complete migration to post-quantum standards by 2035. The EU's ENISA and the UK's NCSC have issued equivalent frameworks. For organisations whose data carries long confidentiality requirements — healthcare, defence, financial services, critical infrastructure — the effective deadline is considerably earlier. Data harvested in 2024 may be decrypted in 2032.

## What Responsible Organisations Are Doing Now

The practical first steps do not require waiting for full post-quantum deployment.

Begin a **cryptographic inventory** — cataloguing every system, protocol, certificate, and library that uses public-key cryptography. You cannot migrate what you have not mapped. This inventory exercise alone typically reveals legacy dependencies and shadow IT that security teams did not know existed.

Deploy **hybrid key exchange** immediately for high-value connections. Combining ECDH with ML-KEM in parallel means that if the post-quantum component is later broken, classical security holds; if a quantum computer threatens the classical component, the PQC layer protects. Hybrid TLS is already supported in major browsers and is the recommended transition architecture.

Engage vendors and cloud providers on their **PQC roadmaps**. Hardware security modules, certificate authorities, and platform providers all operate on different timelines. Organisations that surface these dependencies now avoid supply chain surprises at migration time.

Build **cryptographic agility** into every new system. Any software written today should treat cryptographic primitives as configurable parameters, not hardcoded constants. The standards finalised in 2024 will not be the last ones needed.

## The Long View

Post-quantum cryptography is not the final answer. It is the next answer. History strongly implies that the algorithms standardised today will eventually be superseded — through improved cryptanalysis, new mathematical insights, or computational advances not yet imagined. What changes with each transition is not the requirement for cryptographic security, but the mathematics on which it rests.

The organisations that navigate this transition most successfully will not just be the ones that deploy ML-KEM on schedule. They will be the ones that built systems capable of absorbing the transition that comes after, and the one after that. In modern cryptography, agility is not an engineering feature. It is a survival trait.
