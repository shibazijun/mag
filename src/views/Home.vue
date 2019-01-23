<template>
	<el-row class="container">

    <!--头部-->
		<el-col class="header" :span="24">
			<el-col :span="10" class="logo" :style="{width:layerout.asideWidth+'px'}" @click.native="$router.push('/')">
				{{collapsed ? 'FS':'FMS-融资管理系统'}}
			</el-col>
			<el-col :span="10">
				<div class="tools" >


          <el-dropdown>
            <span class="el-dropdown-link">
              系统<i class="el-icon-arrow-down el-icon--right"></i>

            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>增信管理</el-dropdown-item>
              <el-dropdown-item>资产管理</el-dropdown-item>
              <el-dropdown-item>融资管理</el-dropdown-item>
              <el-dropdown-item disabled>统计报表</el-dropdown-item>
              <el-dropdown-item divided>资料归档</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>





				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
					<img :src=avatarUrl /> {{username}}
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="$router.push('/profile')">个人主页</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>








    <!--内容部分-->
		<el-col class="main" :span="24">

      <!--左侧菜单-->
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'" :style="{width:layerout.asideWidth+'px',height:this.layerout.mainHiehgt + 'px'}">
        <el-row >
          <div class="switchMenu" @click.prevent="collapse"><i class="el-icon-d-arrow-right" :class="{activeMenu:collapsed}"></i></div>
        </el-row>
				<!-- 导航菜单，未折叠 -->
				<el-menu router @open="handleopen" @close="handleclose" @select="handleselect" v-if="!collapsed" unique-opened>
					<template v-for="(item , index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">{{child.name}}</el-menu-item>
						</el-submenu>
						<!-- 叶子结点 -->
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
							<i :class="item.iconCls"></i>{{item.children[0].name}}
						</el-menu-item>
					</template>
				</el-menu>

				<!-- 导航菜单，折叠 -->
				<ul class="el-menu" v-else ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="reng-menu">
						<template v-if="item.leaf"><!--叶子结点-->
							<div @click="$router.push(item.children[0].path)" class="el-menu-item" :class="$route.path==item.children[0].path?'is-active':''">
								<i :class="item.iconCls"></i>
							</div>
						</template>
						<template v-else>
							<div @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" class="el-menu-item">
								<i :class="item.iconCls"></i>
							</div>
							<ul class="reng-submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li class="el-menu-item" v-for="child in item.children" :class="$route.path==child.path?'is-active':''" :key="child.path" @click="$router.push(child.path)" style="padding: 0 20px;">{{child.name}}</li>
							</ul>
						</template>
					</li>
				</ul>
				</el-menu>
			</aside>





      <!--右侧内容部分-->
			<section class="content-container" :style="{'margin-left':(layerout.asideWidth )+'px',height:this.layerout.mainHiehgt + 'px'}">



					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner" v-if="$route.matched[0].name!=''">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{path: item.path==''?'/':item.path}">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>


					<el-col :span="24" class="content-wrapper" :style="{height: layerout.contentHeight+ 'px'}">
						<transition name="fade" mode="out-in">
							<router-view class="content-view"></router-view>
						</transition>
					</el-col>

			</section>





		</el-col>
	</el-row>
</template>
<script type="text/javascript">
	import apiPath from '@/service/apiPath'
  import tools from '../utils/tools'
	export default {
		data() {
			return {
				collapsed: false,
        layerout:{
          asideWidth:230,//左侧菜单宽度
          mainHiehgt:0,   //主内容部分的高度
          contentHeight:0 //内容容器的高度
        },
				username: '',
				avatarUrl: 'https://images7.m.china.com.cn/newschina/p1/2019_01_21/15/1ac8189dbefeda645faead1ca2256e4bd9f77178afc53adc.jpg'
			}
		},
		methods: {
			// collapse banner
			collapse(){
				this.collapsed=!this.collapsed;
				this.layerout.asideWidth= this.collapsed ? 60 : 230;
			},
			handleopen(){
				console.log('handleopen');
			},
			handleclose(){
				console.log('handleclose');
			},
			handleselect(){
				console.log('handleselect')
			},
			showMenu(i,status){
				console.log(i);
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display = status ? 'block' : 'none';
			},
			logout(){
				let vm = this;
				vm.$confirm('确认退出吗?','提示',{
					type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					vm.$router.push({path:'/login'})
				}).catch(() => {
					console.log('error');
				});
			},
      resetwindow(){
          this.layerout.mainHiehgt = tools.windowSize().height - 60;
          this.layerout.contentHeight = tools.windowSize().height -100;
      }
		},
		created(){
			let vm = this;
			console.log('print->>>',this.$router.options.routes);
			// console.log(this.$route);
			// this.$router.push({
			// 	path: '/'
			// })

			let username = JSON.parse(sessionStorage.getItem('user'));
			vm.$fetch(apiPath.USER_INFO+'/'+username)
				.then(data => {
					vm.username = data.login;
					vm.avatarUrl = data.avatar_url;
				});
		},
    computed:{

    },
    mounted() {
      this.resetwindow()
      window.onresize = ()=>{
        this.resetwindow()
      }
    }
	}
</script>
<style lang="less" scoped>
	@import '../assets/common/public.less';
  html,body{
    overflow:hidden;

    width:100%;
  }

	.container{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow:hidden;
		.header{
        height: 60px;
        line-height: 60px;
        background-color: @primary-color;
        color: #fff;
        .logo{
            height: 60px;
            font-size: 22px;
            padding-left: 20px;
            padding-right: 20px;
            border-color: rgba(238,241,146,.3);
            border-right-style: solid;
            border-right-width: 1px;
            cursor: pointer;
            text-align: center;
        }
        .logo-width{
            width: 230px;
        }
        .logo-collapse-width{
            width: 60px;
        }
			.tools{
				padding: 0 23px;
        width:100px;
        border-right:solid 1px #eef1924d;
        .el-dropdown-link{
          color:#fff;
        }
			}
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
		}
		.main{
			aside {
        height:100%;
        position:absolute;
        .switchMenu{
          height:40px;
          line-height:40px;
          text-align:center;
          background: #ECEDEF;
          box-shadow: 0px 0px 5px 1px rgba(153, 153, 153, 0.5);
          border-right: solid 1px #e6e6e6;
          i{
            transition: transform .3s,-webkit-transform .3s;
            &.activeMenu{
              transform: rotateZ(180deg);
            }
          }

        }
        .el-menu{
            width: 100%;
            height: 100%;
            border:0px;
            background-color:transparent;
            .el-menu-item {
                height: 45px;
                line-height: 45px;
            }
          .el-menu-item [class^=el-icon-]{
                width:auto;
          }
          .container .main aside .reng-menu .reng-submenu[data-v-5e265133]{
              box-shadow: 3px 3px 5px 1px rgba(153,153,153,.5);
              background:#fff;
          }
          .el-menu-item.is-active {
            color: #fff;
            background-color: #409EFF;
          }
				}
				.reng-menu{
					position: relative;
					.reng-submenu{
						position: absolute;
						top: 0;
						left: 60px;
						z-index: 9999;
						height: auto;
						display: none;
						// background: #ccc;
						background: #eee;
						padding: 0;
						text-align: center;
					}
				}

				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				&.menu-collapsed{
					//flex:0 0 60px;
					width: 60px;
				}
				&.menu-expanded{
					//flex:0 0 230px;
					width: 230px;
				}
			}

			.content-container{
          background:#ECEDEF;
          overflow:hidden;
				.breadcrumb-container{
            margin:0px;
            height:40px;
            padding:0px 10px;
            background:#ECEDEF;
            box-shadow: 0px 0px 5px 1px rgba(153, 153, 153, 0.5);
            .breadcrumb-inner{line-height:40px;}
				}
        .content-wrapper {
            overflow:auto;
            .content-view{padding:20px;}
        }
			}
		}
	}
</style>
