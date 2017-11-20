<!-- 2017/11/3-->
<template>
    <div class="dh-scroll" ref="scrollBox">
        <div ref="contentBox">
            <slot></slot>
            <LoadMore v-show="showLoadMore" :hasMore="hasMore" :moreTitle="moreTitle" :noMoreTitle="noMoreTitle"></LoadMore>
        </div>
    </div>
</template>

<script>
    import Tools from "../bean/Tools";

    export default {
        name: 'Scroll',
        props: {
            showLoadMore: {
                type: Boolean,
                default: true
            },
            hasMore: {
                type: Boolean,
                default: true
            },
            loadMore: {
                type: Function,
                default: null
            },
            moreTitle: {
                type: String,
                default: '加载更多'
            },
            noMoreTitle: {
                type: String,
                default: '没有了'
            }
        },
        created() {
            const that = this;
            that.$nextTick(() => {
                const scrollElement = that.$refs.scrollBox;
                const contentElement = that.$refs.contentBox;
                scrollElement.addEventListener('scroll', (event) => {
                    const contentHeight = contentElement.offsetHeight;
                    const scrollHeight = scrollElement.offsetHeight;
                    let scrollTop = scrollElement.scrollTop;
                    // 滚动到底部
                    if (scrollTop + scrollHeight === contentHeight) {
                        that.hasMore ? that.loadMore && that.loadMore() : null;
                    }
                });
            });
        }
    }
</script>

<style>
    .dh-scroll{
        height: 100%;
        overflow-y: auto;
    }
</style>
