const cookieName = '淘小说'
const tokenKey = 'kxsKey'
const uidKey = 'uidKey'

const moliyadi = init()
//console.log($request)
//console.log($request.body)
//console.log($request.method)
//console.log($request.url)

if ($request && $request.method == 'POST' && $request.url.indexOf('itaoxiaoshuo.com/regIds') >= 0) {
  const body = $request.body.loadJSON()
  //console.log(body)
  //const tokenheaderVal = JSON.stringify($request.headers)
  //if (tokenurlVal) moliyadi.setdata(tokenurlVal, tokenurlKey)
  //if (tokenheaderVal) moliyadi.setdata(tokenheaderVal, tokenheaderKey)
  moliyadi.msg(cookieName, `获取刷新链接: 成功`, body)
}
else{moliyadi.msg(cookieName, `获取失败`, '')}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
moliyadi.done()
