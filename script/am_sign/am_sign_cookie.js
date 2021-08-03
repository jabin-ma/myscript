const cookieName = 'Archermind'
const cookieKey = 'jabin_cookie_am'
const chavy = init()
chavy.log(`[${cookieName}] 重写生效 ${chavy.isRequest ? 'true' : 'false'} `)
const cookieVal = $request.headers['Cookie']
if (cookieVal) {
  var saved = chavy.read(cookieKey)
  chavy.log(`[${cookieName}] 开始获取Cookie savedCookie: ${saved} cookie:${cookieVal}`)
  if (saved != cookieVal && chavy.write(cookieVal, cookieKey)) {
    chavy.msg(`${cookieName}`, '获取Cookie: 成功', '')
    chavy.log(`[${cookieName}] 获取Cookie: 成功, cookie: ${cookieVal}`)
  }else{
   chavy.msg(`${cookieName}`, '获取Cookie:已包含', '')
   chavy.log(`[${cookieName}] 获取Cookie:已包含, cookie: ${cookieVal}`) 
  }
}
function init() {
  const isRequest = typeof $request != "undefined"
  
  read = (key) => {
    return $prefs.valueForKey(key)
  }
  write = (key, val) => {
    return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  done = (value = {}) => {
    $done(value)
  }
  return {msg, log, read, write, done }
}
chavy.done()
