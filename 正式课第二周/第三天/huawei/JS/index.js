var data = null;
var xhr = new XMLHttpRequest();
xhr.open('get','./json/data1.json',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();
console.log(data);
var oUl = document.getElementsByClassName('ul_box')[0];
var oBtn = document.getElementsByClassName('ul_btn')[0];
var btns = oBtn.getElementsByTagName('li');
function giveHtml(data){
    var str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<li>
            <div class="img_box"><img src="${data[i].picImg}"/>
            </div>
            <div class="til">${data[i].title}</div>
            <div class="price_box public_class">
                价格：<span>￥${data[i].price}</span>
            </div>
            <div class="desc_box public_class">
                评价数：<span>${data[i].hot}</span>
            </div>
            <div class="time_box public_class">
                上架时间：<span>${data[i].time}</span>
            </div>
        </li>`
    }
    oUl.innerHTML = str;
}
giveHtml(data);

var ary = ['price','hot','time'];
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
    data.sort(function (a,b) {
        return a[ary[i]].toString().replace(/-/g) - b[ary[i]].toString().replace(/-/g)
    });
    giveHtml(data);
};
}


// btns[0].onclick = function () {
//     data.sort(function (a,b) {
//         return a.price - b.price
//     });
//     giveHtml(data);
// };
// btns[1].onclick = function () {
//     data.sort(function (a,b) {
//         return a.hot - b.hot
//     });
//     giveHtml(data);
// };
// btns[0].onclick = function () {
//     data.sort(function (a,b) {
//         return a.time.replace(/-/g,'') - b.time.replace(/-/g,'')
//     });
//     giveHtml(data);
// };