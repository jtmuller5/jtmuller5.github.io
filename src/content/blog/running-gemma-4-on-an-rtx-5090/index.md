---
title: Running Gemma 4 on an RTX 5090
description: Running Gemma 4 on an RTX 5090 GPU
date: 2026-05-05
draft: true
---
On April 2, 2026, Google announced [Gemma 4](https://deepmind.google/models/gemma/gemma-4/), their latest round of open source models built for local inference and agentic tasks. All models released in the group pack a punch for their size but the 31B IT model is the one [most](https://www.reddit.com/r/LocalLLaMA/comments/1sg8r4l/gemma_4_seems_to_work_best_with_high_temperature/) [people](https://www.reddit.com/r/LocalLLaMA/comments/1scucfg/gemma_4_26b_is_the_perfect_all_around_local_model/) are chatting about, with some claiming that it [rivals Claude 3.5 Sonnet](https://www.reddit.com/r/singularity/comments/1salsf5/comment/odwr00n/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button).

On May 5, 2026, Google announced a set of [Multi-Token Prediction (MTP) draft models](https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/) for Gemma 4 to make it 3x faster. Minutes later, z-lab.ai announced a [speculative DFlash block diffusion model](https://x.com/zhijianliu_/status/2051900751673467097)  that was 6x faster than the official Google model.

This article shows 

### Server

Inference provider: [vLLM](https://docs.vllm.ai/en/latest/)
Base Model: [LilaRest/gemma-4-31B-it-NVFP4-turbo](https://huggingface.co/LilaRest/gemma-4-31B-it-NVFP4-turbo)
Draft Model: [z-lab/gemma-4-31B-it-DFlash](https://huggingface.co/z-lab/gemma-4-31B-it-DFlash)

```bash
vllm serve "LilaRest/gemma-4-31B-it-NVFP4-turbo" \
    --host 0.0.0.0 --port 8090 \
    --served-model-name gemma-4-31b \
    --max-model-len 12288 \
    --kv-cache-dtype fp8 \
    --gpu-memory-utilization $mem \
    --tensor-parallel-size $tp \
    --language-model-only \
    --speculative-config "{\"method\":\"dflash\",\"model\":\"z-lab/gemma-4-31B-it-DFlash\",\"num_speculative_tokens\":15,\"attention_backend\":\"flash_attn\"}" \
    --attention-backend triton_attn \
    --max-num-batched-tokens 8192 \
    --trust-remote-code \
    --enforce-eager \
    --max-num-seqs 4 \
    --async-scheduling \
    --enable-auto-tool-choice \
    --tool-call-parser functiongemma
```

### Client
