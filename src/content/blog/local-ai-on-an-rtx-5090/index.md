---
title: "Local AI on an RTX 5090"
description: "Running local AI inference on an RTX 5090 GPU rig. Used for LLM chats and coding autocompletions."
date: 2026-05-05
draft: true
---

To use the local models on the client, install the [Continue.dev VS Code extension](https://docs.continue.dev/ide-extensions/install). This extension lets you configure [chat, autocomplete, edit, and embed models](https://docs.continue.dev/customize/model-roles/00-intro) in VS code.
## Autocomplete

> [!note] General Guidance
> Proper autocomplete requires an FIM (fill in the middle) model that knows when to stop and is not prone to having conversations.
> 
> Typically you will look for smaller models. 4-7B offers an ideal blend of accuracy and speed. 1-3B models are faster (<50ms TTFT) but their quality is generally mediocre. 

### Server


### Client

To use the autocomplete model on the client, you can install the [Continue.dev VS Code extension](https://docs.continue.dev/ide-extensions/install).

Then, configure the autocomplete model in `~/.continue/config.yaml`:

```yaml
name: chonky
version: 0.0.1
schema: v1

models:
  - name: Mellum (autocomplete)
    provider: openai
    model: JetBrains/Mellum-4b-base
    apiBase: http://100.77.220.87:8005/v1
    apiKey: dummy
    roles:
      - autocomplete
    autocompleteOptions:
      multilineCompletions: "auto"
      maxPromptTokens: 512
      debounceDelay: 100
      modelTimeout: 2000
      prefixPercentage: 0.65
      maxSuffixPercentage: 0.25
      onlyMyCode: true
      template: "<fim_suffix>{{{suffix}}}<fim_prefix>{{{prefix}}}<fim_middle>"
    defaultCompletionOptions:
      contextLength: 4096
      maxTokens: 64
      stop:
        - "<fim_pad>"
        - "<|endoftext|>"
        - "<fim_prefix>"
        - "<fim_suffix>"
```


## Chat

> [!note] General Guidance
> 

- Model: [Qwen/Qwen2.5-Coder-7B-Instruct](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct)
- 

For general coding chat, you want a model that is designed for conversational interactions.

### Server

### Client


## Quantizations

### ✅ FP32
This is the highest accuracy format for a model but also the most prohibitive.

### ✅ FP16/BF16
Floating Point 16 is a smaller and faster version of FP32. Each number in the model is stored in 16 bits, meaning it takes up half as much space as FP32.

### ✅ FP8
FP8 is even faster and NVIDIA Blackwell chips have native FP8 tensor cores for running these.

### ✅ AWQ-Int4
Very fast, Marlin kernel. Ideal for sub-10B models.

### ✅ GPTQ-Int4
Not as fast as AWQ but still fast.

### ✅ bitsandbytes 4-bit
Will run but not fast. A universal format for running HF models.

### ✅ HQQ
Comparable to AWQ models but rarer.

### ⚠️ GGUF
Designed for llama.cpp. Medium fast

### ❌ MLX
These quantizations are designed specifically for Apple Silicon and will not run on NVIDIA.

### ❌ EXL2
ExLLamaV2. Not supported by vLLM.

### Size Table
Weight memory is approximately params x bits/8:

| Format              | Bits/param | 4B         | 7B         | 14B        | 27B       | 70B       |
| ------------------- | ---------- | ---------- | ---------- | ---------- | --------- | --------- |
| FP32                | 32         | 16 GB      | 28 GB      | 56 GB      | 108 GB    | 280 GB    |
| **FP16 / BF16**         | **16**         | **8 GB**       | **14 GB**      | **28 GB**      | **54 GB**     | **140 GB**    |
| **FP8 / INT8**          | **8**          | **4 GB**       | **7 GB**       | **14 GB**      | **27 GB**     | **70 GB**     |
| GGUF Q8_0           | ~8.5       | 4.3 GB     | 7.5 GB     | 15 GB      | 29 GB     | 74 GB     |
| GGUF Q6_K           | ~6.6       | 3.3 GB     | 5.8 GB     | 11.5 GB    | 22 GB     | 58 GB     |
| **GGUF Q5_K_M**     | **~5.7**   | **2.9 GB** | **5.0 GB** | **10 GB**  | **19 GB** | **50 GB** |
| **GGUF Q4_K_M**     | **~4.8**   | **2.4 GB** | **4.2 GB** | **8.5 GB** | **16 GB** | **42 GB** |
| **AWQ / GPTQ Int4** | **~4.5**   | **2.3 GB** | **4.0 GB** | **8.0 GB** | **15 GB** | **40 GB** |
| bnb 4-bit           | ~4.5       | 2.3 GB     | 4.0 GB     | 8.0 GB     | 15 GB     | 40 GB     |
| GGUF Q3_K_M         | ~3.9       | 2.0 GB     | 3.4 GB     | 6.8 GB     | 13 GB     | 34 GB     |
| GGUF Q2_K           | ~2.6       | 1.3 GB     | 2.3 GB     | 4.5 GB     | 8.6 GB    | 22 GB     |