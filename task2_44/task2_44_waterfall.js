function Waterfall(){
	this.initialize.apply(this,arguments);
}

Waterfall.prototype = {
	constructor:Waterfall,
	initialize:function(options){
		//代表有几列
		this.column = options.column ? options.column:1;
		this.columns = [];
		var container = options.container ? options.container:".waterfall-container";
		var box = options.box ? options.box:".waterfall-box";
		this.container = document.querySelector(container);
		this.box = document.querySelectorAll(box);
		this.initialColumns();
		var that = this;
		window.onload = function(){
			that.addBox(false);
		}
		
	},

	/**
	 * [getMinHeightColumnIndex 得到最矮的那个column元素的index]
	 * @return {[type]} [description]
	 */
	getMinHeightColumnIndex:function(){
		var min = 100000000000;
		var index = 0;
		for(var i = 0 ; i < this.column ; i++){
			var height = this.columns[i].offsetHeight;
			        console.log(this.columns[i]);
			        console.log(":" + this.columns[i].offsetHeight)
			if(height < min){
				/*console.log(i);*/
				index = i ;
				min = height;
			/*	console.log(height + "index:" + index );*/
			}
		}
		return index;
	},

	/**
	 * [initialColumns 根据column个数来进行waterfall-column的初始化]
	 */
	initialColumns:function(){
		var perWidth = (100/this.column) + "%";
		var oFragment = document.createDocumentFragment();
		for(var i = 0 ; i < this.column ; i++){
			var column = document.createElement("div");
			column.className = "waterfall-column";
			column.style.width = perWidth;
			column.style.overflow = "auto";
			oFragment.appendChild(column);
			this.columns.push(column);
		}
		this.container.innerHTML = "";
		this.container.appendChild(oFragment);
	},

	
	/**
	 * [addBox 在最矮的column元素里面添加图片]
	 * @param {[type]} addNew      [true表示只是添加一个box,false表示页面的所有box添加进来]
	 * @param {[type]} imgSrc      [图片的src]
	 * @param {[type]} description [图片的描述description]
	 */
	addBox:function(addNew,imgSrc,description){
		if(addNew){
			var index = this.getMinHeightColumnIndex();
			var img = document.createElement("img");
			img.src = src;
			var description = document.createElement("p");
			p.innerHTML = description;
			var box = this.createBox({
				"img":box,
				"description":description,
			});
			this.columns[index].appendChild(box);
		}
		else{
			for(var i = 0; i < this.box.length ; i ++){
				var index = this.getMinHeightColumnIndex();
				console.log(this.box[i]);
				this.columns[index].appendChild(this.box[i]);
			}
		}
		
	},


	/**
	 * @param  {[type]} content为json对象，里面包含img和description
	 * @return {[type]}
	 */
	createBox:function(content){
		var box = document.createElement("div");
		div.className = "waterfall-box";
		div.appendChild(content.img);
		div.appendChild(content.description);
		return box;
	}
}