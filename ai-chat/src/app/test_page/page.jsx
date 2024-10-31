"use client";

import { useState } from "react";

export default function Page() {
    const [data, setData] = useState("");
    const [error, setError] = useState(null);

    async function getData() {
        try {
            const res = await fetch("http://100.97.186.26:3000/chats/index");
            const data = await res.json();
            setData(data.message);
        } catch (error) {
            setError("データの取得に失敗しました。");
        }
    }

    return (
        <div className="text-center mt-8">
            <button className="bg-gray-200 p-2 mb-5" onClick={getData}>
                データを取得
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>{data}</p>
        </div>
    );
}
