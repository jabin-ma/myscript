/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `https://wxq.am.com/kaoqin/doSign`;
const method = `POST`;
const headers = {
'X-Requested-With' : `XMLHttpRequest`,
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate, br`,
'Content-Type' : `application/x-www-form-urlencoded; charset=UTF-8`,
'Origin' : `https://wxq.archermind.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092c) NetType/4G Language/zh_CN`,
'Cookie' : `JSESSIONID= 4446B066C54972C0BAB4606A8DCDAC34 `,
'Host' : `wxq.am.com`,
'Referer' : `https://wxq.am.com/kaoqin/signz`,
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

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
