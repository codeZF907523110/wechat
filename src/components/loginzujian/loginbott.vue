<template>
  <div class='loginbott'>
      <div class='loginbotext'>找回密码</div>
      <div class='loginbotext loginbotcen'>紧急冻结</div>
      <div class='loginbotext' @click='gengduo()'>更多</div>
      
  </div>
</template>

<script>
export default {
    methods:{
        gengduo(){
            this.$emit('showtanchuang')
        }
    }
}
</script>

<style>
    .loginbott{
        display: flex;
        justify-content: center;
        size: 12px;
        font-size: 12px;
        color: rgb(29, 0, 134);
    }
    .loginbotcen{
        border-left: 1px solid rgb(204, 204, 204);
        border-right: 1px solid rgb(204, 204, 204);
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 10px;
        margin-right: 10px;
        
    }
</style>