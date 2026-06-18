I own a [GeForce RTX 5090 Windforce GPU](https://www.gigabyte.com/Graphics-Card/GV-N5090WF3OC-32GD). It has 32GB of GDDR7 VRAM, 21760 CUDA cores, and a 28 Gbps clock speed.

# Overview
This article will document how I benchmark different model types on a single RTX 5090.

# LLMs
I use LLMs like the rest of the world's population, only mine run inference in a box next to my desk. It's befuddling to think I am pulling order out of the space 3 feet away from me and inserting it into the space beneath my keyboard.

For these LLM benchmarks, I am interested in the following metrics:
- [[Time to First Token]] (TTFT): Represents general latency and how fast the model feels. This value is typically dominated by the [[Prefill phase]].
- [[Time per Output Token]] (TPOT): Average time between subsequent output tokens. Dominated by the [[Decode phase]]. Represents streaming speed.
- [[Inter-Token Latency]] (ITL): A per-interval metric measuring the time between output tokens. Used to spot jitter that can make audio apps stutter.
- Output token throughput: The total amount of work the box can do at once. Improved by batching up until a certain threshold.

I will measure all of these metrics with the [vLLM Benchmark CLI](https://docs.vllm.ai/en/latest/benchmarking/cli/). Models will be served on a single RTX 5090 GPU using the following command:

```bash
vllm bench serve \
  --backend vllm \
  --model qwen/qwen3-4B-Instruct-2507 \
  --dataset-name sharegpt \
  --dataset-path ./ShareGPT_V3_unfiltered_cleaned_split.json \
  --num-prompts 1000 \
  --request-rate inf
```

### Gemma 4 31B

> [!note] `CUDA_VISIBLE_DEVICES` tells vLLM which GPU(s) it has access to. These start at index 0 and you can pass multiple IDs in the list like `CUDA_VISIBLE_DEVICES=0,2`
> By default vLLM sees all GPUs.

```bash
CUDA_VISIBLE_DEVICES=0 uv run vllm serve LilaRest/gemma-4-31B-it-NVFP4-turbo
```

```bash
CUDA_VISIBLE_DEVICES=0 uv run vllm bench serve \
  --backend vllm \
  --port 9001 \
  --model LilaRest/gemma-4-31B-it-NVFP4-turbo \
  --endpoint /v1/completions \
  --dataset-name sharegpt \
  --dataset-path benchmarks/data/ShareGPT_V3_unfiltered_cleaned_split.json \
  --num-prompts 10
```

# Agents


# FIM Autocomplete Models

# Embedding Models

# STT Models

## Cards

START
Basic

Back: 
Tags: 
END