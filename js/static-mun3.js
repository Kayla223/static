//定义一个变量，根据定时器每秒执行一次，每次执行++自增操作，变量存储的数值，就会每秒+1。现在需要的记录效果是每0.01秒，也就是10毫秒执行一次。根据累计的数值执行进位。如果毫秒达到100就是1秒，如果秒达到60就是1分钟，如果分钟达到60就是1小时

  var ms = 0; // 毫秒
  var s = 14; // 秒
  var m = 0; // 分钟


  // 单独定义存储分、秒、毫秒的字符串的变量来存储累加时间的执行结果，因为如果直接在ms、s、m、h变量上进行拼接操作，会影响++操作的执行
  var msStr = '';
  var sStr = '';
  var mStr = '';


  // 因为定时器是定义在函数内部，必须定义一个全局变量来存储定时器，在函数外部可以调用终止定时器
  var time = 0;

  // 获取div标签对象
  var oDiv = document.querySelector('#time');

  // 获取按钮的标签对象
  var oStart = document.querySelectorAll('button')[0]; // 开始
  var oPause = document.querySelectorAll('button')[1]; // 成功找到
  var oReset = document.querySelectorAll('button')[2]; // 重置
  var oImg = document.querySelectorAll('button')[3]; // 搜索目标
  oImg.style.visibility = "hidden";

  // 给四个按钮添加点击事件效果

  // 开始按钮
  oStart.onclick = function(){
   // 点击开始按钮执行函数，执行秒表计时
   clearInterval(time);
   setTimeStr();
   oImg.style.visibility = "visible";
   oPause.disabled = true;
   oStart.disabled = true;
    //可以重置
   oReset.disabled = false;
  }

  // 暂停按钮
  function onPause(){
    // 点击暂停按钮,清除定时器,终止秒表执行
   clearInterval(time);
   // 本身不能点
   oPause.disabled = false;
   oStart.disabled = true;
   oReset.disabled = false;
}

  // 重置按钮
  oReset.onclick = function(){
   // 点击重置按钮,倒计时开始
   clearInterval(time);
   ms = 0; // 毫秒
   s = 14; // 秒
   m = 0; // 分钟
   // 将div中的内容,设定为初始状态的00:00:00内容
   oDiv.innerHTML = '00分00秒00';
   oImg.style.visibility = "hidden";
   // 开始可以点
   oStart.disabled = false;
   // 其他都不能点
   oPause.disabled = true;

   oReset.disabled = true;
  }

  // 每次点击开始按钮或者继续按钮都会调用执行函数，都会生成一个新的定时器。time中存储的是当前这个新的定时器，是整个程序中定时器的序号
  // 例如点击开始按钮10次会生成10个定时，time中存储最后一个定时器的序号10
  // 当点击暂停按钮时，清除的是time中存储的序号是10的这一个定时器，之前 1-9定时器仍然会执行
  // 解决方法：点击开始按钮之后，在点击暂停按钮之前，禁止再次点击开始按钮。也就是在清除原有定时器之前，不允许生成新的定时器

  // 定义函数，这个函数的作用就是记录执行的时间，有分钟、秒、毫秒 4个部分，将记录的时间写入到div中
  function setTimeStr(){
   // 赋值操作,将定时器,存储在全局作用域变量中
   // 此处 倒计时操作
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
    // 如果记录的时间小于0，要做补零操作
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


    // 每次执行返回一个记录时间的字符串，将这个字符串写入到div中
    oDiv.innerHTML = `${mStr}分${sStr}秒${msStr}`;
   } , 10);
   console.log(time);
  }
