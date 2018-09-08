/*
* 第一步 从后台获取数据
* */
var data = null;
function getData(){

    var xhr = new XMLHttpRequest();
    xhr.open('get','JSON/data.json',false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
            data = utils.toJson(xhr.responseText)
        }
    };
    xhr.send();
}
getData();
console.log(data);
/*
* 第二部 把数据 渲染 到页面上
* */
var box = document.getElementsByClassName('box')[0];
var oUls = box.getElementsByTagName('ul');
var ulAry = utils.toArray(oUls);//把类数组转成数组
var oImgs = document.getElementsByTagName('img');
function giveHtml(data){
    data.forEach(function (item,index) {
        /*
        * index 是从0到data.length;
        * 要直到每一条数据放到哪个ul里边；我们在这里，我们把前四条依次放到ul中
        * 后四条再一次放入四个ul中；这样依次进行就可以了
        * */
        var {pic,title,height} = item;//这个是对象的解构赋值
        var str = `<li>
            <img src="images/1.jpg" realSrc="${pic}" height="${height}" alt="">
            <p>${title}</p>
        </li>`;
        //这个是挨个排的，长短差距越来越大
        // var n = index%4;//0,1,2,3
        // oUls[n].innerHTML += str;

        //排的方式，换成给最矮的那个ul排数据
        getMinUl().innerHTML += str
    });
}
function giveHtml2(data){
    data.forEach(function (item,index) {
        /*
        * index 是从0到data.length;
        * 要直到每一条数据放到哪个ul里边；我们在这里，我们把前四条依次放到ul中
        * 后四条再一次放入四个ul中；这样依次进行就可以了
        * */
        var {pic,title,height} = item;//这个是对象的解构赋值
        var li = document.createElement('li');
        var str = `<li>
            <img src="images/1.jpg" realSrc="${pic}" height="${height}" alt="">
            <p>${title}</p>
        </li>`;
        //这个是挨个排的，长短差距越来越大
        // var n = index%4;//0,1,2,3
        // oUls[n].innerHTML += str;

        //排的方式，换成给最矮的那个ul排数据
        //getMinUl().innerHTML += str
        li.innerHTML = str;
        var temp = getMinUl();
        temp.appendChild(li)
    });
}
/*
* 找高度最低的ul  minUl
* */
function getMinUl(){
    ulAry.sort((a,b)=>{
        return a.clientHeight - b.clientHeight
    });
    return ulAry[0]
}
giveHtml2(data);


/*
* 接下来实现图片的懒加载；我们先用先把真是路径存放到img自定义属性上，给img一个默认的小图
* */
function loadImg(ele) {
    if (ele.loaded)return ;
    var srcT = utils.scrollT();
    var cliH = utils.clientH();
    var tarT = utils.offset(ele).t;
    if (srcT + cliH > tarT){
        var temp = document.createElement('img');
        var realSrc = ele.getAttribute('realSrc');//真是路径
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            ele.loaded = true;
            fadeIn(ele)
        };
        temp = null
    }
}
function loadAll(eles) {
    for (let i = 0; i < eles.length; i++) {
         loadImg(eles[i])
    }
}
loadAll(oImgs);
window.onscroll = function () {
    loadAll(oImgs);
    getMore();
};
/*
* 加载新数据
* */
function getMore() {
    var scrT = utils.scrollT();
    var cliH = utils.clientH();
    var temp = getMinUl();
    var tarT = temp.clientHeight + utils.offset(temp).t;
    //最低的ul的高度 + ul到body的距离；
    if (scrT + cliH > tarT){
        getData();
        giveHtml2(data);
    }
}
function fadeIn(ele) {
    ele.style.opacity = 0;
    var opa = 0.1;
    var timer = setInterval(function () {
        opa += 0.1;
        ele.style.opacity = opa;
        if (opa >= 1){
            clearInterval(timer);
            ele.style.opacity = 1;
        }
    },20)
}