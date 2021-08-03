/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */
const jabin = init()
const url = `https://wxq.am.com/kaoqin/doSign`;
const method = `POST`;
const cookie = jabin.read('jabin_cookie_am')

const headers = {
'X-Requested-With' : `XMLHttpRequest`,
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate, br`,
'Content-Type' : `application/x-www-form-urlencoded; charset=UTF-8`,
'Origin' : `https://wxq.archermind.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092c) NetType/4G Language/zh_CN`,
'Cookie' : `${cookie}`,
'Host' : `wxq.archermind.com`,
'Referer' : `https://wxq.archermind.com/kaoqin/signz`,
'Accept-Language' : `zh-cn`,
'Accept' : `application/json, text/javascript, */*; q=0.01`
};
const body = `kqwayid=156&locationX=118.74919128417969&locationY=31.968181610107422&location=%E5%8D%97%E4%BA%AC-%E4%BA%91%E5%AF%86%E5%9F%8EB%E6%A0%8B&worknum=n006157&name=%E9%A9%AC%E7%BB%A7%E9%B9%8F&deviceinfo=os:ios-weixin:8.0901800092c)`;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

if(cookie){
$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
}else{
	$notify('自动打卡','打卡失败','cookie未找到')
}



function init() {
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
jabin.done()