<!-- 2017/11/2-->
<template>
    <div>
        <div ref="loadMoreBox" class="weui-loadmore" v-show="hasMore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">{{moreTitle}}</span>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-show="!hasMore">
            <span class="weui-loadmore__tips">{{noMoreTitle}}</span>
        </div>
    </div>
</template>

<script>

    import Tools from '../bean/Tools';
    import Config from '../bean/Config';

    export default {
        name: 'LoadMore',
        props: {
            moreTitle: {
                type: String,
                default: '正在加载'
            },
            noMoreTitle: {
                type: String,
                default: '没有了'
            },
            hasMore: {
                type: Boolean,
                default: true
            }
        },

        /**
         * 创建
         */
        created() {
            const that = this;
            // 监听没有数据
            Tools.getGlobVue().$on(that.emitId, (flag) => {
                that.hasMore = flag;
                flag ? that.callback && that.callback() : null;
            });
        }
    }
</script>

<style></style>
