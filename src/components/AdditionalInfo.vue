<template>
    <div class="additional-info content">
        <div>
            <span>Gün Doğumu:</span>
            <span>
                {{
                    new Date(currentWeather.sys.sunrise * 1000).toLocaleString(
                        "tr-TR",
                        { timeStyle: "short" }
                    )
                }}
            </span>
        </div>
        <div>
            <span>Gün Batımı:</span>
            <span>
                {{
                    new Date(currentWeather.sys.sunset * 1000).toLocaleString(
                        "tr-TR",
                        { timeStyle: "short" }
                    )
                }}
            </span>
        </div>
        <div>
            <span>Nem Oranı:</span>
            <span>{{ currentWeather.main.humidity }}%</span>
        </div>
        <div>
            <span>Bulutluluk:</span>
            <span>{{ Math.round(currentWeather.clouds.all) }}%</span>
        </div>
        <div>
            <span>Rüzgar:</span>
            <span>{{ Math.round(currentWeather.wind.speed) }} km/saat</span>
        </div>
        <div>
            <span>Basınç:</span>
            <span>{{ currentWeather.main.pressure }} hPa</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdditionalInfo",
        props: ["currentWeather"]
    }
</script>

<style lang="scss" scoped>
    .content {
        margin: 0 20px;
    }
    .additional-info {
        display: flex;
        flex-wrap: wrap;
        color: white;
        padding: 30px 0;

        div {
            display: flex;
            flex-direction: column;
            flex-basis: 50%;
            margin-bottom: 20px;

            span:nth-child(1) {
                font-size: 12px;
                margin-bottom: 8px;
            }

            span:nth-child(2) {
                font-weight: 600;
            }

            &:nth-child(5),
            &:nth-child(6) {
                margin-bottom: 0;
            }
        }
    }
</style>