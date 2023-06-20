export async function Fetch(url, method, body, formData = false) {
  try {
    const newUrl = "https://8298-58-145-189-242.ngrok-free.app" + url;
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

export const serverUrl = "https://8298-58-145-189-242.ngrok-free.app/";

export function prittyPrint(obj) {
  console.log(JSON.stringify(obj, null, 3));
}

export function dateFormatter(date) {
  const yearAndMonth = date.slice(0, 8);
  let tarikh = parseInt(date.slice(8, 10)) + 1;
  tarikh = tarikh + "";
  tarikh = tarikh.length === 1 ? "0" + tarikh : tarikh;
  return yearAndMonth + tarikh;
}
