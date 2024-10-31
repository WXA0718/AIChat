import { useState, useEffect } from "react";
import Image from "next/image";
import styles from './page.module.css'; // CSS Module for styling

export default function Home() {
    const [messages, setMessages] = useState([]); // State to manage messages
    const [inputMessage, setInputMessage] = useState(""); // State for input message

    useEffect(() => {
        async function fetchMessages() {
            const chatMessages = await DB_GET();
            setMessages(chatMessages.map(chat => ({ sender: "bot", text: chat.message })));
        }
        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            // User message handling
            const userMessage = { sender: "user", text: inputMessage };
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            // AI response handling
            const response = await DB_POST(inputMessage, "AI_TYPE"); // AI_TYPEを適切に指定する
            const botMessage = { sender: "bot", text: response.message }; // 受け取ったメッセージを設定
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setInputMessage(""); // 入力フィールドをクリア
        }
    };

    return (
        <div className={styles.chatContainer}>
            {/* Chat area */}
            <div className={styles.chatBox}>
                {messages.map((message, index) => (
                    <div key={index} className={message.sender === "user" ? styles.messageRowOutgoing : styles.messageRow}>
                        {message.sender === "bot" && (
                            <div className={styles.icon}>
                                <Image src="/images/Yamada.png" alt="Bot Icon" width={40} height={40} />
                            </div>
                        )}
                        <div className={styles.messageBubble}>
                            <p>{message.text}</p>
                        </div>
                        {message.sender === "user" && (
                            <div className={styles.icon}>
                                <Image src="/images/data.jpg" alt="Your Icon" width={40} height={40} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Message input area */}
            <div className={styles.inputBox}>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="メッセージを入力してください..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)} // Update state with input value
                />
                <button className={styles.sendButton} onClick={handleSendMessage}>
                    送信
                </button>
            </div>
        </div>
    );
}
