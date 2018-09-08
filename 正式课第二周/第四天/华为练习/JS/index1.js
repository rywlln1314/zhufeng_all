var data = null;
var xhr = new XMLHttpRequest();
xhr.open('get','./JSON/data.json',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();
console.log(data);

var btns = document.getElementsByClassName('btn')[0];
var oLis = btns.getElementsByTagName('li');

var cons = document.getElementsByClassName('content')[0];
var oUl = cons.getElementsByTagName('ul')[0];

function giveHtml() {
    var str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<li>
            <div class="pic"><img src="${data[i].picImg}" alt=""></div>
            <h3 class="pub">${data[i].title}</h3>
            <div class="price pub"><b>价格：</b><span>￥${data[i].price}</span></div>
            <div class="eva pub"><b>评论数：</b><span>${data[i].hot}</span></div>
            <div class="time pub"><b>上架时间：</b><span>${data[i].time}</span></div>
        </li>`
    }
    oUl.innerHTML = str
}
giveHtml();
var flag = 0;
var ary = ['price','hot','time'];
for (let i = 0; i < oLis.length; i++) {
    oLis[i].onclick = function () {
        if (flag == 0) {
        data.sort(function (a,b) {
            return a[ary[i]].toString().replace(/-/g,'') - b[ary[i]].toString().replace(/-/g,'');
        });
        flag = 1;
        }else {
            data.sort(function (a,b) {
                return b[ary[i]].toString().replace(/-/g,'') - a[ary[i]].toString().replace(/-/g,'');
            });
            flag = 0;
        }
        giveHtml(data)
    };
}
