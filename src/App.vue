<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
      
    
    
    <!-- <tabbar></tabbar> -->
  </div>
</template>
<script>
// import tabbar from './components/tabbar/tabbar.vue'

export default {
  // components: { tabbar },
  data(){
    return{
      msgarr:[],
      allmsgarr:[]
    }
  },
  mounted() {
      
  },
  methods: {
      saveState() {
          
      }
  },
  created(){
  }
}
</script>
<style>
  html,body{
    margin: 0;
    padding: 0;
    background-color: rgb(245, 245, 245);
    user-select: none;
    overflow: scroll;
  };
  body{
  margin:0;
  }
  html::-webkit-scrollbar, body::-webkit-scrollbar{width:0px;height:0px;}

</style>
