var time=60;
// 倒计时全局变量
var getRecive=document.getElementById("getRecive");
getRecive.addEventListener('click',function(){
    getRecive.disabled=true;
    // 禁用按钮
    var restTime=setInterval(function(){
        if(time==0){
            clearInterval(restTime);
            // 清除定时器
            getRecive.disabled=true;
            // 启用按钮
            time=60;
            getRecive.innerHTML="获取";
        }
        else{
            getRecive.innerHTML="剩余"+time+"秒";
            time--;
        }
    },1000)

})