function Calendar(){
			//有一个initialize函数来进行初始化操作，这里要学习
			this.initialize.apply(this,arguments);
		}

		//如果要写多个prototype最好将其封装到对象之中
		Calendar.prototype = {
			constructor:Calendar,
			templateHeader:'<div class="date-header" id="date-header">' +
				
					'<span  id="preYear"><<</span>'+
					'<span  id="preMonth"><</span>'+
					'<span style="width: auto;" id="yearMonth"><2016年6月</span>'+
					'<span  id="nextMonth">></span>'+
					'<span  id="nextYear">>></span>'+
				
			'</div>'+
			'<div class="date-title">'+
				'<span>日</span>'+
				'<span>一</span>'+
				'<span>二</span>'+
				'<span>三</span>'+
				'<span>四</span>'+
				'<span>五</span>'+
				'<span>六</span>'+
			'</div>',

			//boolean表示是否有day的选择
			/**
			 * [从时间推算出年，月，日，这个月有多少天，并且第一天从周几开始]
			 * @param {[type]} sDate   [每次调整时间输入的时间]
			 * @param {[type]} boolean [表示是否有day的选择,只有当前日期为日历的显示面板月份时才有用]
			 */
			addDateContent:function(sDate,boolean){
				this.dateContent = [];
				/*var date = sDate.split('-');*/
				this.year = sDate.getFullYear();       //得到year年份
				this.month = sDate.getMonth();	  	   //得到月份，从0开始
				if(boolean){
					this.day = sDate.getDate();		       //得到几号
				}
				else{
					this.day = null;
				}
				
				var oDate = new Date();

				oDate.setYear(this.year);
				oDate.setMonth(this.month);
				oDate.setDate(0);
				this.week = (parseInt(oDate.getDay()) + 1)%7;   //得这个月第一天是周几     
				oDate.setMonth(parseInt(this.month)+1);
				oDate.setDate(0);
				this.allDay =  oDate.getDate();       //得到这个月一共有多少天
				/*console.log("这个月的天数" + this.allDay);*/
			},

			/**
			 * [通过addDateContent的内容将数据渲染到面板上]
			 * @return {[type]} [description]
			 */
			renderDate:function(){
				var content = null;
				//得到容器
				if(!this.container){
					this.container = document.createElement("div");
					this.container.className = "date-wrapper";
					this.container.id = "date-wrapper";
					
				}
				
				this.container.innerHTML = this.templateHeader;
				this.container.style.left =  this.input.offsetLeft  + "px";
				this.container.style.top = ( this.input.offsetTop + parseInt(this.getStyle(this.input,"height")) + 8)  + "px";
			
				this.content = document.getElementById("date-body");
				if(this.content){
					this.content.innerHTML = "";
				}
				else{
					//创建盛装日期的容器
					this.content = document.createElement("div");
					this.content.className = "date-body";
					this.content.id = "date-body";
				}
				
				var d = this.week;
				d = parseInt(d)*35;
				
				if(this.day == 1){
					this.content.innerHTML += "<span class='color-ful' style='margin-left:" + d + "px'>" + 1 + "</span>"
				}
				else{
					this.content.innerHTML += "<span style='margin-left:" + d + "px'>" + 1 + "</span>"
				}
				for(var i = 2 ; i <= this.allDay; i++){
					if(i == this.day){
					this.content.innerHTML += "<span class='color-ful'>" + i + "</span>";
					}
					else{
						this.content.innerHTML += "<span>" + i + "</span>";
					}
					
				}
				this.container.appendChild(this.content);
				this.input.parentNode.appendChild(this.container);
				var c = document.getElementById("yearMonth");
				c.innerHTML = this.year + '年' + (parseInt(this.month)+1) + '月';

			},

			/**
			 * [当点击input意外的事件remove面板]
			 * @return {[type]} [description]
			 */
			removeDate:function(){
				if(this.container){
					this.container.parentNode.removeChild(this.container);
					this.container = null;
				}
				
			},

			/**
			 * [点击事件的处理，input,pre,next,精确事件以及外部的事件控制，这里值得注意的是最好不要用onclick
			 * 事件，因为onclick多个事件会覆盖掉，最好使用bind]
			 * @return {[type]} [description]
			 */
			clickEvent:function(){
				
				var that = this;
				this.bind(document,"click",function(e){
					var oEvent = window.event || e;
					var target = oEvent.srcElement || oEvent.target;
					var dateHeader = null;
					var dateBody = null;
					if(that.container){
						var dateHeader = that.getElement(that.container,"date-header");
						var dateBody = that.getElement(that.container,"date-body");
					}

					if(target == that.input){
						if(that.input.value){
							var d = new Date();
							d.setYear(that.year);
							d.setMonth(that.month);
							d.setDate(that.day);
							that.addDateContent(d,true);
							that.renderDate();
						}
						else{
							var d = new Date();
							that.addDateContent(d,true);
							that.renderDate();
						}
						
					}

					else if(target.parentNode == dateHeader){
						if(target.id == "preYear"){
							var d = new Date();
							d.setYear(that.year - 1);
							d.setMonth(that.month);
							that.addDateContent(d);
							that.renderDate();
						}
						else if(target.id == "preMonth"){
							var d = new Date();
							d.setYear(that.year);
							d.setMonth(that.month-1);
							that.addDateContent(d,false);
							that.renderDate();
						}
						else if(target.id == "nextMonth"){
							var d = new Date();
							d.setYear(that.year);
							d.setMonth(that.month+1);
							that.addDateContent(d,false);
							that.renderDate();
						}
						else if(target.id == "nextYear"){
							var d = new Date();

							d.setYear(that.year + 1);
							d.setMonth(that.month);
							that.addDateContent(d);
							that.renderDate();
						}
						else{

						}
					}
					else if(target.parentNode == dateBody){
						if(target.nodeName = "SPAN"){
							var b = that.dateFormat(that.year,that.month,target.innerHTML);
							that.input.value = b;
							that.removeDate();
						}
					}
					//点击出现与否
					else{
						that.removeDate();
					}
					return false;
				});

			},

			/**
			 * [将选中的事件显示在input中]
			 * @param  {[type]} year  [description]
			 * @param  {[type]} month [description]
			 * @param  {[type]} day   [description]
			 * @return {[type]}       [description]
			 */
			dateFormat:function(year,month,day){
				this.day = day;
				this.year = year;
				this.month = month;
				month++;
				if(month < 10){
					month = "0" + month;
				}
				if(day < 10){
					day = "0" + day;
				}
				day = year + "-" + month + "-" + day;
				return day;
			},

			/**
			 * [这里的一大收获，将初始化的函数全部写在initialize函数中，就不用在构造函数中逐一书写了]
			 * @param  {[type]} options [传递进来的一个json兑对象]
			 * @return {[type]}         [description]
			 */
			initialize:function(options){
				this.input = options.input;
				this.dateContent = [];
				this.container = null;
				this.clickEvent();
			},

			/**
			 * [事件绑定，值得学习的是this指向的问题解决和阻止冒泡的解决，参照VQuery中的实现]
			 * @param  {[type]} node    [description]
			 * @param  {[type]} type    [description]
			 * @param  {[type]} handler [description]
			 * @return {[type]}         [description]
			 */
			bind: function (node, type, handler) {
		        if (node.addEventListener) {
		            node.addEventListener(type, handler, false);
		        } else if (node.attachEvent) {
		            node.attachEvent('on' + type, function(){
		            	return handler.call(node);
		            });
		        } else {
		            node['on' + type] = handler;
		        }
		    },

		    /**
		     * [获取parent下class为指定class的元素]
		     * @param  {[type]} parent [description]
		     * @param  {[type]} id     [description]
		     * @return {[type]}        [description]
		     */
		    getElement:function(parent,className){
		    	var array = parent.getElementsByClassName(className);
		    	for(var i = 0 ; i < array.length ; i++){
		    		if(array[i].parentNode == parent){
		    			return array[i];
		    		}
		    	}
		    	return null;
		    },

		    getStyle:function(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}
			else{
				return getComputedStyle(obj,false)[attr];
			}
		},

	}