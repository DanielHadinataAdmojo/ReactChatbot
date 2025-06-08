import { useState } from "react";
import styles from "./Controls.module.css";
import { LoadingBar } from "../LoadingBar";

export function Controls({ onSend, loading, onToggleTheme, currentTheme }) {
  const [content, setContent] = useState("");

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.length > 0) {
      onSend(content);
      setContent("");
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
      <div className={styles.TextAreaContainer}>
        <textarea
          className={styles.TextArea}
          placeholder="Message AI Chatbot"
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
        />
        {loading && <LoadingBar />}
      </div>
      <button className={styles.Button} onClick={handleContentSend}>
        <SendIcon />
      </button>
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
