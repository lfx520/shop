<template>
	<el-container class="home-container">
		<!-- 头部区域 -->
  		<el-header>
  			<div class="headerDiv">
  				<img src="../assets/heima.png" alt="">
  				<span class="headerName">电商后台管理系统</span>
  			</div>
  			<el-button type="info" @click="logout">退出</el-button>
  		</el-header>
  		<!-- 页面主体区域 -->
  		<el-container>
  			<!-- 侧边栏 -->
    		<el-aside :width="isCollapse ? '64px' : '200px'">
    			<!-- 折叠菜单栏 -->
    			<div class="toggle-button" @click="toggleCollapse">|||</div>
    			<!-- 侧边栏菜单区域 -->
    			<!-- unique-opened="true"每次只能展开一个菜单，false可以展开多个 -->
            	<el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">
            		<!-- 一级菜单 -->
        	      	<el-submenu :index="item.id +''" v-for="item in menulist" :key="item.id">
        	      		<!-- 一级菜单模板区 -->
        	        	<template slot="title">
        	          		<!-- 图标 -->
        	          		<i :class="iconsObj[item.id]"></i>
        	          		<!-- 文本 -->
        	          		<span>{{ item.authName }}</span>
        	        	</template> 
        	        <!-- 二级菜单 -->
        	        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
        	        	<!-- 二级菜单模板区 -->
        	        	<template slot="title">
        	          		<!-- 图标 -->
        	          		<i class="el-icon-menu"></i>
        	          		<!-- 文本 -->
        	          		<span>{{subItem.authName}}</span>
        	          		
        	        	</template> 
        	        </el-menu-item>
        	      </el-submenu>
        	    </el-menu>
    		</el-aside>
    		<!-- 右侧内容主体 -->
    		<el-main>
    			<!-- 路由占位符 -->
    			<router-view></router-view>
    		</el-main>
  		</el-container>
	</el-container>
</template>
<script>
	export default{
		data(){
			return{
				//左侧菜单数据
				menulist:[],
				iconsObj:{
					'125':'iconfont icon-user',
					'103':'iconfont icon-tijikongjian',
					'101':'iconfont icon-shangpin',
					'102':'iconfont icon-danju',
					'145':'iconfont icon-baobiao'
				},
				//是否折叠
				isCollapse:false,
				//被激活的链接地址
				activePath:''
			}

		},
		created(){
			this.getMuenList(),
			this.activePath = window.sessionStorage.getItem('activePath')

		},
		methods:{
			logout(){
				window.sessionStorage.clear()
				this.$router.push('/login')

			},
			//获取所有的菜单
			async getMuenList(){
				const{data:res} = await this.$http.get('menus')
				//console.log(res)
				if (res.meta.status !== 200) 
					return this.$message.error(res.meta.msg)
				this.menulist = res.data
				//console.log(res.data)
			},
			//点击按钮切换菜单的折叠与展开
			toggleCollapse(){
				this.isCollapse = !this.isCollapse

			},
			//保=保存链接的激活状态
			saveNavState(activePath){
				window.sessionStorage.setItem('activePath', activePath),
				this.activePath = activePath

			}
		}

	}
</script>
<style lang="less" scoped>
.home-container{
	height: 100%;

}
.el-header{
	background-color: #373d41;
	display: flex;/*flex布局*/
	justify-content: space-between;/*左右贴边对齐*/
	padding-left: 0;
	align-items: center; /*按钮上下居中*/
	color:#fff;
	font-size: 20px;
	> div{
		display: flex;
		align-items: center;
		img{
			width: 55px;
			background-color: #373d41;
		}
		span{
			margin-left: 15px;		
			}
	}		
}
.el-aside{
	background-color: #333744;
	.el-menu{
		border-right:none;//去除菜单对不齐

	}
}
.el-main{
	background-color: #eaedf1;
}
.iconfont{
	margin-right:10px;
}
.toggle-button{
	background-color:#4a5064;
	font-size:10px;
	line-height:24px;
	color:#fff;
	text-align:center;
	letter-spacing:0.2em;//字之间加间距
	cursor:pointer;//鼠标放上去是小手
}
	
</style>