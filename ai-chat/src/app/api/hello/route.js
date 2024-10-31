export async function POST(request) {
  const { name } = await request.json();

  // API呼び出し
  const apiResponse = await fetch('https://fuwapachi.taild2ed0.ts.net/chats/index', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
  });

  // APIレスポンスの確認
  console.log('API Response Status:', apiResponse.status); // ステータスコードをログに出力
  if (!apiResponse.ok) {
      const errorMessage = await apiResponse.text(); // エラーメッセージを取得
      console.error('API Error:', errorMessage); // エラーメッセージをログに出力
      return new Response(JSON.stringify({ message: 'エラーが発生しました。' }), { status: 500 });
  }

  const apiData = await apiResponse.json();
  const responseMessage = apiData.message;

  const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });

  return new Response(JSON.stringify({ message: responseMessage }), {
      status: 200,
      headers: headers
  });
}
