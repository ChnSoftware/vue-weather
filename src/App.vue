<template>
    <div class="main">
        <div v-if="isLoading" class="loading">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
        <div v-else class="app">
            <Modal
                v-if="modalOpen"
                @close-modal="toggleModal"
                :APIKey="APIKey"
                :cities="cities"
            />
            <Navigation
                @add-city="toggleModal"
                @edit-city="editCity"
                :addCityActive="addCityActive"
                :isDay="isDay"
                :isNight="isNight"
            />
            <router-view
                :isDay="isDay"
                :isNight="isNight"
                :cities="cities"
                :edit="edit"
                :APIKey="APIKey"
                @is-day="dayTime"
                @is-night="nightTime"
                @resetDays="resetDays"
                @add-city="toggleModal"
            />
            <Footer />
        </div>
    </div>
</template>


<script>
    import axios from "axios"
    import db from "./firebase/firebaseInit"
    import Navigation from "@/components/Navigation"
    import Modal from "@/components/Modal"
    import Footer from "@/components/Footer"

    export default {
        name: "App",
        components: { Navigation, Modal, Footer },
        data() {
            return {
                APIKey: "41bd4fa2b41aefb9a36a0ba6fe068dbb",
                cities: [],
                modalOpen: null,
                edit: null,
                addCityActive: null,
                isDay: null,
                isNight: null,
                isLoading: true,
            }
        },
        created() {
            this.getCityWeather()
            this.checkRoute()
        },
        methods: {
            getCityWeather() {
                let firebaseDB = db.collection("cities")
                firebaseDB.onSnapshot(snap => {
                    if (snap.docs.length === 0) {
                        this.isLoading = false
                    }
                    snap.docChanges().forEach(async doc => {
                        if (doc.type === "added" && !doc.doc.metadata.hasPendingWrites) {
                            try {
                                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=metric&APPID=${this.APIKey}`)
                                const data = response.data
                                firebaseDB.doc(doc.doc.id).update({
                                    currentWeather: data
                                })
                                    .then(() => {
                                        this.cities.push(doc.doc.data())
                                        this.isLoading = false
                                    })
                            } catch (err) {
                                console.log(err)
                            }
                        }
                        else if (doc.type === "added" && doc.doc.metadata.hasPendingWrites) {
                            this.cities.push(doc.doc.data())
                        }
                        else if (doc.type === "removed") {
                            this.cities = this.cities.filter(city => city.city !== doc.doc.data().city)
                        }
                    })
                })
            },

            toggleModal() {
                this.modalOpen = !this.modalOpen
            },
            editCity() {
                this.edit = !this.edit
            },
            checkRoute() {
                if (this.$route.name === "AddCity") {
                    this.addCityActive = true
                }
                else {
                    this.addCityActive = false
                }
                // console.log(this.addCityActive);
            },
            dayTime() {
                this.isDay = !this.isDay
            },
            nightTime() {
                this.isNight = !this.isNight
            },
            resetDays() {
                this.isDay = false
                this.isNight = false
            }
        },
        watch: {
            $route() {
                this.checkRoute()
            }
        }
    }
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Quicksand", sans-serif;

        &::-webkit-scrollbar {
            display: none;
        }
    }
    .day {
        transition: 500ms ease all;
        background-color: rgb(59, 150, 249);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .night {
        transition: 500ms ease all;
        background-color: rgb(20, 42, 95);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .main {
        height: 100vh;
        // background-color: #31364059;
    }
    .container {
        max-width: 1140px;
        margin: 0 auto;
        width: 100%;
    }
    .loading {
        display: flex;
        height: 100vh;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .lds-ripple {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-ripple div {
        position: absolute;
        border-width: 4px;
        border-style: solid;
        border-color: rgb(59, 150, 249);
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    }
</style>
