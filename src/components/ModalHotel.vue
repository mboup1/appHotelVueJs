<template>
    <div class="InfosHotel">
        <div class="container shadow p-4 ">
            <h5 class="display-6 bg-success rounded-4 p-2">Informations hôtel : {{ this.editHotelPros.name }}</h5>
            <hr/>
                <div>
                    <img :src="'http://localhost:8080/image/' + editHotelPros.id"  alt="Image de {{ editHotelPros.name }}" style="width: 20rem;" class="rounded-2 me-5"/>
                </div>
                <hr/>
                <div>
                    <p><span>Nom</span> : {{ this.editHotelPros.name }}</p>
                </div>
                <div>
                    <p><span>Ville</span> : {{ this.editHotelPros.city }}</p>
                </div>
                <div>
                    <p class="description"><span>Description</span> : {{ this.editHotelPros.description }}</p>
                </div>
                <div>
                    <p><span>Prix</span> : {{ this.editHotelPros.price }} €</p>
                </div>
                <div class="inline-inputs">
                    <p><span>Arrivée</span> : <input type="date" v-model="arrivalDate" :min="today"></p>
                    <p><span>Départ</span> : <input type="date" v-model="departureDate" :min="departureDateMin"></p>
                    <p>Nombre de jours : {{ numberOfDays }}</p>
                    <p>Total : {{ numberOfDays* parseInt(this.editHotelPros.price) }} €</p>
                </div>
                <hr/>

                <div>
                    <button class="btn btn-success me-2 " style="width: 100px" @click="bookRoomFun">Reserver</button>
                    <button class="btn btn-dark" style="width: 100px" @click="cancelEdit">Accueil</button>
                </div>

                 <div>
                    <input v-model="dataToSave" placeholder="Données à sauvegarder" />
                    <button @click="saveData">Sauvegarder dans sessionStorage</button>

                    <button @click="loadData">Charger depuis sessionStorage</button>
                    <div v-if="loadedData">Données chargées: {{ loadedData }}</div>
                </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        editHotelPros: {
            // name: '',
            // city: '',
            // description: '',
            // price: null,
            // rating: '',
        },
    },

    name: 'ModalHotel',
    data() {
        return {
            dataToSave: JSON.stringify(this.editHotelPros),
            loadedData: "",
            
            arrivalDate: null, 
            departureDate: null,
            // hotelBeingEdited: null, // Index of the hotel being edited
            editedHotel: {
                name: this.editHotelPros.name,
                city: this.editHotelPros.city,
                description: this.editHotelPros.description,
                price: this.editHotelPros.price,
                rating: this.editHotelPros.rating,
            },
        };
    },

    computed: {
        numberOfDays() {
            if (this.arrivalDate && this.departureDate) {
                let start = new Date(this.arrivalDate);
                let end = new Date(this.departureDate);
                let timeDiff = Math.abs(end.getTime() - start.getTime());
                let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return diffDays;
            }
            return 0;
        },

        today() {
            const currentDate = new Date();
            return currentDate.toISOString().slice(0, 10);
        },

        departureDateMin() {
            return this.arrivalDate || this.today;
        }
    },

    mounted() {
    if (!sessionStorage.getItem("myData")) {
        sessionStorage.setItem("myData", this.dataToSave);
    }
    this.loadData();
},

    methods: {
        saveData() {
            sessionStorage.setItem("myData", this.dataToSave);
            alert("Données sauvegardées!");
        },
        loadData() {
            this.loadedData = sessionStorage.getItem("myData") || "Aucune donnée trouvée";
        },
    
        bookRoomFun() {
            // const princeInt = parseInt(this.editHotelPros.price);
            console.log("editHotelPros : ", this.editHotelPros);

            this.$router.push('/bookroom');
           
        },
        cancelEdit() {
            this.$router.push('hotels');
        },
    },
};
</script>

<style>
.InfosHotel {
    margin-top: 100px; 
    .container{
        border-radius: 20px;
        width: 1000px;
    }
}
.InfosHotel p {
    font-size: 20px;
    text-align: justify;
    margin-left: 20px;
}
.description {
    text-align: justify;
}
.InfosHotel span {
    font-weight: bolder;
}
.InfosHotel input[type="date"] {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}
.inline-inputs {
  display: flex;
  gap: 10px;
}

</style>