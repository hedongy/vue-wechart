<!-- 2017/11/17-->
<template>
    <transition name="actionsheet">
        <div class="actionsheet-mask">
            <div class="weui-actionsheet weui-actionsheet_toggle">
                <div class="weui-actionsheet__title">
                    <p class="weui-actionsheet__title-text">{{option.title}}</p>
                </div>
                <div class="weui-actionsheet__menu">
                    <div class="weui-actionsheet__cell" @click="itemClick(index, item)" v-for="(item, index) in option.list">{{item.title}}</div>
                </div>
                <div class="weui-actionsheet__action">
                    <div class="weui-actionsheet__cell" @click="cancelClick()">{{option.cancelTitle}}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    import Tools from '../bean/Tools';
    import Config from '../bean/Config';

    /**
     * option {
     *      title: String,
     *      cancelTitle: String,
     *      list: [{
     *          title: String
     *      }],
     *      callback(index, item): Function
     * }
     */
    export default {
        name: 'Actionsheet',
        data() {
            return {
                option: {
                    title: '提示',
                    cancelTitle: '取消',
                    list: []
                },
            };
        },
        methods: {

            /**
             * 列表项
             */
            itemClick(index, item = {}) {
                Tools.hideActionsheet();
                this.option.callback && this.option.callback(index, item);
            },

            /**
             * 取消项
             */
            cancelClick() {
                Tools.hideActionsheet();
            }
        },
        created() {
            const that = this;
            Tools.getGlobVue().$on(Config.ACTIONSHEET_OPTION_EMIT_EVENT_KEY, (data) => {
                Object.assign(that.option, data);
            });
        }

    };
</script>

<style>
    .actionsheet-enter {
        transform: translate(0, 100%);
    }

    .actionsheet-leave-active {
        transform: translate(0, 100%);
    }

    .actionsheet-enter .actionsheet-container,
    .actionsheet-leave-active .actionsheet-container {
        transform: translate(0, 0);
    }

    .actionsheet-mask {
        position: absolute;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        transition: all .5s;
    }
</style>
