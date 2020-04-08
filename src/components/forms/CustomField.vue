<template>
    <label class="input-custom">

        <slot name="title"></slot>

        <the-mask
                v-if="!!mask"
                :mask="mask"
                :class="{ 'invalid': v.$error }"
                :type="type"
                :placeholder="placeholder"
                v-bind:value="value"
                v-on:input="handler"
        />

        <currency-input
                v-else-if="!!money"
                :class="{ 'invalid': v.$error }"
                :placeholder="placeholder"
                v-bind:value="value"
                v-on:input="handler"></currency-input>

        <input
                v-else
                :class="{ 'invalid': v.$error }"
                :type="type"
                :placeholder="placeholder"
                v-bind:value="value"
                v-on:input="handler($event.target.value)"
        />

        <slot name="errors">
            <div>
                <p class="error" v-if="(v.hasOwnProperty('minLength')?!v.minLength:false)">* Необходимо ввести не менее
                    {{v.$params.minLength.min}} символов</p>
                <p class="error" v-if="(v.hasOwnProperty('maxLength')?!v.maxLength:false)">* Необходимо ввести не более
                    {{v.$params.maxLength.max}} символов</p>
                <p class="error" v-if="(v.hasOwnProperty('numeric')?!v.numeric:false)">* Разрешены только целые
                    числа</p>
                <p class="error" v-if="(v.hasOwnProperty('decimal')?!v.decimal:false)">* Разрешены только нецелые
                    числа</p>
                <p class="error" v-if="(v.hasOwnProperty('maxValue')?!v.maxValue:false)">* Число не может быть больще
                    {{v.$params.maxLength.max}}</p>
                <p class="error" v-if="(v.hasOwnProperty('minValue')?!v.minValue:false)">* Число не может быть меньше
                    {{v.$params.minValue.min}}</p>
                <p class="error" v-if="(v.hasOwnProperty('between')?!v.between:false)">* Число не должно быть больше
                    {{v.$params.between.max}} и меньше {{v.$params.between.min}}</p>
            </div>
        </slot>

    </label>
</template>

<script>
    export default {
        name: 'CustomField',
        model:{
            prop: "value",
            event: "input"
        },
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value:{
                type: String || Number
            },
            placeholder: {
                type: String
            },
            v: {
                type: Object
            },
            mask: {
                type: String
            },
            money: {
                type: Boolean
            }
        },
        data: function() {
            return {
                content: this.value,
                moneyPayload: {
                    decimal: ',',
                    thousands: '.',
                    prefix: 'R$ ',
                    suffix: ' #',
                    precision: 6,
                    masked: true,
                    distractionFree: true
                }
            }
        },
        methods: {
            handler: function (e) {
                this.$emit("input", e);
            }
        }
    }
</script>


<style lang="scss" scoped>
    .error {
        color: #530000;
        font-size: 13px;
        padding: 10px 0px;
    }
</style>