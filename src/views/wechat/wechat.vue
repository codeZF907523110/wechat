<template>
  <div class='wechat'>
      <div class='wechattop'></div>
      <tobbar :tobbartext="'微信'" :isshowicn="true"></tobbar>
      <div>微信</div>
      <div>登录次数:{{}}</div>
  </div>
</template>

<script>
import Tobbar from '../../components/tobbar/tobbar.vue'
export default {
  components: { Tobbar },
   data(){
    return{
    }
  },
  created(){
  }
}
</script>

<style>
.wechattop{
  height: 40px;
}
</style>