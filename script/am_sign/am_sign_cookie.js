const CookieName = "自动打卡";
const $nobyda = nobyda();

console.log(`[${CookieName}] 开始获取cookie ${$request.url}\n`)
if (!$nobyda.isResponse) {
  GetCookie($request,'Cookie')
} else {
  GetCookie($response,'Set-Cookie')

}

function GetCookie(context,headerName) {
  var CookieKey = "jabin_cookie_am";
  if (context.headers) {
    var CookieValue = context.headers[headerName] ? context.headers[headerName] : "NULL";
    if (CookieValue != "NULL") {
      if ($nobyda.read(CookieKey)) {
        if ($nobyda.read(CookieKey) != CookieValue) {
          var cookie = $nobyda.write(CookieValue, CookieKey);
          if (!cookie) {
            $nobyda.notify(CookieName,headerName,"更新Cookie失败‼️\n"+ CookieValue);
          } else {
            $nobyda.notify(CookieName,headerName,"更新Cookie成功 🎉\n"+ CookieValue);
          }
        }
      } else {
        var cookie = $nobyda.write(CookieValue, CookieKey);
        if (!cookie) {
          $nobyda.notify(CookieName,headerName,"首次写入Cookie失败‼️\n"+ CookieValue);
        } else {
          $nobyda.notify(CookieName,headerName,"首次写入Cookie成功 🎉\n"+ CookieValue);
        }
      }
    } else {
      if (headerName != 'Cookie'){
         $nobyda.notify(CookieName,"写入" + headerName + "Cookie失败‼️", "Cookie关键值缺失");
      }
    }
  } else {
      $nobyda.notify(CookieName,"写入" + headerName + "Cookie失败‼️","配置错误, 无法读取请求头,");
  }
  $nobyda.end()
}

function nobyda() {
    const isResponse = typeof $response != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const end = () => {
        if (isQuanX) return $done({})
        if (isSurge) isResponse ? $done() : $done({}) 
    }

    return { isResponse, isQuanX, isSurge, notify, write, read, end }
};