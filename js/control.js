let footable = document.getElementById("foodTable");
var len = 0;
function getData(page, perPage) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/getInfoByPage",
        data: {
            page: page,
            per_page: perPage
        },
        success: function (result) {
            console.log(result, 'result1')
            footable.innerHTML = "";
            for (var i = 0; i < result.data.length; i++) {
                footable.innerHTML += `
                <tr>
                <th>${result.data[i].name}</th>
                <th>${result.data[i].price}</th>
                <th>${result.data[i].desc}</th>
                <th>${result.data[i].typename}</th>
                <th><button class="delectFood">删除</button></th>
                <th><button class="changeFood">修改</button></th>
   <th style='display:none'>${JSON.stringify(result.data[i])}</th>
                </tr>
                `
            }
            // var deletFoodPare=deletFoodParent[0].nextSiBling;
            var delectFood = document.getElementsByClassName('delectFood')
            // 获取删除按钮

            for (var i = 0; i < delectFood.length; i++) {
                // 删除
                // 为元素绑定单击函数
                delectFood[i].onclick = function () {
                    console.log(this.parentElement.nextElementSibling.innerHTML);
                    var delectObjct = JSON.parse(this.parentElement.nextElementSibling.innerHTML);
                    // 将数据封存到对象中 为删除做准备

                    if (confirm("确定要清空数据吗？")) {
                        delectFoodMetho(delectObjct._id);
                    }

                }
            }
        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })
}

// 修改食物
var changefoodagin=document.getElementById("changefoodagin");
var  rightchangefoodagin=document.getElementById("rightchangefoodagin")
function changefoodNew(obj){
    foodBoxShadow.style.display="";
    findfoodHidden.style.display="";

}
// 修改食物接口
function changeFoodAll(foodname, foodprice, fooddes, foodtype) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/update",
        data: {
           name:foodname,
           price:foodprice,
            desc: fooddes,
            typename:foodtype
        },
        success: function (result) {
            // console.log("---------");
            console.log(result);
            getData()
        },
        error: function (err) {
            console.log(err)
        }
    })
}
// 删除方法
function delectFoodMetho(id) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/del",
        data: {
            _id: id
        },
        success: function (result) {
            console.log(result, 'result1')
            getData(foodPageNum.innerHTML, 4);

        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })
}

var pageSizeFood = 1;
var pageOutlineFood = 4;
// 获取修改按钮 为修改做准备

// 获取总长度 为后续翻页做准备
function getFoodLen() {

    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/food/allpage",
        data: {

        },
        success: function (result) {
            console.log(result, 'result1')
            len = result.pages;
        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })
}
getFoodLen();
// 写页面切换
var foodChangebtnUp = document.getElementById("foodChangebtnUp");
var foodChangebtnDown = document.getElementById("foodChangebtnDown");
var foodPageNum = document.getElementById("foodPageNum");


// function getFoodPage(foodPageNum, pageOutlineFood) {
//     $.ajax({
//         type: "POST",
//         url: "http://118.195.129.130:3000/food/getInfoByPage",
//         data: {
//             page: foodPageNum,
//             per_page: pageOutlineFood
//         },
//         success: function (result) {
//             console.log(result, 'result')
//         },
//         //error是请求失败之后执行的函数
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }
foodChangebtnUp.onclick = function () {
    console.log("1111111,111dasdas");
    foodPageNum.innerHTML--;
    if (foodPageNum.innerHTML <= 0) {
        alert("这是第一页");
        foodPageNum.innerHTML = 1;
    }
    else {
        getData(foodPageNum.innerHTML, 4)
    }

}
foodChangebtnDown.onclick = function () {
    foodPageNum.innerHTML++;
    if (foodPageNum.innerHTML > Math.ceil(len / 5)) {
        alert("这是最后一页");
        foodPageNum.innerHTML = Math.ceil(len / 5);
    }
    else {
        getData(foodPageNum.innerHTML, 5)
    }

}
// foodChangebtnUp.click();
getData(1, 4)

// 点击时候页面会切换 隐藏效果


var Foodnail = document.getElementsByClassName('Foodnail')[0]
var ordernail = document.getElementsByClassName('ordernail')[0]
var usernail = document.getElementsByClassName('usernail')[0]
var info = document.getElementsByClassName('info')
Foodnail.onclick = function () {
    info[0].style.display = ''
    info[1].style.display = 'none'
    info[2].style.display = 'none'
}
ordernail.onclick = function () {
    info[1].style.display = ''
    info[0].style.display = 'none'
    info[2].style.display = 'none'
}
usernail.onclick = function () {
    info[2].style.display = ''
    info[1].style.display = 'none'
    info[0].style.display = 'none'
}
// 添加菜品
var addFood = document.getElementById("addFood");
function addNewFood(foodnewName, foodnewprice, foodnewdesc, foodnewtypename,) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/add",
        data: {
            name: foodnewName,
            price: foodnewprice,
            desc: foodnewdesc,
            typename: foodnewtypename,
            typeid: 1
        },
        success: function (result) {
            console.log(result, 'result3')
            getData(pageSizeFood, pageOutlineFood);

        },
        error: function (err) {
            console.log(err)
        }
    })

}
var foodAddUser = document.getElementById("foodAddUser");
var inputfoodPrice = document.getElementById("inputfoodPrice");
var inputfoodDes = document.getElementById("inputfoodDes");
var inputfoodType = document.getElementById("inputfoodType");
var fooduserFinding = document.getElementById("food-user-finding");
// 获取input框里面的内容
addFood.onclick = function () {
    foodAddUser.style.display = '';
    console.log("good", fooduserFinding.value)
    // addNewFood(foodAddUser.value, inputfoodPrice.value, inputfoodDes.value, inputfoodType.value);
    // foodAddUser.style.display = "none";
}
fooduserFinding.onclick = function () {
    addNewFood(foodAddUser.value, inputfoodPrice.value, inputfoodDes.value, inputfoodType.value);
    foodAddUser.style.display = "none"; foodAddUser.style.display = "none"; foodAddUser.style.display = "none";
}



// 查找菜品
var lookFood = document.getElementById("lookFood");
// 获取input文本框内容
var seachFood = document.getElementById("search");
function lookFoodMetho(newfind) {
    console.log(newfind);
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/getInfoByKw",
        data: {
            kw: newfind
        },
        success: function (result) {
            console.log(result, 'result1')
            // 如果数据不存在
            if (result.data.length == 0) {
                alert('没有搜查到原有数据')
            }
            else {
                // 清空原有样式 将新的数据用resData接收
                footable.innerHTML = ""
                let resData = result.data
                for (let i = 0; i < resData.length; i++) {
                    footable.innerHTML +=
                        "<tr>"
                        + "<th>" + resData[i].name + "</th>"
                        + "<th>" + resData[i].price + "</th>"
                        + "<th>" + resData[i].desc + "</th>"
                        + "<th>" + resData[i].typename + "</th>"
                        + "<th>" + "<button id='delectFood' class='delectFoodAll'>删除</button>" + "</th>"
                        + "<th>" + resData[i].typename + "</th>"
                        + "</tr>"
                }
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}
lookFood.onclick = function () {
    if (seachFood.value == "") {
        alert("请输入数据");
    }
    else {
        footable.innerHTML = ""
        lookFoodMetho(seachFood.value);
    }
}



// 重置之后给它恢复原样
var reNewFood = document.getElementById("reNewFood");
reNewFood.onclick = function () {
    getData(foodPageNum.innerHTML, 5);
    console.log("aaa")
}




// 订单
var orderTable = document.getElementsByClassName("orderTable")[0];
var orderHead = document.getElementById("orderHead");
// 分页查询
function getOrderlen(orderpage) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/getInfoByPage_order",
        data: {
            page: orderpage,
            per_page: 7
        },
        success: function (result) {
            console.log(result, 'result4')
            result = result.data
            console.log(result, 'result4')
            orderHead.innerHTML = "";
            for (var j = 0; j < result.length; j++) {
                orderHead.innerHTML += "<ul class='orderTable'>"
                    + "<li class='orderconten'>" + result[j].us + "</li>"
                    + "<li class='orderconten'>" + result[j].amount + "</li>"
                    + "<li class='orderconten'>" + result[j].phone + "</li>"
                    + "<li class='orderconten'>" + result[j].pay + "</li>"
                    + "<li class='orderconten orderOperator'>" + "<button id='delectfoodOrder' class='delectfoodOrder'>删除</button>"
                    + "<div style='display:none'>"+JSON.stringify(result[j])+"</div>"
                    + "<button id='changefoodOrder' class='changefoodOrder' onclick='changefoodOrderNew(this)'>修改</button>" + "</li>"
                    + "</ul>"


            }
            // 删除
            // 获取所有的删除按钮
            var delectfoodOrder = document.getElementsByClassName('delectfoodOrder');
            for (var t = 0; t < delectfoodOrder.length; t++) {
                {
                    delectfoodOrder[t].onclick = function () {
                        console.log(this.nextElementSibling.innerHTML);
                        var delectOrderObject = JSON.parse(this.nextElementSibling.innerHTML);
                        console.log("6666");

                        if (confirm("确认要删除数据吗")) {
                            delectOrder(delectOrderObject._id);
                        }
                    }
                }
            }

        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })
}
getOrderlen(1);

// 订单的分页查询
// 获取上一页下一页的按钮
var orderChangebtnUp = document.getElementById("orderChangebtnUp");
// 下一页
var orderChangebtnDown = document.getElementById("orderChangebtnDown");
// 获取页数
var orderPageNum = document.getElementById("orderPageNum");
// 上一页
orderChangebtnUp.onclick = function () {
    orderPageNum.innerHTML--;
    if (orderPageNum.innerHTML <= 0) {
        alert("这是第一页");
        orderPageNum.innerHTML = 1;
    }
    else {
        getOrderlen(orderPageNum.innerHTML)
    }

}
// 分页查询传参数问题
orderChangebtnDown.onclick = function () {
    orderPageNum.innerHTML++;
    if (orderPageNum.innerHTML > Math.ceil(orderperPage / 5)) {
        alert("这是最后一页");
        orderPageNum.innerHTML = Math.ceil(orderperPage / 5);
    }
    else {
        getOrderlen(orderPageNum.innerHTML)
    }

}


// 添加订单接口
var addFoaddfoodOrderod = document.getElementById("addfoodOrder");
function addNewFooaddfoodOrderd(searchOrderID, searchOrdermoney, searchOrderphone, searchOrdernowtime,) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/add_order",
        data: {
            us: searchOrderID,
            amount: searchOrdermoney,
            phone: searchOrderphone,
            pay: searchOrdernowtime
        },
        success: function (result) {
            console.log(result, 'result3')
            // 问题 添加成功之后需要调用get方法
            getOrderlen(1);
        },
        error: function (err) {
            console.log(err)
        }
    })

}
// 获取输入框的内容
var searchOrderID = document.getElementById("lookOrderID");
var searchOrdermoney = document.getElementById("searchOrdermoney");
var searchOrderphone = document.getElementById("searchOrderphone");
var searchOrdernowtime = document.getElementById("searchOrdernowtime");
var addfoodOrderagin = document.getElementById("addfoodOrderagin");
var rightaddfoodOrderagin = document.getElementById("rightaddfoodOrderagin");
var orderBoxShadow = document.getElementById("orderBoxShadow");



var findfoodOrderHidden = document.getElementsByClassName("findfoodOrderHidden")[0];
addFoaddfoodOrderod.onclick = function () {
    orderBoxShadow.style = "";
    findfoodOrderHidden.style = "";
}
addfoodOrderagin.onclick = function () {
    console.log(searchOrderID.value);
    addNewFooaddfoodOrderd(searchOrderID.value, searchOrdermoney.value, searchOrderphone.value, searchOrdernowtime.value);
    orderBoxShadow.style = "display:none";
    findfoodOrderHidden.style = "display:none";

}
rightaddfoodOrderagin.onclick = function () {
    orderBoxShadow.style = "display:none";
    findfoodOrderHidden.style = "display:none";
}


// 获取页面总长度
var allordreLength;
function getOrderallLength() {
    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/order/allpage_order",
        data: {
        },
        success: function (result) {
            console.log(result, 'result5')
            orderperPage = result.pages


        },
        error: function (err) {
            console.log(err)
        }
    })

}

getOrderallLength();

// 搜索接口
// 获取盒子 获取输入框内容
var findfoodOrder = document.getElementById("findfoodOrder");
var lookorderHidden = document.getElementsByClassName("lookorderHidden")[0];
var findingOrderID = document.getElementById("findingOrderID");
var findingOrderphone = document.getElementById("findingOrderphone");
var findingOrdernowtime = document.getElementById("findingOrdernowtime");
var findingfoodOrderagin = document.getElementById("findingfoodOrderagin");
var renewfoodOrder = document.getElementById("renewfoodOrder");
console.log(lookorderHidden, '11111111');
// 接口
function findingOrderAll(ordernewfind) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/getInfoByKw_order",
        data: {
            kw: ordernewfind
        },
        success: function (result) {
            console.log(result, 'result6')
            if (result.data.length == 0) {
                alert("没有搜查到原始数据");
            }
            else {
                orderHead.innerHTML = "";
                var rewOrder = result.data;
                for (var k = 0; k < rewOrder.length; k++) {
                    orderHead.innerHTML = "<ul class='orderTable'>"
                        + "<li class='orderconten'>" + rewOrder[k].us + "</li>"
                        + "<li class='orderconten'>" + rewOrder[k].amount + "</li>"
                        + "<li class='orderconten'>" + rewOrder[k].phone + "</li>"
                        + "<li class='orderconten'>" + rewOrder[k].pay + "</li>"
                        + "<li class='orderconten'>" + "<button>删除</button>" + "</li>"
                        + "</ul>"
                }
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}
// 点击搜索函数
findfoodOrder.onclick = function () {
    findingOrderAll(findingOrderID.value);
}
// 重置搜索
renewfoodOrder.onclick = function () {
    getOrderlen(orderPageNum.innerHTML);
}
var delectfindfoodOrder = function () {
    getOrderlen(orderPageNum.innerHTML);
}

// 修改方法
var changefoodOrder = document.getElementsByClassName("changefoodOrder");
var changeorderBoxShadow = document.getElementById("changeorderBoxShadow");
var changefoodOrderHidden = document.getElementById("changefoodOrderHidden");
var changefoodOrderagin = document.getElementById("changefoodOrderagin");
var rightchangefoodOrderagin = document.getElementById("rightchangefoodOrderagin");
function changefoodOrderNew(){
            console.log('11111');
            changeorderBoxShadow.style.display = 'block';
            changefoodOrderHidden.style.display = '';
            console.log(5555);
}
changefoodOrderagin.onclick=function(){

    changeorderBoxShadow.style.display = 'none';
    changefoodOrderHidden.style.display = 'none';
    console.log(document.getElementById("changeOrderID").value);
    // for (var z = 0; z < rewOrder.length; z++) {
    //     changeOrderAll(changeOrderID.value=rewOrder[z].us, changeOrdermoney.value=rewOrder[z].amount, changeOrderphone.value=rewOrder[z].phone, changeOrdernowtime.value=rewOrder[z].pay);
    // }
}
rightchangefoodOrderagin.onclick=function(){

    changeorderBoxShadow.style.display = 'none';
    changefoodOrderHidden.style.display = 'none';
}

// 接受输入框内容
var changeOrderID = document.getElementById("changeOrderID");
var changeOrdermoney = document.getElementById("changeOrdermoney");
var changeOrderphone = document.getElementById("changeOrderphone");
var changeOrdernowtime = document.getElementById("changeOrdernowtime");
function changeOrderAll(orderus, orderamount, changeOrderphone, changeorderpay) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/update_order",
        data: {
            us: orderus,
            amount: orderamount,
            phone: changeOrderphone,
            pay: changeorderpay
        },
        success: function (result) {
            console.log("---------");
            console.log(result);
            console.log("---------");
            getOrderlen()
        },
        error: function (err) {
            console.log(err)
        }
    })
}
// 修改的问题
var foodBoxShadow=document.getElementById("foodBoxShadow");
var findfoodHidden=document.getElementById("findfoodHidden");
var changeorderBoxShadow=document.getElementById("changeorderBoxShadow");
var changefoodOrderHidden=document.getElementById("changefoodOrderHidden");
function changefoodOrderNew(obj){
    changeorderBoxShadow.style.display="";
    changefoodOrderHidden.style.display="";
    console.log(obj.parentElement.parentElement.children[1]);
    changeOrderAll(changeOrderID.value=obj.parentElement.parentElement.children[0].innerHTML,
        changeOrdermoney=obj.parentElement.parentElement.children[1].innerHTML,
        changeOrderphone.value=obj.parentElement.parentElement.children[2].innerHTML,
        changeOrdernowtime.value=obj.parentElement.parentElement.children[3].innerHTML)
        
}
// 删除
// 删除的接口
function delectOrder(orderid) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/del_order",
        data: {
            _id: orderid
        },
        success: function (result) {
            console.log(result, 'result7')
            getOrderlen(orderPageNum.innerHTML);

        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })
}

// 用户部分的内容 分页查询的接口
var userbodyTable = document.getElementById("userbodyTable");
function getUsermessage(userpage) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/getInfoByPage_users",
        data: {
            page: userpage,
            per_page: 7
        },
        success: function (result) {
            console.log(result, 'result8')
            result = result.data
            userbodyTable.innerHTML = "";
            for (var z = 0; z < result.length; z++) {
                userbodyTable.innerHTML += "<ul class='userTableAll'>"
                    + "<li class='userconten'>" + result[z].us + "</li>"
                    + "<li class='userconten'>" + result[z].age + "</li>"
                    + "<li class='userconten'>" + result[z].sex + "</li>"
                    + "<li class='userconten'>" + result[z].integral + "</li>"
                    + "<li class='userconten'>" + "<button id='delectuserOrder' class='delectuserOrder'>删除</button>"
                    + "<button id='changeuserOrder' class='changeuserOrder'>修改</button>" + "</li>"
                    + "</ul>"


            }

        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })
}
getUsermessage(1);
var adduserOrder = document.getElementById("adduserOrder");
var userBoxShadow = document.getElementById("userBoxShadow");
var userOrderHidden = document.getElementById("userOrderHidden");
// 获取左边按钮 右边按钮

var adduserOrderagin = document.getElementById("adduserOrderagin");
var rightadduserOrderagin = document.getElementById("rightadduserOrderagin");



adduserOrder.onclick = function () {
    userBoxShadow.style.display = "";
    userOrderHidden.style.display = "";

}
adduserOrderagin.onclick = function () {
    userBoxShadow.style.display = "none";
    userOrderHidden.style.display = "none";
    addNewUser(addUserID.value, addYears.value, addGender.value, addIntegral.value);

}
rightadduserOrderagin.onclick = function () {
    userBoxShadow.style.display = "none";
    userOrderHidden.style.display = "none";

}
// 获取输入框
var addUserID = document.getElementById("addUserID");
var addYears = document.getElementById("addYears");
var addGender = document.getElementById("addGender");
var addIntegral = document.getElementById("addIntegral");
// 添加用户的方法接口
function addNewUser(usernewName, usernewprice, usernewdesc, usertypename,) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/integral",
        data: {
            us: usernewName,
            age: usernewprice,
            sex: usernewdesc,
            integral: usertypename
        },
        success: function (result) {
            console.log(result, 'result9')
            getData(pageSizeFood, pageOutlineFood);

        },
        error: function (err) {
            console.log(err)
        }
    })

}

// 页面切换
var userChangebtnUp = document.getElementById("userChangebtnUp");
var userChangebtnDown = document.getElementById("userChangebtnDown");
var userPageNum = document.getElementById("userPageNum");
userChangebtnUp.onclick = function () {
    userPageNum.innerHTML--;
    if (userPageNum.innerHTML <= 0) {
        alert("这是第一页");
        userPageNum.innerHTML = 1;
    }
    else {
        getUsermessage(userPageNum);
    }

}
// userChangebtnDown.onclick=function(){
//     userPageNum.innerHTML++;
//     if(userPageNum.innerHTML=0){
//         alert("这是第一页");
//         userPageNum.innerHTML=1;
//     }
//     else{
//         getUsermessage(userPageNum);
//     }

// }

// 获取页面总条数



