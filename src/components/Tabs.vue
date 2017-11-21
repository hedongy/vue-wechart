<!-- 2017/10/23-->
<template>
    <div class="weui-tabbar" v-show="!hideTabs">
        <a href="javascript:;" v-for="(tab, index) in tabs" @click="changeTabs(index)" class="weui-tabbar__item" :class="{'weui-bar__item_on': tab.active}">
            <span class="tab-item">
                <i :class="getIcon(tab)"></i>
                <span v-if="tab.badge" class="weui-badge show-num">{{tab.badge}}</span>
                <span v-else-if="tab.dot" class="weui-badge weui-badge_dot show-dot"></span>
            </span>
            <p class="weui-tabbar__label">{{tab.name}}</p>
        </a>
    </div>
</template>

<script>

    import router from '../router';
    import Config from '../bean/Config';
    import Tools from "../bean/Tools";

    export default {
        name: 'Tabs',
        props: {
            tabs: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                hideTabs: false
            };
        },
        methods: {

            /**
             * 获取图标
             */
            getIcon(tab) {
                return `weui-tabbar__icon fa fa-${tab.icon}`;
            },

            /**
             * 切换tab
             * @param index
             */
            changeTabs(index) {
                const that = this;
                let path = null;
                for (let i = 0; i < that.tabs.length; i++) {
                    let item = that.tabs[i];
                    if (index === i) {
                        path = item.router;
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                }
                router.push({path: path});
            }
        },
        created() {
            const that = this;
            // 路由监听
            router.afterEach((toName, fromName) => {
                if (Config.LEVEL_1_ROUTERS.includes(toName.name)) {
                    that.hideTabs = false;
                    Tools.getGlobVue().$emit(Config.TABS_EMIT_EVENT_KEY, Config.TABS_DEFAULT_HEIGHT);
                } else {
                    that.hideTabs = true;
                    Tools.getGlobVue().$emit(Config.TABS_EMIT_EVENT_KEY, 0);
                    return;
                }
                for (let i = 0; i < that.tabs.length; i++) {
                    let item = that.tabs[i];
                    if (item.router === toName.path) {
                        item.active ? null : item.active = true;
                    } else {
                        item.active ? item.active = false : null;
                    }
                }
            });
        }
    }
</script>

<style lang="scss">

    @import "../assets/scss/base.scss";

    .weui-badge.show-num{
        position: absolute;
        top: -2px;
        right: -13px;
    }
    .weui-badge_dot.show-dot{
        position: absolute;
        top: 0;
        right: -6px;
    }

    .tab-item {
        display: inline-block;
        position: relative;
    }
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
        color: $COLOR;
    }
</style>
