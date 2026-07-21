---
title: "QAOA and VQE: The Variational Algorithms That Define the NISQ Era"
description: "Before fault-tolerant quantum computers arrive, the algorithms most likely to demonstrate practical quantum advantage are variational: hybrid quantum-classical loops where a shallow quantum circuit estimates an objective function and a classical optimizer tunes the circuit parameters. VQE targets quantum chemistry; QAOA targets combinatorial optimization. Here is how both work, what they have achieved, and where the honest limits of the approach currently lie."
pubDate: 'Jul 22 2025'
heroImage: '../../assets/hero-qaoa-vqe.svg'
pillar: 'Quantum Algorithms'
author: 'KhGh'
tags: ['QAOA', 'VQE', 'variational quantum algorithms', 'quantum chemistry', 'combinatorial optimization', 'NISQ', 'quantum algorithms', 'Max-Cut']
sources:
  - title: 'A Quantum Approximate Optimization Algorithm'
    authors: 'Edward Farhi, Jeffrey Goldstone, Sam Gutmann'
    venue: 'arXiv:1411.4028'
    year: 2014
    url: 'https://arxiv.org/abs/1411.4028'
  - title: 'A Variational Eigenvalue Solver on a Photonic Quantum Processor'
    authors: 'Alberto Peruzzo, Jarrod McClean, et al.'
    venue: 'Nature Communications 5, 4213'
    year: 2014
    url: 'https://www.nature.com/articles/ncomms5213'
  - title: 'Variational Quantum Algorithms'
    authors: 'M. Cerezo, Andrew Arrasmith, et al.'
    venue: 'Nature Reviews Physics 3, 625; arXiv:2012.09265'
    year: 2021
    url: 'https://arxiv.org/abs/2012.09265'
  - title: 'Improved Approximation Algorithms for Maximum Cut and Satisfiability Problems Using Semidefinite Programming'
    authors: 'Michel X. Goemans, David P. Williamson'
    venue: 'Journal of the ACM 42(6)'
    year: 1995
---

The quantum algorithms most likely to produce practical results on today's hardware are not Shor's algorithm or Grover's algorithm — both require error correction that does not yet exist at useful scale. The near-term candidates are **variational quantum algorithms**: hybrid quantum-classical procedures where a shallow parametrised quantum circuit runs on noisy hardware, a classical computer estimates an objective function from measurement outcomes, and a classical optimiser adjusts the circuit parameters to improve it.

The approach works because the quantum circuit does something useful that is hard to simulate classically — evaluating an expectation value of a quantum Hamiltonian, or estimating the quality of a candidate solution to a combinatorial problem — while offloading the computationally cheap part (parameter optimisation) to classical hardware that handles noise and imprecision gracefully.

Two variational algorithms dominate the NISQ landscape. **VQE** (Variational Quantum Eigensolver) finds ground state energies of molecular Hamiltonians — the central computational problem in quantum chemistry. **QAOA** (Quantum Approximate Optimization Algorithm) finds approximate solutions to combinatorial optimisation problems such as Max-Cut, scheduling, and portfolio allocation. Both share the same architecture and the same fundamental limitations. Understanding them requires starting with the mathematical principle they both exploit.

<div style="border:1px solid var(--border);border-left:3px solid var(--accent);padding:1.25rem 1.5rem;margin:2rem 0;background:var(--bg-alt);">
  <p style="font-size:0.68em;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem 0;">Key Concepts in This Article</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem 2rem;">
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Variational Principle</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">For any trial quantum state |ψ(θ)⟩, the expectation value ⟨ψ(θ)|H|ψ(θ)⟩ ≥ E₀, the true ground state energy. Minimising this expectation value over θ drives the state toward the ground state.</p></div>
    <div><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Ansatz</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The parametrised circuit structure U(θ) used to prepare the trial state. Chemistry-inspired ansätze mirror the structure of electron correlation; hardware-efficient ansätze match device connectivity. The ansatz choice determines what solutions are reachable.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Cost Hamiltonian</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">In QAOA, a diagonal operator H_C whose eigenvalues equal the objective function value for each computational basis state. The algorithm maximises ⟨H_C⟩ by constructive interference on high-cost states.</p></div>
    <div style="margin-top:0.5rem"><p style="font-size:0.88em;font-weight:700;color:var(--text);margin:0 0 0.1em 0;">Approximation Ratio</p><p style="font-size:0.82em;color:var(--text-muted);margin:0;line-height:1.5;">The ratio of QAOA's expected solution quality to the optimal solution: r = ⟨C⟩/C_max. QAOA at p=1 layers achieves r ≥ 0.6924 for Max-Cut. The Goemans-Williamson classical algorithm achieves r ≥ 0.878.</p></div>
  </div>
</div>

## The Variational Principle: The Mathematical Foundation

Both VQE and QAOA rest on a single theorem from quantum mechanics: the **variational principle**. For any Hamiltonian $H$ with ground state energy $E_0$ and any normalised quantum state $|\psi\rangle$:

$$
\langle\psi|H|\psi\rangle \geq E_0
$$

The expectation value of H in any state is always at least as large as the ground state energy. Equality holds only when |ψ⟩ is exactly the ground state.

This gives an algorithm: prepare a family of parametrised states $|\psi(\theta)\rangle$, measure $\langle H \rangle$ for each $\theta$, and minimise over $\theta$. The minimum found is an upper bound on $E_0$; as the parametrised family becomes more expressive, the bound tightens. The quantum computer's job is to prepare $|\psi(\theta)\rangle$ and estimate $\langle H \rangle$ — both tasks that are classically hard for large systems. The classical computer's job is to adjust $\theta$ to reduce $\langle H \rangle$.

## VQE: Quantum Chemistry's Killer Application

The central computational problem in quantum chemistry is finding the **ground state energy** of a molecular Hamiltonian — the energy of the electrons in the lowest-energy configuration for a given nuclear geometry. This energy determines molecular structure, reaction rates, transition states, and binding affinities. Classical methods for solving this problem — CCSD(T), DMRG, quantum Monte Carlo — scale poorly with system size, typically as O(N^6) to O(N^7) in the number of electrons N for the highest-accuracy methods. Quantum chemistry is one of the most computationally expensive problems in science.

VQE was proposed in 2014 by Peruzzo, McClean, and collaborators, and demonstrated on a photonic quantum processor using the hydrogen molecule H₂ — the smallest possible quantum chemistry calculation. The idea: map the molecular Hamiltonian onto qubits using the Jordan-Wigner or Bravyi-Kitaev transformation, prepare a parametrised trial state, and use the variational principle to optimise the circuit parameters until the energy converges.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 195" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">VQE — HYBRID QUANTUM-CLASSICAL LOOP</text>
  <!-- Quantum processor box -->
  <rect x="30" y="35" width="260" height="150" rx="6" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="160" y="55" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#1d4ed8">QUANTUM PROCESSOR</text>
  <!-- Circuit inside -->
  <line x1="55"  y1="90" x2="270" y2="90" stroke="#e5e7eb" stroke-width="1.5"/>
  <line x1="55"  y1="115" x2="270" y2="115" stroke="#e5e7eb" stroke-width="1.5"/>
  <line x1="55"  y1="140" x2="270" y2="140" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Ansatz block -->
  <rect x="70" y="74" width="100" height="82" rx="4" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="120" y="106" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">U(θ)</text>
  <text x="120" y="120" text-anchor="middle" font-size="8.5" fill="#1d4ed8">ansatz circuit</text>
  <text x="120" y="134" text-anchor="middle" font-size="8.5" fill="#1d4ed8">|ψ(θ)⟩</text>
  <!-- Measurement block -->
  <rect x="190" y="74" width="70" height="82" rx="4" fill="#fce7f3" stroke="#9d174d" stroke-width="1.5"/>
  <text x="225" y="104" text-anchor="middle" font-size="9.5" font-weight="700" fill="#9d174d">Measure</text>
  <text x="225" y="118" text-anchor="middle" font-size="8.5" fill="#9d174d">⟨Pᵢ⟩ for</text>
  <text x="225" y="130" text-anchor="middle" font-size="8.5" fill="#9d174d">each Pauli</text>
  <text x="225" y="142" text-anchor="middle" font-size="8.5" fill="#9d174d">term</text>
  <!-- Quantum output -->
  <text x="160" y="175" text-anchor="middle" font-size="8.5" fill="#1d4ed8">⟨H⟩ = Σᵢ cᵢ⟨Pᵢ⟩</text>
  <!-- Arrow from quantum to classical -->
  <line x1="295" y1="110" x2="385" y2="110" stroke="#374151" stroke-width="2" marker-end="url(#arrdk)"/>
  <text x="340" y="103" text-anchor="middle" font-size="8.5" fill="#374151">⟨H⟩(θ)</text>
  <!-- Classical optimizer box -->
  <rect x="390" y="35" width="260" height="150" rx="6" fill="#f0fdf4" stroke="#059669" stroke-width="2"/>
  <text x="520" y="55" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#059669">CLASSICAL OPTIMIZER</text>
  <text x="520" y="82" text-anchor="middle" font-size="9.5" fill="#111827">minimise ⟨H⟩(θ) over θ</text>
  <!-- Optimizer options -->
  <rect x="410" y="92" width="220" height="60" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="520" y="108" text-anchor="middle" font-size="9" fill="#059669" font-weight="700">gradient-free: COBYLA, BFGS</text>
  <text x="520" y="122" text-anchor="middle" font-size="9" fill="#059669">gradient: parameter-shift rule</text>
  <text x="520" y="136" text-anchor="middle" font-size="9" fill="#059669">∂⟨H⟩/∂θ = [⟨H⟩(θ+π/2)−⟨H⟩(θ−π/2)]/2</text>
  <!-- Convergence -->
  <text x="520" y="168" text-anchor="middle" font-size="9" fill="#059669">converged → θ*, E₀ ≈ ⟨H⟩(θ*)</text>
  <!-- Arrow from classical back to quantum (update theta) -->
  <path d="M 520,185 Q 520,192 340,192 Q 160,192 160,185" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#arrdk)"/>
  <text x="340" y="190" text-anchor="middle" font-size="8.5" fill="#374151">updated θ</text>
  <!-- Input Hamiltonian -->
  <text x="30" y="25" font-size="8.5" fill="#6b7280">Input: molecular Hamiltonian H</text>
  <defs>
    <marker id="arrdk" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#374151"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — The VQE hybrid loop. The quantum processor prepares a parametrised trial state |ψ(θ)⟩ using an ansatz circuit U(θ), then measures expectation values ⟨Pᵢ⟩ for each Pauli string in the Hamiltonian decomposition. The classical computer combines these into ⟨H⟩(θ) and runs an optimiser to find new parameters θ that reduce the energy. The loop iterates until convergence. The classical optimiser uses either gradient-free methods or the parameter-shift rule to compute analytic quantum gradients without finite-difference approximations.</figcaption>
</figure>

## The Hamiltonian in Pieces: Pauli Decomposition

A molecular Hamiltonian, once mapped to qubits via Jordan-Wigner or Bravyi-Kitaev transformation, becomes a weighted sum of Pauli operator strings. For hydrogen H₂ in a minimal basis (STO-3G), the qubit Hamiltonian takes the form:

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">H₂ HAMILTONIAN — PAULI DECOMPOSITION (STO-3G, R=0.74 Å)</text>
  <!-- Header -->
  <rect x="10" y="26" width="660" height="24" fill="#f1f5f9"/>
  <text x="155" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#6b7280">PAULI TERM</text>
  <text x="350" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#6b7280">COEFFICIENT (hartree)</text>
  <text x="530" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#6b7280">MEASUREMENT CIRCUIT</text>
  <line x1="10" y1="50" x2="670" y2="50" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Term rows -->
  <rect x="10" y="50" width="660" height="20" fill="#fff"/>
  <text x="155" y="63" text-anchor="middle" font-size="10" fill="#111827" font-family="monospace">−0.8126 · II</text>
  <text x="350" y="63" text-anchor="middle" font-size="10" fill="#6b7280">constant</text>
  <text x="530" y="63" text-anchor="middle" font-size="9" fill="#6b7280">no measurement needed</text>
  <line x1="10" y1="70" x2="670" y2="70" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="10" y="70" width="660" height="20" fill="#f9fafb"/>
  <text x="155" y="83" text-anchor="middle" font-size="10" fill="#1d4ed8" font-family="monospace">+0.1711 · IZ</text>
  <text x="350" y="83" text-anchor="middle" font-size="10" fill="#6b7280">+0.1711</text>
  <text x="530" y="83" text-anchor="middle" font-size="9" fill="#1d4ed8">measure qubit 1 in Z basis</text>
  <line x1="10" y1="90" x2="670" y2="90" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="10" y="90" width="660" height="20" fill="#fff"/>
  <text x="155" y="103" text-anchor="middle" font-size="10" fill="#1d4ed8" font-family="monospace">−0.2252 · ZI</text>
  <text x="350" y="103" text-anchor="middle" font-size="10" fill="#6b7280">−0.2252</text>
  <text x="530" y="103" text-anchor="middle" font-size="9" fill="#1d4ed8">measure qubit 0 in Z basis</text>
  <line x1="10" y1="110" x2="670" y2="110" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="10" y="110" width="660" height="20" fill="#f9fafb"/>
  <text x="155" y="123" text-anchor="middle" font-size="10" fill="#1d4ed8" font-family="monospace">+0.1736 · ZZ</text>
  <text x="350" y="123" text-anchor="middle" font-size="10" fill="#6b7280">+0.1736</text>
  <text x="530" y="123" text-anchor="middle" font-size="9" fill="#1d4ed8">measure both qubits in Z basis</text>
  <line x1="10" y1="130" x2="670" y2="130" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="10" y="130" width="660" height="20" fill="#fff"/>
  <text x="155" y="143" text-anchor="middle" font-size="10" fill="#7c3aed" font-family="monospace">+0.1200 · XX</text>
  <text x="350" y="143" text-anchor="middle" font-size="10" fill="#6b7280">+0.1200</text>
  <text x="530" y="143" text-anchor="middle" font-size="9" fill="#7c3aed">rotate both to X basis, then measure Z</text>
  <line x1="10" y1="150" x2="670" y2="150" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="10" y="150" width="660" height="20" fill="#f9fafb"/>
  <text x="155" y="163" text-anchor="middle" font-size="10" fill="#7c3aed" font-family="monospace">+0.1200 · YY</text>
  <text x="350" y="163" text-anchor="middle" font-size="10" fill="#6b7280">+0.1200</text>
  <text x="530" y="163" text-anchor="middle" font-size="9" fill="#7c3aed">rotate both to Y basis, then measure Z</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — The H₂ qubit Hamiltonian in the STO-3G basis at bond length 0.74 Å, after Jordan-Wigner mapping to 2 qubits. Each Pauli string is measured with a separate circuit configuration; the expectation values are multiplied by their coefficients and summed classically to produce ⟨H⟩. For larger molecules the number of Pauli terms scales as O(N⁴) in the number of molecular orbitals — the primary measurement bottleneck in VQE.</figcaption>
</figure>

Each Pauli string requires a separate set of measurements. The diagonal terms (IZ, ZI, ZZ) are measured directly in the computational basis. The off-diagonal terms (XX, YY) require a basis rotation — applying Hadamard or S·H gates before measurement — to convert the X or Y expectation value into a Z measurement. The total number of circuit executions ("shots") grows with the number of Pauli terms and the required statistical precision.

For H₂ in a minimal basis: 5 terms, manageable. For a larger molecule like FeMo-co (the active site of nitrogenase, relevant for nitrogen fixation): ~10⁸ Pauli terms — a measurement overhead that makes VQE intractable without grouping commuting terms or other mitigation techniques.

## The Ansatz Problem

The choice of ansatz — the parametrised circuit family — determines both the expressibility of the trial states and the depth of the circuit required. Three classes dominate:

**Chemistry-inspired (UCCSD)**: The Unitary Coupled Cluster Singles Doubles ansatz builds circuit layers from fermionic excitation operators motivated by quantum chemistry. It is a physically motivated approximation to the exact ground state but requires deep circuits — too deep for current NISQ hardware without significant truncation.

**Hardware-efficient**: Generic parametrised layers matched to the native gate set and connectivity of the target device. Shallower and more practical on noisy hardware, but may lack the expressibility to represent the true ground state for complex molecules. Can be trapped in spurious local minima with no physical interpretation.

**ADAPT-VQE**: A greedy algorithm that grows the ansatz one operator at a time by adding the operator from a predefined pool that most reduces the gradient of ⟨H⟩. More efficient than UCCSD while remaining chemistry-motivated, at the cost of a more complex classical loop.

## QAOA: Combinatorial Optimisation on Quantum Hardware

QAOA was introduced by Farhi, Goldstone, and Gutmann in 2014 as a near-term-executable approximation to the quantum adiabatic algorithm. Where VQE targets continuous energy minimisation in chemistry, QAOA targets **combinatorial optimisation**: finding a bit string x ∈ {0,1}ⁿ that maximises (or minimises) a classical objective function C(x).

The canonical example is **Max-Cut**: given a graph G = (V, E), partition the vertices into two sets S and V\S to maximise the number of edges crossing the partition.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">QAOA FOR MAX-CUT — GRAPH AND ENCODING</text>
  <!-- Left: graph with optimal cut -->
  <rect x="10" y="26" width="295" height="168" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="158" y="44" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6b7280">GRAPH G — OPTIMAL CUT = 4 EDGES</text>
  <!-- Graph nodes on square: 0(top-left), 1(top-right), 2(bottom-right), 3(bottom-left) -->
  <!-- Edges (all 4 of C₄ plus diagonal (0,2)) -->
  <!-- Edge (0,1) top -->
  <line x1="90"  y1="80"  x2="230" y2="80"  stroke="#dc2626" stroke-width="3" stroke-dasharray="6,3"/>
  <!-- Edge (1,2) right -->
  <line x1="230" y1="80"  x2="230" y2="170" stroke="#dc2626" stroke-width="3" stroke-dasharray="6,3"/>
  <!-- Edge (2,3) bottom -->
  <line x1="90"  y1="170" x2="230" y2="170" stroke="#dc2626" stroke-width="3" stroke-dasharray="6,3"/>
  <!-- Edge (3,0) left -->
  <line x1="90"  y1="80"  x2="90"  y2="170" stroke="#dc2626" stroke-width="3" stroke-dasharray="6,3"/>
  <!-- Nodes -->
  <circle cx="90"  cy="80"  r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="90"  y="85"  text-anchor="middle" font-size="12" font-weight="700" fill="#1d4ed8">0</text>
  <circle cx="230" cy="80"  r="20" fill="#fde68a" stroke="#d97706" stroke-width="2.5"/>
  <text x="230" y="85"  text-anchor="middle" font-size="12" font-weight="700" fill="#92400e">1</text>
  <circle cx="230" cy="170" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="230" y="175" text-anchor="middle" font-size="12" font-weight="700" fill="#1d4ed8">2</text>
  <circle cx="90"  cy="170" r="20" fill="#fde68a" stroke="#d97706" stroke-width="2.5"/>
  <text x="90"  y="175" text-anchor="middle" font-size="12" font-weight="700" fill="#92400e">3</text>
  <!-- Cut line annotation -->
  <text x="30"  y="130" font-size="8.5" fill="#dc2626" font-weight="700" transform="rotate(-90 30 130)">cut</text>
  <!-- Legend -->
  <circle cx="24" cy="186" r="7" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="35" y="190" font-size="8.5" fill="#1d4ed8">Set S = {0, 2}</text>
  <circle cx="160" cy="186" r="7" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
  <text x="171" y="190" font-size="8.5" fill="#92400e">Set V\S = {1, 3}</text>
  <!-- Right: cost function and QAOA encoding -->
  <rect x="325" y="26" width="345" height="168" rx="4" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="498" y="44" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6b7280">QAOA ENCODING</text>
  <text x="498" y="64" text-anchor="middle" font-size="9.5" fill="#111827" font-weight="700">Cost function:</text>
  <text x="498" y="79" text-anchor="middle" font-size="9.5" fill="#111827">C(x) = number of cut edges</text>
  <text x="498" y="94" text-anchor="middle" font-size="9.5" fill="#6b7280">= Σ_{(i,j)∈E} (1 − zᵢzⱼ)/2</text>
  <text x="498" y="109" text-anchor="middle" font-size="8.5" fill="#6b7280">where zᵢ = 1 − 2xᵢ ∈ {+1, −1}</text>
  <!-- Cost Hamiltonian -->
  <rect x="340" y="118" width="315" height="40" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="498" y="133" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1d4ed8">Cost Hamiltonian:</text>
  <text x="498" y="150" text-anchor="middle" font-size="9.5" fill="#1d4ed8">H_C = Σ_{(i,j)∈E} (I − ZᵢZⱼ)/2</text>
  <!-- Optimal solution -->
  <text x="498" y="172" text-anchor="middle" font-size="9" fill="#059669" font-weight="700">Optimal: x = 0101 or 1010 → C = 4</text>
  <text x="498" y="185" text-anchor="middle" font-size="8.5" fill="#6b7280">QAOA maximises ⟨H_C⟩ over γ, β parameters</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 3 — Max-Cut on a 4-cycle graph C₄. The optimal partition places nodes {0,2} in one set (blue) and {1,3} in the other (yellow), cutting all four edges — the maximum possible. The cost function C(x) = Σ (1−zᵢzⱼ)/2 is encoded as the diagonal quantum Hamiltonian H_C, whose eigenstates are computational basis states and whose eigenvalues are the number of cut edges. QAOA maximises ⟨H_C⟩ by preparing a quantum state in which high-cut solutions have large probability amplitudes.</figcaption>
</figure>

## The QAOA Circuit

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 175" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="340" y="16" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">QAOA CIRCUIT — p = 2 LAYERS (4-QUBIT EXAMPLE)</text>
  <!-- Qubit lines -->
  <line x1="30" y1="50"  x2="650" y2="50"  stroke="#e5e7eb" stroke-width="1.5"/>
  <line x1="30" y1="80"  x2="650" y2="80"  stroke="#e5e7eb" stroke-width="1.5"/>
  <line x1="30" y1="110" x2="650" y2="110" stroke="#e5e7eb" stroke-width="1.5"/>
  <line x1="30" y1="140" x2="650" y2="140" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Labels -->
  <text x="28" y="54"  text-anchor="end" font-size="9" fill="#1d4ed8">q₀</text>
  <text x="28" y="84"  text-anchor="end" font-size="9" fill="#1d4ed8">q₁</text>
  <text x="28" y="114" text-anchor="end" font-size="9" fill="#1d4ed8">q₂</text>
  <text x="28" y="144" text-anchor="end" font-size="9" fill="#1d4ed8">q₃</text>
  <!-- Initial Hadamard -->
  <rect x="35" y="35" width="50" height="120" rx="3" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="60" y="93" text-anchor="middle" font-size="12" font-weight="700" fill="#374151">H⊗⁴</text>
  <text x="60" y="162" text-anchor="middle" font-size="8" fill="#6b7280">|+⟩⊗⁴</text>
  <!-- Layer 1 label -->
  <text x="215" y="170" text-anchor="middle" font-size="8.5" fill="#d97706" font-weight="700">layer p=1: γ₁, β₁</text>
  <!-- Phase separator layer 1 (H_C) -->
  <rect x="100" y="35" width="90" height="120" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="145" y="88" text-anchor="middle" font-size="9.5" font-weight="700" fill="#92400e">e^{−iγ₁H_C}</text>
  <text x="145" y="103" text-anchor="middle" font-size="8.5" fill="#92400e">ZZ gates on</text>
  <text x="145" y="115" text-anchor="middle" font-size="8.5" fill="#92400e">each edge</text>
  <!-- Mixer layer 1 (H_B) -->
  <rect x="205" y="35" width="75" height="120" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="243" y="88" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1d4ed8">e^{−iβ₁H_B}</text>
  <text x="243" y="103" text-anchor="middle" font-size="8.5" fill="#1d4ed8">Rx(2β₁)</text>
  <text x="243" y="115" text-anchor="middle" font-size="8.5" fill="#1d4ed8">on each qubit</text>
  <!-- Layer 2 label -->
  <text x="430" y="170" text-anchor="middle" font-size="8.5" fill="#7c3aed" font-weight="700">layer p=2: γ₂, β₂</text>
  <!-- Phase separator layer 2 -->
  <rect x="295" y="35" width="90" height="120" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="2" opacity="0.7"/>
  <text x="340" y="88" text-anchor="middle" font-size="9.5" font-weight="700" fill="#92400e">e^{−iγ₂H_C}</text>
  <text x="340" y="103" text-anchor="middle" font-size="8.5" fill="#92400e" opacity="0.8">ZZ gates</text>
  <!-- Mixer layer 2 -->
  <rect x="400" y="35" width="75" height="120" rx="3" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2" opacity="0.7"/>
  <text x="438" y="88" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1d4ed8">e^{−iβ₂H_B}</text>
  <text x="438" y="103" text-anchor="middle" font-size="8.5" fill="#1d4ed8" opacity="0.8">Rx(2β₂)</text>
  <!-- Measurement -->
  <rect x="490" y="35" width="60" height="120" rx="3" fill="#fce7f3" stroke="#9d174d" stroke-width="1.5"/>
  <text x="520" y="88" text-anchor="middle" font-size="9" font-weight="700" fill="#9d174d">Measure</text>
  <text x="520" y="103" text-anchor="middle" font-size="8.5" fill="#9d174d">compute</text>
  <text x="520" y="115" text-anchor="middle" font-size="8.5" fill="#9d174d">⟨H_C⟩</text>
  <!-- Classical optimiser -->
  <rect x="560" y="55" width="90" height="60" rx="3" fill="#f0fdf4" stroke="#059669" stroke-width="1.5"/>
  <text x="605" y="78" text-anchor="middle" font-size="8.5" font-weight="700" fill="#059669">Classical</text>
  <text x="605" y="91" text-anchor="middle" font-size="8.5" fill="#059669">optimiser</text>
  <text x="605" y="104" text-anchor="middle" font-size="8.5" fill="#059669">→ γ*, β*</text>
  <!-- Parameters label -->
  <text x="340" y="30" text-anchor="middle" font-size="8.5" fill="#6b7280">2p = 4 variational parameters: (γ₁, β₁, γ₂, β₂)</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 4 — QAOA circuit for p=2 layers. Starting from the uniform superposition |+⟩⊗⁴ (from Hadamard on each qubit), two alternating blocks are applied: the phase separator e^{−iγH_C} (implemented as ZZ rotations on each graph edge) and the mixer e^{−iβH_B} (implemented as Rx rotations on each qubit). With p layers there are 2p variational parameters. The classical optimiser tunes γ and β to maximise ⟨H_C⟩, which equals the expected number of cut edges in a random sample from the output state.</figcaption>
</figure>

The QAOA circuit has a fixed structure motivated by the quantum adiabatic algorithm. Starting from the uniform superposition over all 2ⁿ bit strings:

**Phase separator** $e^{-i\gamma H_C}$: a diagonal unitary that multiplies each computational basis state $|x\rangle$ by $e^{-i\gamma C(x)}$. For Max-Cut, this is implemented by a ZZ rotation on each edge: $e^{-i\gamma Z_i Z_j / 2}$. This gate adds a phase proportional to the cost — high-cost states accumulate more phase.

**Mixer** $e^{-i\beta H_B}$: where $H_B = \sum_i X_i$. Applied as independent $R_x(2\beta)$ rotations on each qubit, this gate mixes the amplitudes across different bit strings, preventing the state from getting stuck in a single basis state. Without the mixer, the phase separator would do nothing useful.

The alternation of phase separator and mixer is the quantum analogue of alternating between "evaluate the cost" and "explore the solution space." With $p$ layers, the algorithm has $2p$ variational parameters $(\gamma_1, \dots, \gamma_p, \beta_1, \dots, \beta_p)$ that are optimised classically.

**Key theoretical result**: as p → ∞ with appropriate parameters, QAOA converges to the exact optimum — it recovers the quantum adiabatic algorithm in the limit. For finite p, it produces approximations whose quality improves monotonically with p.

## What QAOA Actually Achieves

For Max-Cut, the theoretical performance of QAOA is known precisely at p=1:

> QAOA₁(Max-Cut) achieves an approximation ratio ≥ 0.6924 for 3-regular graphs

This means QAOA at a single layer finds, on average, at least 69.24% of the optimal cut. This is better than random (0.5) but worse than the best classical algorithm: the **Goemans-Williamson (GW) algorithm**, which achieves a guaranteed approximation ratio of ≥ 0.878 using semidefinite programming — a classical polynomial-time algorithm.

For p=2 and beyond, the approximation ratio improves but the classical simulation becomes harder to bound theoretically. Numerical experiments on random graphs suggest QAOA can approach or match GW for moderate p, but no proof of quantum advantage over GW has been established for any p.

The honest picture: **QAOA has not been shown to outperform the best classical algorithms for Max-Cut, MAXSAT, or any other standard combinatorial optimisation problem at any circuit depth currently implementable.** This is not a fatal objection to QAOA — quantum advantage may exist for specific problem instances, specific graph structures, or at circuit depths not yet experimentally accessible — but it is the state of knowledge as of mid-2025.

## The Classical Optimiser Problem

Both VQE and QAOA face a challenge from the classical optimisation loop that is independent of hardware quality: the **barren plateau problem**. As circuit depth and qubit count grow, the gradient of the objective function with respect to circuit parameters vanishes exponentially in the number of qubits. The classical optimiser navigates an increasingly flat landscape where every direction looks equally uninformative.

This problem, covered in depth in [Vanishing Gradients at Quantum Scale](/blog/barren-plateaus), is the most fundamental obstacle to scaling variational algorithms. Hardware-efficient ansätze are particularly susceptible because they lack the structural inductive bias of chemistry-inspired designs. Mitigation strategies — local cost functions, problem-inspired initialisation, layerwise training — partially address the issue but do not eliminate it.

Beyond barren plateaus, both algorithms face:
- **Measurement overhead**: estimating $\langle H \rangle$ to precision $\varepsilon$ requires $O(1/\varepsilon^2)$ circuit repetitions; reducing measurement overhead is an active research area
- **Noise on NISQ hardware**: decoherence and gate errors corrupt the expectation values; error mitigation (zero-noise extrapolation, symmetry verification) can partially compensate but add statistical overhead
- **Local optima**: non-convex optimisation landscapes with many local minima, especially for deep circuits

## VQE: Where It Stands

VQE has been experimentally demonstrated for small molecules on superconducting, trapped-ion, and photonic hardware. Key milestones:

- H₂ ground state energy: multiple platforms, ~2016–2018 (first demonstrations)
- H₂O, LiH, BeH₂: IBM and Google, 2017–2019
- Fe₂S₂ active site fragment: Google (using a 12-qubit processor, 2020)
- Active space of FeMo-co (nitrogen fixation): targeted but not yet classically-unfeasible scale

The fundamental problem: every molecule VQE has simulated can be computed more accurately — and faster — by classical quantum chemistry methods (CCSD(T), DMRG, selected CI) on classical computers. The quantum advantage regime requires approximately 50–100 qubits of system size with circuit depths that exceed current NISQ capabilities. The crossover point — where VQE on quantum hardware beats CCSD(T) for chemistry of practical interest — has not been reached.

## The Path Forward

The trajectory of both QAOA and VQE leads through error correction. The near-term NISQ versions are constrained by noise tolerance, circuit depth, and qubit count. The long-term versions — fault-tolerant quantum algorithms for chemistry and optimisation — are genuinely exponentially hard classically and would require logical qubit resources that will not be available for years to decades.

The intermediate case — "early fault-tolerant" algorithms that use partial error correction to run somewhat deeper circuits — is an active research direction. These algorithms aim to demonstrate advantage before full fault-tolerance by using a small number of logical qubits with moderate error suppression.

For QAOA, the most optimistic near-term scenario is that a specific graph structure or problem class exists where quantum interference provides a structural advantage that classical algorithms cannot replicate — an advantage that appears before the circuit depth becomes intractable for NISQ hardware. No such class has been rigorously identified, but theoretical work on random quantum circuits and on average-case hardness of QAOA suggests it is not implausible.

For VQE, the most optimistic near-term scenario is a chemical system where the quantum state is genuinely hard to represent classically — strongly correlated electrons in transition metal complexes, for example — but where the quantum circuit can be kept shallow enough to run on noisy hardware with sufficient accuracy. Again, this remains a target rather than a demonstrated result.

Both algorithms are not failures — they are the correct approach for the hardware that currently exists, and they have driven enormous advances in quantum hardware benchmarking, error mitigation, and the development of the classical-quantum interface. The honest assessment is that practical quantum advantage via variational algorithms is likely to require hardware improvements — lower noise, more qubits, deeper coherent circuits — rather than solely algorithmic innovation. Whether that hardware arrives before classical algorithms close the gap on the problems QAOA and VQE target is the defining open question of the NISQ era.
