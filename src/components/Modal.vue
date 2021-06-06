<template>
    <div @click="closeModal" class="modal" ref="modal">
        <div class="modal-wrap">
            <label for="city-name">Enter Location:</label>
            <input
                type="text"
                id="city-name"
                placeholder="Search By City Name"
                v-model="city"
                ref="city"
            />
            <button @click="addCity">Add</button>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import db from "../firebase/firebaseInit"

    export default {
        name: "Modal",
        props: ["APIKey", "cities"],
        data() {
            return {
                city: ""
            }
        },
        mounted() {
            this.$refs.city.focus()
        },
        methods: {
            closeModal(e) {
                if (e.target === this.$refs.modal) {
                    this.$emit("close-modal")
                }
            },
            async addCity() {
                if (this.city === "") {
                    alert("Field cannot be empty")
                }
                else if (this.cities.some((res) => res.city.toLowerCase() === this.city.toLowerCase())) {
                    alert(`${this.city} zaten var! Başka bir yer ekleyin`)
                    this.$refs.city.value = ""
                }
                else {
                    try {
                        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${this.APIKey}`)
                        const data = await res.data

                        db.collection("cities").doc().set({
                            city: this.city.toLowerCase(),
                            currentWeather: data
                        })
                            .then(() => {
                                this.$emit("close-modal")
                            })

                    } catch (e) {
                        alert(`${this.city} adında bir yer bulunmamaktadır, Lütfen geçerli bir yer adı giriniz.!`)
                        this.$refs.city.value = ""
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal {
        z-index: 101;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        label {
            color: white;
        }

        .modal-wrap {
            background-color: #31363d;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 20px;
            max-width: 500px;
            width: 80%;

            input {
                border: none;
                color: white;
                background-color: transparent;
                border-bottom: 1px solid white;
                padding: 10px 4px;
                margin: 10px 0 20px;
                width: 100%;

                &:focus {
                    outline: none;
                }
            }

            button {
                background-color: #222325;
                color: white;
                width: 100%;
                padding: 10px 0;
                border-radius: 8px;
                border: none;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
                transition: 500ms ease all;

                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }
</style>