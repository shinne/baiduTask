function ShinneImg(){
	this.initialize.apply(this,arguments);
}

ShinneImg.prototype = {
	constructor:ShinneImg,
	
	render:function(){
		var aDivs = this.wrappers;
		console.log(aDivs.length)
		for(var i = 0 ; i < aDivs.length ; i++){
			var children = aDivs[i].children;
			console.log(children);
			if(children.length == 3){
				this.renderThreeImgs(children);
			}
			else if(children.length == 5){
				this.renderFiveImgs(children);
			}
		}
	},

	getDivs:function(){
		var aDivs = document.getElementsByClassName("shinne-img");
		this.wrappers = aDivs;
	},

	renderThreeImgs:function(imgs){
		var height = imgs[1].offsetHeight;
		var width = height;
		var bigWidth = imgs[1].parentNode.offsetWidth - width;
		imgs[0].style.width = bigWidth + "px";
		imgs[1].style.width = width + "px";
		imgs[1].style.left = bigWidth + "px";
		imgs[2].style.width = width + "px";
		imgs[2].style.left = bigWidth + "px";
		console.log("three" + height);
	},

	renderFiveImgs:function(imgs){
		var height = imgs[1].offsetHeight;
		var width = height;
		var bigWidth = imgs[1].parentNode.offsetWidth - width;
		imgs[0].style.width = bigWidth + "px";
		imgs[1].style.width = width + "px";
		imgs[1].style.left = bigWidth + "px";
		imgs[2].style.width = width + "px";
		imgs[2].style.top = width + "px";
		imgs[2].style.height = b =  imgs[1].parentNode.offsetHeight - width + "px";
		imgs[2].style.left = bigWidth + "px";
		imgs[3].style.width = bigWidth/2 + "px";
		imgs[3].style.left = bigWidth/2 + "px";
		imgs[4].style.width = bigWidth/2 + "px";
	},

	//初始化函数
	initialize:function(options){
		this.wrappers = [];
		this.getDivs();
		this.render();
	},
}