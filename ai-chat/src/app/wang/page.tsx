'use client';

import { useState } from 'react';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSelect = async (role: string) => {
    setSelectedRole(role);

    let apiKey;
    const domainName = process.env.NEXT_PUBLIC_DOMAIN_NAME;

    // キャラクターごとにAPIキーを切り替え
    if (role === 'Tarou') {
      apiKey = process.env.NEXT_PUBLIC_API_KEY_TAROU;
    } else if (role === 'Yamada') {
      apiKey = process.env.NEXT_PUBLIC_API_KEY_YAMADA;
    } else if (role === 'Sakurai') {
      apiKey = process.env.NEXT_PUBLIC_API_KEY_SAKURAI;
    }

    // APIリクエストを送信
    const res = await fetch(`${domainName}/api/hello`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,  // 選択されたキャラクターのAPIキーを使用
      },
      body: JSON.stringify({ role }),
    });

    if (!res.ok) {
      setErrorMessage('API認証に失敗しました');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-black">話したい相手を選択して下さい</h1>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tarou Option */}
        <div
          className={`p-6 bg-white rounded-lg shadow-lg text-center ${selectedRole === 'Tarou' ? 'border-2 border-blue-500' : ''
            }`}
          onClick={() => handleRoleSelect('Tarou')}
        >
          <img src="/images/friend1.png" alt="Tarou" className="mb-4 mx-auto rounded-full h-32 w-32" />
          <h2 className="text-2xl font-semibold text-black">タロウくん</h2>
          <p className="text-gray-600 mt-2">あなたの心と健康を守ります</p>
          <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">スタート！</button>
        </div>

        {/* Yamada Option */}
        <div
          className={`p-6 bg-white rounded-lg shadow-lg text-center ${selectedRole === 'Yamada' ? 'border-2 border-blue-500' : ''
            }`}
          onClick={() => handleRoleSelect('Yamada')}
        >
          <img src="/images/friend2.png" alt="Yamada" className="mb-4 mx-auto rounded-full h-32 w-32" />
          <h2 className="text-2xl font-semibold text-black">山田先生</h2>
          <p className="text-gray-600 mt-2">あなたの心と健康を守ります</p>
          <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">スタート！</button>
        </div>

        {/* Sakurai Option */}
        <div
          className={`p-6 bg-white rounded-lg shadow-lg text-center ${selectedRole === 'Sakurai' ? 'border-2 border-blue-500' : ''
            }`}
          onClick={() => handleRoleSelect('Sakurai')}
        >
          <img src="/images/teacher.png" alt="Sakurai" className="mb-4 mx-auto rounded-full h-32 w-32" />
          <h2 className="text-2xl font-semibold text-black">桜井あかり先生</h2>
          <p className="text-gray-600 mt-2">あなたの心と健康を守ります</p>
          <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">スタート！</button>
        </div>
      </div>

      {selectedRole && (
        <div className="mt-8 p-4 bg-blue-100 rounded-lg text-center">
          <h3 className="text-lg font-semibold">You selected: {selectedRole}</h3>
        </div>
      )}
    </div>
  );
}