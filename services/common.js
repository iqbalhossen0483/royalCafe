const ngrok = "https://server.switchcafebd.com";

export async function Fetch(url, method, body, formData = false) {
  try {
    const newUrl = ngrok + url;
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
    throw error;
  }
}

export const serverUrl = ngrok + "/";

export function prittyPrint(obj) {
  console.log(JSON.stringify(obj, null, 3));
}

export function dateFormatter(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB");
}
