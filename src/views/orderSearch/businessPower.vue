<!--**
  *@info 订单查询模块-业务权限审核订单
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style scoped>
@import "../../assets/css/search.css";
  .form-c.o-no-bgc>.row .text{
  	width: auto;
  }
  .m-sub-page>.fl{
  	padding: 20px;
  }
  .m-sub-page>.fl>.f-btn{
  	padding: 8px;
  }
</style>
<template>
<section class="g-search-menu">
  <div id="search" :class="{active:off.details}">
  	<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
  	<!--查询-->
  	<section v-if="!off.details">
  	<div class="g-search-form">
		
		<div class="m-tag"><b></b>订单查询</div>
		<section class="form-c">
			<div class="row clr m-col-2">
				<span class="dp col-l">订单号码：</span>
				<div class="col-r m-input-button"><input v-model="form.orderId" maxlength="32" type="tel" placeholder="请输入查询的订单号码"><button @click="searchList('order')">查询</button></div>
			</div>
		</section>
		<div class="m-tag"><b></b>条件查询</div>
		<section class="form-c">	
			<div class="row clr m-col-2">
				<div class="dp col-l">时间区间：</div>
				<div class="col-r">
					<span class="m-time-area"><input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"></span>
					<span class="m-space">一</span>
					<span class="m-time-area"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
				</div>
			</div>
			<div class="row clr m-col-2" v-if="off.type==2">
				<span class="dp col-l">审核人ID：</span>
				<div class="col-r">
					<div class="input-box"><input v-model="form.customerPhone" maxlength="16" type="tel" placeholder="请输入查询的审核人ID"></div>
				</div>
			</div>
			<div class="row clr m-col-2">
				<span class="dp col-l">商户ID：</span>
				<div class="col-r">
					<div class="input-box"><input v-model="form.dealerId" maxlength="16" type="tel" placeholder="请输入查询的商户ID"></div>
				</div>
			</div>
			<div class="row clr m-col-2">
				<span class="dp col-l">申请人ID：</span>
				<div class="col-r">
					<div class="input-box"><input v-model="form.userPhone" maxlength="16" type="tel" placeholder="请输入查询的申请人ID"></div>
				</div>
			</div>
			<div class="row clr m-col-2 active">
				<span class="dp col-l">申请业务：</span>
				<div class="col-r">
					<div class="m-form-radio">
						<label><span class="radio"><input type="radio" value="0" v-model="form.type"><span></span></span><span class="text">全部</span></label>
						<label><span class="radio"><input type="radio" value="4" v-model="form.type"><span></span></span><span class="text">远特售卡</span></label>
						<label><span class="radio"><input type="radio" value="3" v-model="form.type"><span></span></span><span class="text">联通售卡</span></label>
					</div>
				</div>
			</div>
			<div class="row clr m-col-2 active" v-if="off.type==2">
				<span class="dp col-l">审核状态：</span>
				<div class="col-r">
					<div class="m-form-radio">
						<label><span class="radio"><input type="radio" value="0" v-model="form.status"><span></span></span><span class="text">全部</span></label>
						<label><span class="radio"><input type="radio" value="2" v-model="form.status"><span></span></span><span class="text">通过</span></label>
						<label><span class="radio"><input type="radio" value="3" v-model="form.status"><span></span></span><span class="text">拒绝</span></label>
					</div>
				</div>
			</div>
			<button class="f-btn f-btn-line" @click="searchList(2)">查询</button>
		</section>

		<!-- <section class="form-c o-no-bgc">
			
			<div class="row" :class="{active:form.select==1}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="1" v-model="form.select"><span></span></span><span class="text">商户ID：</span></label>
				</span>
				<div class="input-box"><input v-model="form.dealerId" :readonly="form.select!=1" maxlength="11" type="tel" placeholder="请输入查询的商户ID"></div>
			</div>
			<div class="row" :class="{active:form.select==2}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="2" v-model="form.select"><span></span></span><span class="text">申请人ID：</span></label>
				</span>
				<div class="input-box"><input v-model="form.userPhone" :readonly="form.select!=2" maxlength="16" type="text" placeholder="请输入查询的申请人ID"></div>
			</div>
			
		</section> -->
  	</div>
  	<div id="totalDiv" v-if="list">
		<div class="total-head">统计结果<b>{{total}}</b></div>
		<table>
			<thead>
				<tr v-if="off.type==1">
					<th>序号</th>
					<th>订单号</th>
					<th>商户名称</th>
					<th>商户ID</th>
					<th>申请人姓名</th>
					<th>申请人ID</th>
					<th>申请业务</th>
					<th>申请时间</th>
					<th></th>
				</tr>
				<tr v-if="off.type==2">
					<th>序号</th>
					<th>订单号</th>
					<th>商户名称</th>
					<th>商户ID</th>
					<th>申请人姓名</th>
					<th>申请人ID</th>
					<th>申请业务</th>
					<th>申请时间</th>
					<th>审核时间</th>
					<th>审核人</th>
					<th>审核人ID</th>
					<th>审核状态</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<!--待审核-->
				<tr v-if="off.type==1" v-for="(todo,index) in list">
					<td>{{ (pageNum-1)*pageSize+(index+1) }}</td>
					<td>{{ todo.orderId }}</td>
					<td>{{ todo.companyName }}</td>
					<td>{{ todo.dealerId }}</td>
					<td>{{ todo.userName }}</td>
					<td>{{ todo.userId }}</td>
					<td>
						<span v-if="todo.type==3">联通售卡</span>
						<span v-if="todo.type==4">远特售卡</span>
					</td>
					<td>{{ getDateTime(todo.createTime)[6] }}</td>
					<td><a :name="todo.orderId" @click="details" href="javascript:void(0)" class="details">详情</a></td>
				</tr>
				<!--已审核-->
				<tr v-if="off.type==2" v-for="(todo,index) in list">
					<td>{{ (pageNum-1)*pageSize+(index+1) }}</td>
					<td>{{ todo.orderId }}</td>
					<td>{{ todo.companyName }}</td>
					<td>{{ todo.dealerId }}</td>
					<td>{{ todo.userName }}</td>
					<td>{{ todo.userId }}</td>
					<td>
						<span v-if="todo.type==3">联通售卡</span>
						<span v-if="todo.type==4">远特售卡</span>
					</td>
					<td>{{ getDateTime(todo.createTime)[6] }}</td>
					<td>{{ getDateTime(todo.modifyTime)[6] }}</td>
					<td>{{ todo.customerName }}</td>
					<td>{{ todo.customerId }}</td>
					<td>
						<span v-if="todo.status==2" class="f-c-green">通过</span>
						<span v-if="todo.status==3" class="f-c-red">拒绝</span>
					</td>
					
					<td><a :name="todo.orderId" @click="details" href="javascript:void(0)" class="details">详情</a></td>
				</tr>
			</tbody>
		</table>
		<section class="m-sub-page clr">
			<div class="fl" v-if="maxpage">
				<a href="javascript:void(0)" @click="downLoadList" class="f-btn f-btn-success">导出EXCEL</a>
				<iframe id="loadIframe" src="" style="padding: 0;margin:0;width: 0;height: 0;opacity: 0" frameborder="0"></iframe>
			</div>
			<my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
		</section>
	</div>
	</section>
	<!--详情-->
	<list-details :list="detailsData" :type="off.type" v-if="off.details" :number="off.number">
	
	</list-details>
  </div>
</section>
</template>
<script>
require("../../assets/js/laydate/laydate.js");
require("../../assets/js/laydate/skins/default/laydate.css");
import pagination from "../../components/Page.vue";
import details from "../../components/merchantAuditOrderDetails.vue";
import { getDateTime } from "../../config/utils.js";
export default{
	data (){
		return {
			off:{
				type:1,//1，待审核；2，已审核
				isLoad:0,//加载条
				details:0,//详情页面开关
			},
			form:{
				orderId:'',//订单号码
				status:0,//订单状态
				type:0,//申请业务
				customerPhone:'',//审核人ID
				dealerId:'',//商户号
				userPhone:'',//申请人ID
				startTime:'',
				endTime:'',
				select:6,//条件查询，选择的条件
			},
			list:'',//列表数据
			detailsData:'',//详情数据
			total:0,//总查询条数
			pageNum:1,//当前页数
			pageSize:10,//显示条数
			maxpage:1,//最大页数
			callback:Function//page组件点击回调
		}
	},
	components:{
		'my-page':pagination,
		'list-details':details
	},
	created:function(){
		this.init();
	},
	methods:{
		init:function(){
			var vm=this,type=this.$route.params.type;
			type=='auditing' ? (vm.off.type=1,vm.form.status=1) : (vm.off.type=2,vm.form.status=0);

			vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
			vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
		},
		searchList(index,page){//充值订单
			var vm=this,url,json={"pageSize":vm.pageSize,"pageNum":page||1,"startTime":vm.form.startTime,"endTime":vm.form.endTime,"status":vm.form.status,'type':vm.form.type,'orderId':'','customerPhone':vm.form.customerPhone,'dealerId':'','userPhone':''};
			if(index=='order'){
				if(vm.form.orderId.length==0){
					layer.open({
			            content:'请输入订单号码',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}
				json.orderId=vm.form.orderId;
			}else if(index==2){
				json.dealerId=vm.form.dealerId;
				json.userPhone=vm.form.userPhone;
				if(vm.form.select==1){
					// if(vm.form.dealerId.length==0){
					// 	layer.open({
				 //            content:'请输入查询的商户ID',
				 //            skin: 'msg',
				 //            time: 2,
				 //            msgSkin:'error',
				 //        });
				 //        return false;
				 //    }else{
				 //    	json.dealerId=vm.form.dealerId;
				 //    }
					// json.dealerId=vm.form.dealerId;			 	
				}else if(vm.form.select==2){
					// if(vm.form.userPhone.length==0){
					// 	layer.open({
				 //            content:'请输入查询的申请人ID',
				 //            skin: 'msg',
				 //            time: 2,
				 //            msgSkin:'error',
				 //        });
				 //        return false;
				 //    }else{
				 //    	json.userPhone=vm.form.userPhone;
				 //    }
				 //    json.userPhone=vm.form.userPhone;
				}
			}
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			vm.AJAX('w/attribute/search',json,function(data){
				vm.list=data.data.list;
				vm.total=data.data.total;
				vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.pageNum=page||1;
				vm.callback=function(v){vm.searchList(index,v)};
			},function(){
				vm.off.isLoad=false;
			});
		},
		details:function(e){//详情
			var vm=this,url,orderId=e.target.name;
			
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			vm.AJAX('w/attribute/detail',{"orderId":orderId},function(data){
				vm.detailsData=data.data;
				vm.off.details=true;
			},function(){
				vm.off.isLoad=false;
			});
		},
		downLoadList:function(){//导出EXCEL
			var vm=this,json={"startTime":vm.form.startTime,"endTime":vm.form.endTime,"status":vm.form.status,'type':vm.form.type,'orderId':'','customerPhone':vm.form.customerPhone,'dealerId':vm.form.dealerId,'userPhone':vm.form.userPhone};
			vm.AJAX('w/attribute/attributeLoad',json,function(data){
				document.getElementById('loadIframe').src=data.data.url;
			});
		},
		to_laydate:function(v){
			var vm=this;
			laydate({
				istime:true,
				format: 'YYYY-MM-DD hh:mm:ss',
				isclear: false,
				choose: function(dates){ //选择好日期的回调
					v==1 ? vm.form.startTime=dates : vm.form.endTime=dates;
				}
			});
		},
		getDateTime(v){
			return getDateTime(v);
		}
	}
}
</script>

