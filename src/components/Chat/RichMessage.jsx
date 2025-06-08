import React from "react";
import ReactMarkdown from "react-markdown";

export function RichMessage({ content }) {
  if (!content) return null;

  return (
    <div className="markdownContent" style={{ whiteSpace: "pre-wrap", lineHeight: "1.2em" }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
