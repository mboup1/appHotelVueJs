<template>
    <div class="InfosHotel">
        <div class="container shadow p-4 ">
            <h5 class="display-6 bg-success rounded-4 p-2">Informations hôtel : {{ this.editHotelPros.name }}</h5>
            <hr/>
                <div>
                    <img src="./LogoPersonnel.jpg" alt="Image de {{ hotel.name }}" style="width: 20rem;" class="rounded-2 me-5"/>
                    <img src="./LogoPersonnel.jpg" alt="Image de {{ hotel.name }}" style="width: 20rem;" class="rounded-2"/>
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
                    <p><span>Arrivée</span> : <input type="date" v-model="arrivalDate"></p>
                    <p><span>Départ</span> : <input type="date" v-model="departureDate"></p>
                </div>
                <hr/>

                <div>
                    <button class="btn btn-success me-2 " style="width: 100px" @click="bookRoomFun">Reserver</button>
                    <button class="btn btn-dark" style="width: 100px" @click="cancelEdit">Accueil</button>
                </div>
        </div>
    </div>
</template>

<script>


export default {
    props: {
        editHotelPros: {
            name: '',
            city: '',
            description: '',
            price: null,
            rating: '',
            imageUrl: '',
        },
    },

    name: 'ModalHotel',
    data() {
        return {
            arrivalDate: null, 
            departureDate: null,
            hotelBeingEdited: null, // Index of the hotel being edited
            editedHotel: {
                name: this.editHotelPros.name,
                city: this.editHotelPros.city,
                description: this.editHotelPros.description,
                price: this.editHotelPros.price,
                rating: this.editHotelPros.rating,
                imageUrl: this.editHotelPros.imageUrl,
            },
            members: [],
        };
    },

    methods: {
        bookRoomFun() {
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