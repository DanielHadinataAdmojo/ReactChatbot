import { useState, useEffect } from "react";
import styles from "./Controls.module.css";
import { LoadingBar } from "../LoadingBar";

const PROMPT_TEMPLATES = {
  none: "",
  summarize: "Summarize the following text:",
  explainLike5: "Explain like I'm 5 years old:",
  breakDownSimply: "Break it down simply:",
};

export function Controls({ onSend, loading, onToggleTheme, currentTheme, onClearChat }) {
  const [content, setContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("none");

  // Load saved unsent prompt content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("unsentPrompt");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  // Save content to localStorage on content change
  useEffect(() => {
    if (content.length > 0) {
      localStorage.setItem("unsentPrompt", content);
    } else {
      localStorage.removeItem("unsentPrompt");
    }
  }, [content]);

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleTemplateClick(templateKey) {
    setSelectedTemplate(templateKey);
  }

  function handleContentSend() {
    if (content.length > 0) {
      const templatePrefix = PROMPT_TEMPLATES[selectedTemplate];
      const prompt = templatePrefix ? `${templatePrefix} ${content}` : content;
      onSend(prompt);
      setContent("");
      setSelectedTemplate("none");
    }
  }

  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.VerticalButtonContainer}>
        {Object.entries(PROMPT_TEMPLATES).map(([key]) => (
          <button
            key={key}
            type="button"
            className={`${styles.QuickReplyButton} ${
              selectedTemplate === key ? styles.Selected : ""
            }`}
            onClick={() => handleTemplateClick(key)}
          >
            {key === "none"
              ? "None"
              : key === "summarize"
              ? "Summarize"
              : key === "explainLike5"
              ? "Explain like I'm 5"
              : key === "breakDownSimply"
              ? "Break it down simply"
              : key}
          </button>
        ))}
      </div>
      <div className={styles.TextAreaContainer}>
        <textarea
          className={styles.TextArea}
          placeholder="Message AI Chatbot"
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
        />
        {loading && <LoadingBar />}
        <button className={styles.Button} onClick={handleContentSend}>
          <SendIcon />
        </button>
      </div>
      <div className={styles.ButtonsContainer}>
        <button
          className={`${styles.ThemeToggleButton} ${
            currentTheme === "light"
              ? styles.ThemeToggleButtonLight
              : styles.ThemeToggleButtonDark
          }`}
          onClick={onToggleTheme}
          aria-label="Toggle dark/light theme"
        >
          {currentTheme === "light" ? "🌞" : "🌜"}
        </button>
        <button
          className={styles.ClearChatButton}
          onClick={onClearChat}
          type="button"
          aria-label="Clear chat"
          title="Clear chat"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}
