
var tools={
  //获取window的宽、高，做了兼容性处理
  windowSize(){
    if(window.innerHeight !== undefined){
      return {
        "width": window.innerWidth,
        "height": window.innerHeight
      }
    }else if(document.compatMode === "CSS1Compat"){
      return {
        "width": document.documentElement.clientWidth,
        "height": document.documentElement.clientHeight
      }
    }else{
      return {
        "width": document.body.clientWidth,
        "height": document.body.clientHeight
      }
    }
  },
  //获取滚动条的位置
  getScroll(obj){
    var scroll={X:0,Y:0}
    scroll.Y=obj.scrollTop || obj.pageYOffset ||0;
    scroll.X=obj.scrollLeft || obj.pageXOffset ||0;
    return scroll
  },
  
  iScroll(obj){
    var that = obj;
    var innerContent= that.children[0]
    var boxheight= that.clientHeight  //容器可见高度
    var conheight= innerContent.offsetHeight  //内容包含border
    
    var iScrollHeight = boxheight * ( boxheight / conheight)  //滚动条高度
    if(iScrollHeight > boxheight) return
    
    if(obj.children.length>1) return
    var vScrollbox= document.createElement('div')
    vScrollbox.setAttribute('class','vScrollBox')
    var scrollhandel= document.createElement('div') //滚动条
    scrollhandel.setAttribute('class','vScrollhandel')
    vScrollbox.appendChild(scrollhandel);
    obj.appendChild(vScrollbox);
    scrollhandel.style.height= iScrollHeight + 'px'
    innerContent.style.marginRight = vScrollbox.offsetWidth  + 'px';
    
    var maxtop= boxheight - iScrollHeight  // 可以滚动的最大top值
    that.onmouseenter=function(){
      vScrollbox.style.opacity= 1
    }
    that.onmouseleave=function(){
      vScrollbox.style.opacity= 0
    }
    scrollhandel.onmousedown=function(ev){
      var ev = ev || event;
      var disY = ev.clientY - this.offsetTop;
      document.onmousemove= function(ev){
        var ev = ev || event;
        var T =  ev.clientY - disY;
        T = Math.max(T,0)
        T = Math.min(T,maxtop)
        scrollhandel.style.top = T + 'px';
        var iScale= T / maxtop
        innerContent.style.top = (that.clientHeight - innerContent.offsetHeight) * iScale  + 'px';
      }
      document.onmouseup= function(){
        document.onmouseup = document.onmousemove = null;
      }
      return false
    }
    this.wheel(obj,function(b){
      var T = scrollhandel.offsetTop;
      b ?  T-=50  :  T+=50
      T = Math.max(T,0)
      T = Math.min(T,maxtop)
      scrollhandel.style.top = T + 'px';
      var iScale= T / maxtop
      innerContent.style.top = (that.clientHeight - innerContent.offsetHeight) * iScale  + 'px';
    })
  },
  wheel(obj,cb){
    /*
    ie/chrom : onmousewheel
    obj.onmousewheel = fn
        ev.wheelDelta  上：120   下：120
        
    ff:  必须使用 addEventListener
    d3.addEventListener('DOMMouseScroll',fn,false)
        ev.detail      上：-3   下：3
    return false 是阻止通过on绑定事件所触发的默认行为
    addEventListener 绑定的事件需要用 event 下的 preventDefault() 阻止默认行为
    */
    obj.onmousewheel = fn
    if(obj.addEventListener) obj.addEventListener('DOMMouseScroll',fn,false)
    function fn(ev){
      var ev = ev || event
      var b = ev.wheelDelta ? (ev.wheelDelta > 0 ? true : false) : (ev.detail > 0 ? false : true);
      if(cb) cb(b)
      if(ev.preventDefault) ev.preventDefault()
      return false;
    }
  },
  /**
   ** 减法函数，用来得到精确的减法结果
   ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
   ** 调用：accSub(arg1,arg2)
   ** 返回值：arg1加上arg2的精确结果
   **/
  accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
  },
  /**
   ** 加法函数，用来得到精确的加法结果
   ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
   ** 调用：accAdd(arg1,arg2)
   ** 返回值：arg1加上arg2的精确结果
   **/
  accAdd(arg1, arg2) {
    var r1, r2, m, c, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 + arg2) / m).toFixed(n));
  },
  /**
   ** 乘法函数，用来得到精确的乘法结果
   ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
   ** 调用：accMul(arg1,arg2)
   ** 返回值：arg1乘以 arg2的精确结果
   **/
  accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
      m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  /**
   ** 除法函数，用来得到精确的除法结果
   ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
   ** 调用：accDiv(arg1,arg2)
   ** 返回值：arg1除以arg2的精确结果
   **/
  accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
      t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      console.log(e)
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  },
  /* 获取今天是当月的第几周
	 * today = new Date(); //获取当前时间
	 * var y = today.getFullYear();
	 * var m = today.getMonth() + 1;
	 * var d = today.getDate();
	 * getMonthWeek(y, m, d)
	 */
  getMonthWeek(a, b, c){
    //a = d = 当前日期
    //b = 6 - w = 当前周的还有几天过完（不算今天）
    //a + b 的和在除以7 就是当天是当前月份的第几周
    var date = new Date(a, parseInt(b) -1, c)
    var w = date.getDay()
    var d = date.getDate();
    return Math.ceil((d + 6 - w) / 7 );
  },
  /* 获取今天是当年的第几周
	 * today = new Date(); //获取当前时间
	 * var y = today.getFullYear();
	 * var m = today.getMonth() + 1;
	 * var d = today.getDate();
	 * getYearWeek(y, m, d)
	 */
  getYearWeek(a, b, c) {
    //date1是当前日期
    //date2是当年第一天
    //d是当前日期是今年第多少天
    //用d + 当前年的第一天的周差距的和在除以7就是本年第几周
    var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),
      d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
  },
  //获取每月的最后一天
  getFirstAndLastMonthDay( year, month){
    var  firstdate = year + '-' + month + '-01';
    var  day = new Date(year,month,0);
    var lastdate = year + '/' + month + '/' + day.getDate();//获取当月最后一天日期
    return lastdate;
  },
  //汉字月份转换为数字月份
  Transformat(str){
    var thisMonth;
    switch(str){
      case "一月":
        thisMonth=1;
        break;
      case "二月":
        thisMonth=2;
        break;
      case "三月":
        thisMonth=3;
        break;
      case "四月":
        thisMonth=4;
        break;
      case "五月":
        thisMonth=5;
        break;
      case "六月":
        thisMonth=6;
        break;
      case "七月":
        thisMonth=7;
        break;
      case "八月":
        thisMonth=8;
        break;
      case "九月":
        thisMonth=9;
        break;
      case "十月":
        thisMonth=10;
        break;
      case "十一月":
        thisMonth=11;
        break;
      default:
        thisMonth=12;
    }
    return thisMonth;
  },
  formatDate(oDate,date){
    var d = new Date(Number(oDate))
    YYYY = d.getFullYear();
    MM = (d.getMonth() + 1)>9?d.getMonth() + 1:"0"+(d.getMonth() + 1);
    DD = d.getDate()>9?d.getDate():"0"+d.getDate();
    HH = d.getHours()>9?d.getHours():"0"+d.getHours();
    mm = d.getMinutes()>9?d.getMinutes():"0"+d.getMinutes();
    return date == "date" ? YYYY + '-' + MM + '-' + DD : YYYY + '-' + MM + '-' + DD + " " + HH + ":" + mm;
  },
  convertCurrency(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
    var unit = "京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
      n = n.substring(0, p) + n.substr(p+1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i=0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(兆|万|亿|元)/g, "$1").replace(/(兆|亿)万/g, "$1").replace(/(京|兆)亿/g, "$1").replace(/(京)兆/g, "$1").replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, "$1$2零$3仟").replace(/^元零?|零分/g, "").replace(/(元|角)$/g, "$1整");
  },
  getRootURL(n){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    //返回端口， 如："8080"
    var port = window.location.port
    if(n=='0'){
      return  localhostPaht;
    }else if(n=='1'){
      return projectName;
    }else if(n=='2'){
      return (localhostPaht+projectName);
    }else if(n=='3'){
      return curWwwPath;
    }else if(n=='4'){
      return pathName;
    }else if(n=='5'){
      return port;
    }
  },
  //获取加密字符串
  getVerify(param){
    try{
      var verifyStr = "";
      var allkeys = Object.keys(param).sort(); //所有键升序排列
      for (var item in allkeys) {
        if (item >= 0) {
          var value = param[allkeys[item]];
          verifyStr += value;
        }
      }
      verifyStr += 'token';
      return $.md5(verifyStr);
    }
    catch(err){
      console.log('注意引入MD5')
    }
  },
  //获取签名方法,与上面方法作用相同
  sign(json) {
    var arr = [];
    for (var i in json) {
      arr.push(i);
    }
    // arr = ['cpenid', 'did','alt']
    //如果这个参数被省略，那么元素将按照 ASCII 字符顺序进行升序排列（也就是所谓的自然顺序）
    arr = arr.sort();
    // arr = ['alt', 'cpenid','did']
    var str = '';
    for (let i = 0; i < arr.length; i++) {
      str += arr[i] + json[arr[i]]
    }
    // str = alt + alt值 + cpenid + cpenid值 + did + did值
    return md5(str);
  }
}

/* 获取数组元素的最大值 */
Array.prototype.getMax=function(){
  function sortNumber(a,b){
    return b - a;
  }
  this.sort(sortNumber);
  return this[0];
}

//解决各浏览器中输出不一致的问题
//0.7875.fixed(3) /*0.788*/
Number.prototype.round = function(digits) {
  digits = Math.floor(digits);
  if (isNaN(digits) || digits === 0) {
    return Math.round(this);
  }
  if (digits < 0 || digits > 16) {
    throw 'RangeError: Number.round() digits argument must be between 0 and 16';
  }
  var multiplicator = Math.pow(10, digits);
  return Math.round(this * multiplicator) / multiplicator;
}
Number.prototype.fixed = function(digits) {
  digits = Math.floor(digits);
  if (isNaN(digits) || digits === 0) {
    return Math.round(this).toString();
  }
  var parts = this.round(digits).toString().split('.');
  var fraction = parts.length === 1 ? '' : parts[1];
  if (digits > fraction.length) {
    fraction += new Array(digits - fraction.length + 1).join('0');
  }
  return parts[0] + '.' + fraction;
}

// var price = 4999.99;
// alert(price.formatMoney(2, "€", ".", ",")); // €4.999,99
// defaults: (2, "$", ",", ".")
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "$";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var number = this,
    negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

String.prototype.moneyToNumber = function(){
  return parseFloat(this.replace(/[^0-9-.]/g, ''))
};

export default tools
