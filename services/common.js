export async function Fetch(url, method, body, formData = false) {
  try {
    const newUrl = "https://1807-103-109-59-101.ngrok-free.app" + url;
    const option =
      method === "GET"
        ? {}
        : formData
        ? {
            method,
            body,
          }
        : {
            method,
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
          };
    const res = await fetch(newUrl, option);
    const result = await res.json();
    if (!res.ok) throw result;
    else return result;
  } catch (error) {
    throw error;
  }
}

export const serverUrl = "https://1807-103-109-59-101.ngrok-free.app/";
