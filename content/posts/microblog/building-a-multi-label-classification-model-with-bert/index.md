---
title: "Building a Multi-Label Classification Model with BERT"
date: 2025-03-07T10:00:00-05:00
draft: false
categories: ["microblog","machine learning", "NLP"]
tags: ["BERT", "multi-label classification", "transformers"]
---

Steps to create a multi-label classification model using BERT and the Hugging Face Transformers library:

1. **Load the Data**: Read the CSV file containing text snippets and their corresponding labels.
2. **Parse Labels**: Convert the comma-separated labels into a list format.
3. **Prepare Labels**: Use `MultiLabelBinarizer` to transform label lists into multi-hot vectors.
4. **Train/Test Split**: Split the data into training and validation sets.
5. **Tokenize Text**: Use a BERT tokenizer to preprocess the text snippets.
6. **Create Dataset**: Define a custom `Dataset` class for the tokenized data and labels.
7. **Load Model**: Initialize a BERT model for sequence classification with multi-label support.
8. **Training Arguments**: Set up training parameters such as batch size, learning rate, and number of epochs.
9. **Train the Model**: Use the Hugging Face `Trainer` to train the model.
10. **Save the Model**: Save the trained model and tokenizer for future use.

### Example Code

```python
import pandas as pd
import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer

# Load and preprocess data
df = pd.read_csv("data/calls_with_context_ALL_2025-03-07T01-09-11-931Z_labeled.csv")
df["labels"] = df["labels"].fillna("").apply(lambda x: [lbl.strip() for lbl in x.split(",") if lbl.strip() != ""])
all_labels = ["cancel appointment", "collect patient info", "collect medicaid info", "collect insurance info", "confirm appointment", "general question", "intro/outro", "question about patient's chart", "reschedule appointment", "running late", "schedule appointment", "taking a message"]
mlb = MultiLabelBinarizer(classes=all_labels)
label_matrix = mlb.fit_transform(df["labels"])

# Train/test split
train_df, val_df, train_labels, val_labels = train_test_split(df, label_matrix, test_size=0.1, random_state=42)

# Tokenize text
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
train_encodings = tokenizer(list(train_df["snippetText"]), truncation=True, padding=True, max_length=128)
val_encodings = tokenizer(list(val_df["snippetText"]), truncation=True, padding=True, max_length=128)

# Create dataset
class IntentDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels
    
    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item["labels"] = torch.tensor(self.labels[idx]).float()
        return item
    
    def __len__(self):
        return len(self.labels)

train_dataset = IntentDataset(train_encodings, train_labels)
val_dataset = IntentDataset(val_encodings, val_labels)

# Load model and set training arguments
model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=len(all_labels), problem_type="multi_label_classification")
training_args = TrainingArguments(output_dir="./multi_intent_model", evaluation_strategy="epoch", per_device_train_batch_size=8, per_device_eval_batch_size=8, num_train_epochs=4, learning_rate=2e-5, weight_decay=0.01, logging_steps=50, load_best_model_at_end=True, save_strategy="epoch")

# Train the model
trainer = Trainer(model=model, args=training_args, train_dataset=train_dataset, eval_dataset=val_dataset)
trainer.train()

# Save the model
trainer.save_model("./multi_intent_model")
tokenizer.save_pretrained("./multi_intent_model")

print("Training complete!")
```

> [!IMPORTANT]
> Ensure you have the necessary libraries installed: `transformers`, `torch`, `pandas`, `scikit-learn`.