---
title: "Questions About Quantum Computing"
date: 2025-03-02T16:10:27-05:00
draft: true
categories: ["tutorial"]
tags: []
# hiddenInHomeList: true
---

> [!INFO]
> https://chatgpt.com/share/e/67c4ef97-94f8-8008-9426-8b69f528c37f

## What is a Qubit?

A quantum bit. A 1, a 0, or a superposition of these two computation basis states. Mathematically, a qubit is represented as:

```
|ψ⟩ = α|0⟩ + β|1⟩
```

Where α and β are complex numbers representing probability amplitudes constrained by:

```
|α|^2 + |β|^2 = 1 
```

Qubits can be entangled, meaning their states can become correlated in a way that classical bits cannot.

It turns out a qubit is not a specific thing but rather a quantum system that can exist in a superposition of states. Most anything can be used as a qubit.

## Can electrons be used as Qubits?

Yes, electrons have an intrinsic quantum property called spin that can be used as a qubit. The spin can be up or down. "Spin" in this case does not refer to literal rotation of the particle but is instead some other property like mass or charge. It is rather angular momentum that produces a magnetic moment in the particle.

## What is Spin exactly?

Spin is a fundamental quantum property of particles, like electrons, protons, and quarks. It is often compared to classical rotation, but it is not literal spinning—it’s an intrinsic property of quantum particles, much like mass or charge.

The spin of a particle is usually expressed in units of ℏ/2 (where ℏ = reduced Planck’s constant).

•	Electrons, protons, neutrons: Spin = 1/2
•	Photons (light particles): Spin = 1
•	Higgs boson: Spin = 0

Electrons obey the Pauli exclusion principle, meaning two electrons in the same atomic orbital must have opposite spins (one spin-up, one spin-down).

## If it is a measure of angular momentum, is it at all related to real motion or the potential for motion?

Spin is indeed a form of angular momentum, but it is intrinsic rather than arising from real motion in space. That said, while spin does not correspond to literal rotation, it does have measurable physical effects that can influence motion or energy states. Because spin acts like a tiny current loop (even though it isn’t literally moving), it generates a magnetic moment. This means a spinning electron behaves like a tiny magnet, which can interact with external fields and cause motion.

## If the spin creates a magnetic moment, how do we know around what axis the "tiny current loop" is acting?

The magnetic moment μ of a spinning electron is directly related to its spin vector S. The magnetic moment vector points along (or opposite to) the spin axis due to the gyromagnetic ratio.

```
μ = g (e/2m) S
```

## When you say its spin aligns along or against the field, does that mean it is parallel to the field?

