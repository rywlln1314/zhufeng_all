/*
* 第一块 loading
* */
let loading = function () {
    //进度条加载完成后 要让loading的这个快小时
    let $progressBar = $('.progress .progressBar'),
        $loading = $('.loading');
    //进度条的进度 是由项目中所有图片加载完成来决定的
    let ary = ['phone-bg.jpg',
        'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n = 0;//记录加载完成的图片个数
    ary.forEach((item)=>{
        let img = new Image();
        //让临时的img去请求 图片
        img.src = `./images/`+item;
        img.onload = function () {
            load();
        }
    });
    function load() {
        n++;
        if (n == ary.length){
            //说明说有图片加载完毕
            $progressBar.css({
                width:'100%'
            });
            let timer1 = setTimeout(function () {
                $loading.css({
                    opacity:0
                })
            },1000);
            let timer2 = setTimeout(function () {
                $loading.hide();
                phoneFn();
            },1800)

        } else{
            $progressBar.css({
                width: n/ary.length*100 + '%'
            })
        }
    }
};
loading();

/*
* 第二块  phoneFn
* */
let phoneFn = function () {
    let $phoneBox = $('.phone'),
        $listenBox = $('.listen'),
        $listenBtn = $('.listenBtn'),
        $noListenBox = $('.no_listen'),
        $noListenBtn = $('.no_listenBtn'),
        $timeBox = $('.phone header h4');
    $listenBtn.tap(function (e) {
        //点击接听按钮
        $listenBox.hide();
        $timeBox.show();
        $noListenBox.css({
            transform:'translateY(0)'
        });
        $noListenBtn.on('touchend',function () {
            let h = document.documentElement.clientHeight || document.body.clientHeight;
            $phoneBox.css({
                transform:`translateY(${h}px)`
            });
            //设置个定时器  等待0.8s后出发下一个模块的函数
            setTimeout(function () {
                msgFn()
            },800)
        })
    })
};

/*
* 第三块  masFn
* */
let msgFn = function () {
   //让每一个LI都先透明并且下移
   //然后循环这些li让这些li轮着升上去 并且显示出来
    let $msgBox = $('.msg'),
        $ul = $msgBox.children('ul'),
        $lis = $ul.children('li'),
        $keyboard = $msgBox.find('.keyboard'),
        $textBox = $keyboard.find('.textBox'),
        $btn = $keyboard.find('.btn');
    let h = 0,
        n = 0;//存储当前要显示的那个元素li的索引；
    console.log($ul);
    let moveTimer = setInterval(function () {
        if (n == $lis.length) {
            clearInterval(moveTimer);
            return
        }
        $lis.eq(n).css({
            transform:'translateY(0)',
            opacity:1
        });
        if (n >= 3){
            h += $lis[n].clientHeight;
            $ul.css({
                transform:'translateY(-${h}px)'
            })
        }
        if(n == 2){
            $keyboard.css({
                transform:'translateY(0)'
            });
            clearInterval(moveTimer);
        }
        n++;
    },2000);
    $lis.each(function (index,item) {
        setTimeout(function () {
           $(item).css({
               opacity:1,
               transform:'translateY(0)'
           });
           if (index >= 3){
               h += item.clientHeight;
               $ul.css({
                   transform:'translateY(-${h}px)'
               })
           }
           if (index == 2){
               $keyboard.css({
                   transform:'translateY(0)'
               })
           }
        },index*2000)
    })

};