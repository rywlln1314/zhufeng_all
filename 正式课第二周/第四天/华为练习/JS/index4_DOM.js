var data = null;
var xhr = new XMLHttpRequest();
xhr.open('get', './JSON/data.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();
console.log(data);

var btn = document.getElementsByClassName('btn')[0];
var oUl = btn.getElementsByTagName('ul')[0];
var oLis = oUl.getElementsByTagName('li');

var con = document.getElementsByClassName('content')[0];
var conUl = con.getElementsByTagName('ul')[0];

function giveHtml(data) {
    var str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<li price="${data[i].price}" hot="${data[i].hot}" time="${data[i].time.toString().replace(/-/g, '')}">
            <div class="pic"><img src="${data[i].picImg}" alt=""></div>
            <h3 class="pub">${data[i].title}</h3>
            <div class="price pub"><b>价格：</b><span>￥${data[i].price}</span></div>
            <div class="eva pub"><b>评论数：</b><span>${data[i].hot}</span></div>
            <div class="time pub"><b>上架时间：</b><span>${data[i].time}</span></div>
        </li>`
    }
    conUl.innerHTML = str;
};
giveHtml(data);

var conLis = conUl.getElementsByTagName('li');
var liAry = utils.listToAry(conLis);

var ary = ['price', 'hot', 'time'];
var flag = 0;
for (let i = 0; i < oLis.length; i++) {
    oLis[i].onclick = function () {
        if (flag == 0) {
            liAry.sort(function (a, b) {
                return a.getAttribute(ary[i]) - b.getAttribute(ary[i])
            });
            flag = 1;
        } else {
            liAry.sort(function (a, b) {
                return b.getAttribute(ary[i]) - a.getAttribute(ary[i])
            });
            flag = 0;
        }
    liAry.forEach(function (item) {
        conUl.appendChild(item)
    })

    }


}