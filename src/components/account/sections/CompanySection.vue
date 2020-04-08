<template>
    <article v-if="isShow">
        <h4>Организация</h4>
        <div class="edit-list">
            <div class="item">
                <string :val="nameCompany" text="Название организации:"
                        min="3" max="32"
                        types="text" editable="true"
                        tables="company" names="nameCompany"/>
                <string :val="taxpayerIdentificationNumber"
                        min="10" max="12"
                        types="text" text="Инн:" editable="true" tables="company" names="taxpayerIdentificationNumber"/>
                <string :val="codeReason"
                        min="9" max="9"
                        types="text" text="КПП:" editable="true" tables="company" names="codeReason"/>
                <string :val="address"
                        min="3" max="128"
                        types="text" text="Адрес:"
                        editable="true" tables="company" names="address"/>
            </div>
        </div>
    </article>
</template>

<script>
    import String from "../String";

    export default {
        name: "CompanySection",
        components: {String},
        props: ['payload'],
        data: function () {
            return {
                isShow: false,
                nameCompany: "",
                address: "",
                taxpayerIdentificationNumber: "",
                codeReason: "",
            }
        },
        created: function () {
            if (this.payload.length > 0) {
                this.isShow = true;

                this.nameCompany = this.payload[0].name;
                this.address = this.payload[0].address;
                this.taxpayerIdentificationNumber = this.payload[0].taxpayer_identification_number;
                this.codeReason = this.payload[0].code_reason;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>