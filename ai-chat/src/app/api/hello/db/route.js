export async function DB_GET() {
    const { searchParams } = new URL("URL")
    const chats = searchParams.get("chats")

    return new Response(JSON.stringify({ chats: chats }))
}

export async function DB_POST(message, ai_type) {
    // データ整形 DB受け渡し方法はLINEにて
    const data = {
        message: message,
        ai_type: ai_type
    }

    async function name() { 
    const Response = await fetch("URL", {
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