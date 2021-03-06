/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	let content=window.localStorage.getItem(name);
	return content?JSON.parse(content):'';
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
/**
 * 时间戳格式化
 */
export const getDateTime= e =>{
    var t;
    if(!e)return '--';
    t = new Date(parseInt(e));
    var n = t.getFullYear(),
        a = t.getMonth()+1,
        r = t.getDate(),
        o = t.getHours(),
        i = t.getMinutes(),
        c = t.getSeconds(),
        k = [];
    a >= 10 ? a : a = "0" + a, r >= 10 ? r : r = "0" + r, o >= 10 ? o : o = "0" + o, i >= 10 ? i : i = "0" + i, c >= 10 ? c : c = "0" + c, k[0]=n,k[1]=a,k[2]=r,k[3]=n+'-'+a,k[4]=a+'-'+r,k[5]=o+":"+i+":"+c,k[6]=n + "-" + a + "-" + r + " " + o + ":" + i + ":" + c;
    return k;
}
/**
 * 日期转时间戳
 */
export const getUnixTime= e =>{
	var t;
	if(e){
		e=e.replace(/-/g,'/');
		t=new Date(e);
	}else t= new Date();
	return t.getTime().toString();
}
/**
 * 秒数格式化
 */
export const secondsFormat=(v)=>{
	v=parseInt(v);
    var day,minute,second,hour;
    day=Math.floor(v/(60*60*24));
    hour=Math.floor(v%(60*60*24)/(60*60));
    minute=Math.floor(v%(60*60)/60);
    second=Math.floor(v%60);
    hour<10&&(hour='0'+hour);
    minute<10&&(minute='0'+minute);
    second<10&&(second='0'+second);
    return day!='00' ? day+"天"+hour+":"+minute+":"+second : 
	    hour!='00' ? hour+":"+minute+":"+second : 
	    minute!='00' ? "00:"+minute+":"+second : "00:"+second;
}
/**
 * 开卡订单-翻译数据
 */
export const translateData=(type,v)=> {
	v=parseInt(v);
	switch(type){
		case 1://操作类型
				return v==1 ? '开成卡' : v==2 ? '开白卡' : v==4 ? '实名补录' : v==7 ? '过户办理' : v==5 ? '实名登记' : v==6 ? '空卡' : void 0;
			break;
		case 2://证件类型
				return v==1 ? '身份证' : v==2 ? '军官证' : v==3 ? '护照' :void 0;
			break;
		case 3:

			break;
		case 4://开卡状态
			return v==1 ? '初始状态' : v==2 ? '成功' : v==3 ? '失败' : v==4 ? '订单关闭' : v==9 ? '--' :void 0;
			break;
		case 5://靓号等级
			var level=["普号","特级","一级","二级","三级","四级","五级","六级","七级","八级","九级","十级","十一级"];
    		return v||v==0 ? level[parseInt(v)] : '未知';
			break;
		case 7://进行中，已关闭，订单状态
			return v==1 ? '已选号' : v==2 ? '已选套餐' : v==3 ? '已上传资料' : v==4 ? '已支付' : v==5 ? '已审核' : v==6 ? '已开户申请' : v==7 ? '已获取IMSI' : v==8 ? '已开卡申请' : v==0 ? '--' :void 0;
			break;
	}
}

