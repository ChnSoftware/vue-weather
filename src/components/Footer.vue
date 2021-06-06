<template>
    <footer>
        <div class="content">
            <span>
                <a :href="githubLink" target="_blank">
                    Her hakkı ChnSoftware'a aittir.
                </a>
                &copy; {{ dateSet }}
            </span>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                githubLink: "https://github.com/ChnSoftware"
            }
        },
        computed: {
            dateSet() {
                return new Date().getFullYear()
            }
        }
    }
</script>

<style lang="scss" scoped>
    footer {
        .content {
            text-align: center;
            height: 50px;
            background-color: #31363d;
            color: white;
            line-height: 50px;

            a {
                color: white;
                text-decoration: none;
            }
        }
    }
</style>