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
