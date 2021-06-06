<template>
    <div>
        <div v-if="cities.length === 0" class="no-cities">
            <p>Hiçbir yer eklenmedi. Yeni bir yer eklemek ister misin?</p>
            <button @click="addCity">Add City</button>
        </div>
        <div class="grid">
            <div class="city-link" v-for="(city, index) in cities" :key="index">
                <City :city="city" :edit="edit" />
            </div>
        </div>
    </div>
</template>

<script>
    import City from "@/components/City"

    export default {
        name: 'AddCity',
        components: { City },
        props: ["cities", "edit"],
        methods: {
            addCity() {
                this.$emit("add-city")
            }
        }
    }
</script>

<style lang="scss" scoped>
    .no-cities {
        position: absolute;
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
    }

    button {
        margin-top: 16px;
        padding: 8px 24px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: 500ms ease all;
        outline: none;

        &:active {
            transform: scale(0.95);
        }
    }
    .grid {
        display: grid;
        padding-top: 81px;
        // background-color: #31363d;
        background: linear-gradient(
            to bottom,
            #2473ab 0%,
            #1e528e 70%,
            #5b7983 100%
        );
        width: 100%;
        min-height: 100vh;
        grid-auto-rows: 250px;

        @media (min-width: 650px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>