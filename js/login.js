
var button = document.getElementById('button')
var loginbtn=document.getElementById("loginbtn")
var userName = document.getElementById('userName')
var userKey = document.getElementById('userKey')
loginbtn.onclick = function () {
    $.ajax({
        type: "POST",
        url: 'http://118.195.129.130:3000/user/login',
        data: {
            us: userName.value,
            ps: userKey.value
        },
        success: function (result) {
            if(userName.value==""||userKey.value==""){
                alert("请输入用户名和密码");
            }
           else{
            if (result.err == 0) {
                // window.location.href = "control.html";
                // 将数据存到本地库
                console.log("us",userName.value,result.data[0]._id);
                window.localStorage.setItem("us",userName.value);
                window.localStorage.setItem("ps",userKey.value);
                window.localStorage.setItem("_id",result.data[0]._id);

            } else {
                alert("密码或用户名错误");
            }

           } 
            // window.location.href="control.html";
            //    window.location.href="b.html";
            console.log(result);
        },
        error: function (err) {
            console.log(err);
            alert("密码或用户名错误");
        }
    })
}
var loanbtn=document.getElementById("loanbtn");
loanbtn.onclick=function(){
    console.log(111111);
 window.location.href="loan.html";
}