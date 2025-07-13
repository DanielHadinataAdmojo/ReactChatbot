import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";

const MAX_SAVED_MESSAGES = 50;

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  // Removed promptTemplate state as per revert request
  const chatRef = useRef(null);

  useEffect(() => {
    const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);
    const gemini = googleai.getGenerativeModel({ model: "models/gemini-2.5-flash" });
    chatRef.current = gemini.startChat({ history: [] });
    console.log("Chat instance initialized:", chatRef.current);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Load saved messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error("Failed to parse saved messages from localStorage", error);
      }
    }
  }, []);

  // Save messages to localStorage on messages change, limiting to MAX_SAVED_MESSAGES
  useEffect(() => {
    if (messages.length > 0) {
      const messagesToSave = messages.slice(-MAX_SAVED_MESSAGES);
      localStorage.setItem("chatMessages", JSON.stringify(messagesToSave));
    } else {
      localStorage.removeItem("chatMessages");
    }
  }, [messages]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setLoading(true);
    try {
      if (!chatRef.current) {
        throw new Error("Chat instance not initialized");
      }
      console.log("Sending message:", content);
      const result = await chatRef.current.sendMessage(content);
      console.log("Received result:", result);
      let responseText = "";
      if (typeof result.response === "string") {
        responseText = result.response;
      } else if (result.response && typeof result.response.text === "function") {
        responseText = await result.response.text();
      } else if (result.response && typeof result.response.text === "string") {
        responseText = result.response.text;
      } else if (result.response && result.response.text) {
        responseText = result.response.text;
      } else if (result.response && result.response.message) {
        responseText = result.response.message;
      } else {
        responseText = JSON.stringify(result.response);
      }
      addMessage({ content: responseText, role: "assistant" });
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
    } finally {
      setLoading(false);
    }
  }

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  function clearChat() {
    setMessages([]);
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("unsentPrompt");
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} loading={loading} />
      </div>
      <Controls
        onSend={handleContentSend}
        onToggleTheme={toggleTheme}
        currentTheme={theme}
        onClearChat={clearChat}
      />
    </div>
  );
}

export default App;
