import React from "react";
import styles from "./LoadingBar.module.css";

export function LoadingBar() {
  return (
    <div className={styles.loadingBarContainer}>
      <div className={styles.loadingBar}>
        <div className={styles.loadingProgress}></div>
      </div>
      <div className={styles.loadingText}>Just a sec...</div>
    </div>
  );
}
