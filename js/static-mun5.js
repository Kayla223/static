  var ms = 0; // 毫秒
  var s = 8; // 秒
  var m = 0; // 分钟

  var msStr = '';
  var sStr = '';
  var mStr = '';

  var time = 0;

  var oDiv = document.querySelector('#time');

  var oStart = document.querySelectorAll('button')[0]; // 开始
  var oPause = document.querySelectorAll('button')[1]; // 成功找到
  var oReset = document.querySelectorAll('button')[2]; // 重置
  var oImg = document.querySelectorAll('button')[3]; // 搜索目标
  oImg.style.visibility = "hidden";

  oStart.onclick = function(){
   clearInterval(time);
   setTimeStr();
   oImg.style.visibility = "visible";
   oPause.disabled = true;
   oStart.disabled = true;
   oReset.disabled = false;
  }

  function onPause(){
   clearInterval(time);
   oPause.disabled = false;
   oStart.disabled = true;
   oReset.disabled = false;
}

  oReset.onclick = function(){
   clearInterval(time);
   ms = 0; // 毫秒
   s = 8; // 秒
   m = 0; // 分钟
   oDiv.innerHTML = '00分00秒00';
   oImg.style.visibility = "hidden";
   oStart.disabled = false;
   oPause.disabled = true;
   oReset.disabled = true;
  }

   time = setInterval(function(){
       if(ms == 0){
           if( m == 0 && s > 0){
               s--;
               ms = 99;
           }else if( s == 0 && m > 0){
               m--;
               s = 59;
           }else if( s == 0 && m == 0){
               oPause.disabled = true;
               clearInterval(time);
               alert("查找失败！");
           }

     }
        ms--;
    if(ms < 10){
     msStr = '0' + ms;
    }else{
     msStr = ms;
    }

    if(s < 10){
     sStr = '0' + s;
    }else{
     sStr = s;
    }

    if(m < 10){
     mStr = '0' + m;
    }else{
     mStr = m;
    }
    oDiv.innerHTML = `${mStr}分${sStr}秒${msStr}`;
   } , 10);
   console.log(time);
  }
