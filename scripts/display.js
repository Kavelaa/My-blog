//header-----------------------------------------------------------
var header = new Vue({
    el:'header',
    data:{
        seen:false,
        flag:true,
        oldwidth:0,
        firstFlag:0,
        adContent:'',
        headerStyle:{
            /*height:0,
            lineHeight:6 + 'em',
            color:'white',
            backgroundColor:'rgba(255,255,255,0)'*/
        },
        h10Style:{
            fontSize:String
        },
        h11Style:{
            fontSize:String
        },
        adStyle:{
            color:'rgba(255,255,255,0)',
            height:0
        },
    },
    methods:{
        mouseOver:function () {
            this.seen = true;
        },
        mouseOut:function () {
            this.seen = false;
        },
        scroll:function () {
            if(this.flag) {
                this.flag = false;
                setTimeout(function(){
                    this.flag = true;
                }.bind(this),120);  //限制scroll事件频繁触发回调操作,至于延迟过高导致功能不灵敏的原因不太清楚，经测试，和操作DOM的速度应该有比较大的关系。
                if (document.documentElement.scrollTop > 150) {
                    this.headerStyle = {
                        height: 7 + 'vh',
                        lineHeight: 7 + 'vh',
                        color: 'black',
                        backgroundColor: 'rgba(255,255,255,0.9)'
                    }
                    this.h10Style.fontSize = 2 + 'em';
                    this.h11Style.fontSize = 1.2 + 'em';
                    this.adStyle = {
                        backgroundColor: 'rgba(37, 42, 47, 1)',
                        height: 100 + '%',
                        color: 'rgba(255,255,255,1)'
                    }
                    this.adContent = '云翼计划(享优惠)Supported by Aliyun';
                    this.oldwidth = this.$refs.adDiv.offsetWidth;
                    this.firstFlag = 1;
                }
                else if (document.body.offsetWidth > 1080) {
                    this.headerStyle = {
                        height: 0,
                        lineHeight: 6 + 'rem',
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0)'
                    }
                    this.h10Style.fontSize = 4.1 + 'em';
                    this.h11Style.fontSize = 2.3 + 'em';
                    this.adStyle = {
                        height: 0,
                        color: 'rgba(255,255,255,0)'
                    }
                    this.adContent = '';
                    if(this.firstFlag) this.adStyle.width = this.oldwidth + 'px'; //else if会先于if触发，oldwidth初值会被赋给ad的width属性导致ad宽度始终为0，因此需要先把出现字体的宽度赋给oldwidth之后才能正常运作。
                }
            }
        }
    },
    mounted:function() {
        window.addEventListener('scroll',this.scroll);
    }
});

//banner------------------------------------------------------------------
var welcomePage = new Vue({
    el:'#welcomePage',
    data:{
        page:'page0',
        seen0:true,
        seen1:false,
        per:0,
        welcomePageStyle:{
            maxHeight:String
        },
        welcomePageShadowStyle:{
            boxShadow:String
        }
    },
    methods:{
        scroll:function () {
            if (document.documentElement.scrollTop > 100)
                this.welcomePageShadowStyle.boxShadow = 'inset 0 -90vh 0.7em rgba(0,0,0,' + String(0.15+this.shadowValue()/this.$refs.welcomeDiv.offsetHeight) + ')';
            else
                this.welcomePageShadowStyle.boxShadow = ''; 
        },
        resize:function () {
            this.welcomePageStyle.maxHeight = 2/3 * this.$refs.welcomeDiv.offsetWidth + 'px';
            console.log('rend suc')
        },
        shadowValue:function () {
            return (document.documentElement.scrollTop - 100);
        },
        imgToggle:function () {
            var that = this,
            ctx = document.getElementById('toggle').getContext('2d'),
            w = 300,
            h = 100,
            color = 'rgb(255,255,255)';
            function f5() {
                if(that.per == 200) {
                    that.per = 0;
                    that.seen0 = !that.seen0;
                    that.seen1 = !that.seen1;
                    if(that.page =='page0')
                        that.page = 'page1';
                    else
                        that.page = 'page0';
                }
                ctx.clearRect(0, 0, w, h);
                ctx.beginPath();    
                ctx.strokeStyle = color;
                ctx.lineWidth = 4;
                ctx.moveTo(0,h/2);
                ctx.lineTo(w/200*that.per,h/2);
                that.per += 1;
                ctx.stroke();
            };
            var interval = setInterval(function () {
                f5();
            },50);
        },
        imgCut:function () {
            this.per = 0;
            this.seen0 = !this.seen0;
            this.seen1 = !this.seen1;
            if(this.page =='page0')
                this.page = 'page1';
            else
                this.page = 'page0';
        }
    },
    components:{
        'page0':{
            template:`
            <div key='block'>
                <h1>天地无言，而通万物</h1>
                <p>WordPress博客页已搭建：移步<a href='https://blog.kavelaa.work' target='blank'>此处</a></p>
            </div>
            `
        },
        'page1':{
            template:`
                <div key='block'>
                    <h1>test</h1>
                </div>
            `
        }
    },
    mounted:function () {
        if(this.$refs.welcomeDiv.offsetWidth < 1081)
            this.welcomePageStyle.maxHeight = 2/3 * this.$refs.welcomeDiv.offsetWidth + 'px';
        else 
            this.imgToggle();
        window.addEventListener('scroll',this.scroll);
        window.addEventListener('resize',this.resize);
    }
});

//box----------------------------------------------------------------
var box = new Vue({
    el:'#index-r',
    data:{
        seen:false
    },
    methods:{
        mouseOver:function () {
            this.seen = true;
        },
        mouseOut:function () {
            this.seen = false;
        }
    }
})    