export async function Fetch(url, method, body, formData = false) {
  try {
    const newUrl = "https://612e-58-145-189-244.ngrok-free.app" + url;
    const option = /"GET"|"DELETE"/.test(method)
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
    console.log(error);
    throw error;
  }
}

export const serverUrl = "https://612e-58-145-189-244.ngrok-free.app/";

export function prittyPrint(obj) {
  console.log(JSON.stringify(obj, null, 3));
}
