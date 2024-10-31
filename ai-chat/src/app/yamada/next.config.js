module.exports = {
    images: {
      domains: ['example.com'], // ここに使用するドメインを追加
    },
  };

  const response = await fetch('https://example.com/api/chat', { ... });

  const Response = await fetch("URL", { // ここが正しいURLか確認
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});
