<template>
	<div>
		<!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    	<!-- 搜索与添加区域 -->
			<!-- gutter设置间隙，span设置宽度 -->
  			<el-row :gutter="20">
  				<el-col :span="8">
  					<el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
    					<el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
  					</el-input>
  				</el-col>
  				<el-col :span="4">
  					<el-button type="primary" @click="goAddPage">添加商品</el-button>
  				</el-col>
  			</el-row>
  			<!-- 商品列表区域 -->
  			<el-table :data="goodsList" border stripe>
  				<el-table-column type="index" label="#"></el-table-column>
  				<el-table-column  label="商品名称" prop="goods_name"></el-table-column>
  				<el-table-column  label="商品价格(元)" prop="goods_price" width="105px"></el-table-column>
  				<el-table-column  label="商品重量"prop="goods_weight"width="80px"></el-table-column>
  				<el-table-column  label="创建时间"prop="add_time"width="160px">
  					<!-- 作用域插槽 -->
  					<template slot-scope="scope">
  						{{scope.row.add_time | dateFormat}}
  					</template>
  				</el-table-column>
  				<el-table-column  label="操作"width="130px">
  					<!-- 作用域插槽 -->
  					<template slot-scope="scope">
  						<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
  						<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeGoodsById(scope.row.goods_id)"></el-button>
  					</template>
  				</el-table-column>
  			</el-table>
  			<!-- 分页区域 -->
  			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"background>
    		</el-pagination>
    </el-card>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				//获取商品列表的参数对象
				queryInfo:{
					query:'',
					pagenum:1,
					pagesize:10

				},
				//控制添加商品对话框的显示与隐藏
				//addDialogVisible:false,
				//商品列表
				goodsList:[],
				//商品总条数
				total:0,

			}
		},
		created(){
			this.getGoodsList()

		},
		methods:{
			//获取商品列表
			async getGoodsList(){
				const { data:res } = await this.$http.get('goods',{params:this.queryInfo})
				if(res.meta.status !== 200 ){
					return this.$message.error('获取商品列表失败')
				}
				//console.log(res)
				this.goodsList = res.data.goods
				this.total = res.data.total
				console.log(this.goodsList)

			},
			//监听pagesize改变事件
			handleSizeChange(newSize){
				this.queryInfo.pagesize = newSize
				this.getGoodsList()
			},
			//监听pagenum改变事件
			handleCurrentChange(newPage){
				this.queryInfo.pagenum = newPage
				this.getGoodsList()
			},
			//根据id删除对应商品信息
			async removeGoodsById(goods_id){
				//console.log(goods_id)
				const confirmResult = await this.$confirm('此操作将永久删除该商品信息,是否继续?','提示',{confirmButtonText:'确定',cancelButtonText:'取消',type:'warning'}).catch(err => err)
				//如果确认删除，返回字符串confirm
				//如果不确认删除，返回cancel
				//判断是否删除
				if(confirmResult !== 'confirm'){
					return this.$message.info('已取消删除')
				}
				const { data:res } = await this.$http.delete('goods/'+goods_id)
				if(res.meta.status !== 200){
					return this.$message.error('删除商品失败')
				}
				this.$message.success('删除商品成功')
				this.getGoodsList()


			},
			goAddPage(){
				this.$router.push('./goods/add')
			}
			

		},
		computed:{

		}

	}
</script>
<style lang="less" scoped>
	
</style>