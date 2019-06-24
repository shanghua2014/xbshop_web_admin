<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App'
    }

</script>

<style>
    input {
        border: 1px solid;
    }

    .button {
        border: 1px solid red;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

</style>
