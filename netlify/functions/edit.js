export async function handler(event) {
  const body = JSON.parse(event.body);

  // Polling
  if (body.pollId) {
    const res = await fetch(`https://api.replicate.com/v1/predictions/${body.pollId}`, {
      headers: { "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}` }
    });
    const data = await res.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  }

  // Nueva predicción
  const { imageBase64, prompt } = body;
  const res = await fetch("https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-pro/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: { prompt, input_image: imageBase64 }
    })
  });

  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data) };
}
