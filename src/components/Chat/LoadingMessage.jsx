import React from "react";
import styles from "./LoadingMessage.module.css";

export function LoadingMessage() {
  return (
    <div className={styles.loadingMessage}>
      <div className={styles.loadingBar}>
        <div className={styles.loadingProgress}></div>
      </div>
      <span className={styles.text}>Just a sec...</span>
    </div>
  );
}
