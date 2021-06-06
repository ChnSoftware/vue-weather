<template>
    <div class="weekly-forecast">
        <div class="content">
            <div
                class="daily"
                v-for="(day, index) in filteredList"
                :key="index"
            >
                <DailyForecast :day="day" />
            </div>
        </div>
    </div>
</template>

<script>
    import DailyForecast from "@/components/DailyForecast"

    export default {
        name: "WeeklyForecast",
        props: ["forecast"],
        components: { DailyForecast },
        computed: {
            filteredList() {
                return this.forecast.daily.slice(1, 8)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .weekly-forecast {
        padding: 30px 0;
        border-bottom: 1px solid rgba(white, 0.7);

        .content {
            margin: 0 20px;
        }
        .daily:not(:last-child) {
            margin-bottom: 24px;
        }
    }
</style>