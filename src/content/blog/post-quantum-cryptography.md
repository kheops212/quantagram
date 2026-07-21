---
title: "Post-Quantum Cryptography: The Algorithms Replacing RSA Before the Quantum Computer Arrives"
description: "Every TLS connection, every signed certificate, every encrypted email uses cryptography that Shor's algorithm can break. NIST finalised four post-quantum cryptographic standards in 2024 — ML-KEM, ML-DSA, SLH-DSA, and FN-DSA — based on mathematical problems that quantum computers are not known to solve efficiently. Here is the threat model, the mathematics, the size trade-offs, and why migration is already urgent even though the quantum computer does not exist yet."
pubDate: 'May 28 2025'
heroImage: '../../assets/hero-pqc.svg'
pillar: 'Quantum Cryptography'
author: 'KhGh'
tags: ['post-quantum cryptography', 'PQC', 'NIST', 'lattice cryptography', 'LWE', 'ML-KEM', 'ML-DSA', 'SLH-DSA', 'quantum cryptography']
sources:
  - title: 'FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard'
    authors: 'NIST'
    venue: 'Federal Information Processing Standards Publication 203'
    year: 2024
    url: 'https://csrc.nist.gov/pubs/fips/203/final'
  - title: 'FIPS 204: Module-Lattice-Based Digital Signature Standard'
    authors: 'NIST'
    venue: 'Federal Information Processing Standards Publication 204'
    year: 2024
    url: 'https://csrc.nist.gov/pubs/fips/204/final'
  - title: 'FIPS 205: Stateless Hash-Based Digital Signature Standard'
    authors: 'NIST'
    venue: 'Federal Information Processing Standards Publication 205'
    year: 2024
    url: 'https://csrc.nist.gov/pubs/fips/205/final'
  - title: 'On Lattices, Learning with Errors, Random Linear Codes, and Cryptography'
    authors: 'Oded Regev'
    venue: 'Proc. 37th ACM Symposium on Theory of Computing (STOC); Journal of the ACM 56(6)'
    year: 2005
    url: 'https://cims.nyu.edu/~regev/papers/qcrypto.pdf'
  - title: 'An Efficient Key Recovery Attack on SIDH'
    authors: 'Wouter Castryck, Thomas Decru'
    venue: 'EUROCRYPT 2023; IACR ePrint 2022/975'
    year: 2023
    url: 'https://eprint.iacr.org/2022/975'
---

The internet's security infrastructure runs on two mathematical problems: integer factoring and the elliptic curve discrete logarithm. RSA encrypts by multiplying large primes; ECDH exchanges keys using elliptic curve arithmetic; ECDSA signs certificates using the same. Every TLS handshake that makes a browser show a padlock, every SSH session, every signed software update — all of these depend on the assumption that no efficient algorithm exists for these problems.

Shor's algorithm is an efficient algorithm for both. A fault-tolerant quantum computer running Shor's algorithm would break RSA-2048 in hours. It would break 256-bit ECC in similar time. Not weaken — break completely, at any key size, unconditionally.

The world has known this since 1994. In 2016, NIST launched a competition to standardise replacements. In August 2024, after eight years of evaluation across three rounds and sixty-nine submissions, NIST published four Federal Information Processing Standards: **ML-KEM** (FIPS 203), **ML-DSA** (FIPS 204), **SLH-DSA** (FIPS 205), and **FN-DSA** (FIPS 206). These are the algorithms replacing RSA and ECC. Understanding them requires understanding both the threat they address and the mathematics they rely on — which is, in each case, deliberately different from anything Shor's algorithm can touch.

<div style="border:1px solid var(--border);border-left:3px solid var(--accent);padding:1.25rem 1.5rem;margin:2rem 0;background:var(--bg-alt);">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem 0;">Key Concepts in This Article</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem 2rem;">
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Learning With Errors (LWE)</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The computational problem underlying the NIST lattice standards: given many noisy linear equations over a lattice, find the secret vector. No classical or quantum algorithm solves this efficiently for cryptographic parameters.</p></div>
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Key Encapsulation Mechanism (KEM)</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A protocol allowing two parties to establish a shared secret key over a public channel. ML-KEM replaces ECDH/DH key exchange. The sender encapsulates a random key using the recipient's public key; the recipient decapsulates with their private key.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Harvest Now, Decrypt Later</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">An attack strategy where an adversary records encrypted traffic today and stores it for decryption once a cryptographically relevant quantum computer (CRQC) becomes available. Data encrypted with RSA/ECC today may be vulnerable in 10–20 years.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Hybrid Scheme</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A transitional design that combines a classical algorithm (ECDH) with a post-quantum algorithm (ML-KEM) in parallel. Security holds if either component is secure — defending against both classical cryptanalysis of PQC and future quantum attacks on ECDH simultaneously.</p></div>
  </div>
</div>

## The Threat Landscape: What Breaks, What Bends, What Holds

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 185" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">QUANTUM THREAT CLASSIFICATION</text>
  <!-- Column 1: Broken by Shor -->
  <rect x="10" y="26" width="210" height="152" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
  <text x="115" y="46" text-anchor="middle" font-size="9.5" font-weight="700" letter-spacing="0.06em" fill="#dc2626">BROKEN BY SHOR'S ALGORITHM</text>
  <text x="115" y="62" text-anchor="middle" font-size="8.5" fill="#9b1c1c">any key size, unconditionally</text>
  <text x="115" y="84"  text-anchor="middle" font-size="11" fill="#111827">RSA (all variants)</text>
  <text x="115" y="102" text-anchor="middle" font-size="11" fill="#111827">ECDH / ECDSA / EdDSA</text>
  <text x="115" y="120" text-anchor="middle" font-size="11" fill="#111827">Diffie-Hellman (DH)</text>
  <text x="115" y="138" text-anchor="middle" font-size="11" fill="#111827">DSA / ElGamal</text>
  <text x="115" y="156" text-anchor="middle" font-size="11" fill="#111827">SM2 / GOST ECC</text>
  <text x="115" y="172" text-anchor="middle" font-size="8.5" fill="#dc2626" font-weight="700">Replace immediately</text>
  <!-- Column 2: Weakened by Grover -->
  <rect x="235" y="26" width="210" height="152" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="340" y="46" text-anchor="middle" font-size="9.5" font-weight="700" letter-spacing="0.06em" fill="#d97706">WEAKENED BY GROVER'S ALGORITHM</text>
  <text x="340" y="62" text-anchor="middle" font-size="8.5" fill="#92400e">bit security halved — fix with larger keys</text>
  <text x="340" y="84"  text-anchor="middle" font-size="11" fill="#111827">AES-128 → 64-bit security</text>
  <text x="340" y="102" text-anchor="middle" font-size="11" fill="#111827">SHA-256 collision (BHT)</text>
  <text x="340" y="120" text-anchor="middle" font-size="11" fill="#111827">3DES / ChaCha20-128</text>
  <text x="340" y="138" text-anchor="middle" font-size="8.5" fill="#92400e">AES-256 and SHA-384 are fine</text>
  <text x="340" y="172" text-anchor="middle" font-size="8.5" fill="#d97706" font-weight="700">Upgrade key sizes</text>
  <!-- Column 3: Quantum-safe -->
  <rect x="460" y="26" width="210" height="152" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="565" y="46" text-anchor="middle" font-size="9.5" font-weight="700" letter-spacing="0.06em" fill="#16a34a">QUANTUM-SAFE</text>
  <text x="565" y="62" text-anchor="middle" font-size="8.5" fill="#14532d">no known quantum speedup</text>
  <text x="565" y="84"  text-anchor="middle" font-size="11" fill="#111827">ML-KEM / ML-DSA / SLH-DSA</text>
  <text x="565" y="102" text-anchor="middle" font-size="11" fill="#111827">AES-256 / SHA-384 / SHA-512</text>
  <text x="565" y="120" text-anchor="middle" font-size="11" fill="#111827">HMAC-SHA-256+ / SHA-3</text>
  <text x="565" y="138" text-anchor="middle" font-size="11" fill="#111827">Classic McEliece / BIKE / HQC</text>
  <text x="565" y="172" text-anchor="middle" font-size="8.5" fill="#16a34a" font-weight="700">Deploy now or retain</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — Quantum threat classification. The left column contains every widely deployed asymmetric cryptography scheme — all broken unconditionally by Shor's algorithm at any key size. The centre column contains symmetric schemes whose bit security is halved by Grover's algorithm, but which are safe with larger keys. The right column contains algorithms that no known quantum algorithm attacks efficiently.</figcaption>
</figure>

The threat is asymmetric in both the technical and practical sense. RSA and ECC are completely broken — no engineering solution involving larger keys can save them, because Shor's algorithm runs in polynomial time in the key size. Symmetric cryptography (AES, SHA, HMAC) is only weakened, and the fix is already standardised: use 256-bit keys and 384-bit hash outputs. The migration problem is therefore almost entirely about asymmetric cryptography: key exchange, digital signatures, and public-key encryption.

## The Mathematical Foundation: Four Families of Hard Problems

Post-quantum cryptography does not use one hard problem — it uses four distinct families, each resting on mathematical structures that quantum computers are not known to attack efficiently. The deliberate diversity is a hedge: if one family turns out to be broken, the others remain.

**Lattice problems (LWE, SIS, NTRU).** A lattice is a regular grid of points in high-dimensional space. The hardest problem on a lattice — finding the shortest non-zero vector — resists all known quantum attacks. The algorithms deployed in practice use related problems (LWE and SIS) that can be reduced to lattice problems in the worst case. ML-KEM, ML-DSA, and FN-DSA all belong to this family.

**Hash-based cryptography.** If cryptographic hash functions are secure against Grover's algorithm (which they are, with 256-bit outputs), then signature schemes built entirely from hash functions are quantum-safe by construction. SLH-DSA uses Merkle trees of one-time signatures, each built from hash function evaluations. The security assumption is minimal: SHA-256 or SHAKE-256 must resist preimage attacks.

**Code-based cryptography.** Based on the hardness of decoding random linear error-correcting codes — a problem studied since the 1970s with no known quantum speedup. Classic McEliece, the oldest PQC system still unbroken, belongs here. Downside: key sizes in the hundreds of kilobytes to megabytes.

**Isogeny-based cryptography.** Based on the hardness of finding maps between elliptic curves (isogenies). SIKE was the prominent representative — until it was broken in 2022 by a classical attack running in under an hour on a laptop. The collapse of SIKE is the field's most important cautionary tale.

## Learning With Errors: The Dominant Hard Problem

The most widely deployed post-quantum algorithms rest on a single hard problem introduced by Oded Regev in 2005: **Learning With Errors (LWE)**. Given a public random matrix $A$ and the noisy product

$$
\mathbf{b} = A\mathbf{s} + \mathbf{e} \pmod q,
$$

the task is to recover the secret vector $\mathbf{s}$. Without the small error term $\mathbf{e}$, Gaussian elimination solves this instantly; with it, no efficient classical or quantum algorithm is known.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">THE LEARNING WITH ERRORS (LWE) PROBLEM</text>
  <!-- Left: LWE sample generation -->
  <rect x="10" y="26" width="300" height="158" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="160" y="44" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6b7280">LWE SAMPLE (public)</text>
  <!-- Matrix equation A·s + e = b -->
  <!-- A: random matrix (3x4) representation -->
  <text x="45" y="75" text-anchor="middle" font-size="10" fill="#6b7280">A</text>
  <rect x="52" y="58" width="68" height="72" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="64"  y="78"  font-size="8.5" fill="#1d4ed8">3  1  4  1</text>
  <text x="64"  y="92"  font-size="8.5" fill="#1d4ed8">5  9  2  6</text>
  <text x="64"  y="106" font-size="8.5" fill="#1d4ed8">5  3  5  8</text>
  <text x="64"  y="120" font-size="8.5" fill="#1d4ed8">9  7  9  3</text>
  <!-- × -->
  <text x="132" y="100" text-anchor="middle" font-size="16" fill="#374151">×</text>
  <!-- s: secret column vector -->
  <text x="155" y="75" text-anchor="middle" font-size="10" fill="#dc2626">s</text>
  <rect x="140" y="58" width="30" height="72" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="155" y="78"  font-size="8.5" fill="#dc2626" text-anchor="middle">2</text>
  <text x="155" y="92"  font-size="8.5" fill="#dc2626" text-anchor="middle">7</text>
  <text x="155" y="106" font-size="8.5" fill="#dc2626" text-anchor="middle">1</text>
  <text x="155" y="120" font-size="8.5" fill="#dc2626" text-anchor="middle">8</text>
  <!-- + -->
  <text x="183" y="100" text-anchor="middle" font-size="16" fill="#374151">+</text>
  <!-- e: small error vector -->
  <text x="210" y="75" text-anchor="middle" font-size="10" fill="#059669">e</text>
  <rect x="196" y="58" width="30" height="72" rx="3" fill="#dcfce7" stroke="#059669" stroke-width="1.5"/>
  <text x="211" y="78"  font-size="8.5" fill="#059669" text-anchor="middle">0</text>
  <text x="211" y="92"  font-size="8.5" fill="#059669" text-anchor="middle">1</text>
  <text x="211" y="106" font-size="8.5" fill="#059669" text-anchor="middle">-1</text>
  <text x="211" y="120" font-size="8.5" fill="#059669" text-anchor="middle">0</text>
  <!-- = -->
  <text x="238" y="100" text-anchor="middle" font-size="16" fill="#374151">=</text>
  <!-- b: output vector -->
  <text x="272" y="75" text-anchor="middle" font-size="10" fill="#7c3aed">b</text>
  <rect x="255" y="58" width="38" height="72" rx="3" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="274" y="78"  font-size="8.5" fill="#7c3aed" text-anchor="middle">37</text>
  <text x="274" y="92"  font-size="8.5" fill="#7c3aed" text-anchor="middle">72</text>
  <text x="274" y="106" font-size="8.5" fill="#7c3aed" text-anchor="middle">44</text>
  <text x="274" y="120" font-size="8.5" fill="#7c3aed" text-anchor="middle">81</text>
  <!-- Labels -->
  <text x="87"  y="140" text-anchor="middle" font-size="8.5" fill="#1d4ed8">random (public)</text>
  <text x="155" y="140" text-anchor="middle" font-size="8.5" fill="#dc2626">secret</text>
  <text x="211" y="140" text-anchor="middle" font-size="8.5" fill="#059669">tiny noise</text>
  <text x="274" y="140" text-anchor="middle" font-size="8.5" fill="#7c3aed">public</text>
  <text x="160" y="170" text-anchor="middle" font-size="9" fill="#374151" font-weight="700">Given A and b, find s.</text>
  <text x="160" y="182" text-anchor="middle" font-size="8.5" fill="#6b7280">Without noise: trivial (Gaussian elimination). With noise: computationally infeasible.</text>
  <!-- Right: security intuition -->
  <rect x="330" y="26" width="340" height="158" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="500" y="44" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6b7280">WHY NOISE MAKES IT HARD</text>
  <!-- Without noise: easy -->
  <rect x="345" y="54" width="145" height="56" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="418" y="71" text-anchor="middle" font-size="9" font-weight="700" fill="#16a34a">WITHOUT NOISE</text>
  <text x="418" y="84" text-anchor="middle" font-size="9" fill="#111827">A·s = b exactly</text>
  <text x="418" y="97" text-anchor="middle" font-size="9" fill="#111827">→ Gaussian elimination</text>
  <text x="418" y="108" text-anchor="middle" font-size="8.5" fill="#16a34a">O(n³) — trivially easy</text>
  <!-- With noise: hard -->
  <rect x="505" y="54" width="152" height="56" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="581" y="71" text-anchor="middle" font-size="9" font-weight="700" fill="#dc2626">WITH NOISE (LWE)</text>
  <text x="581" y="84" text-anchor="middle" font-size="9" fill="#111827">A·s + e = b</text>
  <text x="581" y="97" text-anchor="middle" font-size="9" fill="#111827">no efficient algorithm</text>
  <text x="581" y="108" text-anchor="middle" font-size="8.5" fill="#dc2626">best: exp(O(n)) time</text>
  <!-- Worst-case reduction note -->
  <rect x="345" y="124" width="312" height="50" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="501" y="140" text-anchor="middle" font-size="9" font-weight="700" fill="#1d4ed8">Worst-case hardness guarantee</text>
  <text x="501" y="153" text-anchor="middle" font-size="8.5" fill="#111827">Breaking LWE in the average case is as hard as solving</text>
  <text x="501" y="165" text-anchor="middle" font-size="8.5" fill="#111827">the hardest lattice problems in the worst case (Regev 2005)</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — The Learning With Errors problem. A public random matrix A and public vector b are given; the secret vector s (in red) must be found. Without noise, Gaussian elimination solves the system in polynomial time. With a small error vector e added to each equation, no known classical or quantum algorithm recovers s in sub-exponential time. A critical property: Regev proved that breaking LWE in the average case is as hard as solving the worst-case shortest vector problem on lattices — providing the strongest known security reduction in cryptography.</figcaption>
</figure>

The LWE problem has a property that no other cryptographic hardness assumption currently possesses: a **worst-case to average-case reduction**. Breaking RSA requires only that factoring specific numbers is hard; breaking LWE in a random instance is provably as hard as solving the hardest possible lattice problem in the worst case. This means that even if an attacker is extremely lucky in their choice of problem instance, the hardness guarantee still holds — a much stronger security foundation than RSA.

Practical implementations use **Ring-LWE** or **Module-LWE**, which add algebraic structure (working in polynomial rings rather than integer vectors) to improve efficiency while retaining provable worst-case hardness. ML-KEM and ML-DSA are Module-LWE schemes; their "module" structure lets them use smaller parameters than plain LWE while keeping security proofs intact.

## The NIST Standards: What Was Standardised and Why

**ML-KEM (FIPS 203) — formerly CRYSTALS-Kyber**

ML-KEM is a **Key Encapsulation Mechanism** — the replacement for ECDH and DH. It allows two parties to establish a shared secret without a prior shared key:

1. The recipient generates a public/private key pair and publishes the public key.
2. The sender generates a random key, encapsulates it using the recipient's public key, and sends the ciphertext.
3. The recipient decapsulates with their private key to recover the shared secret.

The security rests on Module-LWE: without the private key, recovering the encapsulated key from the ciphertext requires solving LWE. ML-KEM comes in three security levels: ML-KEM-512 (comparable to AES-128), ML-KEM-768 (AES-192), and ML-KEM-1024 (AES-256). For most applications, ML-KEM-768 is recommended.

**ML-DSA (FIPS 204) — formerly CRYSTALS-Dilithium**

ML-DSA is a **digital signature scheme** — the replacement for ECDSA and RSA-PSS for signing certificates, software, and messages. It is based on the Module-LWE and Module-SIS (Short Integer Solution) problems, using a "Fiat-Shamir with aborts" construction to achieve security against adaptive chosen-message attacks.

ML-DSA signatures are significantly larger than ECDSA signatures (2–4 KB vs 71 bytes), which has implications for TLS certificate chains, firmware update packages, and any protocol where signature bandwidth matters.

**SLH-DSA (FIPS 205) — formerly SPHINCS+**

SLH-DSA is a **stateless hash-based signature scheme** — the most conservative option in the NIST portfolio. Its security assumption is minimal: if SHA-256 or SHAKE-256 resists preimage and second-preimage attacks (which they do, with 2¹²⁸ quantum resistance under Grover), then SLH-DSA is secure against all known attacks, classical or quantum.

The construction uses a hypertree of WOTS+ (Winternitz One-Time Signature) instances, where each node's public key is a Merkle root of the keys below it. The simplicity of the security assumption comes at a cost: SLH-DSA signatures range from 8 KB to 50 KB depending on parameter choice, and signing is slow. It is recommended for applications where signature size is tolerable and security minimalism is paramount — signing firmware images, for example, where a smaller signature is not worth the risk of relying on lattice assumptions.

**FN-DSA (FIPS 206, draft) — formerly FALCON**

FN-DSA is a **compact lattice signature scheme** based on NTRU lattices, producing signatures of ~666–1280 bytes — significantly smaller than ML-DSA. The signing algorithm uses fast Fourier sampling over Gaussian distributions on NTRU lattices, which achieves high efficiency but requires careful implementation to avoid floating-point side-channel attacks. FIPS 206 was published in draft form and is expected to be finalised in 2025.

## The Cautionary Tale: SIKE's 2022 Collapse

Among the NIST round 3 finalists was SIKE (Supersingular Isogeny Key Encapsulation) — an algorithm based on the presumed hardness of finding isogenies between supersingular elliptic curves. SIKE had spent four years in NIST evaluation, survived three rounds of scrutiny, and was considered a promising candidate due to its very small key sizes.

On 30 July 2022, Wouter Castryck and Thomas Decru posted a preprint showing a classical polynomial-time attack on SIKE. Running the attack on a single core of a laptop computer took 62 minutes to break SIKE's highest security level. One week later, NIST eliminated SIKE from the competition.

The attack exploited the specific mathematical structure of supersingular isogeny graphs — a "glue-and-split" theorem from classical algebraic geometry that nobody had applied to the problem before. SIKE's security had rested on the assumption that no such technique existed. The assumption was wrong.

The collapse of SIKE carries three lessons. First, novel mathematical assumptions in cryptography carry genuine risk; the more recent the problem's study, the greater the chance of an undiscovered attack. Second, the NIST evaluation process, despite its rigor, cannot guarantee that a finalist has no classical vulnerability. Third, the diversity of the NIST portfolio — lattice, hash-based, and code-based algorithms, not all isogeny-based — means that a single breakthrough does not compromise the entire migration effort.

## Key and Signature Sizes: The Cost of Quantum Resistance

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 215" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="30" rx="4" fill="#111827"/>
  <text x="340" y="20" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">KEY AND SIGNATURE / CIPHERTEXT SIZES</text>
  <rect x="0" y="30" width="680" height="26" fill="#f9fafb"/>
  <text x="140" y="47" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">SCHEME</text>
  <text x="290" y="47" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">PUBLIC KEY</text>
  <text x="430" y="47" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">SIG / CIPHERTEXT</text>
  <text x="560" y="47" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">SECURITY LEVEL</text>
  <text x="638" y="47" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">STATUS</text>
  <line x1="0" y1="56" x2="680" y2="56" stroke="#e5e7eb" stroke-width="1"/>
  <!-- RSA-2048 -->
  <rect x="0" y="56" width="680" height="26" fill="#fff"/>
  <text x="140" y="73" text-anchor="middle" font-size="10" fill="#111827">RSA-2048</text>
  <text x="290" y="73" text-anchor="middle" font-size="10" fill="#1d4ed8">256 B</text>
  <text x="430" y="73" text-anchor="middle" font-size="10" fill="#1d4ed8">256 B</text>
  <text x="560" y="73" text-anchor="middle" font-size="10" fill="#111827">112-bit classical</text>
  <text x="638" y="73" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="700">Broken by Shor</text>
  <line x1="0" y1="82" x2="680" y2="82" stroke="#e5e7eb" stroke-width="1"/>
  <!-- ECDSA P-256 -->
  <rect x="0" y="82" width="680" height="26" fill="#f9fafb"/>
  <text x="140" y="99" text-anchor="middle" font-size="10" fill="#111827">ECDSA P-256</text>
  <text x="290" y="99" text-anchor="middle" font-size="10" fill="#1d4ed8">33 B</text>
  <text x="430" y="99" text-anchor="middle" font-size="10" fill="#1d4ed8">64–71 B</text>
  <text x="560" y="99" text-anchor="middle" font-size="10" fill="#111827">128-bit classical</text>
  <text x="638" y="99" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="700">Broken by Shor</text>
  <line x1="0" y1="108" x2="680" y2="108" stroke="#e5e7eb" stroke-width="1"/>
  <!-- ML-KEM-768 -->
  <rect x="0" y="108" width="680" height="26" fill="#fff"/>
  <text x="140" y="125" text-anchor="middle" font-size="10" fill="#111827">ML-KEM-768 (KEM)</text>
  <text x="290" y="125" text-anchor="middle" font-size="10" fill="#059669">1,184 B</text>
  <text x="430" y="125" text-anchor="middle" font-size="10" fill="#059669">1,088 B</text>
  <text x="560" y="125" text-anchor="middle" font-size="10" fill="#111827">NIST Level 3</text>
  <text x="638" y="125" text-anchor="middle" font-size="10" fill="#059669" font-weight="700">FIPS 203</text>
  <line x1="0" y1="134" x2="680" y2="134" stroke="#e5e7eb" stroke-width="1"/>
  <!-- ML-DSA-65 -->
  <rect x="0" y="134" width="680" height="26" fill="#f9fafb"/>
  <text x="140" y="151" text-anchor="middle" font-size="10" fill="#111827">ML-DSA-65 (sig)</text>
  <text x="290" y="151" text-anchor="middle" font-size="10" fill="#d97706">1,952 B</text>
  <text x="430" y="151" text-anchor="middle" font-size="10" fill="#d97706">3,293 B</text>
  <text x="560" y="151" text-anchor="middle" font-size="10" fill="#111827">NIST Level 3</text>
  <text x="638" y="151" text-anchor="middle" font-size="10" fill="#059669" font-weight="700">FIPS 204</text>
  <line x1="0" y1="160" x2="680" y2="160" stroke="#e5e7eb" stroke-width="1"/>
  <!-- FN-DSA-1024 (FALCON) -->
  <rect x="0" y="160" width="680" height="26" fill="#fff"/>
  <text x="140" y="177" text-anchor="middle" font-size="10" fill="#111827">FN-DSA-1024 (sig)</text>
  <text x="290" y="177" text-anchor="middle" font-size="10" fill="#d97706">1,793 B</text>
  <text x="430" y="177" text-anchor="middle" font-size="10" fill="#059669">1,280 B</text>
  <text x="560" y="177" text-anchor="middle" font-size="10" fill="#111827">NIST Level 5</text>
  <text x="638" y="177" text-anchor="middle" font-size="10" fill="#d97706" font-weight="700">FIPS 206 (draft)</text>
  <line x1="0" y1="186" x2="680" y2="186" stroke="#e5e7eb" stroke-width="1"/>
  <!-- SLH-DSA-128f -->
  <rect x="0" y="186" width="680" height="29" fill="#f9fafb"/>
  <text x="140" y="203" text-anchor="middle" font-size="10" fill="#111827">SLH-DSA-SHA2-128f (sig)</text>
  <text x="290" y="203" text-anchor="middle" font-size="10" fill="#059669">32 B</text>
  <text x="430" y="203" text-anchor="middle" font-size="10" fill="#dc2626">17,088 B</text>
  <text x="560" y="203" text-anchor="middle" font-size="10" fill="#111827">NIST Level 1</text>
  <text x="638" y="203" text-anchor="middle" font-size="10" fill="#059669" font-weight="700">FIPS 205</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — Key and signature/ciphertext size comparison. Post-quantum schemes are universally larger than their classical equivalents. ML-KEM-768's 1184-byte public key is ~36× larger than ECDSA P-256's but small enough for practical TLS deployment. ML-DSA signatures at 3293 bytes are ~46× larger than ECDSA, requiring protocol changes in bandwidth-constrained systems. SLH-DSA's 32-byte public key is the smallest of any scheme, but its 17 KB signature makes it impractical for TLS unless signatures are cached.</figcaption>
</figure>

The size increase is the most immediate engineering challenge in the PQC migration. A TLS 1.3 handshake today carries two ECDSA signatures (~71 bytes each) in the certificate chain. With ML-DSA, the same handshake carries signatures of ~3,293 bytes each — adding approximately 6 KB to every new TLS connection. For constrained environments (IoT devices with limited RAM, satellite links with low bandwidth, real-time control systems) this overhead is not trivial.

Hybrid schemes mitigate this by combining classical and post-quantum algorithms: the handshake carries both an ECDH key share and an ML-KEM encapsulation. The session key is derived from both; security holds if either component is secure. This is the approach deployed by Cloudflare, Google Chrome, and major browsers since 2023 for key exchange — ECDH × 25519 + ML-KEM-768 in a hybrid construction. Hybrid signatures (ECDSA + ML-DSA) are more complex and less deployed, but work is underway in IETF standards.

## Harvest Now, Decrypt Later: Why This Is Already Urgent

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 145" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">"HARVEST NOW, DECRYPT LATER" — THE THREAT TIMELINE</text>
  <!-- Timeline bar -->
  <line x1="30" y1="72" x2="650" y2="72" stroke="#374151" stroke-width="3"/>
  <!-- Year markers -->
  <line x1="30"  y1="66" x2="30"  y2="78" stroke="#374151" stroke-width="2"/>
  <line x1="220" y1="66" x2="220" y2="78" stroke="#374151" stroke-width="2"/>
  <line x1="430" y1="66" x2="430" y2="78" stroke="#374151" stroke-width="2"/>
  <line x1="650" y1="66" x2="650" y2="78" stroke="#374151" stroke-width="2"/>
  <text x="30"  y="90" text-anchor="middle" font-size="9" fill="#374151">2025</text>
  <text x="220" y="90" text-anchor="middle" font-size="9" fill="#374151">~2030</text>
  <text x="430" y="90" text-anchor="middle" font-size="9" fill="#374151">~2035</text>
  <text x="650" y="90" text-anchor="middle" font-size="9" fill="#374151">2040+</text>
  <!-- Phase 1: Harvest now -->
  <rect x="30" y="38" width="200" height="28" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="130" y="52" text-anchor="middle" font-size="9" font-weight="700" fill="#dc2626">Adversary harvests</text>
  <text x="130" y="63" text-anchor="middle" font-size="8.5" fill="#dc2626">RSA/ECC encrypted traffic</text>
  <!-- Stored data symbol -->
  <rect x="236" y="38" width="188" height="28" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="330" y="52" text-anchor="middle" font-size="9" font-weight="700" fill="#d97706">Ciphertext stored &amp; waiting</text>
  <text x="330" y="63" text-anchor="middle" font-size="8.5" fill="#d97706">state-actor data centres</text>
  <!-- CRQC arrives -->
  <rect x="430" y="38" width="80" height="28" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="470" y="52" text-anchor="middle" font-size="8.5" font-weight="700" fill="#16a34a">CRQC</text>
  <text x="470" y="63" text-anchor="middle" font-size="8" fill="#16a34a">arrives</text>
  <!-- Decrypt later -->
  <rect x="520" y="38" width="130" height="28" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
  <text x="585" y="52" text-anchor="middle" font-size="9" font-weight="700" fill="#dc2626">Retroactive decryption</text>
  <text x="585" y="63" text-anchor="middle" font-size="8.5" fill="#dc2626">of all stored traffic</text>
  <!-- Key insight box -->
  <rect x="30" y="108" width="620" height="30" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="340" y="121" text-anchor="middle" font-size="9" font-weight="700" fill="#1d4ed8">Data encrypted TODAY with RSA/ECC that must remain confidential for 10+ years is ALREADY at risk.</text>
  <text x="340" y="133" text-anchor="middle" font-size="8.5" fill="#1d4ed8">Government, health, financial, intelligence communications with long-term sensitivity must migrate now — not when the quantum computer arrives.</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 4 — The harvest now, decrypt later (HNDL) threat. A quantum computer does not need to exist today to make current RSA/ECC encryption vulnerable. Adversaries with sufficient storage capacity can intercept and archive encrypted traffic now and decrypt it when a CRQC becomes available. Any data encrypted today that must remain confidential beyond the expected CRQC arrival window (conservatively 10–20 years) is already at risk.</figcaption>
</figure>

The urgency of post-quantum migration is not driven by the quantum computer existing — it doesn't. It is driven by the fact that **encrypted data collected today can be stored and decrypted in the future**. This is the harvest now, decrypt later (HNDL) threat.

Consider a diplomatic cable encrypted with RSA-2048 in 2025, intended to remain classified for 30 years. If a state actor intercepts and stores that ciphertext today, and a CRQC becomes available in 2035, the cable is decrypted a decade before its classification period ends. The same applies to medical records, financial transaction histories, proprietary intellectual property, and any other long-lived sensitive data.

This drives migration timelines that have nothing to do with the current state of quantum hardware:
- **US NSA** (CNSA Suite 2.0): required transition of national security systems to PQC algorithms by 2030.
- **CISA / NIST**: recommends beginning PQC migration now, especially for systems with long data lifetimes.
- **EU / ENISA**: similar guidance, with particular urgency for critical infrastructure.
- **GCHQ / NCSC (UK)**: recommends hybrid schemes for key exchange immediately while signature migration plans are developed.

## The Migration Path: TLS, PKI, and What Changes

The most immediate impact is on TLS, which secures essentially all web traffic. TLS 1.3 uses ECDH for key exchange and ECDSA or RSA for authentication (certificate signatures). Both components must be replaced:

**Key exchange**: ML-KEM replaces ECDH. Hybrid ML-KEM-768 + X25519 is already deployed by Cloudflare, Google, and Apple in production TLS. The IETF standardised this hybrid in RFC 9180 and related drafts. The key exchange change is backward-compatible and already in wide deployment.

**Certificate signatures**: ML-DSA and FN-DSA replace ECDSA and RSA in X.509 certificates. This is more complex: the entire PKI (Public Key Infrastructure) must transition, meaning certificate authorities, web servers, intermediate CAs, and client trust stores must all support PQC signature verification. Certificate chains with ML-DSA signatures are 4–10× larger than current chains, requiring TLS implementation changes and potentially increasing handshake latency.

**Code signing and firmware**: software update systems, secure boot chains, and firmware verification must transition to ML-DSA or SLH-DSA. The conservative choice — SLH-DSA — is appropriate here since signatures are verified infrequently and the security assumption is minimal.

**SSH and VPN**: OpenSSH has supported ML-KEM key exchange since version 9.0 (released 2022). WireGuard, IPsec, and OpenVPN implementations are in various stages of PQC integration.

## Post-Quantum Is Not Quantum Cryptography

One important clarification: post-quantum cryptography is entirely **classical software** running on classical computers. It does not use quantum mechanics. Its security is computational — based on the hardness of mathematical problems — not information-theoretic.

Quantum Key Distribution (QKD), such as the BB84 protocol covered separately in this series, takes a different approach: it uses quantum mechanics to distribute cryptographic keys with information-theoretic security guarantees. QKD is unconditionally secure under its physical assumptions (quantum mechanics is correct, the channel is authenticated) but requires specialised hardware, has severe distance limitations, and does not currently integrate with existing internet infrastructure.

PQC and QKD address the same threat — quantum computers breaking key exchange — through fundamentally different means. PQC is the near-term practical solution; QKD is a long-term research direction with different security properties and infrastructure requirements. The NIST PQC standards are what will be deployed in browsers, servers, and cryptographic libraries over the next decade. QKD, despite its theoretical elegance, is not a practical substitute at internet scale.

## The Honest Assessment

The NIST PQC standards represent the most significant change to deployed cryptography since the adoption of AES in 2001. Unlike that transition — which required changing a symmetric cipher and was relatively straightforward — this transition requires replacing the mathematical foundations of public-key cryptography that have been in use for nearly fifty years.

The standards are not the end of the work. Lattice cryptography has existed for roughly twenty years; its security assumptions, while well-studied, have not been subjected to the four decades of scrutiny that RSA has endured. New classical attacks on LWE remain possible, though the worst-case hardness reduction provides stronger theoretical assurance than RSA ever did. The SIKE collapse demonstrates that even carefully evaluated candidates can fall to novel attacks.

The appropriate response is what the NIST process itself embodies: multiple independent mathematical assumptions, conservative parameter sizes, hybrid schemes during the transition, and ongoing cryptanalytic research. The migration to post-quantum cryptography is not a one-time event — it is the beginning of a period in which cryptographic agility (the ability to swap algorithms without breaking systems) becomes a design requirement rather than an afterthought.

The quantum computer has not arrived. The damage it will do to current cryptography is already determined. The window to migrate closes not when the quantum computer arrives, but when adversaries with HNDL collections gain access to one.
