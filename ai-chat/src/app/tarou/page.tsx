'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from './page.module.css';
import InputBox from '../components/InputBox'; 

export default function Home() {
  const [messages, setMessages] = useState([]);

  // 初回レンダリング時に自己紹介メッセージを表示
  useEffect(() => {
    setMessages([{ sender: "bot", text: "こんにちわ！僕の名前はタロウだよ！" }]);
  }, []);
  const handleSendMessage = (inputMessage: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputMessage },
      { sender: "bot", text: "すごいね！　～～～" }
    ]);
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
                <Image src="/images/Tarou.png" alt="少年のアイコン" width={40} height={40} />
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

      {/* メッセージ入力エリア（新しいコンポーネントを利用） */}
      <InputBox onSendMessage={handleSendMessage} />
    </div>
  );
}
