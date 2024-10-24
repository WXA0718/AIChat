'use client';

import { useState } from "react";
import Image from "next/image";
import styles from './page.module.css'; // CSS Module for styling

export default function Home() {
  const [messages, setMessages] = useState([]); // メッセージを管理するステート
  const [inputMessage, setInputMessage] = useState(""); // 入力されたメッセージのステート

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // ユーザーのメッセージと固定の返信を追加
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: inputMessage },
        { sender: "bot", text: "こんにちわ、私の名前は先生です" }
      ]);
      setInputMessage(""); // 入力フィールドをクリア
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* チャットエリア */}
      <div className={styles.chatBox}>
        {messages.map((message, index) => (
          <div key={index} className={message.sender === "user" ? styles.messageRowOutgoing : styles.messageRow}>
            {message.sender === "bot" && (
              <div className={styles.icon}>
                {/* 相手のアイコン */}
                <Image src="/images/Yamada.png" alt="先生のアイコン" width={40} height={40} />
              </div>
            )}
            <div className={styles.messageBubble}>
              <p>{message.text}</p>
            </div>
            {message.sender === "user" && (
              <div className={styles.icon}>
                {/* ユーザーのアイコン */}
                <Image src="/images/data.jpg" alt="Your Icon" width={40} height={40} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* メッセージ入力エリア */}
      <div className={styles.inputBox}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="メッセージを入力してください..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)} // 入力内容をステートに保存
        />
        <button className={styles.sendButton} onClick={handleSendMessage}>
          送信
        </button>
      </div>
    </div>
  );
}
