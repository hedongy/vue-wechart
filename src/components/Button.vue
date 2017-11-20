<!-- 2017/10/24-->
<template>
    <div class="dh-btn" :class="option.type" @click.stop="clickEvent()">{{option.text}}</div>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            option: {
                type: Object,
                default: {
                    type: 'info',
                    text: ''
                }
            }
        },
        methods: {
            clickEvent() {
                this.$emit('btnevent');
            }
        }
    };
</script>

<style>
    .dh-btn{
        display: inline-block;
        border-radius: 5px;
        padding: 5px 10px;
        text-align: center;
        font-size: 12px;
    }
    .dh-btn.info{
        background-color: #ff0000;
        color: #ffffff;
    }
    .dh-btn.disable{
        background-color: #eeeeee;
        color: #aaaaaa;
    }
</style>
