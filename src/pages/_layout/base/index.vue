<template>
    <div>
        <div id="nav">
            <router-link to="/">Home</router-link>
            <span> | </span>
            <router-link to="/nowhere">404</router-link>
            <span> | </span>
            <router-link to="/auto/route">Auto Route</router-link>
        </div>
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="less">
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
