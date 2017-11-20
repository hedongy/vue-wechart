<!-- 2017/11/2-->
<template>
    <div>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
        <p>{{id}}，{{msg}}</p>
    </div>
</template>

<script>
    export default {
        name: 'index-detail',
        data() {
            return {
                msg: 'IndexDetail',
                id: null
            };
        },
        created() {
            const that = this;
            that.id = that.$route.params.id;
        }
    }
</script>

<style></style>
