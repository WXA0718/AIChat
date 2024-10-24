export async function POST(request) {
  const { name } = await request.json();

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',  // どのオリジンからもリクエストを許可
    'Access-Control-Allow-Methods': 'POST',  // 許可するHTTPメソッド
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'  // 許可するヘッダー
  });

  // 必要に応じて、Gemini APIなどの外部APIリクエストを行う

  // レスポンスを返す
  return new Response(JSON.stringify({ message: `Hello, ${name}!` }), {
    status: 200,
    headers: headers
  });
}

export async function OPTIONS() {
  // CORSのプリフライトリクエストに対応するためのオプションリクエスト
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
