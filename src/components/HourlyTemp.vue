<template>
    <div class="hour">
        <span>
            {{
                new Date(time.dt * 1000).toLocaleString("tr-TR", {
                    hour: "numeric",
                })
            }}
        </span>
        <span>
            <img
                :src="
                    require(`../../public/conditions/${time.weather[0].icon}.svg`)
                "
                alt=""
            />
        </span>
        <span> {{ Math.round(time.temp) }}&deg; </span>
    </div>
</template>

<script>
    export default {
        name: "HourlyTemp",
        props: ["time"],
    }
</script>

<style lang="scss" scoped>
    .hour {
        color: white;
        display: flex;
        flex-direction: column;
        min-width: 30px;
        margin-right: 20px;
    }
    img {
        width: auto;
        height: 22px;
        display: block;
    }
    span {
        display: block;
        align-self: center;
    }

    span:nth-child(1) {
        font-weight: 300;
        margin-bottom: 12px;
    }
    span:nth-child(2) {
        margin-bottom: 12px;
    }
    span:nth-child(3) {
        font-weight: 500;
    }
</style>