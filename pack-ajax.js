function ajax(opts) {
    var url = opts.url
    var type = opts.type
    var dataType = opts.dataType || 'json'
    var onsuccess = opts.onsuccess || function(){}
    var onerror = opts.onerror || function () {}
    var data = opts.data || {}
    var dataStr = []
    for(var key in data) {
        dataStr.push(key + '+' + data[key])
    }
    // 判断type GET/ POST
    dataStr = dataStr.join('&')
    if (type === 'GET'){
        url += '?' + dataStr
    }
    var xhr = new XMLHttpRequest()
    xhr.open(type,url,true)
    xhr.onload = function (){
        if(xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304){
          console.log('success') 
          if(dataType === 'json') {
              onsuccess(JSON.parse(xhr.responseText))
          } else {
              onsuccess(xhr.responseText)
          }
        } else {
            onerror(xhr.responseText)
        }
    }
    xhr.onerror = onerror
    if(type === 'POST'){
        xhr.send(dataStr)
    }else {
        xhr.send()
    }

    }
    ajax({
        url: 'https://mock.mengxuegu.com/mock/619e2a8ef720a73ceb75ea02/weather/weather',
        data: {
            city: '北京'
        },
        onsuccess: function(ret){
            console.log(ret)
        },
        onerror: function(){
            console.log('服务器异常')
        }
    })