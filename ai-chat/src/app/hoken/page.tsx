'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from './page.module.css';
import { DB_GET, DB_POST } from "./path-to-your-db-functions"; // DB_GET, DB_POSTをインポート

export default function Home() {
  const [messages, setMessages] = useState([]); // メッセージを管理するステート
  const [inputMessage, setInputMessage] = useState(""); // 入力されたメッセージのステート

  // 初回レンダリング時にメッセージをDBから取得して表示
  useEffect(() => {
    async function fetchMessages() {
      const chatMessages = await DB_GET();
      setMessages(chatMessages.map(chat => ({ sender: "bot", text: chat.message })));
    }
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      // ユーザーのメッセージをステートに追加
      const newUserMessage = { sender: "user", text: inputMessage };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      // API に新しいメッセージを送信
      const statusCode = await DB_POST(inputMessage, 0); // 0 は例としてのai_type

      // 応答メッセージを追加（ここでは仮の応答）
      const botReply = { sender: "bot", text: "そうなんだね！　～～～" };
      setMessages((prevMessages) => [...prevMessages, botReply]);

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

      {/* メッセージ入力エリア */}
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
}
