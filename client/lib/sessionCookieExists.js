/**
 * Checks if cookie with name 'session' exists.
 *  @returns {boolean}
 */
export default function sessionCookieExists() {
  const cookies = getCookiesAsObject()
  return !!cookies.session
}

function getCookiesAsObject() {
  // document.cookie returns string with cookies separated by semicolons and
  // key=value pairs separated by equal signs
  const cookiesStr = document.cookie;
  const cookies = Object.fromEntries(
    cookiesStr.split(';').map((pair) => pair.split('=').map((name) => name.trim()))
  );
  return cookies
}