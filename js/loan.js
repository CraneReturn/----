var time=60;
// 倒计时全局变量
var getRecive=document.getElementById("getRecive");
getRecive.addEventListener('click',function(){
    if(!email.test(addorderEmail.value)){
        alert("请输入正确的邮箱");
    }else{
        getRecive.disabled=true;
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
    
    }
    // 禁用按钮
})
var addorderEmail=document.getElementById("addorderEmail");
var email=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/