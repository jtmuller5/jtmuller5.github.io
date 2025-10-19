import React, { Component, useState } from "react";

export default function CopyAsMarkdown({
  title,
  content,
  children,
}: {
  title: string;
  content?: string;
  children?: React.ReactNode;
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}
    >
      <h1 id={"_top"}>{title}</h1>
      <button
        onClick={handleCopy}
        disabled={!content}
        style={{
          padding: "6px 12px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: copied ? "#4CAF50" : "#f9f9f9",
          color: copied ? "white" : "#333",
          cursor: content ? "pointer" : "not-allowed",
          opacity: content ? 1 : 0.5,
          transition: "all 0.2s ease",
          alignItems: "center",
          display: "flex",
          gap: "6px",
        }}
      >
        {children && children}
        {copied ? "Copied!" : "Copy as Markdown"}
      </button>
    </div>
  );
}
