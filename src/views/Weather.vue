<template>
    <div class="wrap">
        <div v-if="loading" class="loading">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
        <div v-else class="weather" :class="{ day: isDay, night: isNight }">
            <div class="weather-wrap container">
                <CurrentWeather
                    :currentWeather="currentWeather"
                    :isDay="isDay"
                    :isNight="isNight"
                />
                <HourlyWeather :forecast="forecast" />
                <WeeklyForecast :forecast="forecast" />
                <AdditionalInfo :currentWeather="currentWeather" />
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import db from "@/firebase/firebaseInit"
    import CurrentWeather from "@/components/CurrentWeather"
    import HourlyWeather from "@/components/HourlyWeather"
    import WeeklyForecast from "@/components/WeeklyForecast"
    import AdditionalInfo from "@/components/AdditionalInfo"


    export default {
        name: "Weather",
        props: ["APIKey", "isDay", "isNight"],
        components: { CurrentWeather, HourlyWeather, WeeklyForecast, AdditionalInfo },
        data() {
            return {
                forecast: null,
                currentWeather: null,
                loading: true,
                currentTime: null,
            }
        },
        created() {
            this.getWeather()
        },
        beforeUnmount() {
            this.$emit("resetDays")
        },
        methods: {
            getWeather() {
                db.collection("cities")
                    .where("city", "==", `${this.$route.params.city}`)
                    .get()
                    .then((docs) => {
                        docs.forEach(doc => {
                            this.currentWeather = doc.data().currentWeather
                            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${doc.data().currentWeather.coord.lat}&lon=${doc.data().currentWeather.coord.lon}&exclude=current,minutley,alerts&units=metric&appid=${this.APIKey}`)
                                .then(res => {
                                    this.forecast = res.data
                                })
                                .then(() => {
                                    this.loading = false
                                    this.getCurrentTime()
                                    // console.log("forecast", this.forecast);
                                    // console.log("currentWeather", this.currentWeather);
                                })
                        })
                    })
            },
            getCurrentTime() {
                this.currentTime = new Date().getTime()
                const sunrise = this.currentWeather.sys.sunrise * 1000
                const sunset = this.currentWeather.sys.sunset * 1000
                if (this.currentTime > sunrise && this.currentTime < sunset) {
                    this.$emit("is-day")
                }
                else {
                    this.$emit("is-night")
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .weather {
        transition: 500ms ease;
        overflow: scroll;
        width: 100%;
        height: 100%;

        .weather-wrap {
            overflow: hidden;
            color: black;
            margin: 0 auto;
        }
    }
</style>