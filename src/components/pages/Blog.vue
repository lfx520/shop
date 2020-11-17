<template>
  <div>
    <div class="child-area">
      <Leftnav :childMes="message"></Leftnav>
      <button @click="getChild">getChild</button>
    </div>
</div>
</template>

<script>
  import Leftnav from '../common/LeftNavItem'
  export default {
    name: 'blog',
    data() {
      return {
        message: 'father message',
      }
    },
    components:{
      Leftnav
    },
    methods: {
      getChild(){
        console.log(this.$children[0].childMes);
      }
  }
}
</script>
<style scoped>
  .father-area{
    background: aqua;
    padding: 10px;
  }
  .child-area{
    background: bisque;
    padding: 10px;
  }
</style>
