const PASSWORD = "mySecret123"; // change this

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decoded = decodeURIComponent(document.cookie);
  const ca = decoded.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}

function checkAccess() {
  if (getCookie("auth") !== "true") {
    window.location.href = "index.html";
  }
}

function handleLogin() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    setCookie("auth", "true", 1); // 1 day
    window.location.href = "home.html";
  } else {
    alert("Wrong password!");
  }
}

// Automatically check access when this file loads, but only if we're NOT on the login page
if (!window.location.pathname.endsWith("index.html")) {
  checkAccess();
}
