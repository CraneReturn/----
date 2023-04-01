let footable = document.getElementById("foodTable");
var foodpageChange = document.getElementById("foodpageChange");

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
                <th>${result.data[i].name.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</th>
                <th>${result.data[i].price}</th>
                <th>${result.data[i].desc}</th>
                <th>${result.data[i].typename}</th>
                <th><button class="delectFood">删除</button> 
                <button class="changeFood"onclick='changefoodNew(this)'>修改</button></th>
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
var changefoodagin = document.getElementById("changefoodagin");
var rightchangefoodagin = document.getElementById("rightchangefoodagin");
// 获取输入框内容
var lookFoodID = document.getElementById("lookFoodID");
var searchFoodmoney = document.getElementById("searchFoodmoney");
var searchFoodphone = document.getElementById("searchFoodphone");
var searchFoodnowtime = document.getElementById("searchFoodnowtime");
// 修改食物留下的问题
function changefoodNew(food) {
    foodBoxShadow.style.display = "";
    console.log(food.parentElement.parentElement.children[0].innerHTML, '00000000');
    console.log(food.parentElement.children[0].innerHTML, "6666666");
    lookFoodID.value = food.parentElement.parentElement.children[0].innerHTML;
    searchFoodmoney.value = food.parentElement.parentElement.children[1].innerHTML;
    searchFoodphone.value = food.parentElement.parentElement.children[2].innerHTML;
    searchFoodnowtime.value = food.parentElement.parentElement.children[3].innerHTML;
}

var changefoodagin = document.getElementById("changefoodagin");
changefoodagin.onclick = function () {
    foodBoxShadow.style.display = "none";
    changeFoodAll(lookFoodID.value, searchFoodmoney.value, searchFoodphone.value, searchFoodnowtime.value);
}
var rightchangefoodagin = document.getElementById("rightchangefoodagin");
rightchangefoodagin.onclick = function () {
    foodBoxShadow.style.display = "none";
}

// 修改食物接口
function changeFoodAll(foodname, foodprice, fooddes, foodtype) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/update",
        data: {
            name: foodname,
            price: foodprice,
            desc: fooddes,
            typename: foodtype
        },
        success: function (result) {
            console.log("---------");
            console.log(result);
            getData(foodPageNum.innerHTML, perPage);
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
            getData(foodPageNum.innerHTML, perPage);
            foodAllpagenum.innerHTML = len;

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
var len;
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
            foodAllpagenum.innerHTML = len;
        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })
}
// 显示总条数
var foodAllpagenum = document.getElementById("foodAllpagenum");
getFoodLen();
// 写页面切换
var foodChangebtnUp = document.getElementById("foodChangebtnUp");
var foodChangebtnDown = document.getElementById("foodChangebtnDown");
var foodPageNum = document.getElementById("foodPageNum");


var foodIndex = foodpageChange.selectedIndex;
// 获取索引
var perPage = foodpageChange.options[foodIndex].value;
// 获取里面的值
function changeperpage() {
    foodIndex = foodpageChange.selectedIndex;
    perPage = foodpageChange.options[foodIndex].value;
    // 重新获取select的值进行切换 重新赋值
    getData(foodPageNum.innerText, perPage)
}
foodChangebtnUp.onclick = function () {
    console.log("1111111,111dasdas");
    foodPageNum.innerHTML--;
    if (foodPageNum.innerHTML <= 0) {
        alert("这是第一页");
        foodPageNum.innerHTML = 1;
    }
    else {
        getData(foodPageNum.innerHTML, perPage)
    }

}
foodChangebtnDown.onclick = function () {
    foodPageNum.innerHTML++;
    if (foodPageNum.innerHTML > Math.ceil(len / perPage)) {
        alert("这是最后一页");
        foodPageNum.innerHTML = Math.ceil(len / perPage);
    }
    else {
        getData(foodPageNum.innerHTML, perPage)
    }

}
// foodChangebtnUp.click();

getData(1, perPage)

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
            getData(foodPageNum.innerHTML, perPage);
            foodAllpagenum.innerHTML = len;

        },
        error: function (err) {
            console.log(err)
        }
    })

}
var foodAddUser = document.getElementById("foodAddUser");
var inputfoodName = document.getElementById("inputfoodName");

var inputfoodPrice = document.getElementById("inputfoodPrice");
var inputfoodDes = document.getElementById("inputfoodDes");
var inputfoodType = document.getElementById("inputfoodType");
// var fooduserFinding = document.getElementById("food-user-finding");
var addingFoodBoxshadow = document.getElementById("addingFoodBoxshadow");
var delectdddFood = document.getElementById("delectdddFood");
var addFoodbtn = document.getElementById("addFoodbtn");
// 获取input框里面的内容
addFood.onclick = function () {
    // addNewFood(foodAddUser.value, inputfoodPrice.value, inputfoodDes.value, inputfoodType.value);
    // foodAddUser.style.display = "none";
    addingFoodBoxshadow.style.display = "";
}
// fooduserFinding.onclick = function () {
//     addNewFood(foodAddUser.value, inputfoodPrice.value, inputfoodDes.value, inputfoodType.value);
//     foodAddUser.style.display = "none"; foodAddUser.style.display = "none"; foodAddUser.style.display = "none";
// }
delectdddFood.onclick = function () {
    addingFoodBoxshadow.style.display = "none";
}
addFoodbtn.onclick = function () {
    addNewFood(inputfoodName.value, inputfoodPrice.value, inputfoodDes.value, inputfoodType.value,);
    inputfoodName.value = "";
    inputfoodPrice.value = "";
    inputfoodDes.value = "";
    inputfoodType.value = "";
    addingFoodBoxshadow.style.display = "none";

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
                        + "<th>" + "<button class='delectFood'>删除</button> " +
                        "<button class='changeFood'onclick='changefoodNew(this)'>修改</button>"
                        + "</th>"
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
    getData(foodPageNum.innerHTML, perPage);
    console.log("aaa")
}




// 订单
var orderTable = document.getElementsByClassName("orderTable")[0];
var orderHead = document.getElementById("orderHead");
var orderpageChange = document.getElementById("orderpageChange");
var orderIndex = orderpageChange.selectedIndex;
var orderPage = orderpageChange.options[orderIndex].value;
function changeOrderperpage() {
    orderIndex = orderpageChange.selectedIndex;
    orderPage = orderpageChange.options[orderIndex].value;
    getOrderlen(orderPageNum.innerHTML, orderPage);

}
// 分页查询
function getOrderlen(oldorderpage, orderPage) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/getInfoByPage_order",
        data: {
            page: oldorderpage,
            per_page: orderPage
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
                    + "<li class='orderconten'>" + (result[j].pay == 0 ? '已支付' : '未支付') + "</li>"
                    + "<li class='orderconten orderOperator'>" + "<button id='delectfoodOrder' class='delectfoodOrder'>删除</button>"
                    + "<div style='display:none'>" + JSON.stringify(result[j]) + "</div>"
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
getOrderlen(1, orderPage);

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
        getOrderlen(orderPageNum.innerHTML, orderPage);
    }

}
// 分页查询传参数问题
orderChangebtnDown.onclick = function () {
    orderPageNum.innerHTML++;
    if (orderPageNum.innerHTML > Math.ceil(orderPageNum.innerHTML / orderPage)) {
        alert("这是最后一页");
        orderPageNum.innerHTML = Math.ceil(orderPageNum.innerHTML / orderPage);
    }
    else {
        getOrderlen(orderPageNum.innerHTML, orderPage);
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
            getOrderlen(1, orderPage);
            NeworderpageAll.innerHTML = allordreLength;

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
    if (lookOrderID.value == "" || searchOrdermoney.value == "" || searchOrderphone.value == "" || searchOrdernowtime == "") {
        alert("请输入数据");
    }
    else {
        addNewFooaddfoodOrderd(searchOrderID.value, searchOrdermoney.value, searchOrderphone.value, searchOrdernowtime.value);
        orderBoxShadow.style = "display:none";
        findfoodOrderHidden.style = "display:none";

    }

}
rightaddfoodOrderagin.onclick = function () {
    orderBoxShadow.style = "display:none";
    findfoodOrderHidden.style = "display:none";
}


// 获取页面总长度
var allordreLength;
var NeworderpageAll = document.getElementById("NeworderpageAll");
function getOrderallLength() {
    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/order/allpage_order",
        data: {
        },
        success: function (result) {
            console.log(result, 'result5')
            allordreLength = result.pages;
            NeworderpageAll.innerHTML = allordreLength;



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
                        + "<li class='orderconten orderOperator'>" + "<button id='delectfoodOrder' class='delectfoodOrder'>删除</button>"
                        + "<button id='changefoodOrder' class='changefoodOrder' onclick='changefoodOrderNew(this)'>修改</button>"
                        + "</li>"
                        + "</ul>"
                }
                NeworderpageAll.innerHTML = allordreLength;
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
    getOrderlen(orderPageNum.innerHTML, orderPage);
}
var delectfindfoodOrder = function () {
    getOrderlen(orderPageNum.innerHTML, orderPage);
}

// 修改方法
var changefoodOrder = document.getElementsByClassName("changefoodOrder");
var changeorderBoxShadow = document.getElementById("changeorderBoxShadow");
var changefoodOrderHidden = document.getElementById("changefoodOrderHidden");
var changefoodOrderagin = document.getElementById("changefoodOrderagin");
var rightchangefoodOrderagin = document.getElementById("rightchangefoodOrderagin");
function changefoodOrderNew() {
    console.log('11111');
    changeorderBoxShadow.style.display = 'block';
    changefoodOrderHidden.style.display = '';
    console.log(5555);
}
changefoodOrderagin.onclick = function () {

    changeorderBoxShadow.style.display = 'none';
    changefoodOrderHidden.style.display = 'none';
    console.log(document.getElementById("changeOrderID").value);

    // for (var z = 0; z < rewOrder.length; z++) {
    //     changeOrderAll(changeOrderID.value=rewOrder[z].us, changeOrdermoney.value=rewOrder[z].amount, changeOrderphone.value=rewOrder[z].phone, changeOrdernowtime.value=rewOrder[z].pay);
    // }
}
rightchangefoodOrderagin.onclick = function () {

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
            console.log("---------6666");
            getOrderlen(orderPageNum.innerHTML, orderPage);
        },
        error: function (err) {
            console.log(err)
        }
    })
}
// 修改的问题
var foodBoxShadow = document.getElementById("foodBoxShadow");
var findfoodHidden = document.getElementById("findfoodHidden");
var changeorderBoxShadow = document.getElementById("changeorderBoxShadow");
var changefoodOrderHidden = document.getElementById("changefoodOrderHidden");
function changefoodOrderNew(obj) {
    changeorderBoxShadow.style.display = "";
    changefoodOrderHidden.style.display = "";
    console.log(obj.parentElement.parentElement.children[1]);
    changeOrderAll(changeOrderID.value = obj.parentElement.parentElement.children[0].innerHTML,
        changeOrdermoney.value = obj.parentElement.parentElement.children[1].innerHTML,
        changeOrderphone.value = obj.parentElement.parentElement.children[2].innerHTML,
        changeOrdernowtime.value = obj.parentElement.parentElement.children[3].innerHTML);

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
            getOrderlen(orderPageNum.innerHTML, orderPage);

        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })
}
var userpageChange = document.getElementById("userpageChange");
var userIndex = userpageChange.selectedIndex;
var ueserPage = userpageChange.options[userIndex].value;
// 用户部分的内容 分页查询的接口userIndex
var userbodyTable = document.getElementById("userbodyTable");
var userPageNum = document.getElementById("userPageNum");
function changeUser() {
    userIndex = userpageChange.selectedIndex;
    ueserPage = userpageChange.options[userIndex].value;
    getUsermessage(userPageNum.innerHTML, ueserPage)


}
function getUsermessage(userpage, userslectpage) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/getInfoByPage_users",
        data: {
            page: userpage,
            per_page: userslectpage
        },
        success: function (result) {
            console.log(result, 'result8')
            result = result.data
            userbodyTable.innerHTML = "";
            for (var z = 0; z < result.length; z++) {
                userbodyTable.innerHTML += "<ul class='userTableAll'>"
                    + "<li class='userconten'>" + result[z].us.replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    + "</li>"
                    + "<li class='userconten'>" + result[z].age + "</li>"
                    + "<li class='userconten'>" + (result[z].sex === 0 ? "男" : "女") + "</li>"
                    + "<li class='userconten'>" + result[z].integral + "</li>"
                    + "<li class='userconten'>" + "<button id='delectuserOrder' class='delectuserOrder' onclick='btnDelectUsermessage(this)'>删除</button>"
                    + "<div style='display:none'>" + JSON.stringify(result[z]) + "</div>"
                    + "<button id='changeuserOrder' class='changeuserOrder' onclick='changeUserAllthings(this)'>修改</button>" + "</li>"
                    + "</ul>"
            }

        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })
}
getUsermessage(1, ueserPage);
var adduserOrder = document.getElementById("adduserOrder");
var userBoxShadow = document.getElementById("userBoxShadow");
var userOrderHidden = document.getElementById("userOrderHidden");
// 获取左边按钮 右边按钮

var adduserOrderagin = document.getElementById("adduserOrderagin");
var rightadduserOrderagin = document.getElementById("rightadduserOrderagin");

// 获取页面的总长度
var userLen;
var userpageAll = document.getElementById("userpageAll");
// userpageAll.innerHTML=
function getUserAlllength() {
    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/users/allpage_users",
        data: {
        },
        success: function (result) {
            console.log(result, 'result80')
            userLen = result.pages;
            userpageAll.innerHTML = userLen;
            // userLen是条数的总数量
            getUsermessage(userPageNum.innerHTML, ueserPage);

        },
        error: function (err) {
            console.log(err)
        }
    })

}
getUserAlllength();
// 添加输入框
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
var userName = window.localStorage.getItem("us");
var userlocalID = window.localStorage.getItem("_id");
adduserOrder.onclick = function () {
    userBoxShadow.style.display = "";
    userOrderHidden.style.display = "";
    addUserID.value = userName;
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/user/inquire",
        data: {
            _id: userlocalID
        },
        success: function (result) {
            console.log(result.data[0], 'result9');
            addUserID.value = result.data[0].us;
            addYears.value = result.data[0].age;

            addGender.value = result.data[0].sex ? "女" : "男";
            addIntegral.value = result.data[0].__v;


        },
        error: function (err) {
            console.log(err)
        }
    })




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
        getUsermessage(userPageNum.innerHTML);
    }

}
userChangebtnDown.onclick = function () {
    userPageNum.innerHTML++;
    if (userPageNum.innerHTML > Math.ceil(userLen / ueserPage)) {
        alert("这是最后一页");
        userPageNum.innerHTML = Math.ceil(userLen / ueserPage);
    }
    else {
        getUsermessage(userPageNum.innerHTML, ueserPage);
    }
}
getUsermessage(1, ueserPage);
// 搜索用户的接口
function findingUserMessage(ueserkw) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/getInfoByKw_users",
        data: {
            kw: ueserkw,
        },
        success: function (result) {
            console.log(result, 'result10')
            if (result.data.length == 0) {
                alert("没有查找到原始数据");
            }
            else {
                userbodyTable.innerHTML = "";
                let newfindUser = result.data;
                for (let k = 0; k < newfindUser.length; k++) {
                    userbodyTable.innerHTML += "<ul class='userTableAll'>"
                        + "<li class='userconten'>" + newfindUser[k].us + "</li>"
                        + "<li class='userconten'>" + newfindUser[k].age + "</li>"
                        + "<li class='userconten'>" + (newfindUser[k].sex === 0 ? "男" : "女") + "</li>"
                        + "<li class='userconten'>" + newfindUser[k].integral + "</li>"
                        + "<li class='userconten'>" + "<button id='delectuserOrder' class='delectuserOrder'>删除</button>"
                        + "<button id='changeuserOrder' class='changeuserOrder'>修改</button>" + "</li>"
                        + "</ul>"
                }
            }

        },
        error: function (err) {
            console.log(err)
        }
    })

}
var findingUserID = document.getElementById("findingUserID");
var finduserOrder = document.getElementById("finduserOrder");
finduserOrder.onclick = function () {
    if (findingUserID.value == "") {
        alert("请输入要搜索的内容");
    }
    else {
        findingUserMessage(findingUserID.value);
    }
}
// 重置和取消搜索
var renewuserOrder = document.getElementById("renewuserOrder");
var delectuserOrderbtn = document.getElementById("delectuserOrderbtn");
delectuserOrderbtn.onclick = function () {
    findingUserID.value == "";
    getUsermessage(userPageNum.innerHTML, ueserPage);
}
renewuserOrder.onclick = function () {
    findingUserID.value == "";
    getUsermessage(userPageNum.innerHTML, ueserPage);
}
// 删除接口
function delectNewUser(userid) {
    console.log(userid);
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/del_users",
        data: {
            _id: userid
        },
        success: function (result) {
            console.log(result, 'result9')
            getUsermessage(userPageNum.innerHTML, ueserPage);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function btnDelectUsermessage(th) {
    console.log(th);
    var delectUsermessage = JSON.parse(th.nextElementSibling.innerHTML);
    console.log(JSON.parse(th.nextElementSibling.innerHTML));
    if (confirm("确定要删除此用户？")) {
        delectNewUser(delectUsermessage._id);
    }
}
// 修改用户信息

function changeNewUser(userID, userUS, userAge, userSex) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/update_users",
        data: {
            _id: userID,
            us: userUS,
            age: userAge,
            sex: userSex

        },
        success: function (result) {
            console.log(result, 'result9')
            getUsermessage(userPageNum.innerHTML, ueserPage);
        },
        error: function (err) {
            console.log(err)
        }
    })

}
var userChangeBoxShadow = document.getElementById("userChangeBoxShadow");
var userChangeHidden = document.getElementById("userChangeHidden");
var changeuserOrderagin = document.getElementById("changeuserOrderagin");
// 获取修改输入框里面的内容
var changeuserIDinput = document.getElementById("changeuserIDinput");
var changeuserAgeinput = document.getElementById("changeuserAgeinput");
var changeuserGenderinput = document.getElementById("changeuserGenderinput");
var changeuserAllsoresinput = document.getElementById("changeuserAllsoresinput");

// 获取修改的元素
// 绑定的修改的方法
function changeUserAllthings(userall) {
    userChangeBoxShadow.style.display = "";
    userChangeHidden.style.display = "";
    // console.log(changeuserIDinput,'changeuserIDinput');
    // console.log(userall.parentElement.parentElement.children[0].innerHTML);
    changeuserIDinput.value = userall.parentElement.parentElement.children[0].innerHTML;
    changeuserAgeinput.value = userall.parentElement.parentElement.children[1].innerHTML;
    changeuserGenderinput.value = userall.parentElement.parentElement.children[2].innerHTML;
    changeuserAllsoresinput.value = userall.parentElement.parentElement.children[3].innerHTML;

}
// 将内容赋给
changeuserOrderagin.onclick = function () {
    changeNewUser(changeuserIDinput.value, changeuserAgeinput.value, changeuserGenderinput.value, changeuserAllsoresinput.value);
}
var rightchangeuserOrderagin = document.getElementById("rightchangeuserOrderagin");
rightchangeuserOrderagin.onclick = function () {
    userChangeBoxShadow.style.display = "none";
    userChangeHidden.style.display = "none";
    getUsermessage(userPageNum.innerHTML, ueserPage);

}
var returnBack = document.getElementById("returnBack");
returnBack.onclick = function () {
    if (confirm("确定要删除此用户信息？")) {
        window.localStorage.clear();
    }
}

