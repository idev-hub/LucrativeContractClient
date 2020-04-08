<template>
    <article v-if="isShow">
        <h4>Банковские реквизиты</h4>
        <div class="edit-list">
            <div class="item">
                <string :val="nameBank" text="Наименование банка:"
                        min="3" max="32"
                        types="text" editable="true"
                        tables="bank" names="nameBank"/>

                <string :val="correspondentAccount" text="К/С:"
                        min="3" max="32"
                        types="text" editable="true"
                        tables="bank" names="correspondentAccount"/>

                <string :val="bankIdentificationCode" text="БИК:"
                        min="3" max="32"
                        types="text" editable="true"
                        tables="bank" names="bankIdentificationCode"/>

                <string :val="paymentAccount" text="Р/С:"
                        min="3" max="32"
                        types="text" editable="true"
                        tables="bank" names="paymentAccount"/>
            </div>
        </div>
    </article>
</template>

<script>
    import String from "../String";
    export default {
        name: "BanksDetailsSection",
        components: {String},
        props: ['payload'],
        data: function(){
            return {
                isShow: false,
                nameBank: "",
                correspondentAccount: "",
                bankIdentificationCode: "",
                paymentAccount: ""
            }
        },
        created: function () {
            if(this.payload.length > 0){
                this.isShow = true;

                this.nameBank = this.payload[0].name;
                this.correspondentAccount = this.payload[0].correspondent_account;
                this.bankIdentificationCode = this.payload[0].bank_identification_code;
                this.paymentAccount = this.payload[0].payment_account;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item{
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: minmax(35px, auto);
    }
</style>