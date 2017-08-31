// Operation Cookie
export function getCookie(name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) {
    return decodeURIComponent(arr[2]);
  }
  return null;
}
export function setCookie(name, value, exSeconds) {
  if (!exSeconds) exSeconds = 24 * 60 * 60 * 1000;
  const d = new Date();
  d.setTime(d.getTime() + (exSeconds * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}`;
}
export function delCookie( name, path ) {

  const domain = location.hostname;
  if (getCookie(name)) {
    // document.cookie = `${name}=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=${path};`;
    document.cookie = `${name}=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=${
          path}; domain=${domain}`;
  }
}

// Operation LocalStorage
export function setLocalStorage(key, vaule) {
  return localStorage.setItem(key, JSON.stringify(vaule));
}

export function getLocalStorage(key) {
  const value = JSON.parse(localStorage.getItem(key));
  return value;
}
