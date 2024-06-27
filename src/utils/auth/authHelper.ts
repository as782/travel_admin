

/**
 * 获取会话存储
 * @param key
 * @returns object | null
 */
function getSessionStorage(key: string) {
  try {
    return JSON.parse(sessionStorage.getItem(key) || 'null')
  } catch (error) {
    return null
  }
}
/**
 *  设置会话存储
 * @param key
 * @param value
 *
 */
function setSessionStorage(key: string, value: any) {
  sessionStorage.setItem(key, JSON.stringify(value))
}
/**
 * 移除单个
 * @param key
 */
function removeSessionStorage(key: string) {
  sessionStorage.removeItem(key)
}

function clearSessionStorage() {
  sessionStorage.clear()
}


function getToken(keyname: string = 'token') {
  return getSessionStorage(keyname)
}
function setToken(token: string, keyname: string = 'token') {
  setSessionStorage(keyname, token)
}
export default {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  clearSessionStorage,
  getToken,
  setToken
}
