<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="欢迎使用 mfw-workflow-vue 项目模板" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'home',
  components: {
    HelloWorld,
  },
});
</script>
  
<style lang="scss" scoped>
.home {
    color: #579;
}
</style>