var drizzle = document.querySelector('#box1');
var display1 = document.querySelector('.index-r');
var header = document.querySelector('header');
var ad = document.querySelector('#ad');
var blog = document.querySelector('#welcomePage');
var oldwidth;

function headerChange() {
    window.onscroll = function() {    
        var h1 = document.querySelectorAll('header h1');
        
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
            if(document.querySelectorAll('#ad-img').length > 0)
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

function display(){
    window.onload = function() {
        blog.style.maxHeight = 2/3 * blog.offsetWidth + 'px';
    }
    window.onresize = function() {
        blog.style.maxHeight = 2/3 * blog.offsetWidth + 'px';
    }
    drizzle.onmouseover = function() {
        if(document.querySelectorAll('#display-img').length === 0){
            var img = document.createElement('img');
            img.id = 'display-img';
            img.setAttribute('src', 'images/drizzle.png');
            display1.appendChild(img);
        }
    }
    
    drizzle.onmouseout = function() {
        var img = document.querySelector('#display-img');
        display1.removeChild(img);
    }
}

headerChange();
display();
