---
title: "The Algorithm That Broke RSA: Shor's Factoring Algorithm Explained"
description: "In 1994, Peter Shor proved that a quantum computer can factor large integers in polynomial time — rendering RSA, ECC, and Diffie-Hellman cryptography conditionally obsolete. Here is exactly how the algorithm works, why the Quantum Fourier Transform is the key, what hardware it would actually require, and what the world is doing about it."
pubDate: 'Mar 25 2025'
heroImage: '../../assets/hero-shors.svg'
pillar: 'Quantum Algorithms'
author: 'KhGh'
tags: ["Shor's algorithm", 'RSA', 'quantum Fourier transform', 'integer factoring', 'quantum cryptography', 'quantum algorithms', 'post-quantum cryptography']
---

In 1994, Peter Shor published an algorithm that solved, on a quantum computer, a problem that no classical computer can solve efficiently: factoring the product of two large prime numbers. The practical consequence, understood immediately by every cryptographer who read the paper, was that RSA — the encryption scheme protecting bank transactions, government communications, and essentially all authenticated traffic on the internet — was conditionally broken. Conditionally, because Shor's algorithm requires a fault-tolerant quantum computer with millions of low-error qubits, and no such machine exists today. But the algorithm does not care about engineering constraints. It is correct, and the world has spent the last thirty years preparing for the day the hardware catches up.

Understanding Shor's algorithm at depth reveals something surprising: the quantum speedup does not come from trying all possible factors at once. It comes from a specific mathematical reduction that transforms the factoring problem into a period-finding problem, and then from a quantum subroutine — the Quantum Fourier Transform — that finds periods exponentially faster than any classical method.

<div style="border:1px solid var(--border);border-left:3px solid var(--accent);padding:1.25rem 1.5rem;margin:2rem 0;background:var(--bg-alt);">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem 0;">Key Concepts in This Article</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem 2rem;">
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Order of a mod N</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The smallest positive integer r such that aʳ ≡ 1 (mod N). Also called the period of the function f(x) = aˣ mod N. Finding this order is the quantum part of Shor's algorithm.</p></div>
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Quantum Fourier Transform</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The quantum analogue of the discrete Fourier transform. Acting on n qubits, it can be implemented in O(n²) gates — exponentially fewer than the O(n 2ⁿ) steps needed to classically Fourier transform 2ⁿ amplitudes.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Modular Exponentiation</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">Computing aˣ mod N — the expensive quantum subroutine that encodes the periodic function into a quantum register. This accounts for most of the gate count in Shor's circuit.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Continued Fractions</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">A classical algorithm used in the final step of Shor's procedure to extract the exact period r from the approximate rational k/r returned by measuring the quantum register after the QFT.</p></div>
  </div>
</div>

## The Problem: Why Factoring Secures the Internet

RSA encryption was published in 1977 by Rivest, Shamir, and Adleman. Its security rests on a single mathematical asymmetry: multiplying two large prime numbers p and q together is trivially fast, but recovering p and q from their product N = p × q is — as far as anyone knows — computationally hard for large N.

To encrypt a message, the recipient publishes N (typically 2048 bits long for modern RSA) and a public exponent e. Anyone can encrypt by computing ciphertext = messageᵉ mod N. To decrypt, the recipient needs the private key d, which is computed from p and q. Without knowing p and q, computing d requires factoring N — and factoring a 2048-bit semiprime N takes more operations than the estimated number of atoms in the observable universe using the best classical algorithm (the General Number Field Sieve).

The security of RSA, ECC (elliptic curve cryptography), and Diffie-Hellman key exchange all reduce, in different ways, to the hardness of either integer factoring or the discrete logarithm problem. Shor's algorithm solves both in polynomial time.

## The Reduction: From Factoring to Period-Finding

Shor's algorithm does not directly attempt to divide N by potential factors. Instead, it exploits a classical theorem from number theory to reduce factoring to a different problem.

**Step 1 — Choose a random base.** Pick a random integer $a$ with $1 < a < N$. Compute $\gcd(a, N)$. If $\gcd(a, N) > 1$, we got lucky — we found a non-trivial factor immediately (this happens rarely for large $N$). Otherwise, continue.

**Step 2 — Find the order.** Compute $r$, the smallest positive integer such that:

$$
a^r \equiv 1 \pmod{N}
$$

This $r$ is called the **order** of $a$ modulo $N$ (or the period, since the sequence $a^x \bmod N$ repeats with period $r$).

**Step 3 — Extract factors.** If $r$ is even and $a^{r/2} \not\equiv -1 \pmod{N}$, then:

$$
(a^{r/2} - 1)(a^{r/2} + 1) \equiv 0 \pmod{N}
$$

Since neither factor is $\equiv 0 \bmod N$ (by assumption), they must share a factor with $N$. Computing $\gcd(a^{r/2} - 1, N)$ and $\gcd(a^{r/2} + 1, N)$ yields the prime factors $p$ and $q$.

The probability that a randomly chosen $a$ satisfies the conditions in Step 3 is at least $1/2$ for $N = pq$ with two distinct odd prime factors. In practice, two to three repetitions of the algorithm suffice to find the factors with high probability.

**The entire classical number theory is efficient — every step except Step 2.** Finding the order $r$ of $a \bmod N$ classically requires evaluating $a^x \bmod N$ for up to $r$ values of $x$, and $r$ can be as large as $N/4 \approx 2^{2046}$ for RSA-2048. This is exponential. This is the one step that a quantum computer does exponentially faster.

## The Quantum Subroutine: Period-Finding via QFT

The quantum order-finding algorithm exploits the fact that the function $f(x) = a^x \bmod N$ is **periodic** — it repeats with period $r$. Finding the period of a periodic function is exactly what a Fourier transform does.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="175" y="16" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.07em" fill="#6b7280">f(x) = 7ˣ mod 15 — PERIODIC WITH r = 4</text>
  <text x="510" y="16" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.07em" fill="#1d4ed8">QFT OUTPUT — PEAKS AT MULTIPLES OF 2ⁿ/r</text>
  <line x1="340" y1="8" x2="340" y2="230" stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- LEFT: f(x) bar chart -->
  <!-- Axes -->
  <line x1="30" y1="190" x2="320" y2="190" stroke="#374151" stroke-width="1.5"/>
  <line x1="30" y1="30"  x2="30"  y2="190" stroke="#374151" stroke-width="1.5"/>
  <text x="175" y="210" text-anchor="middle" font-size="9" fill="#6b7280">x</text>
  <text x="18"  y="112" text-anchor="middle" font-size="9" fill="#6b7280" transform="rotate(-90 18 112)">aˣ mod N</text>
  <!-- Y ticks -->
  <text x="26" y="192" text-anchor="end" font-size="8" fill="#6b7280">0</text>
  <text x="26" y="152" text-anchor="end" font-size="8" fill="#6b7280">4</text>
  <text x="26" y="112" text-anchor="end" font-size="8" fill="#6b7280">8</text>
  <text x="26" y="72"  text-anchor="end" font-size="8" fill="#6b7280">12</text>
  <text x="26" y="42"  text-anchor="end" font-size="8" fill="#6b7280">15</text>
  <!-- X ticks -->
  <text x="50"  y="200" text-anchor="middle" font-size="8" fill="#6b7280">0</text>
  <text x="74"  y="200" text-anchor="middle" font-size="8" fill="#6b7280">1</text>
  <text x="98"  y="200" text-anchor="middle" font-size="8" fill="#6b7280">2</text>
  <text x="122" y="200" text-anchor="middle" font-size="8" fill="#6b7280">3</text>
  <text x="146" y="200" text-anchor="middle" font-size="8" fill="#6b7280">4</text>
  <text x="170" y="200" text-anchor="middle" font-size="8" fill="#6b7280">5</text>
  <text x="194" y="200" text-anchor="middle" font-size="8" fill="#6b7280">6</text>
  <text x="218" y="200" text-anchor="middle" font-size="8" fill="#6b7280">7</text>
  <text x="242" y="200" text-anchor="middle" font-size="8" fill="#6b7280">8</text>
  <text x="266" y="200" text-anchor="middle" font-size="8" fill="#6b7280">9</text>
  <text x="290" y="200" text-anchor="middle" font-size="8" fill="#6b7280">10</text>
  <text x="314" y="200" text-anchor="middle" font-size="8" fill="#6b7280">11</text>
  <!-- Bars: 7^x mod 15 = 1,7,4,13,1,7,4,13,... (x=0→1, 1→7, 2→4, 3→13, 4→1, ...) -->
  <!-- x=0: f=1 → height (1/15)*148=10 → bar top at 190-10=180 -->
  <rect x="40"  y="180" width="16" height="10"  fill="#1d4ed8"/>
  <!-- x=1: f=7 → height (7/15)*148=69 → bar top=121 -->
  <rect x="64"  y="121" width="16" height="69"  fill="#1d4ed8"/>
  <!-- x=2: f=4 → height (4/15)*148=40 → bar top=150 -->
  <rect x="88"  y="150" width="16" height="40"  fill="#1d4ed8"/>
  <!-- x=3: f=13 → height (13/15)*148=128 → bar top=62 -->
  <rect x="112" y="62"  width="16" height="128" fill="#1d4ed8"/>
  <!-- x=4: f=1 (same as x=0) -->
  <rect x="136" y="180" width="16" height="10"  fill="#7c3aed"/>
  <!-- x=5: f=7 -->
  <rect x="160" y="121" width="16" height="69"  fill="#7c3aed"/>
  <!-- x=6: f=4 -->
  <rect x="184" y="150" width="16" height="40"  fill="#7c3aed"/>
  <!-- x=7: f=13 -->
  <rect x="208" y="62"  width="16" height="128" fill="#7c3aed"/>
  <!-- x=8: f=1 -->
  <rect x="232" y="180" width="16" height="10"  fill="#7c3aed" opacity="0.6"/>
  <!-- x=9: f=7 -->
  <rect x="256" y="121" width="16" height="69"  fill="#7c3aed" opacity="0.6"/>
  <!-- x=10: f=4 -->
  <rect x="280" y="150" width="16" height="40"  fill="#7c3aed" opacity="0.6"/>
  <!-- x=11: f=13 -->
  <rect x="304" y="62"  width="16" height="128" fill="#7c3aed" opacity="0.6"/>
  <!-- Period bracket -->
  <line x1="40" y1="220" x2="136" y2="220" stroke="#dc2626" stroke-width="2"/>
  <line x1="40"  y1="215" x2="40"  y2="225" stroke="#dc2626" stroke-width="2"/>
  <line x1="136" y1="215" x2="136" y2="225" stroke="#dc2626" stroke-width="2"/>
  <text x="88" y="228" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="700">r = 4</text>
  <!-- RIGHT: QFT output spikes -->
  <line x1="360" y1="190" x2="660" y2="190" stroke="#374151" stroke-width="1.5"/>
  <line x1="360" y1="30"  x2="360"  y2="190" stroke="#374151" stroke-width="1.5"/>
  <text x="510" y="210" text-anchor="middle" font-size="9" fill="#6b7280">measurement outcome</text>
  <text x="348" y="112" text-anchor="middle" font-size="9" fill="#6b7280" transform="rotate(-90 348 112)">probability</text>
  <!-- QFT spikes at 0, 2^n/4, 2^n/2, 3*2^n/4 — evenly spaced at 4 positions -->
  <!-- Using 2^n = 16, so spikes at 0, 4, 8, 12 (scaled to x positions 370, 445, 520, 595) -->
  <rect x="363" y="50"  width="18" height="140" fill="#059669"/>
  <rect x="438" y="50"  width="18" height="140" fill="#059669"/>
  <rect x="513" y="50"  width="18" height="140" fill="#059669"/>
  <rect x="588" y="50"  width="18" height="140" fill="#059669"/>
  <!-- Tick labels -->
  <text x="372" y="202" text-anchor="middle" font-size="8" fill="#059669" font-weight="700">0</text>
  <text x="447" y="202" text-anchor="middle" font-size="8" fill="#059669" font-weight="700">2ⁿ/4</text>
  <text x="522" y="202" text-anchor="middle" font-size="8" fill="#059669" font-weight="700">2ⁿ/2</text>
  <text x="597" y="202" text-anchor="middle" font-size="8" fill="#059669" font-weight="700">3·2ⁿ/4</text>
  <!-- Labels -->
  <text x="510" y="42" text-anchor="middle" font-size="9" fill="#059669" font-weight="700">equal probability at k·2ⁿ/r</text>
  <text x="510" y="54" text-anchor="middle" font-size="8" fill="#6b7280">→ measure → continued fractions → r</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — Concrete example: N=15, a=7. Left: the sequence 7ˣ mod 15 is periodic with period r=4 (blue: first cycle, purple: subsequent cycles). Right: after applying the QFT to a quantum register encoding the periodic superposition, probability peaks appear at exactly the multiples of 2ⁿ/r. One measurement gives k·2ⁿ/r for some integer k; the continued fraction algorithm then recovers r=4 exactly.</figcaption>
</figure>

## The Algorithm: Step by Step

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 175" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">SHOR'S ALGORITHM — BLOCK DIAGRAM</text>
  <!-- Quantum register label -->
  <text x="10" y="62" font-size="9" fill="#1d4ed8" font-weight="700">|0⟩ⁿ</text>
  <!-- Ancilla register label -->
  <text x="10" y="118" font-size="9" fill="#7c3aed" font-weight="700">|0⟩ᵐ</text>
  <!-- Qubit lines -->
  <line x1="30"  y1="58"  x2="660" y2="58"  stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="30"  y1="115" x2="480" y2="115" stroke="#7c3aed" stroke-width="1.5"/>
  <!-- Step 1: Hadamard -->
  <rect x="38" y="40" width="58" height="36" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="67" y="54" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">H⊗ⁿ</text>
  <text x="67" y="68" text-anchor="middle" font-size="8" fill="#6b7280">uniform</text>
  <text x="67" y="78" text-anchor="middle" font-size="8" fill="#6b7280">superpos.</text>
  <!-- Step 2: Modular exponentiation -->
  <rect x="118" y="30" width="108" height="98" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="172" y="60" text-anchor="middle" font-size="10" font-weight="700" fill="#92400e">Modular</text>
  <text x="172" y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#92400e">Exp.</text>
  <text x="172" y="92" text-anchor="middle" font-size="8.5" fill="#92400e">|x⟩|0⟩ →</text>
  <text x="172" y="104" text-anchor="middle" font-size="8.5" fill="#92400e">|x⟩|aˣmodN⟩</text>
  <text x="172" y="120" text-anchor="middle" font-size="8" fill="#6b7280">(most expensive)</text>
  <!-- Step 3: Measure ancilla -->
  <rect x="246" y="97" width="72" height="36" rx="3" fill="#fce7f3" stroke="#9d174d" stroke-width="1.5"/>
  <text x="282" y="111" text-anchor="middle" font-size="9" font-weight="700" fill="#9d174d">Measure</text>
  <text x="282" y="124" text-anchor="middle" font-size="8" fill="#9d174d">ancilla</text>
  <!-- Collapse arrow down from ancilla -->
  <line x1="282" y1="133" x2="282" y2="155" stroke="#9d174d" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="282" y="165" text-anchor="middle" font-size="8" fill="#9d174d">→ periodic</text>
  <text x="282" y="175" text-anchor="middle" font-size="8" fill="#9d174d">superpos. in |x⟩</text>
  <!-- Step 4: QFT -->
  <rect x="340" y="40" width="70" height="36" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="375" y="55" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">QFT</text>
  <text x="375" y="68" text-anchor="middle" font-size="8" fill="#6b7280">O(n²) gates</text>
  <!-- Step 5: Measure -->
  <rect x="432" y="40" width="64" height="36" rx="3" fill="#fce7f3" stroke="#9d174d" stroke-width="1.5"/>
  <text x="464" y="55" text-anchor="middle" font-size="9" font-weight="700" fill="#9d174d">Measure</text>
  <text x="464" y="68" text-anchor="middle" font-size="8" fill="#9d174d">→ k·2ⁿ/r</text>
  <!-- Step 6: Classical post-processing -->
  <rect x="518" y="30" width="130" height="56" rx="3" fill="#f0fdf4" stroke="#059669" stroke-width="1.5"/>
  <text x="583" y="46" text-anchor="middle" font-size="9" font-weight="700" fill="#059669">Classical</text>
  <text x="583" y="58" text-anchor="middle" font-size="8.5" fill="#059669">Continued fractions</text>
  <text x="583" y="70" text-anchor="middle" font-size="8.5" fill="#059669">→ r</text>
  <text x="583" y="80" text-anchor="middle" font-size="8.5" fill="#059669">→ gcd(a^(r/2)±1, N)</text>
  <!-- Output -->
  <text x="583" y="105" text-anchor="middle" font-size="10" fill="#111827" font-weight="700">p, q</text>
  <text x="583" y="118" text-anchor="middle" font-size="8.5" fill="#6b7280">factors of N</text>
  <!-- Step labels -->
  <text x="67"  y="30" text-anchor="middle" font-size="8" fill="#6b7280">① INIT</text>
  <text x="172" y="22" text-anchor="middle" font-size="8" fill="#6b7280">② ORACLE</text>
  <text x="282" y="90" text-anchor="middle" font-size="8" fill="#6b7280">③ COLLAPSE</text>
  <text x="375" y="32" text-anchor="middle" font-size="8" fill="#6b7280">④ QFT</text>
  <text x="464" y="32" text-anchor="middle" font-size="8" fill="#6b7280">⑤ MEASURE</text>
  <text x="583" y="22" text-anchor="middle" font-size="8" fill="#6b7280">⑥ CLASSICAL</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — Shor's algorithm block diagram. The quantum register (blue) is placed in uniform superposition by Hadamard gates, then entangled with an ancilla register (purple) via modular exponentiation. Measuring the ancilla collapses the quantum register to a periodic superposition. The QFT converts that periodicity to frequency-domain peaks; one measurement then yields a multiple of 2ⁿ/r. Classical continued-fraction analysis recovers r exactly, and two GCD computations yield the prime factors.</figcaption>
</figure>

Walking through each step:

**① Initialisation.** Prepare an $n$-qubit quantum register in the equal superposition of all $2^n$ computational basis states by applying a Hadamard gate to each qubit. For an $N$-bit number we choose $n = 2\lceil \log_2 N \rceil$ — roughly twice the bit-length of $N$ — to ensure sufficient resolution.

**② Modular exponentiation.** Apply the unitary $U$ that maps $|x\rangle|0\rangle \to |x\rangle|a^x \bmod N\rangle$. Because the input register is in superposition, this computes $a^x \bmod N$ for every $x$ from $0$ to $2^n - 1$ simultaneously — but not in a way that gives access to all values at once. The joint state is a quantum superposition that encodes all of them. This modular exponentiation circuit is the most expensive part of the algorithm, requiring $O(n^3)$ elementary quantum gates using efficient reversible arithmetic.

**③ Collapse.** Measure the ancilla (second) register. The outcome is some specific value $c = a^{x_0} \bmod N$. This projects the first register into a superposition of only those $x$ values where $a^x \bmod N = c$ — that is, $\{x_0, x_0+r, x_0+2r, \dots\}$. The register is now a periodic superposition with unknown period $r$ spaced at exact intervals.

**④ Quantum Fourier Transform.** Apply the QFT to the first register. The QFT maps a periodic superposition in position space to probability peaks in frequency space — exactly at the multiples of $2^n/r$. This is the quantum analogue of how a classical DFT of a periodic signal produces spikes at the signal's harmonics.

**⑤ Measurement.** Measure the first register. The result is some integer $m$ close to $k \cdot (2^n/r)$ for a random integer $k$. This gives us an approximate rational representation of $k/r = m/2^n$.

**⑥ Classical post-processing.** Apply the continued fraction algorithm to $m/2^n$ to find the best rational approximations with denominator $\leq N$. One of these approximations equals $k/r$ exactly; its denominator is $r$ (or a divisor of $r$ — with small probability we may need to repeat). With $r$ in hand, compute $\gcd(a^{r/2}-1, N)$ and $\gcd(a^{r/2}+1, N)$. With probability $\geq 1/2$ over the random choice of $a$, these yield the prime factors $p$ and $q$.

## Why the QFT Provides an Exponential Speedup

The Quantum Fourier Transform acts on an n-qubit state as:

$$
\mathrm{QFT}\,|j\rangle = \frac{1}{\sqrt{2^n}} \sum_k e^{2\pi i j k / 2^n}\,|k\rangle
$$

This is precisely the discrete Fourier transform of the basis vector amplitudes. The classical DFT on $2^n$ points requires $O(n \cdot 2^n)$ operations (with the FFT). The QFT implements it in $O(n^2)$ quantum gates — an exponential improvement.

The catch is that you cannot read out all 2ⁿ amplitudes of the QFT output, since measurement collapses the state to a single value. The power of the QFT in Shor's algorithm lies not in reading all amplitudes, but in the fact that the measurement outcome is **concentrated at the useful values** — the multiples of 2ⁿ/r — because the QFT produces constructive interference there and destructive interference everywhere else. You don't need all the information; you need one sample from a distribution that is almost entirely concentrated on the answer.

This is the precise sense in which quantum computers outperform classical computers on this problem: the QFT exploits quantum interference to make the answer overwhelmingly likely to be sampled after a single measurement, whereas a classical computer must scan through $O(r) \approx O(N)$ possibilities to find the period.

## The Numbers: What Breaking RSA Actually Requires

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">CLASSICAL vs QUANTUM SCALING FOR INTEGER FACTORING</text>
  <!-- Axes -->
  <line x1="70" y1="25" x2="70"  y2="190" stroke="#374151" stroke-width="2"/>
  <line x1="70" y1="190" x2="640" y2="190" stroke="#374151" stroke-width="2"/>
  <text x="355" y="210" text-anchor="middle" font-size="9" fill="#6b7280">RSA key size (bits)</text>
  <text x="20"  y="110" text-anchor="middle" font-size="9" fill="#6b7280" transform="rotate(-90 20 110)">operations (log scale)</text>
  <!-- X axis ticks -->
  <text x="138" y="200" text-anchor="middle" font-size="8.5" fill="#6b7280">512</text>
  <text x="260" y="200" text-anchor="middle" font-size="8.5" fill="#6b7280">1024</text>
  <text x="400" y="200" text-anchor="middle" font-size="8.5" fill="#6b7280">2048</text>
  <text x="558" y="200" text-anchor="middle" font-size="8.5" fill="#6b7280">4096</text>
  <!-- Y axis ticks -->
  <text x="62" y="185" text-anchor="end" font-size="8" fill="#6b7280">10³⁰</text>
  <text x="62" y="148" text-anchor="end" font-size="8" fill="#6b7280">10⁵⁰</text>
  <text x="62" y="111" text-anchor="end" font-size="8" fill="#6b7280">10⁷⁰</text>
  <text x="62" y="74"  text-anchor="end" font-size="8" fill="#6b7280">10⁹⁰</text>
  <text x="62" y="37"  text-anchor="end" font-size="8" fill="#6b7280">10¹¹⁰</text>
  <!-- Grid lines -->
  <line x1="70" y1="148" x2="640" y2="148" stroke="#f3f4f6" stroke-width="1"/>
  <line x1="70" y1="111" x2="640" y2="111" stroke="#f3f4f6" stroke-width="1"/>
  <line x1="70" y1="74"  x2="640" y2="74"  stroke="#f3f4f6" stroke-width="1"/>
  <!-- GNFS curve (steeply rising) -->
  <polyline points="138,175 260,148 400,100 558,42" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <text x="576" y="38"  font-size="10" fill="#dc2626" font-weight="700">GNFS</text>
  <text x="576" y="50"  font-size="8.5" fill="#dc2626">(classical)</text>
  <!-- Shor's algorithm curve (slow rise — polynomial in log(n), so nearly flat in this scale) -->
  <polyline points="138,185 260,181 400,177 558,172" fill="none" stroke="#059669" stroke-width="2.5"/>
  <text x="576" y="168" font-size="10" fill="#059669" font-weight="700">Shor</text>
  <text x="576" y="180" font-size="8.5" fill="#059669">(quantum)</text>
  <!-- RSA-2048 vertical marker -->
  <line x1="400" y1="25" x2="400" y2="190" stroke="#d97706" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="400" y="22" text-anchor="middle" font-size="8.5" fill="#d97706" font-weight="700">RSA-2048</text>
  <!-- Infeasibility region annotation -->
  <rect x="330" y="50" width="110" height="30" rx="3" fill="#fee2e2" opacity="0.7"/>
  <text x="385" y="65" text-anchor="middle" font-size="8" fill="#dc2626" font-weight="700">classical: ~10¹⁰⁰ ops</text>
  <text x="385" y="76" text-anchor="middle" font-size="8" fill="#dc2626">computationally infeasible</text>
  <!-- Quantum annotation -->
  <rect x="310" y="160" width="135" height="30" rx="3" fill="#dcfce7" opacity="0.7"/>
  <text x="377" y="175" text-anchor="middle" font-size="8" fill="#059669" font-weight="700">quantum: ~10¹⁰ gates</text>
  <text x="377" y="186" text-anchor="middle" font-size="8" fill="#059669">feasible with fault-tolerant QC</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — Scaling comparison for integer factoring. The General Number Field Sieve (best classical algorithm) has sub-exponential but still super-polynomial scaling — the operation count grows faster than any polynomial in the key size. Shor's algorithm has polynomial scaling in the number of qubits required. At RSA-2048, the gap is roughly 10⁹⁰ operations: classical ~10¹⁰⁰, quantum ~10¹⁰. The quantum algorithm does not just win — the problem that took the age of the universe classically takes hours on a sufficiently large quantum computer.</figcaption>
</figure>

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 196" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="32" rx="4" fill="#111827"/>
  <text x="340" y="21" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">SHOR'S ALGORITHM — HARDWARE REQUIREMENTS</text>
  <rect x="0" y="32" width="680" height="26" fill="#f9fafb"/>
  <text x="90"  y="49" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">RSA KEY SIZE</text>
  <text x="230" y="49" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">LOGICAL QUBITS</text>
  <text x="380" y="49" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">QUANTUM GATES</text>
  <text x="520" y="49" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">PHYS. QUBITS (SC, d=17)</text>
  <text x="635" y="49" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.05em" fill="#6b7280">RUN TIME†</text>
  <line x1="0" y1="58" x2="680" y2="58" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="58" width="680" height="26" fill="#fff"/>
  <text x="90"  y="75" text-anchor="middle" font-size="10" fill="#111827">512-bit</text>
  <text x="230" y="75" text-anchor="middle" font-size="10" fill="#1d4ed8">~1,100</text>
  <text x="380" y="75" text-anchor="middle" font-size="10" fill="#1d4ed8">~6 × 10⁹</text>
  <text x="520" y="75" text-anchor="middle" font-size="10" fill="#1d4ed8">~600,000</text>
  <text x="635" y="75" text-anchor="middle" font-size="10" fill="#059669">~hours</text>
  <line x1="0" y1="84" x2="680" y2="84" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="84" width="680" height="26" fill="#f9fafb"/>
  <text x="90"  y="101" text-anchor="middle" font-size="10" fill="#111827">1024-bit</text>
  <text x="230" y="101" text-anchor="middle" font-size="10" fill="#1d4ed8">~2,200</text>
  <text x="380" y="101" text-anchor="middle" font-size="10" fill="#1d4ed8">~5 × 10¹⁰</text>
  <text x="520" y="101" text-anchor="middle" font-size="10" fill="#1d4ed8">~1.2 million</text>
  <text x="635" y="101" text-anchor="middle" font-size="10" fill="#d97706">~days</text>
  <line x1="0" y1="110" x2="680" y2="110" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="110" width="680" height="26" fill="#fff"/>
  <text x="90"  y="127" text-anchor="middle" font-size="10" fill="#111827" font-weight="700">2048-bit (RSA)</text>
  <text x="230" y="127" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="700">~4,000</text>
  <text x="380" y="127" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="700">~4 × 10¹¹</text>
  <text x="520" y="127" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="700">~2–4 million</text>
  <text x="635" y="127" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="700">~weeks</text>
  <line x1="0" y1="136" x2="680" y2="136" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="136" width="680" height="26" fill="#f9fafb"/>
  <text x="90"  y="153" text-anchor="middle" font-size="10" fill="#111827">4096-bit</text>
  <text x="230" y="153" text-anchor="middle" font-size="10" fill="#1d4ed8">~8,000</text>
  <text x="380" y="153" text-anchor="middle" font-size="10" fill="#1d4ed8">~3 × 10¹²</text>
  <text x="520" y="153" text-anchor="middle" font-size="10" fill="#1d4ed8">~4–8 million</text>
  <text x="635" y="153" text-anchor="middle" font-size="10" fill="#dc2626">~months</text>
  <line x1="0" y1="162" x2="680" y2="162" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="0" y="162" width="680" height="34" fill="#fff"/>
  <text x="340" y="178" text-anchor="middle" font-size="8.5" fill="#6b7280">Estimates use Beauregard-style circuit (2n+3 logical qubits), surface code distance d=17, physical error rate p=0.1%.</text>
  <text x="340" y="191" text-anchor="middle" font-size="8.5" fill="#6b7280">†Run time assumes 1 µs gate cycle time (superconducting). Actual run time depends heavily on T-factory throughput and scheduling.</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 4 — Hardware requirements for Shor's algorithm at various RSA key sizes. The dominant cost is not qubit count but gate count — particularly the modular exponentiation circuit, which requires O(n³) quantum gates and drives the run time. A cryptographically relevant quantum computer (CRQC) capable of breaking RSA-2048 requires roughly 4,000 logical qubits and 2–4 million physical qubits under optimistic but realistic assumptions.</figcaption>
</figure>

## What Has Actually Been Demonstrated

Every experimental demonstration of Shor's algorithm to date has used special-purpose circuits that exploit prior knowledge of the answer to simplify the computation — rendering them proofs of principle rather than genuine demonstrations of the factoring task. The first demonstration, by IBM's NMR group in 2001, factored N=15 into 3 × 5 using 7 qubits. Subsequent experiments factored 15 and 21 on photonic, superconducting, and ion trap platforms, always using highly optimised circuits that would not generalise to unknown factors.

No experiment has run a full, general-purpose instance of Shor's algorithm on any number larger than 21. This is not a criticism of the demonstrations — they were validating quantum gate implementations — but it means the gap between current hardware and a cryptographically relevant quantum computer (CRQC) is enormous: from factoring 21 with 5 logical qubits to factoring RSA-2048 with ~4,000 logical qubits and ~2–4 million physical qubits, executing ~10¹¹ quantum gates at fault-tolerant fidelity.

Most credible estimates from government and academic sources place the first CRQC 10–20 years away, with significant uncertainty in both directions.

## The Cryptographic Consequence: What the World Is Doing About It

The response to Shor's algorithm has been one of the largest coordinated efforts in the history of cryptography. In 2016, NIST launched a competition to standardise **post-quantum cryptographic (PQC)** algorithms — schemes whose security does not depend on the hardness of factoring or discrete logarithms and therefore cannot be broken by Shor's algorithm. In 2024, after eight years of evaluation, NIST finalised three standards:

- **ML-KEM** (Module Lattice Key Encapsulation Mechanism, formerly CRYSTALS-Kyber): for key exchange, based on the hardness of the Learning With Errors (LWE) problem on lattices.
- **ML-DSA** (Module Lattice Digital Signature Algorithm, formerly CRYSTALS-Dilithium): for digital signatures, same lattice hardness.
- **SLH-DSA** (Stateless Hash-Based Digital Signature Algorithm, formerly SPHINCS+): for signatures, based only on the security of hash functions.

These algorithms are believed to be secure against both classical and quantum computers, including Shor's algorithm (which does not apply to lattice or hash-based problems).

The migration is urgent because of **"harvest now, decrypt later" (HNDL) attacks**: an adversary with sufficient storage can collect encrypted traffic today and decrypt it retroactively once a sufficiently large quantum computer becomes available. Traffic encrypted with RSA in 2025 may be decrypted in 2035 or 2040 — a particular concern for government, intelligence, and financial data with long-term sensitivity. The National Security Agency, CISA, and equivalent agencies in the UK, EU, and Canada have all issued guidance directing a migration to PQC algorithms on specific timelines.

Shor's algorithm is not a current threat. It is a future threat that must be mitigated now, because the data being encrypted today will still be sensitive when the hardware eventually arrives. That calculation is why a theoretical result from 1994 continues to drive operational security decisions at every major technology company and government agency three decades later.

## The Enduring Significance

Shor's algorithm matters beyond its cryptographic implications. It was the first evidence that quantum computers offer an exponential speedup on a practically important problem — not a contrived mathematical exercise, but the specific computational problem that underpins global financial security. It established that quantum advantage is not merely theoretical. And it forced the classical cryptography community to confront a deadline: the window between "a sufficiently large quantum computer does not exist" and "it does" may be the most consequential engineering transition of the 21st century.

The algorithm itself is a beautiful piece of mathematics: a reduction from number theory to signal processing, from an algebraic group structure to quantum interference, from classical GCDs to quantum measurement. Its key steps — the Fourier transform of a periodic function, the extraction of a period from a single sample — could in principle be explained to anyone who has taken a signal processing course. What is quantum about it is not mysterious; it is precise.

Understanding Shor's algorithm is not optional for anyone who wants to understand why quantum computing matters, what fault-tolerant hardware must achieve, or why the internet's cryptographic infrastructure is currently being replaced. It is the reason the field exists in its current form.
