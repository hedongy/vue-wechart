<!-- 2017/10/31-->
<template>
    <transition name="loading">
        <div class="loading-mask">
            <div class="loading-container">
                <div class="weui-toast">
                    <i class="weui-loading weui-icon_toast"></i>
                    <p class="weui-toast__content">{{content}}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Config from '../bean/Config';
    import Tools from '../bean/Tools';

    /**
     *  content: String
     */
    export default {
        name: 'Loading',
        data() {
            return {
                content: '数据加载中'
            };
        },
        created() {
            const that = this;
            Tools.getGlobVue().$on(Config.LOADING_OPTION_EMIT_EVENT_KEY, (content) => {
                that.content = content;
            });
        }
    }
</script>

<style>
    .loading-enter {
        opacity: 0;
    }
    .loading-leave-active {
        opacity: 0;
    }
    .loading-enter .loading-container,
    .loading-leave-active .loading-container {
        opacity: 1;
    }
    .loading-mask {
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
