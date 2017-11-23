<!-- 2017/11/21-->
<template>
    <div class="weui-progress">
        <div class="weui-progress__bar">
            <div class="weui-progress__inner-bar js_progress" :style="getProgressValue"></div>
        </div>
        <a href="javascript:;" class="weui-progress__opr" @click="cancelClick()" v-show="showCancelIcon">
            <i class="weui-icon-cancel"></i>
        </a>
    </div>
</template>

<script>

    /**
     *  value: Number，初始化数据
     *  cancelevent: Event，事件绑定
     */
    export default {
        name: 'Progress',
        props: {
            value: {
                type: String,
                default: 0
            }
        },
        computed: {

            /**
             * 获取进度条值
             * @return {string}
             */
            getProgressValue() {
                return `width: ${this.value > 100 ? 100 : this.value}%;`;
            },

            /**
             * 显示取消图标
             */
            showCancelIcon() {
                return this.value < 100 && this.value > 0;
            }
        },
        methods: {

            /**
             * 取消操作
             */
            cancelClick() {
                this.$emit('cancelevent');
            }
        }
    };
</script>

<style lang="scss">

    @import "../assets/scss/base.scss";

    .weui-progress__inner-bar{
        background-color: $COLOR;
    }
</style>
