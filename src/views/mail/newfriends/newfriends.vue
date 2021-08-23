<template>
  <div class='newfriends'>
      <tobbar :tobbartext="'新的朋友'" :isshowicn="false"></tobbar>
      <div class='addfriends'>
          <addfriends></addfriends>
      </div>
      <div class='newnofriends'>
            <newfrienditem v-for="item in newfriendslist" :remarksname="item.remarksname" :friendid="item.myid" :key="item.id" :touxiangimg="$baseURL+item.touxiangurl" :applycontent="item.applycontent" :usertext="item.username" ></newfrienditem>
      </div>
      
  </div>
</template>

<script>
import Newfrienditem from 'components/newfrienditem/newfrienditem.vue'
import tobbar from 'components/tobbar/tobbar.vue'
import Addfriends from 'components/addfriends/addfriends.vue'
export default {
  data(){
    return{
      userinfo:{},
      newfriendslist:[]
    }
  },
  components: { tobbar, Addfriends,Newfrienditem },
  methods:{

  },
  mounted(){
    this.$axios.getuserinfo('/getuserinfo').then((res)=>{
      this.newfriendslist=res.newfriendslist
      if(this.newfriendslist.length>1){
        this.newfriendslist.reverse()
      }
      
      console.log(this.newfriendslist);
    })
    // console.log(this.$baseURL);
  }
}
</script>

<style>
.newnofriends{
    margin-top: 10px;
}
.addfriends{
    margin-top:10px;
}
</style>