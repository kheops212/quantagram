---
title: "When AI Becomes the Scientist: How Machine Learning Is Accelerating Discovery"
description: "AlphaFold solved protein folding in months. GNoME predicted 2.2 million new crystal structures. FunSearch found new algorithms in mathematics. Across discipline after discipline, AI is compressing decades of research into years — and raising urgent questions about what it means to do science."
pubDate: 'Jul 22 2022'
heroImage: '../../assets/hero-ai-scientist.svg'
pillar: 'Future Tech'
author: 'KhGh'
tags: ['scientific discovery', 'AlphaFold', 'AI', 'machine learning', 'future tech']
sources:
  - title: 'Highly Accurate Protein Structure Prediction with AlphaFold'
    authors: 'John Jumper, Richard Evans, et al. (DeepMind)'
    venue: 'Nature 596, 583'
    year: 2021
    url: 'https://www.nature.com/articles/s41586-021-03819-2'
  - title: 'Scaling Deep Learning for Materials Discovery (GNoME)'
    authors: 'Amil Merchant, Simon Batzner, et al. (Google DeepMind)'
    venue: 'Nature 624, 80'
    year: 2023
    url: 'https://www.nature.com/articles/s41586-023-06735-9'
  - title: 'Mathematical Discoveries from Program Search with Large Language Models (FunSearch)'
    authors: 'Bernardino Romera-Paredes, Mohammadamin Barekatain, et al.'
    venue: 'Nature 625, 468'
    year: 2024
    url: 'https://www.nature.com/articles/s41586-023-06924-6'
---

In 2020, a protein has an amino acid sequence — a string of chemical letters, sometimes hundreds long — and the question of what three-dimensional shape that string folds into has been one of biology's hardest problems for fifty years. The shape determines the protein's function; the function determines whether a drug binds to it, whether a disease can be treated. Biochemists spent careers crystallising proteins and firing X-rays at them to resolve single structures. It was slow, expensive, and heroically painstaking work.

DeepMind's AlphaFold 2 solved the problem. Not gradually — abruptly. At the 2020 Critical Assessment of Protein Structure Prediction competition, it achieved accuracy matching experimental methods across nearly all test structures. By 2022, the AlphaFold Protein Structure Database contained predicted structures for over 200 million proteins covering virtually every sequenced organism on Earth. A task the scientific community had estimated would take centuries was substantially complete in two years.

AlphaFold was not an isolated event. It was the opening act.

## The Pattern of Disruption

What AlphaFold demonstrated was a pattern that is now repeating across scientific domains: a machine learning system, trained on the accumulated literature and experimental data of a field, finds structural regularities invisible to human researchers and leverages them to make predictions at a scale and speed no human effort could match.

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <text x="170" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#6b7280">TRADITIONAL DISCOVERY</text>
  <text x="510" y="18" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#1d4ed8">AI-ASSISTED DISCOVERY</text>
  <line x1="340" y1="0" x2="340" y2="190" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="5,3"/>
  <!-- Traditional cycle -->
  <circle cx="170" cy="95" r="70" fill="none" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="170" cy="28" r="22" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="170" y="24" text-anchor="middle" font-size="9" fill="#6b7280">Hypothesis</text>
  <text x="170" y="36" text-anchor="middle" font-size="9" fill="#6b7280">formed</text>
  <circle cx="230" cy="115" r="22" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="230" y="111" text-anchor="middle" font-size="9" fill="#6b7280">Experiment</text>
  <text x="230" y="123" text-anchor="middle" font-size="9" fill="#6b7280">designed</text>
  <circle cx="120" cy="155" r="22" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1.5"/>
  <text x="120" y="151" text-anchor="middle" font-size="9" fill="#6b7280">Results</text>
  <text x="120" y="163" text-anchor="middle" font-size="9" fill="#6b7280">analysed</text>
  <text x="170" y="98" text-anchor="middle" font-size="11" fill="#dc2626" font-weight="700">5–15 years</text>
  <text x="170" y="113" text-anchor="middle" font-size="10" fill="#6b7280">per cycle</text>
  <!-- Traditional arrows -->
  <path d="M 185,48 Q 220,70 215,95" fill="none" stroke="#e5e7eb" stroke-width="1.5" marker-end="url(#a1)"/>
  <path d="M 210,132 Q 190,158 140,162" fill="none" stroke="#e5e7eb" stroke-width="1.5" marker-end="url(#a1)"/>
  <path d="M 108,135 Q 120,65 155,44" fill="none" stroke="#e5e7eb" stroke-width="1.5" marker-end="url(#a1)"/>
  <!-- AI cycle -->
  <circle cx="510" cy="95" r="70" fill="none" stroke="#1d4ed8" stroke-width="1.5"/>
  <circle cx="510" cy="28" r="22" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="510" y="24" text-anchor="middle" font-size="9" fill="#1d4ed8">Literature</text>
  <text x="510" y="36" text-anchor="middle" font-size="9" fill="#1d4ed8">+ Data</text>
  <circle cx="570" cy="115" r="22" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="570" y="111" text-anchor="middle" font-size="9" fill="#1d4ed8">AI Model</text>
  <text x="570" y="123" text-anchor="middle" font-size="9" fill="#1d4ed8">prediction</text>
  <circle cx="460" cy="155" r="22" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="460" y="151" text-anchor="middle" font-size="9" fill="#1d4ed8">Targeted</text>
  <text x="460" y="163" text-anchor="middle" font-size="9" fill="#1d4ed8">experiment</text>
  <text x="510" y="98" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="700">months</text>
  <text x="510" y="113" text-anchor="middle" font-size="10" fill="#6b7280">per cycle</text>
  <path d="M 525,48 Q 560,70 555,95" fill="none" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#a2)"/>
  <path d="M 550,132 Q 530,158 480,162" fill="none" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#a2)"/>
  <path d="M 448,135 Q 460,65 495,44" fill="none" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#a2)"/>
  <defs>
    <marker id="a1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e5e7eb"/></marker>
    <marker id="a2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8"/></marker>
  </defs>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 1 — The traditional scientific discovery cycle takes years per iteration. AI-assisted discovery compresses the hypothesis-to-experiment loop to months by replacing exploratory experiments with targeted AI predictions, reserving lab time for verification rather than search.</figcaption>
</figure>

The compression of this cycle — from years to months — is not just convenient. It is qualitatively transformative. Science has always been limited not by the number of true things to discover, but by the rate at which humans can test hypotheses. A system that can propose a thousand well-founded hypotheses from the existing literature and rank them by likelihood changes the topology of the problem.

## Materials Science: Two Million Crystals

In 2023, DeepMind published results from **GNoME** (Graph Networks for Materials Exploration), a graph neural network trained on crystallographic databases. GNoME predicted 2.2 million stable crystal structures — including 380,000 judged stable enough to be synthesised. Before GNoME, the accumulated catalogue of experimentally known stable inorganic crystals numbered around 48,000. The AI expanded it by roughly 45 times in a single research campaign.

Lawrence Berkeley National Laboratory subsequently used autonomous robotic laboratories to synthesise 41 of the AI-predicted structures, confirming stability for 43 of 58 attempted. The loop between AI prediction and robotic verification ran without human intervention between iterations. The implications for battery technology, superconductors, and semiconductors are significant: the search space of useful materials has been largely mapped before the experimental work has begun.

## Drug Discovery: Compressing the Lead-Finding Phase

Traditional pharmaceutical drug discovery begins with a screening campaign: testing hundreds of thousands of compounds against a biological target, identifying "hits," optimising them through iterative synthesis, and eventually advancing candidates to clinical trials. The process takes a decade and costs over a billion dollars on average before a single approved drug emerges. The vast majority of candidates fail.

AI is compressing the early phase dramatically. Graph neural networks and transformer architectures trained on molecular property databases can predict binding affinity, solubility, toxicity, and metabolic stability before a single molecule is synthesised. Companies including Recursion, Schrödinger, and Insilico Medicine have demonstrated AI-identified drug candidates advancing to clinical trials in timescales previously impossible — Insilico's AI-designed fibrosis drug entered Phase II trials within four years of project start, a record.

The gains are not uniform. AI excels at optimising within known chemical space; finding entirely novel scaffolds remains harder. And predicting clinical success — which depends on biological complexity far beyond molecular properties — remains beyond current capabilities. But the reduction in the time and cost of the lead-finding phase is measurable and compounding.

## Mathematics and Formal Proof

Perhaps the most surprising frontier is pure mathematics. In 2023, DeepMind's **FunSearch** system — using a large language model in combination with an evaluator — discovered new solutions to the cap set problem and the bin packing problem, both long-standing open questions. The system did not prove theorems; it searched the space of possible programs for functions that, when run, produced mathematically correct and novel results.

Simultaneously, the Lean 4 formal proof assistant, increasingly connected to large language models, is enabling a new mode of mathematical research where human-proposed proof sketches are checked, completed, and in some cases generated by AI. The **AlphaProof** system, also from DeepMind, solved four of six International Mathematical Olympiad problems in 2024 — including a Problem 6, the hardest category. These are not AI systems generating plausible-looking mathematics. They are producing verified, formally correct proofs.

## Physics: Plasma and Gravitational Waves

<figure style="margin: 2em 0;">
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:inherit">
  <rect x="0" y="0" width="680" height="34" rx="4" fill="#111827"/>
  <text x="340" y="22" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.08em" fill="#fff">AI IN SCIENCE — SELECTED MILESTONES</text>
  <!-- Timeline -->
  <line x1="30" y1="90" x2="650" y2="90" stroke="#e5e7eb" stroke-width="2"/>
  <!-- Points -->
  <circle cx="60"  cy="90" r="6" fill="#7c3aed"/>
  <circle cx="200" cy="90" r="6" fill="#1d4ed8"/>
  <circle cx="320" cy="90" r="6" fill="#0284c7"/>
  <circle cx="450" cy="90" r="6" fill="#059669"/>
  <circle cx="580" cy="90" r="6" fill="#d97706"/>
  <!-- Year labels -->
  <text x="60"  y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#7c3aed">2020</text>
  <text x="200" y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">2022</text>
  <text x="320" y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#0284c7">2022</text>
  <text x="450" y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#059669">2023</text>
  <text x="580" y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#d97706">2024</text>
  <!-- Event labels -->
  <text x="60"  y="108" text-anchor="middle" font-size="10" fill="#111827">AlphaFold 2</text>
  <text x="60"  y="121" text-anchor="middle" font-size="10" fill="#6b7280">protein folding</text>
  <text x="200" y="108" text-anchor="middle" font-size="10" fill="#111827">DeepMind +</text>
  <text x="200" y="121" text-anchor="middle" font-size="10" fill="#6b7280">EPFL plasma</text>
  <text x="320" y="108" text-anchor="middle" font-size="10" fill="#111827">AlphaFold DB</text>
  <text x="320" y="121" text-anchor="middle" font-size="10" fill="#6b7280">200M proteins</text>
  <text x="450" y="108" text-anchor="middle" font-size="10" fill="#111827">GNoME</text>
  <text x="450" y="121" text-anchor="middle" font-size="10" fill="#6b7280">2.2M crystals</text>
  <text x="580" y="108" text-anchor="middle" font-size="10" fill="#111827">AlphaProof</text>
  <text x="580" y="121" text-anchor="middle" font-size="10" fill="#6b7280">IMO problems</text>
</svg>
<figcaption style="font-size:0.8em;color:#6b7280;margin-top:0.5em;text-align:center">Figure 2 — A timeline of AI scientific milestones, 2020–2024. The pace has accelerated: each year has produced at least one result considered impossible or decades away by the prior scientific consensus.</figcaption>
</figure>

Fusion energy — the technology that has been thirty years away for seventy years — may finally be closing that gap, partly through machine learning. In 2022, DeepMind collaborated with EPFL's Swiss Plasma Centre to train a reinforcement learning agent to control the magnetic configuration of plasma inside a tokamak reactor. The agent learned to shape and sustain plasma configurations that human controllers had never achieved, holding them stable for longer than any previous automated system. Maintaining plasma stability is the central engineering challenge of tokamak-based fusion; AI control systems represent a genuine breakthrough in that effort.

In observational physics, AI is transforming gravitational wave astronomy. The LIGO and Virgo detectors generate data at rates that make manual analysis impossible. Deep learning classifiers trained on simulated waveforms now identify merger events in real time, filter noise from instrumental artefacts, and have enabled the cataloguing of hundreds of binary merger events that classical matched-filter methods would have missed or misclassified.

## The Reliability Problem

None of this progress comes without a serious caveat. Large language models and generative AI systems applied to science have a well-documented tendency to produce plausible-sounding but incorrect results — to hallucinate citations, fabricate chemical properties, and confabulate experimental outcomes. In a scientific context, this failure mode is not merely embarrassing; it is dangerous.

The field is responding with hybrid architectures that separate the generative component from the verification component. FunSearch's evaluator, AlphaProof's formal checker, and autonomous laboratory systems that physically verify AI-predicted compounds all impose hard correctness constraints on outputs before they enter the scientific record. The principle is the same in each case: use AI to generate candidates at scale, and let classical or experimental verification provide the ground truth.

This combination — AI as hypothesis generator, rigorous methods as verification — is the emerging paradigm of computational science. It does not replace the scientific method. It accelerates it.

## What This Means for Science

The picture that is emerging is not one where AI replaces scientists. It is one where the allocation of scientific effort shifts. The laborious, high-dimensional search tasks — which protein structure to solve next, which compound to synthesise, which material to test — are increasingly delegated to machine learning systems that can evaluate millions of options where humans can evaluate dozens. Scientists are freed to do what AI cannot: form new theoretical frameworks, identify what questions to ask, and make the judgment calls that determine whether a result is interesting.

That shift is already underway. Its full implications — for how science is funded, how it is published, and what counts as a scientific contribution — are still being negotiated. What is no longer negotiable is whether the shift is happening. It is.
