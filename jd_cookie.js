const cookieName = '京东'
const name = 'JD_COOKIE'//环境变量名(青龙和surge使用同一个)
const remarks = '京东cookie'//环境变量注释
const separate = '&'//分割符号
const moliyadi = init()
get_cookie()
function get_cookie(){
  if ($request && $request.method == 'GET' && $request.url.indexOf('api.m.jd.com/client.action') >= 0) {
      let cookie = $request.headers['cookie']||$request.headers['Cookie']
      let new_Value = cookie.match(/(pt_pin|pt_key)=.+?;/g)
      if(new_Value&&new_Value.length==2){
        new_Value = new_Value.join('')
      }else{
        moliyadi.msg(cookieName, `cookie获取失败`, '')
        return
      }
      let old_value = moliyadi.getdata(name)
      if (new_Value) {
        
        if(old_value == new_Value){
          moliyadi.msg(cookieName,'无需更新','')
        }else{
        moliyadi.setdata(new_Value,name)
        moliyadi.msg(cookieName, `获取cookie成功`, '')
        $httpClient.get(
    'https://raw.githubusercontent.com/moliyadi007/automatic_task/main/ql_sync.js',
      (err,res,data)=>{
        eval(data)
        update(old_value,new_Value,name,remarks,separate)
        moliyadi.msg(cookieName, `更新cookie成功`, '')
      });
      }
      }else{
        moliyadi.msg(cookieName, `cookie获取失败`, '')
      }
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
