
//代码内聚度不够
(function(){
    "use strict";
  var obj;
  var snow={
		windows:{
		    getAvailWidth:function(){
		        return window.screen.availWidth;
		    },
		    getAvailHeight:function(){
		        return window.screen.availHeight;
		    },
		    checkBrowser:function(){
		       var BROWSER;
		       var identify;
		       var arr=[];
               var ntrident=navigator.userAgent.lastIndexOf("Trident");
               var nfirefox=navigator.userAgent.lastIndexOf("Firefox");
               var nchrome=navigator.userAgent.lastIndexOf("Chrome");
               if(ntrident==52){
                BROWSER="Trident";
                identify="IE";
                arr.push(BROWSER);
                arr.push(identify);
                return arr;
               }
               if(nfirefox==53){
                BROWSER="Gecko";
                identify="Mozilla Firefox";
                arr.push(BROWSER);
                arr.push(identify);
                return arr;
               }
              if(nchrome==68){
                BROWSER="WebKit ";
                identify="Chrome";
                arr.push(BROWSER);
                arr.push(identify);
                return arr;
               }
              else
                BROWSER="WebKit ";
                identify="Apple";
                arr.push(BROWSER);
                arr.push(identify);
                return arr;
		    }
		 },
		domSelector:{
            idSelector:function(idName){
             return document.getElementById(idName);
              },
            tagSelector:function(tagName){
             return document.getElementsByTagName(tagName);
              },
            classNameSelector:function(className){
                var allObj=document.getElementsByTagName("*");
                var arrObj    =[];
                var allLength=allObj.length;
                if(document.getElementsByClassName)
                {
                   for(var i=0;i<allLength;i++){
                     if(allObj[i].className !==undefined && allObj[i].className==className)
                         arrObj.push(allObj[i]);
                  }
                    return arrObj;
                }
              else{
                    return document.getElementsByClassName(className);
                  }
                },
                //use link tag add CSS file asynchronous（异步）;
            addCSSFile:function(parentNode,src){
                   var linkElement=document.createElement("link");
                       linkElement.type="text/css";
                       linkElement.rel="stylesheet";
                       linkElement.href=src;
                       parentNode.appendChild(linkElement);
            },
            //查看jquery是如何处理ele_attr中的元素的。
            appendTo:function(fath_id,ele_tagName,ele_attr){
                var objfath=this.idSelector(fath_id);
                var tagEle=document.createElement(ele_tagName);
                    tagEle.id    =ele_attr.id;
                    tagEle.src   =ele_attr.src;
                    tagEle.style.width =ele_attr.width;
                    tagEle.style.height=ele_attr.width;
                    tagEle.style.top=Math.round(Math.random()*(snow.windows.getAvailHeight()))+"px";
                    tagEle.style.position="fixed";
                    tagEle.style.left=Math.round(Math.random()*(snow.windows.getAvailWidth()))+"px";
                    tagEle.style.zIndex=10;
                    objfath.appendChild(tagEle);
                    return tagEle;
               },
               //这里有一些问题，有待解决
            appendLi:function(fath_id,n,tagName){
                var  objfath=this.idSelector(fath_id);
                var window_h=snow.windows.getAvailHeight();
                var window_w=snow.windows.getAvailWidth();
                //为保证形状为正方形，每个li元素的长和宽都是相等的。
                var   grid_h=Math.round(window_h/n);
                var m=0;
                var nhorizon=Math.round(window_w/grid_h);
                var liEle=document.createElement(tagName);
                    liEle.style.width=grid_h+"px";
                    liEle.style.height=grid_h+"px";
                    liEle.style.border="2px solid #000";
                //var length=nhorizon*n;
                   for(var i=0;i<nhorizon;i++)
                   {
                     //for(var l=0;l<nhorizon;l++);
                      m+=grid_h;
                      liEle.style.left=m+"px";
                      liEle.id=i;
                      objfath.appendChild(liEle);
                    }
               },
		        show:function(className,bool){
		           var target=snow.domSelector.classNameSelector(className);
		           if(bool===false)
		           {
		           for(var i=0;i<target.length;i++)
		               target[i].style.visibility="hidden";
		           }
		          else{
		              for(var l=0;l<target.length;l++){
		               target[l].style.visibility="visible";
		             }
		           }
			     }
			       },
	    getStyleValue:function(obj,styleAttr){
                   if(obj.currentStyle)
                     return parseInt(obj.currentStyle[styleAttr],10);
                   else
                     return parseInt(window.getComputedStyle(obj)[styleAttr],10);
	       },
        moveOut:function(id){
                   obj     = this.Dom.idSelector(id);
                   obj.move=false;
               var top     =snow.getStyleValue(obj,"top");
               var height  =obj.offsetHeight;
                   function move_1(){
                       obj.style.top=(--top)-10+"px";
                       if(top<-height+20)
                       {
                      clearInterval(id_out);
                      obj.move=true;
                    }
                  }
                  var id_out=setInterval(move_1,20);
              },
        moveIn:function(id){
          var move_2;
          if(obj.move===true){
                   obj     = this.Dom.idSelector(id);
               var top     =snow.getStyleValue(obj,"top");
                move_2=function(){
                      obj.style.top=(++top)+10+"px";
                      if(top>0)
	                      {
	                        clearInterval(id_In);
	                      }
                        };
                        var id_In=setInterval(move_2,20);
                }
                    else
                     obj.move=false;
                      return;
          },
	    snow_down:function(id,num,minSpeed,maxSpeed,urlSnowPic)
	      {
            var tagName ="img";
            var window_h=snow.windows.getAvailHeight();
            var that=this;
            function createElement(id,num){
                  var aElement=[];
                  var attr_1  ={};
                  var sigEle;
               for(var i=0;i<num;i++)
				  {
                    attr_1.id   =id+"_"+i;
				    attr_1.width=Math.round(5*Math.random())+5+"px";
				    attr_1.src  =urlSnowPic;
					sigEle      =that.domSelector.appendTo(id,tagName,attr_1);
					aElement.push(sigEle);
				   }
				  return aElement;
            }
	        function move(obj){
		            var top    =snow.getStyleValue(obj,"top");
		                obj.top=top;
                 function moveSnowSig(){
                 var  opacity;
		         var  speed=Math.round(minSpeed+Math.random()*(maxSpeed-minSpeed));
		              obj.top=obj.top+speed;
                      obj.style.top=obj.top+"px";
		              if(obj.top>window_h+150)
		              {
		                 obj.style.top=-20+"px";
		                 obj.top=-20;
		                 obj.style.left=Math.round(Math.random()*(snow.windows.getAvailWidth))+"px";
		                 opacity=Math.random()+0.3;
		                 opacity=opacity>=1?1:opacity;
		                 obj.style.opacity=1;
		              }
		            }
	             setInterval(moveSnowSig,30);
	           }
	        var element=createElement(id,num);
            var eLength=element.length;
            for(var i=0;i<eLength;i++){
                 move(element.pop());
            }
	      },
      readMode:function(event,arEvtObj,arTarObj){
	              var arEvtLength=arEvtObj.length;
	              var arTarLength=arTarObj.length;
               function opacityOther(i,that){
                     var arTarObj_s;
                     var numId=parseInt((that.id),10);
                     var doc,tem;
                     var iframe=snow.Dom.idSelector("iframe");
                     for(i=0;i<arTarLength;i++)
                     {
                       if(i!=numId){
                          arTarObj[i].style.visibility="hidden";
                          arTarObj[i].style.zIndex=100;
                        }
                       else{
                            snow.Dom.idSelector("iframe_wrap").style.display="block";
                            doc = iframe.contentDocument ;//|| iframe.contentWindow.document;
                            tem=doc.body;
                            //实现深拷贝，false为浅拷贝
                            arTarObj_s=arTarObj[i].cloneNode(true);
                            if(tem.children.length!==0){
                               tem.removeChild(tem.children[0]);
                               tem.appendChild(arTarObj_s);
                               }
                            else{
                               tem.appendChild(arTarObj_s);
                            }  
                        }
                    }
                }
                //这个地方有问题，如果没有锚固点呢？
                function app(){
                   var that=this;
                       opacityOther(l,that);
                 }
                for(var l=0;l<arEvtLength;l++){
                     arEvtObj[l].addEventListener(event,app,false);
                   }
                },
	       //该函数实现关闭自身，或者是关闭其他元素
	    close:function(evt,eventObj,targetObj){
           var close_1;
           var close_2;
           var argument=arguments.length;
           var content=argument[2].getAttribute("class");
           switch(argument)
             {
            //注意使用了throw之后，就不要使用break了。因为throw和break的意思是差不多的。
                  case 1:
	                   throw new Error("parameters is less");
                  case 3:
                     close_1=function(){
	                    targetObj.style.display="none";
	                    snow.Dom.show(content,true);
	                  };
	                  eventObj.addEventListener(evt,close_1,false);
	                  break;
                  case 2:
					 close_2=function(){
	                    this.style.display="none";
	                    snow.Dom.show(content,true);
	                  };
	                eventObj.addEventListener(evt,close_2,false);
                     break;
                 default:
                    throw new Error("parameters is too much");
             }
	      },
	      Browser_check:function(){
               var astr=snow.windows.checkBrowser();
               var str="<img src=\"picture/"+astr[1]+".png\""+"/>"+"<div>"+"<p>"+astr[0]+"</p>"+"</div>";
                   snow.Dom.idSelector("show_browser").innerHTML=str;
	      }
	      //元素必须设置了display，或者是visililty才能够使用；
	   };
	window.$=snow;
}());
window.onload=function(){
	"use strict";
	 var $=window.$;
  	 var arr_browser;
 	$.snow_down("snow",500,0,20)
	arr_browser=$.windows.checkBrowser();
    alert("您现在所使用的浏览器为"+arr_browser[1]+"浏览器,"+"或是以"+arr_browser[0]+"为内核的浏览器")
   };
