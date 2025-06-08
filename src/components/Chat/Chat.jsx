import React, { useRef, useState, useEffect } from "react";
import styles from "./Chat.module.css";
import { RichMessage } from "./RichMessage";
import { LoadingMessage } from "./LoadingMessage";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! How can I assist you right now?",
};

export function Chat({ messages, loading }) {
  const chatRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (chatRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
      // Show button if not near bottom (e.g., 100px threshold)
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    }
  };

  useEffect(() => {
    const chatNode = chatRef.current;
    if (chatNode) {
      chatNode.addEventListener("scroll", handleScroll);
      // Scroll to bottom on new messages
      scrollToBottom();
    }
    return () => {
      if (chatNode) {
        chatNode.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messages]);

  return (
    <div className={styles.Chat} ref={chatRef}>
      {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
        <div key={index} className={styles.Message} data-role={role}>
          <RichMessage content={content} />
        </div>
      ))}
      {loading && (
        <div className={styles.Message} data-role="assistant">
          <LoadingMessage />
        </div>
      )}
      {showScrollButton && (
        <button
          className={styles.ScrollButton}
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          ▼
        </button>
      )}
    </div>
  );
}
