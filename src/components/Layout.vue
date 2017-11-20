<!-- 2017/10/23-->
<template>
    <div class="page">
        <div class="weui-tab">
            <div ref="routerElement" class="weui-tab__panel" :style="{paddingBottom: tabsHeight + 'px', overflow: 'hidden'}">
                <div ref="contentElement">
                    <transition name="router-fade">
                        <router-view v-if="!$route.meta.KeepAlive"></router-view>
                    </transition>
                </div>
            </div>
            <Tabs :tabs="tabs"></Tabs>
        </div>
    </div>
</template>

<script>

    import Config from '../bean/Config';
    import Tools from '../bean/Tools';

    export default {
        name: 'Layout',
        data() {
            return {
                tabs: [{
                    name: '夺车',
                    icon: 'flash',
                    router: '/',
                    active: true
                }, {
                    name: '已开奖',
                    icon: 'hourglass-end',
                    router: '/opened',
                    active: false
                }, {
                    name: '我的',
                    icon: 'user',
                    router: '/me',
                    active: false
                }],
                tabsHeight: Config.TABS_DEFAULT_HEIGHT,
                globVue: Tools.getGlobVue()
            }
        },
        created() {
            const that = this;
            that.globVue.$on(Config.TABS_EMIT_EVENT_KEY, (height) => {
                that.tabsHeight = height;
            });
        }
    };
</script>

<style>
    .page{
        height: 100%;
    }
    .router-fade-leave-active {
        transition: all 0.3s;
        transform: translate(100%, 0);
    }
    .router-fade-enter-active{
        transition: all 0.3s;
        transform: translate(0, 0);
        opacity: 1;
    }
    .router-fade-enter, .router-fade-leave-active {
        transition: all 0s;
        transform: translate(100%, 0);
        opacity: 0;
    }
    .weui-tab__panel > div{
        height: 100%;
    }
</style>
