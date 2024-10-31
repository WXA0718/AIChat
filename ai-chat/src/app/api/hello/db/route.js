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
