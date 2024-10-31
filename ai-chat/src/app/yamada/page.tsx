"use client"; // これを追加

<<<<<<< Updated upstream

import React, { useState } from 'react';
import styles from './page.module.css'; // Ensure your CSS module is imported
import Image from 'next/image'; // Import Image from Next.js

const MyComponent = () => {
    // MyComponentの内容
    return <div>My Component Content</div>;
};

const ChatPage = () => {
    const [messages, setMessages] = useState([{ sender: "bot", text: "こんにちわ、私の名前は先生です" }]);
    const [inputMessage, setInputMessage] = useState("");

    const handleSendMessage = async () => {
        console.log("ユーザーが送信したメッセージ:", inputMessage);
        if (inputMessage.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "user", text: inputMessage }
            ]);
            setInputMessage(""); // 入力フィールドをクリア
    
            try {
                const response = await fetch("/api/hello", { // 正しいAPIエンドポイントを指定
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: inputMessage }) // ここでユーザーのメッセージを送信
                });
    
                console.log("Response Status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json(); // レスポンスをJSON形式で取得
                console.log("Response Data:", data);
    
                // ボットの応答をメッセージに追加
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "bot", text: data.message } // APIからの応答を表示
                ]);
            } catch (error) {
                console.error('Error:', error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "bot", text: "エラーが発生しました。" }
                ]);
            }
        }
    };
    

    return (
        <div className={styles.chatContainer}>
=======
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from './page.module.css'; // CSS Module for styling
import { DB_GET, DB_POST } from "../api/hello/db"; // Adjust the import path as needed

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
>>>>>>> Stashed changes
            <div className={styles.chatBox}>
                {messages.map((message, index) => (
                    <div key={index} className={message.sender === "user" ? styles.messageRowOutgoing : styles.messageRow}>
                        {message.sender === "bot" && (
                            <div className={styles.icon}>
<<<<<<< Updated upstream
                                <Image src="/images/Yamada.png" alt="先生のアイコン" width={40} height={40} />
=======
                                <Image src="/images/Yamada.png" alt="Bot Icon" width={40} height={40} />
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
            {/* Message input area */}
>>>>>>> Stashed changes
            <div className={styles.inputBox}>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="メッセージを入力してください..."
                    value={inputMessage}
<<<<<<< Updated upstream
                    onChange={(e) => setInputMessage(e.target.value)}
=======
                    onChange={(e) => setInputMessage(e.target.value)} // Update state with input value
>>>>>>> Stashed changes
                />
                <button className={styles.sendButton} onClick={handleSendMessage}>
                    送信
                </button>
            </div>
        </div>
    );
<<<<<<< Updated upstream
};


// Choose which component you want as the default export
export default ChatPage; // Use ChatPage as the default export

// If you want to use MyComponent, you can export it separately
// export { MyComponent };
=======
}
>>>>>>> Stashed changes
