'use client';

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from './page.module.css';
import InputBox from '../components/InputBox';
import axios from "axios";

export default function Home() {
  const [messages, setMessages] = useState([{ sender: "bot", text: "こんにちは！僕の名前はタロウだよ！" }]);
  const [geminiResponse, setGeminiResponse] = useState<string>("");


  // 初回レンダリング時に自己紹介メッセージを表示
  useEffect(() => {
    setMessages(messages);
  }, []);

  const handleSendMessage = useCallback((inputMessage: string) => {
    //  空文字は送信しない
    if (!inputMessage) {
      return;
    }

    setMessages(prevMessages => {
      const api_key = process.env.WANPAKU_API_KEY;
      const newMessages = [...prevMessages, { sender: "user", text: inputMessage }];
      // botの返答を非同期で処理する例
      const postData = async () => {
        const endPoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`;
        const body = {
          contents: [
            {
              parts: [
                {
                  text: inputMessage,
                },
              ],
            },
          ],
        };

        const response = await axios.post(endPoint, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = response.data.candidates[0].content.parts[0].text;
        setGeminiResponse(data)
        newMessages.push({ sender: "bot", text: geminiResponse });
        setMessages(newMessages);
      }

      postData()

      console.log(newMessages)
      console.log(inputMessage)
      console.log(messages)

      return newMessages;
    });
  }, [messages]);

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

