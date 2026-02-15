import React, { useState } from "react";

export default function CopyAsMarkdown({
  title,
  content,
}: {
  title: string;
  content?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy content: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!content}
      style={{
        padding: "6px 12px",
        fontSize: "14px",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        backgroundColor: copied ? "#4CAF50" : "var(--tag-bg)",
        color: copied ? "white" : "var(--text-secondary)",
        cursor: content ? "pointer" : "not-allowed",
        opacity: content ? 1 : 0.5,
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "Copied!" : "Copy as Markdown"}
    </button>
  );
}
