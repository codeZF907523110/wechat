<template>
  <div>
    <router-view></router-view>
    <div class='tabbar' >
          <!-- 组建添加事件@click.native -->
          <tabbaritem  v-for="(item,index) in tabbartexts" :key='index' :tabbarimg="tabbarimgs[index]" :tabbartext="item" :tabbari="index" @click.native='sendindex(index)'></tabbaritem>

    </div>
  </div>
</template>
<script>
let tabbar='tabbar'
import tabbaritem from './tabbaritem.vue'
export default {
  data(){
    return{
      imgs:['message.png','tongxun.png','find.png','myself.png'],
      tabbarimgs:[require('../../assets/img/tabbar/message.png'),require('../../assets/img/tabbar/tongxun.png'),require('../../assets/img/tabbar/find.png'),require('../../assets/img/tabbar/myself.png')],
      tabbartexts:['微信','通讯录','发现','我的']
    }
  },
  components: { tabbaritem },
  watch:{
    '$route.path': function (newVal, oldVal){
      let urlindex=this.$route.path.substring(this.$route.path.length-1);

      Object.assign(this.$data, this.$options.data());
      this.tabbarimgs[urlindex]=require('../../assets/img/tabbar2/'+this.imgs[urlindex])

    }
  },
  methods:{
    sendindex(pageindex){
      this.$emit('getindex',pageindex)
      Object.assign(this.$data, this.$options.data());
      this.tabbarimgs[pageindex]=require('../../assets/img/tabbar2/'+this.imgs[pageindex])
      // console.log(this.$route.path.substring(this.$route.path.length-2));
    }
  },
  mounted(){
    let urlindex=this.$route.path.substring(this.$route.path.length-1);
    // console.log(urlindex);
    Object.assign(this.$data, this.$options.data());
    this.tabbarimgs[urlindex]=require('../../assets/img/tabbar2/'+this.imgs[urlindex])
  }
}
</script>
<style>
.tabbar{
   display: flex;
    width: 100vw;
    box-sizing: border-box;
    height: 50px;
    background-color: rgb(248, 248, 248);
    /* border:1px solid red; */
    position: fixed;
    bottom: 0;
    margin: 0;
    padding: 0;
    z-index: 1000;
}
</style>