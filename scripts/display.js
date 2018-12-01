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

//main------------------------------------------------------------------
var main = new Vue({
    el:'main',
    data:{
        page:'page0',
        img:'img0',
        interval:Number,
        per:0,
        flag:0,
        myWorksImgSeen:false,
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
        pageCut:function () {
            this.per = 0;
            this.flag += 1;
            if(this.flag > 2) {
                this.flag = 0;
            }
            this.page = 'page' + this.flag;
            this.img = 'img' + this.flag;
        },
        mouseOver:function () {
            this.myWorksImgSeen = true;
        },
        mouseOut:function () {
            this.myWorksImgSeen = false;
        }
    },
    components:{
        'page0':{
            template:`
            <div>
                <h1>天地无言，而通万物</h1>
                <p>WordPress博客页已搭建：移步<a href='https://blog.kavelaa.work' target='blank'>此处</a></p>
            </div>
            `
        },
        'img0':{
            template:'<img src="images/mountain0.jpg"/>'
        },
        'page1':{
            template:`
                <div>
                    <h1>test</h1>
                </div>
            `
        },
        'img1':{
            template:'<img src="images/mountain1.jpg"/>'
        },
        'page2':{
            template:`
                <div>
                    <h1>生为出众，何必费力合群</h1>
                    <p>
                        <a style='text-decoration:none;' href='https://www.bilibili.com/video/av36582243/' target='_blank'>▷</a>
                        《Stand Out Fit In》 - ONE OK ROCK
                    </p>
                </div>
            `
        },
        'img2':{
            template:`
                <video autoplay loop width='100%'>
                    <source src='images/SOFI.webm' type='video/webm' />
                </video>
            `
        },
        'progressBar':{
            props:['id'],
            data:function () {
                    return{
                        width:Number,
                        height:4
                    }
            },
            template:`
                <div>
                    <canvas :id='id' ref='ctx' :width='width' :height='height'></canvas>
                </div>
            `,
            methods:{
                pageToggle:function () {
                    var that = this.$root,
                    ctx = this.$refs.ctx.getContext('2d');
                    ctx.clearRect(0, 0, this.width, this.height);
                    if(that.per < 200) {
                        ctx.beginPath();    
                        ctx.strokeStyle = 'rgb(255,255,255)';
                        ctx.lineWidth = 3;
                        ctx.moveTo(0, this.height / 2);
                        ctx.lineTo(this.width/200*that.per, this.height / 2);
                        ctx.stroke();
                        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                        ctx.lineTo(this.width * 199 / 200, this.height / 2);
                        ctx.stroke();
                    }
                },
            },
            mounted() {
                var ctx = this.$refs.ctx.getContext('2d');
                this.width = this.$root.$refs.welcomeDiv.offsetWidth / 3;
                var interval = setInterval(function() {
                    if(this.id == 'bar' + String(this.$root.flag)) {
                        this.pageToggle();
                    }
                    else {
                        ctx.clearRect(0, 0, this.width, this.height);
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                        ctx.lineWidth = 3;
                        ctx.moveTo(0, this.height / 2);
                        ctx.lineTo(this.width, this.height / 2);
                        ctx.stroke();
                    }
                }.bind(this),25);
            },
        }
    },
    mounted:function () {
        if(this.$refs.welcomeDiv.offsetWidth < 1081)
            this.welcomePageStyle.maxHeight = 2/3 * this.$refs.welcomeDiv.offsetWidth + 'px';
        else {
            var interval = setInterval(function () {
                if(this.per == 200) {
                    this.per = 0;
                    this.flag += 1;
                    if(this.flag > 2) {
                        this.flag = 0;
                    }
                    this.page = 'page' + this.flag;
                    this.img = 'img' + this.flag;
                }
                this.per += 1;
            }.bind(this),50);
            this.interval = interval;
        }
        window.addEventListener('scroll',this.scroll);
        window.addEventListener('resize',this.resize);
    }
})