export async function DB_GET(url) {
    const { searchParams } = new URL(url)
    const chats = searchParams.get("chats")

    return new Response(JSON.stringify({ chats: chats }))
}

export async function DB_POST(message, ai_type, url) {
    // データ整形 DB受け渡し方法はLINEにて
    const data = {
        message: message,
        ai_type: ai_type
    }

    async function name() { 
    const Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const ResponseData = await Response.json()

    const status = Response.status

    return status
    }

    const statusCode = name()

    return statusCode
}