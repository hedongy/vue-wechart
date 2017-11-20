<!-- 2017/10/25-->
<template>
    <div>
        <div>{{msg}}</div>
        <Modal v-if="showModal">
            <div slot="header">
                是吗
            </div>
            <div slot="content">
                是的
            </div>
        </Modal>
        <Button :option="btnOption" @btnevent="showModal = true"></Button>
    </div>
</template>

<script>

    import Tools from '../bean/Tools';

    export default {
        name: 'Opened',
        data() {
            return {
                msg: '已开奖',
                showModal: false,
                btnOption: {
                    type: 'info',
                    text: '弹出modal'
                }
            }
        },
        created() {
            // Tools.emitToast(true);
        }
    };
</script>

<style></style>
