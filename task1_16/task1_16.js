/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var sCity;
var sValue;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var sCity = document.getElementById("aqi-city-input").value;
	var sValue = document.getElementById("aqi-value-input").value;
	//匹配中英文字符
	var reCity = /^\s*[\u4e00-\u9fa5_a-zA-Z]+\s*$/gi;
	//匹配数字
	var reValue = /-?\d+/gi;
	if(!reCity.test(sCity)){
		alert("城市名输入不正确，请重新输入！");
		return;
	}
	else if(!reValue.test(sValue)){
		alert("空气质量指数输入不正确，请重新输入！")
		return;
	}
	//将前后的空格去掉
	var sCity = sCity.replace(/(^\s*) | (\s*$)/g,'');
	sValue = sValue.replace(/(^\s*) | (\s*$)/g,'');
	console.log(sCity);
	console.log(sValue);

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var oBtn = document.getElementById("add-btn");
  oBtn.onclick = function(){
      addBtnHandle();
  }
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}
window.onload = function(){
	init();
}


