<!-- 2017/11/21-->
<template>
    <div class="weui-cell weui-cell_switch">
        <div class="weui-cell__bd">{{title}}</div>
        <div class="weui-cell__ft">
            <input class="weui-switch" v-model="checked" @change="changeEvent()" type="checkbox">
        </div>
    </div>
</template>

<script>

    /**
     *  title: String
     */
    export default {
        name: 'Switchs',
        props: {
            title: String,
            value: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                checked: null
            };
        },
        methods: {

            /**
             * 改变事件
             */
            changeEvent() {
                this.$emit('input', this.checked);
            }
        },
        created() {
            this.checked = this.value;
        }
    };
</script>

<style lang="scss">

    @import "../assets/scss/base.scss";

    .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box{
        border-color: $COLOR;
        background-color: $COLOR;
    }
</style>
