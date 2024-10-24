'use client';

import { useState } from "react";
import styles from './page.module.css';

interface InputBoxProps {
  onSendMessage: (message: string) => void; // メッセージ送信のコールバック関数
}

export default function InputBox({ onSendMessage }: InputBoxProps) {
  const [inputMessage, setInputMessage] = useState(""); // 入力されたメッセージのステート
  const [isListening, setIsListening] = useState(false); // 音声認識がアクティブかどうか

  // Web Speech APIによる音声認識機能
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'ja-JP';  // 日本語で音声認識
      recognition.interimResults = false;  // 結果が確定してから取得
      recognition.start();

      setIsListening(true);  // 聞き取り中ステータスをセット

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;  // 認識結果を取得
        setInputMessage(transcript);  // テキストボックスに反映
        setIsListening(false);  // 聞き取り完了
      };

      recognition.onerror = () => {
        setIsListening(false);  // エラー時に聞き取り停止
      };
    } else {
      alert("音声認識APIがこのブラウザでサポートされていません");
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage); // 親コンポーネントにメッセージを送信
      setInputMessage(""); // 入力フィールドをクリア
    }
  };

  return (
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
      <button className={styles.sendButton} onClick={startListening} disabled={isListening}>
        {isListening ? "聞き取り中..." : "音声入力"}
      </button>
    </div>
  );
}
