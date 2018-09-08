/*
* 第一个块  loading
* */
let bell = $('#bell')[0],
    say = $('#say')[0],
    bgm = $('#bg_music')[0];

let loading = function () {
    //进度条加载完成后 要让 loading的这个块消失
    let $progressBar = $('.progress .progressBar'),
        $loadingBox = $('.loadingBox');
    //进度条的进度 是由 项目中所有图片加载完成 来决定的
    let ary = ['phone-bg.jpg',
        'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n = 0;// 记录 加载完成的图片个数
    ary.forEach((item)=>{
        let img = new Image();
        //让 临时的 img  去请求 图片
        img.src = `./images/`+item;
        // img.onload = function () {
        //     load()
        // }
        img.onload = load;
    });
    function load() {
        n++;
        if(n == ary.length){
            //所有图片加载完毕
            $progressBar.css({
                width: '100%'
            });
            $loadingBox.css({
                opacity: 0
            });
            let timer2 = setTimeout(function () {
                $loadingBox.hide();
                //第一个块隐藏 执行第二个块相关的内容
                phoneFn();
            },1800);
           /* let timer1 = setTimeout(function () {
                $loadingBox.css({
                    opacity: 0
                });
            },1000);*/
        }else {
            //没加载完
            $progressBar.css({
                width: n/ary.length*100 +'%'
            })
        }
    }
};
loading();

/*
* 第二个块  phoneFn
* */
let phoneFn = function () {
    let $phoneBox = $('.phoneBox'), // 整个第二个块
        $listenBox = $('.listen_box'), // 接听的盒子
        $listenBtn = $('.listenBtn'), // 接听的按钮
        $noListenBox = $('.no_listen_box'),// 挂机对应的盒子
        $noListenBtn = $('.no_listenBtn'), // 挂机键
        $timeBox = $('.phoneBox header h4');// 语音的时间
    // $listenBtn.on('touchend',)
    bell.play();
    // bell.addEventListener('canplay',function () {
    //     console.log(1)
    // },false);
    // bell.play();
    $listenBtn.tap(function () {
        //点击 接听按钮  让 接听的盒子隐藏 ；让挂机盒子升上来
        $listenBox.hide();
        $timeBox.show();
        $noListenBox.css({
            transform: 'translateY(0)'
        });
        bell.pause();
        say.play();
        //语音播放  怎么让上边的时间跟着变化
        let sayTimer = setInterval(function () {
            let t = say.currentTime;
            let str = '00:' + (Math.ceil(t) < 10 ? '0'+Math.ceil(t) : Math.ceil(t));
            $timeBox.html(str);
            //需要把say.currentTime  转成  00:34 这个格式的字符串

            //需要我们判断音频是否播放完毕； 若 播放完毕 ，则直接执行 挂机键执行的操作
            if(say.ended){
                clearInterval(sayTimer);
                phoneEnd();
            }
        },1000);
        //给挂机按钮绑定点击事件
        $noListenBtn.on('touchend',function () {
            say.pause();
            phoneEnd();
        });
        function phoneEnd() {
            let h = document.documentElement.clientHeight || document.body.clientHeight;
            // 获取到的是个以 px 为单位的 数字
            $phoneBox.css({
                transform:`translateY(${h}px)`
            });
            //设置个定时器  等待0.8s后触发 下一个(第三个)模块的函数
            setTimeout(function () {
                msgFn();
            },1000)
        }
    })
};

/*
* 第三个块  msgFn
* */

let msgFn = function () {
    //让每一个 li 先都透明 并且下移
    // 循环这些 li  让这些 li  轮着 升上去，并且显示出来
    let $msgBox = $('.msgBox'),
        $ul = $msgBox.children('ul'),
        $lis = $ul.children('li'),
        $keyboard = $msgBox.find('.keyboard'),
        $textBox = $keyboard.find('.textBox'),
        $btn = $keyboard.find('.btn');
    bgm.play();
    let h = 0,
        n = 0; //存储当前要显示的那个元素li的索引；
    let moveTimer = null;
    function move() {
        moveTimer = setInterval(function () {
            if(n == $lis.length){ // 若 已经走完 ； 则直接清除定时器
                clearInterval(moveTimer);
                return;
            }
            $lis.eq(n).css({
                transform:'translateY(0)',
                opacity:1
            });
            // ul向上移动  根据索引； 索引大于 3；就让 ul向上移动
            if(n >= 3){
                h += $lis[n].clientHeight;
                $ul.css({
                    transform:`translateY(-${h}px)`
                })
            }
            if(n == 2){
                $keyboard.css({
                    transform: 'translateY(0)'
                });
                clearInterval(moveTimer);
                //接下来 我们要让字体 一个一个的显示出来
                setTimeout(function () {
                    inputWord(); //这个是异步的  n已经变成了 3
                },1600);
                // inputWord(); // 这个是同步的  n就是 2
            }
            n++;
        },2000);
    };
    move();

    function inputWord() {
        //让字体一个一个的蹦出来
        // let str = $lis[n+1].innerText;// 要显示的全部内容
        let str = $lis[n].innerText;// 要显示的全部内容
        let str2 = '';// 当前要显示的字体内容
        let timer2 = null;
        let index = 0;// 控制当前要出来的那个字
        //现在 我们要让字体出现完成之后 再去让按钮显示
        timer2 = setInterval(function () {
            if(index == str.length){
                // 说明字已经全部显示完毕
                clearInterval(timer2);
                $btn.show();// 让 按钮显示
                $btn.tap(function () {
                    $textBox.html('');
                    $lis.eq(n).css({
                        opacity:1,
                        transform:'translateY(0)'
                    });// 让打出来的字 直接发送出去
                    h += $lis[n].clientHeight;
                    $ul.css({
                        transform:`translateY(-${h}px)`
                    });
                    n++;
                    $keyboard.css({
                        transform: 'translateY(7rem)'
                    });
                    move();
                }); // 点击按钮 要做  1清空textbox  2 让键盘下去 3 对话框接着弹
                return;
            }
            str2 += str[index];
            $textBox.html(str2);// 把 str2 的内容 放到页面上
            index++;
        },200)

    }

    /*$lis.each(function (index,item) {
        setTimeout(function () {
            $(item).css({
                opacity:1,
                transform:'translateY(0)'
            });
            if(index >= 3){
                h += item.clientHeight;
                $ul.css({
                    transform:`translateY(-${h}px)`
                })
            };
            if(index == 2){
                $keyboard.css({
                    transform:'translateY(0)'
                })
            }
        },index*2000)
    })*/
};