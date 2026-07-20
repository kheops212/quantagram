---
title: "BB84: The Protocol That Made Eavesdropping a Physics Problem"
description: "The BB84 protocol, proposed in 1984, showed for the first time that physical law — not computational hardness — could guarantee communication security. Here is exactly how it works, why an eavesdropper cannot hide, and what the real-world limitations are."
pubDate: 'May 22 2024'
heroImage: '../../assets/hero-bb84.svg'
pillar: 'Quantum Cryptography'
author: 'KhGh'
tags: ['BB84', 'QKD', 'quantum key distribution', 'quantum cryptography', 'eavesdropping']
---

In the summer of 1984, Charles Bennett and Gilles Brassard published a four-page paper proposing a method for distributing cryptographic keys whose security was guaranteed not by the difficulty of a mathematical problem, but by the laws of physics. The paper described what became known as BB84 — the first quantum key distribution protocol — and it rested on a single, profound observation: **any attempt to intercept a quantum communication must disturb it**, and that disturbance is detectable.

Forty years later, BB84 remains the most widely implemented QKD protocol in the world. Understanding it in detail reveals not just how quantum cryptography works, but why it works — and what the honest limits of that guarantee are.

<div style="border:1px solid var(--border);border-left:3px solid var(--accent);padding:1.25rem 1.5rem;margin:2rem 0;background:var(--bg-alt);">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem 0;">Key Concepts in This Article</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem 2rem;">
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Polarisation</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The orientation of a photon's electric field oscillation — used in BB84 to encode the two values of each qubit.</p></div>
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Measurement Basis</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The reference frame used to read a qubit. Measuring in the wrong basis yields a random, useless result.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">QBER</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">Quantum Bit Error Rate — the fraction of sifted key bits that disagree. Rises from ~1% to ~25% when an eavesdropper is present.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">No-Cloning Theorem</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The quantum mechanical prohibition on copying an arbitrary unknown quantum state — the reason eavesdropping cannot be passive.</p></div>
  </div>
</div>

## How BB84 Works

BB84 uses single photons as its information carriers. A photon's polarisation — the orientation of its oscillating electric field — can be prepared in four states across two measurement bases:

- **Rectilinear basis (⊕):** horizontal (0°) encodes bit 0; vertical (90°) encodes bit 1
- **Diagonal basis (⊗):** 45° encodes bit 0; 135° encodes bit 1

Alice, the sender, generates a random stream of bits. For each bit, she also randomly selects a basis — rectilinear or diagonal — and sends a photon polarised accordingly. Bob, the receiver, randomly and independently selects a basis for each photon he measures. When his basis matches Alice's, his result is deterministic and correct. When they differ, quantum mechanics dictates that his result is completely random — a coin flip with no correlation to Alice's original bit.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <!-- Header -->
  <rect x="0" y="0" width="680" height="30" rx="4" fill="#111827"/>
  <text x="340" y="20" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">BB84 KEY EXCHANGE — EXAMPLE SEQUENCE</text>
  <!-- Row headers -->
  <rect x="0" y="30" width="120" height="160" fill="#f9fafb" stroke="none"/>
  <text x="60" y="55"  text-anchor="middle" font-size="10" font-weight="700" fill="#6b7280">Alice bit</text>
  <text x="60" y="85"  text-anchor="middle" font-size="10" font-weight="700" fill="#6b7280">Alice basis</text>
  <text x="60" y="115" text-anchor="middle" font-size="10" font-weight="700" fill="#6b7280">Bob basis</text>
  <text x="60" y="145" text-anchor="middle" font-size="10" font-weight="700" fill="#6b7280">Bases match?</text>
  <text x="60" y="175" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">Key bit</text>
  <!-- Vertical dividers -->
  <line x1="120" y1="30" x2="120" y2="190" stroke="#e5e7eb" stroke-width="1"/>
  <!-- 8 columns of data -->
  <!-- Col positions: 120, 190, 260, 330, 400, 470, 540, 610 (width 70 each) -->
  <!-- Alice bits: 1 0 1 1 0 1 0 1 -->
  <!-- Alice bases: ⊕ ⊗ ⊗ ⊕ ⊗ ⊕ ⊕ ⊗ -->
  <!-- Bob bases:   ⊗ ⊗ ⊕ ⊕ ⊗ ⊕ ⊗ ⊗ -->
  <!-- Match:       N  Y  N  Y  Y  Y  N  Y -->
  <!-- Key:         -  0  -  1  0  1  -  1 -->
  <!-- Row 1: Alice bits -->
  <text x="155" y="55" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">1</text>
  <text x="225" y="55" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">0</text>
  <text x="295" y="55" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">1</text>
  <text x="365" y="55" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">1</text>
  <text x="435" y="55" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">0</text>
  <text x="505" y="55" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">1</text>
  <text x="575" y="55" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">0</text>
  <text x="645" y="55" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">1</text>
  <!-- Row 2: Alice basis -->
  <text x="155" y="85" text-anchor="middle" font-size="14" fill="#7c3aed">⊕</text>
  <text x="225" y="85" text-anchor="middle" font-size="14" fill="#d97706">⊗</text>
  <text x="295" y="85" text-anchor="middle" font-size="14" fill="#d97706">⊗</text>
  <text x="365" y="85" text-anchor="middle" font-size="14" fill="#7c3aed">⊕</text>
  <text x="435" y="85" text-anchor="middle" font-size="14" fill="#d97706">⊗</text>
  <text x="505" y="85" text-anchor="middle" font-size="14" fill="#7c3aed">⊕</text>
  <text x="575" y="85" text-anchor="middle" font-size="14" fill="#7c3aed">⊕</text>
  <text x="645" y="85" text-anchor="middle" font-size="14" fill="#d97706">⊗</text>
  <!-- Row 3: Bob basis -->
  <text x="155" y="115" text-anchor="middle" font-size="14" fill="#d97706">⊗</text>
  <text x="225" y="115" text-anchor="middle" font-size="14" fill="#d97706">⊗</text>
  <text x="295" y="115" text-anchor="middle" font-size="14" fill="#7c3aed">⊕</text>
  <text x="365" y="115" text-anchor="middle" font-size="14" fill="#7c3aed">⊕</text>
  <text x="435" y="115" text-anchor="middle" font-size="14" fill="#d97706">⊗</text>
  <text x="505" y="115" text-anchor="middle" font-size="14" fill="#7c3aed">⊕</text>
  <text x="575" y="115" text-anchor="middle" font-size="14" fill="#d97706">⊗</text>
  <text x="645" y="115" text-anchor="middle" font-size="14" fill="#d97706">⊗</text>
  <!-- Row 4: Match? Highlight matching columns -->
  <rect x="120" y="125" width="70"  height="25" fill="rgba(239,68,68,0.08)"/>
  <rect x="190" y="125" width="70"  height="25" fill="rgba(34,197,94,0.12)"/>
  <rect x="260" y="125" width="70"  height="25" fill="rgba(239,68,68,0.08)"/>
  <rect x="330" y="125" width="70"  height="25" fill="rgba(34,197,94,0.12)"/>
  <rect x="400" y="125" width="70"  height="25" fill="rgba(34,197,94,0.12)"/>
  <rect x="470" y="125" width="70"  height="25" fill="rgba(34,197,94,0.12)"/>
  <rect x="540" y="125" width="70"  height="25" fill="rgba(239,68,68,0.08)"/>
  <rect x="610" y="125" width="70"  height="25" fill="rgba(34,197,94,0.12)"/>
  <text x="155" y="141" text-anchor="middle" font-size="12" fill="#dc2626">✗</text>
  <text x="225" y="141" text-anchor="middle" font-size="12" fill="#22c55e">✓</text>
  <text x="295" y="141" text-anchor="middle" font-size="12" fill="#dc2626">✗</text>
  <text x="365" y="141" text-anchor="middle" font-size="12" fill="#22c55e">✓</text>
  <text x="435" y="141" text-anchor="middle" font-size="12" fill="#22c55e">✓</text>
  <text x="505" y="141" text-anchor="middle" font-size="12" fill="#22c55e">✓</text>
  <text x="575" y="141" text-anchor="middle" font-size="12" fill="#dc2626">✗</text>
  <text x="645" y="141" text-anchor="middle" font-size="12" fill="#22c55e">✓</text>
  <!-- Row 5: Key bits (only where match) -->
  <text x="155" y="175" text-anchor="middle" font-size="13" fill="#e5e7eb">—</text>
  <text x="225" y="175" text-anchor="middle" font-size="14" font-weight="700" fill="#1d4ed8">0</text>
  <text x="295" y="175" text-anchor="middle" font-size="13" fill="#e5e7eb">—</text>
  <text x="365" y="175" text-anchor="middle" font-size="14" font-weight="700" fill="#1d4ed8">1</text>
  <text x="435" y="175" text-anchor="middle" font-size="14" font-weight="700" fill="#1d4ed8">0</text>
  <text x="505" y="175" text-anchor="middle" font-size="14" font-weight="700" fill="#1d4ed8">1</text>
  <text x="575" y="175" text-anchor="middle" font-size="13" fill="#e5e7eb">—</text>
  <text x="645" y="175" text-anchor="middle" font-size="14" font-weight="700" fill="#1d4ed8">1</text>
  <!-- Horizontal rules -->
  <line x1="0" y1="63"  x2="680" y2="63"  stroke="#e5e7eb" stroke-width="1"/>
  <line x1="0" y1="93"  x2="680" y2="93"  stroke="#e5e7eb" stroke-width="1"/>
  <line x1="0" y1="123" x2="680" y2="123" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="0" y1="153" x2="680" y2="153" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Column dividers -->
  <line x1="190" y1="30" x2="190" y2="190" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="260" y1="30" x2="260" y2="190" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="330" y1="30" x2="330" y2="190" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="400" y1="30" x2="400" y2="190" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="470" y1="30" x2="470" y2="190" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="540" y1="30" x2="540" y2="190" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="610" y1="30" x2="610" y2="190" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Legend -->
  <text x="130" y="215" font-size="10" fill="#7c3aed">⊕ rectilinear</text>
  <text x="260" y="215" font-size="10" fill="#d97706">⊗ diagonal</text>
  <text x="390" y="215" font-size="10" fill="#22c55e">✓ bases match → key bit kept</text>
  <text x="560" y="215" font-size="10" fill="#dc2626">✗ discarded</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — An eight-bit BB84 exchange. Alice and Bob independently choose random bases for each photon. After the quantum transmission, they compare bases publicly and discard bits where their choices differed. The five remaining bits form the raw sifted key.</figcaption>
</figure>

After transmission, Alice and Bob compare their chosen bases over a public (but authenticated) classical channel — they reveal *which* basis they used for each bit, but not the bit values themselves. Bits where their bases matched are kept; the rest are discarded. This **sifted key** is the raw shared secret. On average, bases agree half the time, so roughly half the transmitted bits survive sifting.

## Why an Eavesdropper Cannot Hide

This is where quantum mechanics becomes the security mechanism.

Suppose Eve intercepts each photon as Alice sends it. To learn the bit value, she must measure the photon. But she does not know which basis Alice used. If she guesses correctly, she measures correctly and re-sends an identical photon to Bob. If she guesses wrong — which happens 50% of the time — she measures in the wrong basis and gets a random result. She then re-encodes and sends a photon in her (wrong) basis to Bob.

When Bob subsequently measures that photon in Alice's original (correct) basis, there is now a 50% chance his result disagrees with Alice's original bit. The net effect: for every intercepted bit, there is a 25% probability of introducing an error in the sifted key. An eavesdropper covering the entire channel introduces a **Quantum Bit Error Rate (QBER) of approximately 25%**.

<aside style="border-top:3px solid var(--text);border-bottom:1px solid var(--border);padding:1.75rem 0;margin:2.5rem 0;text-align:center;">
<p style="font-size:1.45em;font-weight:800;line-height:1.25;color:var(--text);margin:0;letter-spacing:-0.02em;max-width:580px;margin:0 auto;">"An eavesdropper cannot intercept a quantum key without introducing detectable errors. This is not an engineering limitation — it is a theorem of physics."</p>
</aside>

After sifting, Alice and Bob sacrifice a random subset of their key bits — comparing them publicly to measure the QBER. If the error rate is below an agreed threshold (typically 11% for standard BB84), they conclude the channel is sufficiently secure. If it exceeds that threshold, they abort and try again.

## The QBER: Measuring the Presence of an Eavesdropper

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">QBER UNDER DIFFERENT CONDITIONS</text>
  <!-- Y-axis -->
  <line x1="80" y1="30" x2="80" y2="160" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Threshold line at ~11% -->
  <line x1="80" y1="95" x2="640" y2="95" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="645" y="99" font-size="10" font-weight="700" fill="#dc2626">11%</text>
  <text x="645" y="111" font-size="9" fill="#dc2626">threshold</text>
  <!-- Y labels -->
  <text x="72" y="34"  text-anchor="end" font-size="10" fill="#6b7280">30%</text>
  <text x="72" y="75"  text-anchor="end" font-size="10" fill="#6b7280">15%</text>
  <text x="72" y="99"  text-anchor="end" font-size="10" fill="#dc2626">11%</text>
  <text x="72" y="130" text-anchor="end" font-size="10" fill="#6b7280">5%</text>
  <text x="72" y="160" text-anchor="end" font-size="10" fill="#6b7280">0%</text>
  <!-- Bar 1: No eavesdropper -->
  <rect x="140" y="143" width="120" height="17" rx="2" fill="#22c55e"/>
  <text x="200" y="136" text-anchor="middle" font-size="11" font-weight="700" fill="#22c55e">~2%</text>
  <text x="200" y="178" text-anchor="middle" font-size="11" fill="#111827">No eavesdropper</text>
  <text x="200" y="192" text-anchor="middle" font-size="10" fill="#6b7280">(channel noise only)</text>
  <!-- Bar 2: Partial intercept -->
  <rect x="290" y="108" width="120" height="52" rx="2" fill="#d97706"/>
  <text x="350" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="#d97706">~14%</text>
  <text x="350" y="178" text-anchor="middle" font-size="11" fill="#111827">50% interception</text>
  <text x="350" y="192" text-anchor="middle" font-size="10" fill="#6b7280">(detectable)</text>
  <!-- Bar 3: Full intercept -->
  <rect x="440" y="57" width="120" height="103" rx="2" fill="#dc2626"/>
  <text x="500" y="49" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">~25%</text>
  <text x="500" y="178" text-anchor="middle" font-size="11" fill="#111827">Full interception</text>
  <text x="500" y="192" text-anchor="middle" font-size="10" fill="#6b7280">(obviously detected)</text>
  <!-- Baseline -->
  <line x1="80" y1="160" x2="620" y2="160" stroke="#e5e7eb" stroke-width="1.5"/>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — QBER as a function of eavesdropping. A quiet channel shows ~1–3% error from photon loss and detector imperfection. Partial interception pushes the QBER above the 11% abort threshold. Full interception by a naive eavesdropper produces ~25% errors — unmistakably detectable.</figcaption>
</figure>

## After Sifting: Privacy Amplification and Error Correction

A QBER below the security threshold does not mean the key is immediately usable. Two further steps are required.

**Error correction** reconciles the small number of discrepancies between Alice's and Bob's sifted keys caused by channel noise — detector inefficiency, optical imperfections, background photons — rather than eavesdropping. Classical error-correcting codes are applied over a public channel. This necessarily reveals some information about the key to any eavesdropper who might be listening.

**Privacy amplification** compensates by shortening the key using a hash function agreed in advance. By compressing the key to a fraction of its sifted length, Alice and Bob can reduce Eve's information about the final key to an arbitrarily small quantity — at the cost of producing fewer key bits. The final key is shorter but provably secure: information-theoretically secure, meaning no adversary, regardless of computational power, can recover it from the intercepted signals.

<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin:2.5rem 0;">
  <div style="text-align:center;padding:1.25rem;background:var(--bg-alt);border:1px solid var(--border);border-top:3px solid var(--accent);">
    <p style="font-size:2.4em;font-weight:800;color:var(--accent);margin:0;line-height:1;">1984</p>
    <p style="font-size:0.82em;color:var(--text-muted);margin:0.4em 0 0 0;line-height:1.4;">Year BB84 was proposed — the founding paper of quantum cryptography</p>
  </div>
  <div style="text-align:center;padding:1.25rem;background:var(--bg-alt);border:1px solid var(--border);border-top:3px solid var(--accent);">
    <p style="font-size:2.4em;font-weight:800;color:var(--accent);margin:0;line-height:1;">25%</p>
    <p style="font-size:0.82em;color:var(--text-muted);margin:0.4em 0 0 0;line-height:1.4;">QBER introduced by a naive eavesdropper covering the entire channel</p>
  </div>
  <div style="text-align:center;padding:1.25rem;background:var(--bg-alt);border:1px solid var(--border);border-top:3px solid var(--accent);">
    <p style="font-size:2.4em;font-weight:800;color:var(--accent);margin:0;line-height:1;">7,600 km</p>
    <p style="font-size:0.82em;color:var(--text-muted);margin:0.4em 0 0 0;line-height:1.4;">Distance of the China-Austria intercontinental QKD demonstration via Micius satellite</p>
  </div>
</div>

## Real-World Constraints

BB84's security is unconditional in theory. In practice, several constraints limit its deployment.

**Distance.** Single photons attenuate in fibre exponentially with distance. A direct fibre link for QKD is practical up to roughly 300–400 kilometres before the key rate becomes too low to be useful. Classical amplification is not possible — you cannot copy a quantum state — so extending range requires trusted relay nodes or satellites.

**Trusted nodes** are the current solution for terrestrial networks. A QKD link is established from Alice to an intermediate node, where the key is stored in classical memory and re-encrypted for the next hop. This works, but the intermediate node is a security assumption: if it is compromised, the key security is compromised. China's Beijing–Shanghai QKD network uses 32 such trusted relay nodes.

**Satellite QKD** removes the trusted-node limitation for long distances. Photons travel through vacuum rather than fibre, reducing loss. China's Micius satellite established QKD with ground stations at distances up to 1,200 km in a single satellite pass, and completed an intercontinental key exchange with Austria in 2021 using the satellite as a trusted node.

<div style="margin:2.5rem 0;padding:0.1rem 0;">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin:0 0 1rem 0;">QKD Milestones</p>
  <div style="position:relative;padding-left:1.5rem;">
    <div style="position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--border);"></div>
    <div style="margin-bottom:1rem;position:relative;">
      <div style="position:absolute;left:-1.65rem;top:0.2em;width:10px;height:10px;border-radius:50%;background:var(--accent);"></div>
      <p style="font-size:0.78em;font-weight:700;color:var(--accent);margin:0;">1984</p>
      <p style="font-size:0.85em;color:var(--text);margin:0.1em 0 0;">BB84 protocol proposed by Bennett and Brassard at a Montreal conference</p>
    </div>
    <div style="margin-bottom:1rem;position:relative;">
      <div style="position:absolute;left:-1.65rem;top:0.2em;width:10px;height:10px;border-radius:50%;background:var(--accent);"></div>
      <p style="font-size:0.78em;font-weight:700;color:var(--accent);margin:0;">1989</p>
      <p style="font-size:0.85em;color:var(--text);margin:0.1em 0 0;">First experimental demonstration at IBM — 32 cm through open air</p>
    </div>
    <div style="margin-bottom:1rem;position:relative;">
      <div style="position:absolute;left:-1.65rem;top:0.2em;width:10px;height:10px;border-radius:50%;background:var(--accent);"></div>
      <p style="font-size:0.78em;font-weight:700;color:var(--accent);margin:0;">2004</p>
      <p style="font-size:0.85em;color:var(--text);margin:0.1em 0 0;">First bank transfer secured by QKD, Vienna — the first commercial application</p>
    </div>
    <div style="margin-bottom:1rem;position:relative;">
      <div style="position:absolute;left:-1.65rem;top:0.2em;width:10px;height:10px;border-radius:50%;background:var(--accent);"></div>
      <p style="font-size:0.78em;font-weight:700;color:var(--accent);margin:0;">2017</p>
      <p style="font-size:0.85em;color:var(--text);margin:0.1em 0 0;">China's Micius satellite demonstrates satellite-to-ground QKD over 1,200 km</p>
    </div>
    <div style="margin-bottom:1rem;position:relative;">
      <div style="position:absolute;left:-1.65rem;top:0.2em;width:10px;height:10px;border-radius:50%;background:var(--accent);"></div>
      <p style="font-size:0.78em;font-weight:700;color:var(--accent);margin:0;">2021</p>
      <p style="font-size:0.85em;color:var(--text);margin:0.1em 0 0;">Intercontinental QKD between China and Austria, 7,600 km via Micius</p>
    </div>
    <div style="position:relative;">
      <div style="position:absolute;left:-1.65rem;top:0.2em;width:10px;height:10px;border-radius:50%;background:var(--accent);"></div>
      <p style="font-size:0.78em;font-weight:700;color:var(--accent);margin:0;">2023</p>
      <p style="font-size:0.85em;color:var(--text);margin:0.1em 0 0;">UK National Quantum Network operational, connecting Cambridge, Bristol, and London</p>
    </div>
  </div>
</div>

<div style="background:var(--bg-alt);border:1px solid var(--border);border-top:3px solid var(--text);padding:1.5rem;margin:2.5rem 0;">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);margin:0 0 0.75rem 0;">Key Takeaways</p>
  <ul style="margin:0;padding-left:1.2em;font-size:0.88em;color:var(--text-muted);line-height:1.8;">
    <li>BB84 security rests on the no-cloning theorem and the disturbance any measurement causes to a quantum state — not on computational assumptions.</li>
    <li>An eavesdropper intercepting all photons introduces a detectable 25% QBER. The 11% abort threshold provides a safety margin above real channel noise.</li>
    <li>Privacy amplification and error correction convert a noisy sifted key into a shorter, information-theoretically secure final key.</li>
    <li>Real-world limitations — distance, trusted nodes, detector efficiency — are engineering constraints, not breaks in the underlying security proof.</li>
    <li>QKD and post-quantum cryptography are complementary, not competing: QKD secures key exchange; PQC secures the computational protocols that use those keys.</li>
  </ul>
</div>

BB84 turned forty in 2024. The protocol that Bennett and Brassard described in four pages has been implemented in fibre, free space, and across 7,600 kilometres of atmosphere via satellite. Its security proof has been extended, strengthened, and subjected to forty years of cryptanalytic scrutiny. No fundamental break has been found.

The reason is not that the engineering is perfect — it is not. Trusted nodes are attack surfaces; detector inefficiencies have enabled side-channel attacks; photon sources are imperfect. The reason BB84 survives is that its core security claim — eavesdropping disturbs the quantum channel, and disturbance is measurable — is a consequence of quantum mechanics itself. And quantum mechanics, so far, remains unbroken.
