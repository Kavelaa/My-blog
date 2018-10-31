var oldwidth; //Global for ad.offsetWidth

function headerChange() {
    window.onscroll = function() {    
        var h1 = document.querySelectorAll('header h1');
        var ad = document.getElementById('ad');
        var header = document.getElementsByTagName('header')[0];
        /*var head = new Vue({
            el:'header',
            data:{
                seen:false
            },
            methods:{
                mouseOver:function() {
                    this.seen = true;
                },
                mouseOut:function() {
                    this.seen = false;
                }
            }
        })*/
        ad.onmouseover = function() {
            if(document.querySelectorAll('#ad-img').length === 0){
                var img = document.createElement('img');
                img.setAttribute('src', 'images/aliyun.png');
                img.id = 'ad-img';
                ad.appendChild(img);
            }
        }
        ad.onmouseout = function() {
            var img = document.querySelector('#ad-img');
            ad.removeChild(img);
        }

        if (document.documentElement.scrollTop > 150) {
            h1[0].style.fontSize = 2 + 'em';
            h1[1].style.fontSize = 1.2 + 'em';
            header.style.height = 7 + 'vh';
            header.style.lineHeight = 7 + 'vh';
            header.style.color = 'black';
            header.style.backgroundColor = 'rgba(255,255,255,0.9)';
            ad.style.backgroundColor = 'rgba(37, 42, 47, 1)';
            ad.style.height = 100 + '%';
            ad.style.color = 'rgba(255,255,255,1)';
            ad.firstElementChild.textContent = "云翼计划(享优惠)Supported by Aliyun";
            oldwidth = ad.offsetWidth;
        }
        else if (document.body.offsetWidth > 1080) {
            header.style.height = 0;
            header.style.lineHeight = 6 + 'rem';
            header.style.color = 'white';
            header.style.backgroundColor = 'rgba(255,255,255,0)';
            h1[0].style.fontSize = 4.1 + 'rem';
            h1[1].style.fontSize = 2.3 + 'rem';
            ad.style.color = 'rgba(37, 42, 47, 0)';
            ad.style.height = 0;
            ad.style.color = 'rgba(255,255,255,0)';
            ad.firstElementChild.textContent = '';
            ad.style.width = oldwidth + 'px';
        }
    }
}

function display() {
    var blog = document.getElementById('welcomePage');
    var box1 = new Vue({
        el:'#index-r',
        data:{
            seen:false
        },
        methods:{
            mouseOver:function() {
                this.seen = true;
            },
            mouseOut:function() {
                this.seen = false;
            }
        }
    });
    window.onload = function() {
        blog.style.maxHeight = 2/3 * blog.offsetWidth + 'px';
    }
    window.onresize = function() {
        blog.style.maxHeight = 2/3 * blog.offsetWidth + 'px';
    }
}

headerChange();
display();