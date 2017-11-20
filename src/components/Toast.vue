<!-- 2017/10/31-->
<template>
    <transition name="toast">
        <div class="toast-mask">
            <div class="toast-container">
                <div class="weui-toast">
                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>
                    <p class="weui-toast__content">{{content}}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    import Config from '../bean/Config';
    import Tools from '../bean/Tools';

    export default {
        name: 'Toast',
        data() {
            return {
                content: '已完成'
            };
        },
        created() {
            const that = this;
            Tools.getGlobVue().$on(Config.TOAST_OPTION_EMIT_EVENT_KEY, (data) => {
                Object.assign(that.option, data);
            });
        }
    }
</script>

<style>
    .toast-enter {
        opacity: 0;
    }
    .toast-leave-active {
        opacity: 0;
    }
    .toast-enter .toast-container,
    .toast-leave-active .toast-container {
        opacity: 1;
    }
    .toast-mask {
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
