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
            //fontSize:4.1+'rem'
        },
        h11Style:{
            //fontSize:2.3+'rem'
        },
        adStyle:{
            color:'rgba(255,255,255,0)',
            height:0
        },
    },
    methods:{
        mouseOver:function() {
            this.seen = true;
        },
        mouseOut:function() {
            this.seen = false;
        },
        scroll:function() {
            if(this.flag) {
                this.flag = false;
                setTimeout(function(){
                    this.flag = true;
                }.bind(this),100);  //限制scroll事件频繁触发回调操作,至于延迟过高导致功能不灵敏的原因不太清楚，经测试，和操作DOM的速度应该有比较大的关系。
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
        welcomePageStyle:{
            boxShadow:String,
        },
    },
    methods:{
        scroll:function() {
            if (document.documentElement.scrollTop > 100)
                this.welcomePageStyle.boxShadow = 'inset 0 -90vh ' + String(this.shadowValue()*0.8) + 'px rgba(0,0,0,' + String(0.15+this.shadowValue()/900) + ')';
            else
                this.welcomePageStyle.boxShadow = ''; 
        },
        shadowValue:function() {
            return (document.documentElement.scrollTop - 100);
        }
    },
    mounted:function() {
        window.addEventListener('scroll',this.scroll)
    }
});

//box1----------------------------------------------------------------
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
    /*window.onload = function() {
        welcomePage.style.maxHeight = 2/3 * welcomePage.offsetWidth + 'px';
    }
    window.onresize = function() {
        welcomePage.style.maxHeight = 2/3 * welcomePage.offsetWidth + 'px';
    }*/