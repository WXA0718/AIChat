<<<<<<< Updated upstream
// GETリクエストを処理する関数
export async function DB_GET(url) {
    const { searchParams } = new URL(url);
    const chats = searchParams.get("chats");

    return new Response(JSON.stringify({ chats: chats }));
}

// POSTリクエストを処理する関数
export async function DB_POST(message, ai_type, url) {
    // データ整形
    const data = {
        message: message,
        ai_type: ai_type
    };

    // fetchを使用して外部APIにPOSTリクエストを送信
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    // レスポンスの内容をコンソールに出力
    const text = await response.text();
    console.log("Response Text:", text);

    // JSONとしてパースする前に空でないことを確認
    if (!text) {
        throw new Error("レスポンスが空です");
    }

    // JSONとしてパース
    let responseData;
    try {
        responseData = JSON.parse(text);
    } catch (error) {
        console.error("JSONパースエラー:", error);
        throw new Error("無効なJSON形式");
    }

    const status = response.status;
    return { status, responseData }; // ステータスとデータを返す
}
=======
export async function DB_GET() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: 'GET', // GETメソッドを指定
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.chats; // 'chats'が配列であることを確認
    } catch (error) {
        console.error("Fetch error: ", error);
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}




export async function DB_POST(message, ai_type) {
    const data = {
        message: message,
        ai_type: ai_type,
    };

    try {
        const response = await fetch("URL", { // "URL"を実際のエンドポイントに置き換えてください
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTPエラー！ステータス: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData; // レスポンスデータを返す
    } catch (error) {
        console.error("POSTエラー: ", error);
        throw new Error(`データの送信に失敗しました: ${error.message}`);
    }
}
>>>>>>> Stashed changes
