<template>
    <div @click="goToWeather" class="city">
        <!-- <i class="far fa-trash-alt edit"></i> -->
        <i
            v-if="edit"
            @click="removeCity"
            ref="edit"
            class="fas fa-times edit"
        ></i>
        <span>{{ city.city }}</span>
        <div class="weather">
            <span>{{ Math.round(city.currentWeather.main.temp) }}&deg;</span>
            <!-- <img :src="`http://openweathermap.org/img/wn/${city.currentWeather.weather[0].icon}@2x.png`" alt=""> -->
            <img
                :src="
                    require(`../../public/conditions/${city.currentWeather.weather[0].icon}.svg`)
                "
                alt=""
            />
        </div>
        <div class="video">
            <video autoplay loop muted>
                <source
                    :src="
                        require(`../../public/videos/${city.currentWeather.weather[0].icon}.mp4`)
                    "
                />
            </video>
            <div class="bg-overlay"></div>
        </div>
    </div>
</template>

<script>
    import db from "@/firebase/firebaseInit"

    export default {
        name: "City",
        props: ["city", "edit"],
        data() {
            return {
                id: null
            }
        },
        methods: {
            removeCity() {
                db.collection("cities")
                    .where("city", "==", `${this.city.city}`)
                    .get()
                    .then(docs => {
                        docs.forEach(doc => {
                            this.id = doc.id
                        })
                    })
                    .then(() => {
                        db.collection("cities")
                            .doc(this.id)
                            .delete()
                    })
            },
            goToWeather(e) {
                if (e.target === this.$refs.edit) {
                    return
                }
                else {
                    this.$router.push({ name: "Weather", params: { city: this.city.city } })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .city {
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        color: white;
        min-height: 250px;
        padding: 20px;
        position: relative;

        .edit {
            z-index: 1;
            background-color: rgb(77, 77, 77);
            border: 10px solid rgb(77, 77, 77);
            border-radius: 0px 15px 0 0;
            font-size: 20px;
            position: absolute;
            bottom: 0;
            left: 0;
        }

        span {
            z-index: 1;
            text-transform: capitalize;
            display: block;
            font-size: 25px;
            font-weight: 600;
        }

        .weather {
            z-index: 1;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            flex: 1;

            span {
                font-size: 35px;
                margin-right: 8px;
            }

            img {
                height: 20px;
                width: auto;
            }
        }

        .video {
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            video {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        .bg-overlay {
            position: absolute;
            top: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
</style>