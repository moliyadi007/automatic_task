
require("./ql_sync")
const cookieName = '淘小说'

const moliyadi = init()
//console.log($request)
//console.log($request.body)
//console.log($request.method)
//console.log($request.url)

if ($request && $request.method == 'POST' && $request.url.indexOf('itaoxiaoshuo.com/regIds') >= 0) {
  let token = $request.body.match(/token=(.+?&)/)[1]
  let uid = $request.body.match(/uid=(.+?&)/)[1]
  let txsValue = token+uid
  let old_value = moliyadi.getdata('txsKey')
  if (token && uid) {
    
    if(old_value == txsValue){
      moliyadi.msg(cookieName,'无需更新','')
      moliyadi.done()
    }
    moliyadi.setdata(txsValue,'txsKey')
    moliyadi.msg(cookieName, `获取cookie成功`, '')
    update(old_value,txsValue,'txsCookie','淘小说','@')
    
  }else{
    moliyadi.msg(cookieName, `cookie获取失败`, '')
   }
}

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
  setdata = (val,key) => {
    if (isSurge()) return $persistentStore.write(val,key)
    if (isQuanX()) return $prefs.setValueForKey(val,key)
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
