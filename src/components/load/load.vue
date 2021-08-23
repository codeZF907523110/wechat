<template>
    <div class='load'>
        <div class='loadli'>
            <div>
                <img src="../../assets/img/load.gif" alt="">
            </div>
             
             <div class='loadtext'>加载中...</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.load{
    width: 100%;
    height: 100vh;
    background-color: black;
    opacity: 0.3;
    position: absolute;
    z-index: 1000000;
    top: 0;
    overflow: hidden;
}
.loadli{
    width: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.loadli img{
    width: 40px;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-50%);
}
.loadtext{
    color: rgb(255, 255, 255);
    margin-top:40px;
    text-align: center;
    font-size: 15px;
}
</style>