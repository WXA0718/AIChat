"use client"; // これを追加


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
            <div className={styles.chatBox}>
                {messages.map((message, index) => (
                    <div key={index} className={message.sender === "user" ? styles.messageRowOutgoing : styles.messageRow}>
                        {message.sender === "bot" && (
                            <div className={styles.icon}>
                                <Image src="/images/Yamada.png" alt="先生のアイコン" width={40} height={40} />
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

            <div className={styles.inputBox}>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="メッセージを入力してください..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button className={styles.sendButton} onClick={handleSendMessage}>
                    送信
                </button>
            </div>
        </div>
    );
};


// Choose which component you want as the default export
export default ChatPage; // Use ChatPage as the default export

// If you want to use MyComponent, you can export it separately
// export { MyComponent };
