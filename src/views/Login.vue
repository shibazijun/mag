<template>
  <el-form :model="form" :rules="hintMsg" ref="hintMsg" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">控台登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="form.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>

  import apiPath from '@/utils/apiPath'
  import {Message} from 'element-ui'
  export default {
    data() {
      return {
        logining: false,
        form: {
          username: 'reng99',
          password: '123456'
        },
        hintMsg: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true,
      };
    },
    created(){
      // var vm = this;
      // vm.$fetch(apiPath.USER_INFO+'/kaeyleo')
      //     .then(data => {
      //       vm.totalPage = Math.ceil(data.followers / 30);
      //     });
    },
    methods: {
      login() {
        let vm = this;
        if(vm.form.username.trim()==''){
            Message({
                type: 'warning',
                message: '输入的用户名不正确哦',
                duration: 1500
            });
        }else{
          vm.logining = true;
          //去查询用户信息
          sessionStorage.setItem('user', JSON.stringify(vm.form.username));



          let username = JSON.parse(sessionStorage.getItem('user'));
          vm.$fetch(apiPath.USER_INFO+'/'+username)
            .then(data => {
              vm.$store.commit('changeProfile',data)  //同步用法
              vm.$store.commit('changeRole',['1000','1101','1102'])  //同步用法
             // vm.$store.dispatch('事件名',传递的参数)  //异步用法

              let redirect = vm.$route.query.redirect
              if(!redirect){
                redirect = ''
              }
              vm.$router.push({
                path: '/'+redirect
              })


            });
//          return
//          setTimeout(function(){
//            //vm.$router.push({path: '/'});
//            let redirect = vm.$route.query.redirect
//            if(!redirect){
//              redirect = ''
//            }
//            vm.$router.push({
//              path: '/'+redirect
//            })
//
//          },1500);

          // vm.$fetch(apiPath.USER_INFO+'/'+vm.form.username)
          //     .then(data => {
          //       console.log(data);
          //       vm.$store.getters.profile
          //       // put relatice data to store

          //     });
        }
      }
    }
  }

</script>



<style lang="less" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 80px auto 0px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
