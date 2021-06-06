<template>
    <div class="hourly-weather">
        <div class="content">
            <div
                class="hourly-temp"
                v-for="(time, index) in filteredList"
                :key="index"
            >
                <HourlyTemp :time="time" />
            </div>
        </div>
    </div>
</template>

<script>
    import HourlyTemp from "@/components/HourlyTemp"

    export default {
        name: "HourlyWeather",
        components: { HourlyTemp },
        props: ["forecast"],
        computed: {
            filteredList() {
                return this.forecast.hourly.slice(0, 24)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hourly-weather {
        padding: 30px 0;
        border-bottom: 1px solid rgba(white, 0.7);

        .content {
            display: flex;
            max-width: 100vw;
            overflow: scroll;
            padding: 0;
            margin: 0 20px;
        }
    }
</style>