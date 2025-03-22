import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.sender === "user" ? styles.userMsg : styles.botMsg}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: { width: "400px", margin: "50px auto", padding: "10px", backgroundColor: "#f4f4f4", borderRadius: "10px" },
  chatBox: { height: "300px", overflowY: "auto", padding: "10px" },
  userMsg: { backgroundColor: "#0084ff", color: "white", padding: "10px", borderRadius: "10px", margin: "5px 0", alignSelf: "flex-end" },
  botMsg: { backgroundColor: "#eee", color: "black", padding: "10px", borderRadius: "10px", margin: "5px 0", alignSelf: "flex-start" },
  inputArea: { display: "flex", marginTop: "10px" },
  input: { flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "5px" },
  button: { marginLeft: "10px", padding: "10px", backgroundColor: "#0084ff", color: "white", border: "none", borderRadius: "5px" },
};

export default Chatbot;
