const cookieName = '淘小说'

const moliyadi = init()
//console.log($request)
//console.log($request.body)
//console.log($request.method)
//console.log($request.url)

if ($request && $request.method == 'POST' && $request.url.indexOf('itaoxiaoshuo.com/regIds') >= 0) {
  let token = $request.body.match(/(?<=token=).+?&/)
  let uid = $request.body.match(/(?<=uid=).+?&/)
  let txsValue = token+uid
  if (token && uid) moliyadi.setdata('txsKey',txsValue)
  moliyadi.msg(cookieName, `获取cookie成功`, '')
}
else{moliyadi.msg(cookieName, `cookie获取失败`, '')}

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
