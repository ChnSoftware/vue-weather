<template>
    <header v-if="addCityActive" class="add-city">
        <nav class="container">
            <span class="brand">Chn <i class="fab fa-vuejs"></i> Weather</span>
            <div class="right">
                <i @click="editCities" ref="editCities" class="fas fa-cog"></i>
                <i @click="reloadApp" class="fas fa-redo-alt"></i>
                <i @click="addCity" class="fas fa-plus"></i>
            </div>
        </nav>
    </header>
    <header v-else :class="{ day: isDay, night: isNight }">
        <nav class="container">
            <router-link class="router-link" :to="{ name: 'AddCity' }">
                <i class="fas fa-arrow-left"></i>
            </router-link>
            <span class="brand">Chn <i class="fab fa-vuejs"></i> Weather</span>
            <span>
                {{ new Date().toLocaleString("tr-TR", { weekday: "long" }) }},
                {{ new Date().toLocaleString("tr-TR", { day: "2-digit" }) }}
                {{ new Date().toLocaleString("tr-TR", { month: "short" }) }}
            </span>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Navigation",
        props: ["edit", "addCityActive", "isDay", "isNight"],
        methods: {
            addCity() {
                this.$emit("add-city")
            },
            reloadApp() {
                location.reload()
            },
            editCities() {
                this.$refs.editCities.classList.toggle("edit-active")
                this.$emit("edit-city")
            }
        },
    }
</script>

<style lang="scss" scoped>
    .add-city {
        // background-color: #313640;
        background: linear-gradient(to bottom, #2d91c2 0%, #1e528e 100%);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    header {
        z-index: 99;
        position: fixed;
        width: 100%;

        nav {
            display: flex;
            justify-content: space-between;
            color: white;
            padding: 30px 20px;
        }
        .brand {
            cursor: pointer;
            user-select: none;
            transition: 300ms ease;

            &:active {
                transform: scale(1.3);
            }
        }

        .edit-active {
            // color: rgba(210, 75, 75, 1);
            transform: scale(1.3);
        }

        .router-link {
            color: white;
        }

        .right {
            i {
                font-size: 20px;
                cursor: pointer;
                transition: 300ms ease;

                &:not(:nth-child(1)) {
                    margin-left: 16px;
                }
            }
        }
        span {
            font-weight: 600;
        }
    }
</style>