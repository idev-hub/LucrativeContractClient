<template>
    <main>
        <page>
            <div class="content">
                <div>
                    <h2>Упс... Страница не найдена</h2>
                    <router-link class="link" to="/">На главную <i class="icon icon-arrow-right"></i></router-link>
                </div>
            </div>
        </page>
    </main>
</template>

<script>
    import Page from "../components/anothers/Page";
    export default {
        name: "404",
        components: {Page}
    }
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        height: calc(100vh - 130px);
        justify-content: center;
        align-items: center;
        text-align: right;
        h2{
            margin-bottom: 20px;
        }
        .link{
            font-weight: 600;
            .icon{
                position : relative;
                top: 2px;
                font-size: .9em;
            }
        }
    }
</style>