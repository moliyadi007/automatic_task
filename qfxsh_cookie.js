// import ("./ql_sync")

const cookieName = '起飞线生活'

const moliyadi = init()

if ($request && $request.method == 'GET' && $request.url.indexOf('cluster.qifeixian.com/api/wallet/v1/member/account/info') >= 0) {
    let token = $request.headers['x-ds-key']
    //let old_value = moliyadi.getdata('kfxtoken')
    if (token) {
      
      // if(old_value == token){
      //   moliyadi.msg(cookieName,'无需更新','')
      // }
      // else{
      //moliyadi.setdata(token,'kfxtoken')
      moliyadi.msg(cookieName, `获取cookie成功`, '')
      $httpClient.get('https://raw.githubusercontent.com/moliyadi007/automatic_task/main/ql_sync.js',
    (err,res,data)=>{
      eval(data)
      update(token,'qfxhd',cookieName,'\n')
      moliyadi.msg(cookieName, `更新cookie成功`, '')
    }
    );
  }
    }else{
      moliyadi.msg(cookieName, `cookie获取失败`, '')
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
