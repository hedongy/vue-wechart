<!-- 2017/11/29-->
<template>
    <div class="weui-cells weui-cells_radio">
        <label class="weui-cell weui-check__label" v-for="(item, index) in list" :for="index">
            <div class="weui-cell__bd">
                <p>{{item.label}}</p>
            </div>
            <div class="weui-cell__ft">
                <input @click="clickEvent()" :value="item.value" type="radio" class="weui-check" :name="name" v-model="selected" :id="index">
                <span class="weui-icon-checked"></span>
            </div>
        </label>
    </div>
</template>

<script>

    import Tools from '../bean/Tools';

    /**
     * list: [{
     *    label: String,
     *    value: Object
     * }]
     */
    export default {
        name: 'Radio',
        props: ['value', 'list'],
        data() {
            return {
                selected: null,
                name: Tools.getUUID()
            }
        },
        methods: {

            /**
             * 点击事件
             */
            clickEvent() {
                this.$emit('input', this.selected);
            }
        },
        created() {
            this.selected = this.value;
        }
    };
</script>

<style></style>
