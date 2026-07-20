export type GlossaryTerm = { term: string; definition: string; related?: string[] };

export const terms: GlossaryTerm[] = [
	// A
	{ term: 'Algorithm (Quantum)', definition: 'A computational procedure designed to run on a quantum computer, exploiting superposition and interference to solve certain problems faster than any known classical algorithm.', related: ['Grover\'s Algorithm', 'Shor\'s Algorithm', 'QAOA'] },
	{ term: 'Ancilla Qubit', definition: 'An auxiliary qubit used to assist a quantum computation — for example, to detect errors or mediate gate operations — without being part of the final output.' },
	{ term: 'Attention Mechanism', definition: 'A component of neural networks that allows the model to weight the importance of different parts of the input when producing an output. The core of the Transformer architecture.', related: ['Transformer'] },

	// B
	{ term: 'Bloch Sphere', definition: 'A unit sphere used to geometrically represent the state of a single qubit. Points on the surface correspond to pure states; the north pole is |0⟩, the south pole is |1⟩.' },

	// C
	{ term: 'Coherence', definition: 'The property of a quantum system maintaining a stable phase relationship between its quantum states. Coherence is required for quantum interference and is destroyed by decoherence.', related: ['Decoherence', 'T2 Time'] },
	{ term: 'CNOT Gate', definition: 'Controlled-NOT gate. A two-qubit gate that flips the target qubit if and only if the control qubit is |1⟩. Fundamental for creating entanglement.', related: ['Entanglement', 'Quantum Gate'] },

	// D
	{ term: 'Decoherence', definition: 'The process by which a quantum system loses its quantum properties through unwanted interaction with its environment, causing quantum superpositions to collapse into classical states.', related: ['Coherence', 'T1 Time', 'T2 Time'] },
	{ term: 'Deep Learning', definition: 'A class of machine learning using neural networks with many layers (deep architectures) to learn hierarchical data representations. Powers modern image recognition, language models, and more.', related: ['Neural Network', 'Transformer'] },

	// E
	{ term: 'Embedding', definition: 'A learned mapping from discrete objects — such as words or tokens — into a continuous high-dimensional vector space, where similar items are placed near each other.', related: ['Vector Database', 'Transformer'] },
	{ term: 'Entanglement (Quantum)', definition: 'A quantum phenomenon where two or more qubits become correlated such that measuring one instantly determines the state of the other, regardless of distance. A key resource for quantum computing and cryptography.', related: ['Bell State', 'Quantum Teleportation'] },
	{ term: 'Error Correction (Quantum)', definition: 'Techniques that protect quantum information from decoherence and gate errors by encoding logical qubits redundantly across multiple physical qubits, detecting and correcting errors without collapsing the state.', related: ['Logical Qubit', 'Physical Qubit', 'Surface Code'] },

	// F
	{ term: 'Fidelity', definition: 'A measure from 0 to 1 of how closely a quantum state or operation matches an ideal target. A fidelity of 1 means perfect agreement; 0 means completely orthogonal.' },
	{ term: 'Fine-tuning', definition: 'The process of continuing to train a pre-trained model on task-specific data to adapt its behaviour for a particular application, using a much smaller dataset than the original pre-training.', related: ['Foundation Model', 'Transfer Learning'] },
	{ term: 'Foundation Model', definition: 'A large AI model trained on broad, general data (text, images, code) at scale, designed to be adapted for many downstream tasks via fine-tuning or prompting.', related: ['Large Language Model', 'Fine-tuning'] },

	// G
	{ term: 'Generative AI', definition: 'AI systems capable of producing new content — text, images, audio, code — by learning the statistical patterns of their training data. Powered by models such as diffusion models and LLMs.', related: ['Large Language Model', 'Foundation Model'] },
	{ term: 'Gradient Descent', definition: 'An iterative optimization algorithm that updates model parameters in the direction of the steepest decrease in a loss function. The backbone of neural network training.', related: ['Deep Learning'] },
	{ term: 'Grover\'s Algorithm', definition: 'A quantum search algorithm that finds a marked item in an unsorted list of N items in O(√N) steps — a quadratic speedup over classical brute-force search.', related: ['Quantum Speedup', 'Oracle'] },

	// H
	{ term: 'Hadamard Gate', definition: 'A single-qubit quantum gate that maps |0⟩ to an equal superposition of |0⟩ and |1⟩, and vice versa. Used to initialize qubits into superposition at the start of quantum algorithms.', related: ['Superposition', 'Quantum Gate'] },
	{ term: 'Hallucination', definition: 'The tendency of a large language model to generate text that is plausible-sounding but factually incorrect or entirely fabricated, without any explicit indication that it is doing so.', related: ['Large Language Model', 'RAG'] },
	{ term: 'Hamiltonian', definition: 'The operator in quantum mechanics corresponding to the total energy of a system. Simulating a molecule\'s Hamiltonian on a quantum computer is one of the most promising near-term applications.', related: ['VQE', 'Quantum Simulation'] },
	{ term: 'Hybrid Quantum-Classical Computing', definition: 'A computational paradigm that uses quantum processors for tasks that benefit from quantum parallelism, while classical processors handle control logic, optimization, and the rest of the computation.', related: ['VQE', 'QAOA', 'NISQ'] },

	// I
	{ term: 'Interference (Quantum)', definition: 'A quantum effect where probability amplitudes add constructively or destructively. Quantum algorithms are designed so correct answers interfere constructively and wrong answers cancel out.', related: ['Superposition', 'Quantum Algorithm'] },

	// L
	{ term: 'Large Language Model (LLM)', definition: 'A neural network with billions of parameters trained on massive text corpora to predict and generate language. Forms the backbone of modern AI assistants and coding tools.', related: ['Transformer', 'Foundation Model', 'Hallucination'] },
	{ term: 'Logical Qubit', definition: 'A fault-tolerant qubit encoded across many physical qubits using quantum error correction, intended to be robust enough for practical quantum computation.', related: ['Physical Qubit', 'Error Correction (Quantum)'] },

	// M
	{ term: 'Measurement', definition: 'The act of observing a quantum system, which irreversibly collapses it from a superposition into one definite classical outcome with a probability determined by the quantum state.', related: ['Superposition', 'Wave Function Collapse'] },

	// N
	{ term: 'Neural Network', definition: 'A machine learning model loosely inspired by biological neurons, composed of layers of parameterized linear transformations and nonlinear activations, trained by gradient descent.', related: ['Deep Learning', 'Transformer'] },
	{ term: 'NISQ', definition: 'Noisy Intermediate-Scale Quantum. The current era of quantum hardware, characterized by devices with 50–1000 qubits that are too noisy for full error correction but large enough for some practical experiments.', related: ['Decoherence', 'Quantum Volume', 'Hybrid Quantum-Classical Computing'] },
	{ term: 'No-Cloning Theorem', definition: 'A fundamental result in quantum information theory: it is impossible to create an identical copy of an arbitrary unknown quantum state. This underpins the security of quantum cryptography.', related: ['Quantum Key Distribution'] },

	// O
	{ term: 'Oracle', definition: 'A black-box subroutine in a quantum algorithm that encodes information about the problem being solved, typically by flipping the phase of marked states. Used in Grover\'s and other algorithms.', related: ['Grover\'s Algorithm'] },

	// P
	{ term: 'Physical Qubit', definition: 'An actual quantum mechanical system — such as a superconducting circuit, trapped ion, or photon — used to realize a qubit in hardware.', related: ['Logical Qubit', 'NISQ'] },
	{ term: 'Prompt Engineering', definition: 'The practice of crafting and structuring input prompts to guide a large language model toward producing desired outputs, without changing the model\'s weights.', related: ['Large Language Model', 'Fine-tuning'] },

	// Q
	{ term: 'QAOA', definition: 'Quantum Approximate Optimization Algorithm. A variational hybrid algorithm designed to find approximate solutions to combinatorial optimization problems using a parameterized quantum circuit.', related: ['Hybrid Quantum-Classical Computing', 'VQE'] },
	{ term: 'QML (Quantum Machine Learning)', definition: 'A research field exploring how quantum computers can accelerate or enhance machine learning tasks, including training, inference, and data representation.', related: ['Quantum Neural Network', 'Hybrid Quantum-Classical Computing'] },
	{ term: 'Quantum Advantage', definition: 'The point at which a quantum computer performs a task significantly faster, cheaper, or more accurately than the best available classical algorithm. A central goal of quantum computing research.', related: ['Shor\'s Algorithm', 'Grover\'s Algorithm', 'Quantum Speedup'] },
	{ term: 'Quantum Circuit', definition: 'A model of quantum computation represented as a sequence of quantum gates applied to a set of qubits, analogous to a classical digital circuit.', related: ['Quantum Gate', 'Qubit'] },
	{ term: 'Quantum Gate', definition: 'The quantum analogue of a classical logic gate — a reversible, unitary operation applied to one or more qubits to transform their state.', related: ['CNOT Gate', 'Hadamard Gate', 'Unitary Operation'] },
	{ term: 'Quantum Key Distribution (QKD)', definition: 'A cryptographic protocol that uses quantum mechanics to securely distribute encryption keys between two parties, with security guaranteed by the laws of physics rather than computational hardness.', related: ['No-Cloning Theorem', 'Entanglement (Quantum)'] },
	{ term: 'Quantum Neural Network (QNN)', definition: 'A machine learning model using parameterized quantum circuits as trainable layers, analogous to layers in a classical neural network.', related: ['QML (Quantum Machine Learning)', 'Variational Quantum Circuit'] },
	{ term: 'Quantum Simulation', definition: 'Using a quantum computer to model and study quantum systems — such as molecules or materials — that are intractable to simulate classically. One of the most promising near-term applications.', related: ['Hamiltonian', 'VQE'] },
	{ term: 'Quantum Speedup', definition: 'The computational advantage a quantum algorithm offers over the best known classical algorithm for the same problem, often expressed as a reduction in time or query complexity.', related: ['Quantum Advantage', 'Grover\'s Algorithm', 'Shor\'s Algorithm'] },
	{ term: 'Quantum Teleportation', definition: 'A protocol that transfers an arbitrary quantum state from one location to another using a pair of entangled qubits and two classical bits of communication. No physical matter is transported.', related: ['Entanglement (Quantum)'] },
	{ term: 'Quantum Volume', definition: 'A hardware-agnostic benchmark metric developed by IBM that quantifies the overall capability of a quantum computer, accounting for qubit count, connectivity, gate fidelity, and error rates.', related: ['NISQ', 'Physical Qubit'] },
	{ term: 'Qubit', definition: 'The fundamental unit of quantum information. Unlike a classical bit (0 or 1), a qubit can exist in a superposition of |0⟩ and |1⟩ simultaneously, enabling quantum parallelism.', related: ['Superposition', 'Bloch Sphere', 'Physical Qubit', 'Logical Qubit'] },

	// R
	{ term: 'RAG (Retrieval-Augmented Generation)', definition: 'An AI technique that grounds a language model\'s responses by retrieving relevant documents from an external knowledge base at inference time, reducing hallucination.', related: ['Large Language Model', 'Vector Database', 'Hallucination'] },
	{ term: 'Reinforcement Learning', definition: 'A machine learning paradigm where an agent learns to make sequential decisions by receiving scalar rewards or penalties from an environment, optimizing for long-term cumulative reward.', related: ['Deep Learning'] },

	// S
	{ term: 'Shor\'s Algorithm', definition: 'A quantum algorithm for factoring integers in polynomial time, exponentially faster than the best known classical algorithms. Its practicality would break RSA and other widely used cryptographic systems.', related: ['Quantum Advantage', 'Quantum Key Distribution'] },
	{ term: 'Superposition', definition: 'The quantum mechanical principle that a quantum system can exist in a combination of multiple states simultaneously. When measured, it collapses to a single definite outcome with probabilities given by the amplitudes.', related: ['Qubit', 'Measurement', 'Interference (Quantum)'] },
	{ term: 'Surface Code', definition: 'A leading quantum error correction code that encodes logical qubits on a 2D lattice of physical qubits, detecting errors by measuring neighboring stabilizer operators without disturbing the encoded information.', related: ['Error Correction (Quantum)', 'Logical Qubit'] },

	// T
	{ term: 'T1 Time', definition: 'The longitudinal relaxation time of a qubit — how long it takes for an excited |1⟩ state to spontaneously decay to the ground |0⟩ state. A key figure of merit for quantum hardware.', related: ['T2 Time', 'Decoherence'] },
	{ term: 'T2 Time', definition: 'The transverse relaxation (dephasing) time of a qubit — how long a qubit maintains phase coherence. T2 ≤ 2T1 always, and longer T2 means more useful quantum computation time.', related: ['T1 Time', 'Coherence', 'Decoherence'] },
	{ term: 'Transfer Learning', definition: 'A machine learning technique where a model pre-trained on one task is reused as the starting point for training on a different but related task, reducing the need for labelled data.', related: ['Fine-tuning', 'Foundation Model'] },
	{ term: 'Transformer', definition: 'A neural network architecture introduced in "Attention Is All You Need" (2017) that relies entirely on self-attention mechanisms. The dominant architecture for large language models and many vision models.', related: ['Attention Mechanism', 'Large Language Model'] },

	// U
	{ term: 'Unitary Operation', definition: 'A linear transformation on a quantum state that preserves the total probability (norm). All quantum gates are unitary, making quantum computation inherently reversible.', related: ['Quantum Gate'] },

	// V
	{ term: 'VQE (Variational Quantum Eigensolver)', definition: 'A hybrid quantum-classical algorithm that uses a parameterized quantum circuit to approximate the ground-state energy of a Hamiltonian, with classical optimization updating the circuit parameters.', related: ['Hamiltonian', 'Hybrid Quantum-Classical Computing', 'QAOA'] },
	{ term: 'Vector Database', definition: 'A database system specialized for storing, indexing, and querying high-dimensional vector embeddings. Widely used in RAG pipelines and semantic search.', related: ['Embedding', 'RAG (Retrieval-Augmented Generation)'] },

	// W
	{ term: 'Wave Function', definition: 'A mathematical object describing the complete quantum state of a system. Its squared magnitude gives the probability distribution of measurement outcomes.', related: ['Superposition', 'Wave Function Collapse'] },
	{ term: 'Wave Function Collapse', definition: 'The sudden, irreversible transition of a quantum system from a superposition of states to a single definite state upon measurement.', related: ['Measurement', 'Superposition'] },
];
