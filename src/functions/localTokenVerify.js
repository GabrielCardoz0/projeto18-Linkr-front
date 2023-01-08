export default function localTokenVerify() {
  try {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        if (key === "token") return value;
      }
    } else {
      localStorage.setItem("token", "");
      return "";
    }
  } catch (error) {
    console.log(error);
  }
}
