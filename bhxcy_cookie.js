const project = '渤海宣传员'
const env_name ='bohaihd'
const sepreate = '\n'
const method = 'POST'
const pattern = 'apiAction=getUserInfo'
const moliyadi = init()

if ($request && $request.method == method && $request.url.indexOf(pattern) >= 0) {
     console.log($request.body)
     var uid = $request.body.uid
     var token = $request.body.token
     token = uid+'&'+token
    // let reg1 = new RegExp('Bearer ','g')
    // let token = Authorization.replace(reg1,'')
    //let old_value = moliyadi.getdata('kfxtoken')
    if (token) {
      
      // if(old_value == token){
      //   moliyadi.msg(project,'无需更新','')
      // }
      // else{
      //moliyadi.setdata(token,'kfxtoken')
      moliyadi.msg(project, `获取cookie成功`, '')
      $httpClient.get('https://raw.githubusercontent.com/moliyadi007/automatic_task/main/ql_sync.js',
    (err,res,data)=>{
      eval(data)
      update(token,env_name,project,sepreate)
      moliyadi.msg(project, `更新cookie成功`, '')
    }
    );
  }
    else{
      moliyadi.msg(project, `cookie获取失败`, '')
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
