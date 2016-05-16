function RowPhoto() {
  this.initialize.apply(this, arguments);
}


RowPhoto.prototype = {
  constructor: RowPhoto,
  /**
   * [initialize 初始化操作]
   * @param  {[json]} options [minRowHeight 规定的最低行高，
   *                           container  装木桶图片的嘴歪container class，]
   * @return {[type]}          box  每一个小box的class，]
   */
  initialize: function(options) {
    this.minRowHeight = options.minRowHeight?options.minRowHeight : 260;
    var container = options.container ? options.container : '.photo-container';
    this.container = document.querySelector(container);
    var boxes = options.box ? options.box : ".photo-box";
    this.boxes = document.querySelectorAll(boxes);
    this.rowsConfig = [];
    var that = this;
    window.onload = function(){
       that.initPercent();
    that.boxesDistribution();
    that.initRows();
    }
   
  },

  getStyle:function(obj,attr){
    return getComputedStyle(obj,false)[attr];
  },

  /**
   * [initPercent 计算每个box的宽高比例，之后可以根据此percent在不改变图片比例的情况下调整大小]
   * @return {[type]} [description]
   */
  initPercent: function() {
    var len = this.boxes.length;
    for (var i = 0; i < len; i++) {
      this.boxes[i].percent = this.boxes[i].clientWidth / this.boxes[i].clientHeight ;
    }
  },

  /**
   * [boxesDistribution 进行box的分配，即哪个box应该数据哪一个row，
   *                    思路是 当box相加的宽度第一次大于container宽度时，重新计算宽高比，使得这些宽的总和
   *                    与container相同；
   *                    在这里使用this.rowsConfig来保存相关信息
   * ]
   * @return {[type]} [description]
   */
  boxesDistribution: function() {

    var containerWidth = this.container.clientWidth;

    var allWidth = 0;
    var len = this.boxes.length;
    var rows = [];
    var height;
    var width;
    var complete = false;
    for (var i = 0; i < len; i++) {
      complete = false;
      /*console.log(i);*/
      rows.push(i);
     /* console.log(rows);*/
      this.boxes[i].style.height = height = this.minRowHeight + "px";
      height = height.slice(0,-2);
      this.boxes[i].style.width = width = (height * this.boxes[i].percent) + "px";
      allWidth += width.slice(0,-2) *1;
   /*   console.log("allWidth:" + allWidth)*/
      if (allWidth > containerWidth) {
/*        console.log("allWidth:" + allWidth);*/
        var percent = containerWidth / allWidth;
  /*      console.log(percent);*/
        height = this.minRowHeight * percent;
   /*     console.log(height);*/
        //代表这个rows的高度和里面的box内容
        this.rowsConfig.push({
          "rowsBox": rows,
          "height": height,
        });
        rows = [];
        allWidth = 0;
        complete = true;
        continue;
      }
    }
    if(!complete){
       this.rowsConfig.push({
          "rowsBox": rows,
          "height": this.minRowHeight,
        });
    }
    
  },

  /**
   * [initRows 通过计算了box的归属情况再来动态生成row，并且将box放入row中]
   * @return {[type]} [description]
   */
  initRows: function() {
    this.container.innerHTML = "";
    var len = this.rowsConfig.length;
    var fragment = document.createDocumentFragment();
    for(var i = 0 ; i < len; i ++){
      var row = document.createElement("div");
      row.className = "photo-row";
      row.style.height = this.rowsConfig[i].height + "px";
      row.style.width = "auto";
      this.rowAppendBox(row,i);
      fragment.appendChild(row);
    }
    this.container.appendChild(fragment);
  },

  /**
   * [rowAppendBox 将该row对应的box添加到该row中]
   * @param  {[type]} div   [description]
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  rowAppendBox:function(div,index){
    var config = this.rowsConfig[index].rowsBox; 
    console.log("config:" + config);
    var len = config.length;
    for(var i = 0 ; i < len ; i++){
      var box = this.boxes[config[i]]
      box.style.height = this.rowsConfig[index].height + "px";
      box.style.width = this.rowsConfig[index].height * this.boxes[config[i]].percent + "px";
      console.log(box.style.height + "   " + box.style.width);
      div.appendChild(box);
    }
  }, 

}