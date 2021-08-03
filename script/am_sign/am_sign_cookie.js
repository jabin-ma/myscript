const $nobyda = nobyda();

if ($nobyda.isRequest) {
  console.log(`request url -> ${$request.url}  resp: ${$response ? $response.headers:'NULL'}`)
  GetCookie($request,'Cookie')
} else {
  GetCookie($response,'Set-Cookie')
}


function GetCookie(context,headerName) {
  var CookieName = "自动打卡";
  console.log(`[${CookieName}] GetCookie using ${headerName} \n`)
  var CookieKey = "jabin_cookie_am";
  if (context.headers) {
    var CookieValue = context.headers[headerName] ? context.headers[headerName] : "NULL";
    if (CookieValue != "NULL") {
      if ($nobyda.read(CookieKey)) {
        if ($nobyda.read(CookieKey) != CookieValue) {
          var cookie = $nobyda.write(CookieValue, CookieKey);
          if (!cookie) {
            $nobyda.notify("更新" + CookieName + "Cookie失败‼️", "", "");
          } else {
            $nobyda.notify("更新" + CookieName + "Cookie成功 🎉", "", "");
          }
        }
      } else {
        var cookie = $nobyda.write(CookieValue, CookieKey);
        if (!cookie) {
          $nobyda.notify("首次写入" + CookieName + "Cookie失败‼️", "", "");
        } else {
          $nobyda.notify("首次写入" + CookieName + "Cookie成功 🎉", "", "");
        }
      }
    } else {
      if (headerName != 'Cookie'){
      $nobyda.notify("写入" + CookieName + "Cookie失败‼️", "", "Cookie关键值缺失");
      }
    }
  } else {
      $nobyda.notify("写入" + CookieName + "Cookie失败‼️", "", "配置错误, 无法读取请求头,");
  }
  $nobyda.end()
}

function nobyda() {
    const isRequest = typeof $request != "undefined"
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
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, end }
};