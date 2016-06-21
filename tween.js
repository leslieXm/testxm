/**
 * Created by Administrator on 2016/5/14.
 */
var zhufengEffect={
    linear:function(t,b,c,d){
        return (t/d)*c+b
    }
};

function animate(ele,obj,duration,effect){
    var fnEffect=zhufengEffect.linear;
    var oBegin={};
    var oChange={};
    var flag=0;

    for(var attr in obj){
        var begin=animate.getCss(ele,attr);
        var target=obj[attr];
        var change=target-begin;

        if(change){
            oBegin[attr]=begin;
            oChange[attr]=change;
            flag++
        }
    }
      if(!flag) return;

    var times=0;
    var interval=15;
    clearInterval(ele.timer);
    function step(){
        times+=interval;
        if(times<duration){
            for(var attr in oChange){
                var begin=oBegin[attr];
                var change=oChange[attr];
                var val=fnEffect(times,begin,change,duration);
                animate.setCss(ele,attr,val)
            }

        }else{
            for(var attr in oChange){
                var target=obj[attr];
                animate.setCss(ele,attr,target)
            }
            clearInterval(ele.timer);
            ele.timer=null
        }
    }
    ele.timer=setInterval(step,interval)
}
animate.getCss=function(ele,attr){
    if("getComputedStyle" in window){
        return parseFloat(window.getComputedStyle(ele,null)[attr]);
    }else{
         if(attr=="opacity"){
             var val=ele.currentStyle["filter"];
             var reg=/alpha\(opacity=(\d+(?:\.\d+)?)\)/;
             if(reg.test(val)){
                 return RegExp.$1/100;
             }else{
                 return 1;
             }
         }
    }
};

animate.setCss=function(ele,attr,val){
    if(attr=="opacity"){
        ele.style.opacity=val;
        ele.style.filter="alpha(opacity="+val*100+")"
    }else{
        ele.style[attr]=val+"px";
    }
};