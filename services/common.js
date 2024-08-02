import { Linking } from "react-native";

const ngrok = "https://iqbal.switchcafebd.com";

export async function Fetch(
  database = "",
  url,
  method,
  body,
  formData = false
) {
  try {
    const newUrl = ngrok + url;
    const option = /"GET"|"DELETE"/.test(method)
      ? {
          headers: { database: database },
        }
      : formData
      ? {
          method,
          body,
          headers: { database: database },
        }
      : {
          method,
          headers: {
            "content-type": "application/json",
            database: database,
          },
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

export async function notify(database, title, body, data) {
  try {
    await Fetch(database, "/message", "POST", {
      title,
      body,
      data,
    });
  } catch (error) {}
}

export const serverUrl = ngrok + "/";

export function prittyPrint(obj) {
  console.log(JSON.stringify(obj, null, 3));
}

export function dateFormatter(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB");
}

export function openNumber(number) {
  Linking.openURL(`tel:${number}`);
}

export const role = {
  store_manager: "Store Manager",
  sales_man: "Sales Man",
  admin: "Admin",
  controller: "Controller",
};

export const debounce = (fn, delay) => {
  let timer;
  return (() => {
    if (timer) clearTimeout(timer);
    else timer = setTimeout(() => fn(), delay);
  })();
};
