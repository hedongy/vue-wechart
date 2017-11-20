<!-- 2017/10/30-->
<template>
    <transition name="alert">
        <div class="alert-mask">
            <div class="alert-container">
                <div class="weui-dialog">
                    <div class="weui-dialog__bd">{{option.title}}</div>
                    <div class="weui-dialog__ft">
                        <a @click="clickOk()" href="javascript:;" class="weui-dialog__btn">{{option.btn}}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    import Config from '../bean/Config';
    import Tools from '../bean/Tools';

    /**
     *  option {
     *      title: String,
     *      btn: String,
     *      callback(): Function
     *  }
     */
    export default {
        name: 'Alert',
        data() {
            return {
                option: {
                    title: '提示',
                    btn: '确定'
                }
            };
        },
        methods: {
            clickOk() {
                Tools.hideAlert();
                this.option.callback && this.option.callback();
            }
        },
        created() {
            const that = this;
            Tools.getGlobVue().$on(Config.ALERT_OPTION_EMIT_EVENT_KEY, (data) => {
                Object.assign(that.option, data);
            });
        }
    }
</script>

<style>
    .alert-enter {
        transform: scale(0, 0);
    }
    .alert-leave-active {
        transform: scale(0, 0);
    }
    .alert-enter .alert-container,
    .alert-leave-active .alert-container {
        opacity: 1;
    }

    .alert-mask {
        position: absolute;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        transition: all .5s;
    }

    .alert-container .weui-dialog__btn{
        color: #ff0000;
    }
</style>
