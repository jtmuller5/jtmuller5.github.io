---
title: "Qwen3-30B-A3B-Instruct-2507-FP8 "
date: 2025-12-06
draft: true
tags:
  - local-ai
---

https://huggingface.co/Qwen/Qwen3-30B-A3B-Instruct-2507-FP8

| Quantization Value (Data Type) | Bits per Parameter | Bytes per Parameter | GB Multiplier (per Billion Parameters) | Approximate Size for 70B Model (GB) |
|-------------------------------|--------------------|---------------------|---------------------------------------|------------------------------------|
| FP32                          | 32                 | 4.0 bytes           | 3.7253                                | 260.77 GB                          |
| FP16/BF16                     | 16                 | 2.0 bytes           | 1.8626                                | 130.39 GB                          |
| 8-bit (INT8)                  | 8                  | 1.0 byte            | 0.9313                                | 65.19 GB                           |
| 4-bit (INT4 / QK4)            | 4                  | 0.5 bytes           | 0.4657                                | 32.60 GB                           |
| 3-bit (INT3 / QK3)            | 3                  | 0.375 bytes         | 0.3492                                | 24.45 GB                           |
| 2-bit (INT2 / QK2)            | 2                  | 0.25 bytes          | 0.2328                                | 16.30 GB                           |


Benchmark command:
```bash
vllm bench serve \
  --backend vllm \
  --model Qwen/Qwen3-4B-Instruct-2507 \
  --endpoint /v1/completions \
  --dataset-name sharegpt \
  --dataset-path ./ShareGPT_V3_unfiltered_cleaned_split.json \
  --num-prompts 10
```

## ShareGPT Benchmark Results

### Qwen3-4B-Instruct-2507 (1 5090)

```bash
vllm serve Qwen/Qwen3-4B-Instruct-2507 --max_model_len 16384
```

```
============ Serving Benchmark Result ============
Successful requests:                     10        
Failed requests:                         0         
Benchmark duration (s):                  5.41      
Total input tokens:                      1374      
Total generated tokens:                  2663      
Request throughput (req/s):              1.85      
Output token throughput (tok/s):         492.61    
Peak output token throughput (tok/s):    952.00    
Peak concurrent requests:                10.00     
Total Token throughput (tok/s):          746.77    
---------------Time to First Token----------------
Mean TTFT (ms):                          58.45     
Median TTFT (ms):                        75.70     
P99 TTFT (ms):                           76.15     
-----Time per Output Token (excl. 1st token)------
Mean TPOT (ms):                          7.42      
Median TPOT (ms):                        7.51      
P99 TPOT (ms):                           7.90      
---------------Inter-token Latency----------------
Mean ITL (ms):                           7.17      
Median ITL (ms):                         7.04      
P99 ITL (ms):                            7.82      
==================================================
```

### Qwen3-4B-Instruct-2507 (2 5090s)

```bash
vllm serve Qwen/Qwen3-4B-Instruct-2507 --max_model_len 16384 --tensor-parallel-size 2
```

```
============ Serving Benchmark Result ============
Successful requests:                     10        
Failed requests:                         0         
Benchmark duration (s):                  4.55      
Total input tokens:                      1374      
Total generated tokens:                  2663      
Request throughput (req/s):              2.20      
Output token throughput (tok/s):         585.32    
Peak output token throughput (tok/s):    1081.00   
Peak concurrent requests:                10.00     
Total Token throughput (tok/s):          887.33    
---------------Time to First Token----------------
Mean TTFT (ms):                          74.63     
Median TTFT (ms):                        88.91     
P99 TTFT (ms):                           89.43     
-----Time per Output Token (excl. 1st token)------
Mean TPOT (ms):                          6.20      
Median TPOT (ms):                        6.12      
P99 TPOT (ms):                           6.70      
---------------Inter-token Latency----------------
Mean ITL (ms):                           5.97      
Median ITL (ms):                         5.86      
P99 ITL (ms):                            6.70      
==================================================
```

### Qwen3-4B-Instruct-2507 (2 5090s) with Eagle Spec Decoding

```bash
VLLM_USE_V1=1 vllm serve Qwen/Qwen3-4B-Instruct-2507 --max_model_len 16384 --tensor-parallel-size 2 --speculative-config '{ "method": "eagle3", "model": "taobao-mnn/Qwen3-4B-Instruct-2507-Eagle3", "num_speculative_tokens": 4}' --gpu-memory-utilization 0.85
```

```
============ Serving Benchmark Result ============
Successful requests:                     10        
Failed requests:                         0         
Benchmark duration (s):                  4.18      
Total input tokens:                      1374      
Total generated tokens:                  2663      
Request throughput (req/s):              2.39      
Output token throughput (tok/s):         637.42    
Peak output token throughput (tok/s):    506.00    
Peak concurrent requests:                10.00     
Total Token throughput (tok/s):          966.30    
---------------Time to First Token----------------
Mean TTFT (ms):                          275.39    
Median TTFT (ms):                        304.31    
P99 TTFT (ms):                           305.01    
-----Time per Output Token (excl. 1st token)------
Mean TPOT (ms):                          6.32      
Median TPOT (ms):                        6.15      
P99 TPOT (ms):                           9.16      
---------------Inter-token Latency----------------
Mean ITL (ms):                           9.42      
Median ITL (ms):                         8.64      
P99 ITL (ms):                            11.91     
==================================================
```

### Qwen3-4B-Instruct-2507-FP8

```bash
vllm serve Qwen/Qwen3-4B-Instruct-2507-FP8 --quantization fp8 --max_model_len 16384
```

Prefix-caching disabled:
```
============ Serving Benchmark Result ============
Successful requests:                     10        
Failed requests:                         0         
Benchmark duration (s):                  8.41      
Total input tokens:                      1374      
Total generated tokens:                  2663      
Request throughput (req/s):              1.19      
Output token throughput (tok/s):         316.64    
Peak output token throughput (tok/s):    727.00    
Peak concurrent requests:                10.00     
Total Token throughput (tok/s):          480.01    
---------------Time to First Token----------------
Mean TTFT (ms):                          48.69     
Median TTFT (ms):                        52.15     
P99 TTFT (ms):                           52.72     
-----Time per Output Token (excl. 1st token)------
Mean TPOT (ms):                          10.89     
Median TPOT (ms):                        10.86     
P99 TPOT (ms):                           11.05     
---------------Inter-token Latency----------------
Mean ITL (ms):                           10.87     
Median ITL (ms):                         10.86     
P99 ITL (ms):                            11.16     
==================================================
```

Prefix-caching enabled:
```
============ Serving Benchmark Result ============
Successful requests:                     10        
Failed requests:                         0         
Benchmark duration (s):                  8.41      
Total input tokens:                      1374      
Total generated tokens:                  2663      
Request throughput (req/s):              1.19      
Output token throughput (tok/s):         316.76    
Peak output token throughput (tok/s):    727.00    
Peak concurrent requests:                10.00     
Total Token throughput (tok/s):          480.19    
---------------Time to First Token----------------
Mean TTFT (ms):                          48.30     
Median TTFT (ms):                        51.51     
P99 TTFT (ms):                           52.47     
-----Time per Output Token (excl. 1st token)------
Mean TPOT (ms):                          10.87     
Median TPOT (ms):                        10.85     
P99 TPOT (ms):                           11.03     
---------------Inter-token Latency----------------
Mean ITL (ms):                           10.86     
Median ITL (ms):                         10.85     
P99 ITL (ms):                            11.17     
==================================================
```

### Qwen3-30B-A3B-Instruct-2507

```bash
vllm serve Qwen/Qwen3-30B-A3B-Instruct-2507 --max_model_len 16384 --enable-prefix-caching --tensor-parallel-size 2
```
```
============ Serving Benchmark Result ============
Successful requests:                     10        
Failed requests:                         0         
Benchmark duration (s):                  7.81      
Total input tokens:                      1374      
Total generated tokens:                  2663      
Request throughput (req/s):              1.28      
Output token throughput (tok/s):         340.93    
Peak output token throughput (tok/s):    666.00    
Peak concurrent requests:                10.00     
Total Token throughput (tok/s):          516.83    
---------------Time to First Token----------------
Mean TTFT (ms):                          531.66    
Median TTFT (ms):                        588.49    
P99 TTFT (ms):                           589.31    
-----Time per Output Token (excl. 1st token)------
Mean TPOT (ms):                          11.50     
Median TPOT (ms):                        11.02     
P99 TPOT (ms):                           15.58     
---------------Inter-token Latency----------------
Mean ITL (ms):                           10.19     
Median ITL (ms):                         9.60      
P99 ITL (ms):                            13.40     
==================================================
```

## Long Document QA Benchmark Results

The long document QA benchmark script can be found [here](https://github.com/vllm-project/vllm/blob/main/benchmarks/benchmark_long_document_qa_throughput.py).

### Qwen3-4B-Instruct-2507

```bash
python3 benchmarks/benchmark_long_document_qa_throughput.py \
  --model Qwen/Qwen3-4B-Instruct-2507 \
  --enable-prefix-caching \
  --gpu-memory-utilization 0.8 \
  --max-model-len 16384 \
  --num-documents 16 \
  --document-length 1000 \
  --output-len 50 \
  --repeat-count 5
```
vllm serve Qwen/Qwen3-30B-A3B-Instruct-2507 --enable-prefix-caching --tensor-parallel-size 2 --gpu-memory-utilization 0.9

```
------warm up------
Adding requests: 100%|█████████████████████████████████████| 16/16 [00:00<00:00, 780.28it/s]
Processed prompts: 100%|█| 16/16 [00:01<00:00, 14.87it/s, est. speed input: 14979.50 toks/s,
Time to execute all requests: 1.0975 secs
------start generating------
Adding requests: 100%|████████████████████████████████████| 80/80 [00:00<00:00, 1127.35it/s]
Processed prompts: 100%|█| 80/80 [00:01<00:00, 62.66it/s, est. speed input: 62747.46 toks/s,
Time to execute all requests: 1.3484 secs
```

## Experiments

```bash
vllm serve Qwen/Qwen3-30B-A3B-Instruct-2507-FP8 --tensor-parallel-size 2 --quantization fp8 --gpu-memory-utilization 0.85 --max-num-seqs 256 --max-model-len 8192 --enable-chunked-prefill
```

https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507

```bash
vllm serve Qwen/Qwen3-4B-Instruct-2507 --tensor-parallel-size 2 --enable-chunked-prefill
```

https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507-FP8

```bash
vllm serve Qwen/Qwen3-4B-Instruct-2507-FP8 --tensor-parallel-size 2 --quantization fp8 --enable-chunked-prefill
```

## Limitations
```
"This model's maximum context length is 4096 tokens. However, your request has 4100 input tokens. Please reduce the length of the input messages. None"
```

## Voice Agent

### Qwen3-4B-Instruct-2507

This model is surprisingly faster than the FP8 version.

```bash
uv run vllm serve Qwen/Qwen3-4B-Instruct-2507 \
  --dtype auto \
  --gpu-memory-utilization 0.9 \
  --max-model-len 16384 \
  --enable-prefix-caching \
  --port 8000
```  

```
Avg prompt throughput: 241.0 tokens/s, Avg generation throughput: 26.6 tokens/s, Running: 0 reqs, Waiting: 0 reqs, GPU KV cache usage: 0.0%, Prefix cache hit rate: 72.9%
```


## Next Build

```
local, 10x3090:

EDIT: ok here is my setup, I have 3 nodes of 4x3090 each, motherboard are old x99/xeons with 128gb ram each.

I run it using VLLM mutil-node setup (ray) and connect them via 1GB ethernet. Its fast enough. You only need to use "Pipeline Parallel" because tensor parallel needs more than 1gbps links.

That's it. I could go 4 nodes for deepseek but 3 nodes is enough for now.
```