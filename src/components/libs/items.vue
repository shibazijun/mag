<template>
  <div :class='{blockfull:full}'>
    <dl class="itemContent">





      <dt @click='foldhandle'>
        <div class="itemTitle">
          <slot name="title">模块标题</slot>
        </div>
        <ul class="toggleStatus">
          <li class="foldIcon"><i class="fa" :class="foldcss"></i></li>
        </ul>
      </dt>




      <transition name="el-fade-in-linear">
      <dd v-show="!fold">
        <slot></slot>
      </dd>
      </transition>




    </dl>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        fold:false
      }
    },
    computed: {
      foldcss(){
        return {
          'el-icon-arrow-up': this.fold,
          'el-icon-arrow-down':!this.fold
        }
      }
    },
    methods: {
      fullhandle(){
        this.full = !this.full
      },
      foldhandle(){
        this.fold= !this.fold
      }
    }
  }
</script>

<style lang="less" scoped>
  ul,li,ol,dt,dd,dl{
    list-style:none;
    padding:0px;
    margin:0px;
  }

  @tableColor:#ebeef5;

  .itemContent{
    margin-bottom:10px;
    background-color: #fff;
    border:solid 1px @tableColor;
    zoom:1;
    min-width:1000px;
    dt{
      overflow: hidden;
      zoom: 1;
      color:#333;
      background-color:#fbfbfb;
      cursor:pointer;
      .itemTitle{
        float: left;
        padding:10px;
      }
      .toggleStatus{
        float: right;
        padding:5px 10px;
        transition: all .4s linear;
        overflow:hidden;
        zoom:1;
        li{
          float:left;
          margin-left:5px;
          cursor: pointer;
        }
        i{
          width:30px;
          height:30px;
          line-height:30px;
          text-align:center;
        }
      }
    }
    dd{
      border-top:@tableColor dotted 1px;
      padding:15px;
    }
    // &:hover{
    //    // -webkit-box-shadow: 0px 0px 8px 2px rgba(153,153,153,.6);
    //    // -moz-box-shadow:  0px 0px 8px 2px rgba(153,153,153,.6);
    //    // box-shadow:  0px 0px 8px 2px rgba(153,153,153,.6);
    // }
  }

  .setFullShow{
    position:fixed;
    top:0px;
    left:0px;
    right:0px;
    z-index:1001;
  }

  .fullshade{
    width:100%;
    height:100%;
    position:fixed;
    top:0px;
    left:0px;
    right:0px;
    z-index:1000;
    background:#eee;
  }

  .itemContent{
    dt{cursor: default;}
  }


</style>
