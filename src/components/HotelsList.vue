
<template>
    <div id="List" class="container pt-5">
        <h1>Hôtels disponibles</h1>
        <div class="row ">
            <div v-for="(hotel, index) in hotels" :key="index" class=" col-xl-4 col-lg-6">
                <div class="card custom-card" >
                    <img src="./LogoPersonnel.jpg" class="card-img-top custom-card-image" alt="Image de {{ hotel.name }}" />
                    <div style="height: 140px; padding: 5px;" class="card-body" >
                            <h3> {{ truncateText(hotel.name, 15) }} - {{ truncateText(hotel.city, 10) }}</h3>
                            <p> {{ truncateText(hotel.description, 40) }}</p>
                        <p>Prix : {{ hotel.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }) }}</p>
                        <p >Note : <span class="text-warning" v-html="generateStarRating(hotel.rating)"></span></p>
                    </div>
                    <div>
                         <button class="btn btn-primary m-1 rounded-pill" @click="UpdateHotelModal(index)">
                            Plus infos ...
                        </button>
                        <button class="btn btn-success m-1 rounded-pill" @click="edit(index)">
                            <i class="fas fa-edit"></i> <!-- Icône de modification -->
                        </button>
                        <button class="btn btn-danger m-1  rounded-pill" @click="deletehotel(hotel.id, hotel.city, hotel.name)">
                            <i class="fas fa-trash-alt"></i> <!-- Icône de suppression -->
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'; // Import the axios library

export default {

    name: 'hotelsList',
    data() {
        return {
            imageSrc: 'https://via.placeholder.com/150/92C952',
            hotelBeingEdited: null, // Index of the hotel being edited
            editedhotel: {
                city: '',
                name: '',
                description: '',
                price: null,
                rating: null,
            },
            hotels: [],
        };
    },

    mounted() {
        this.fetchhotels(); // Fetch hotels when the component is mounted
    },

    methods: {

        async fetchhotels() {
            try {
                const response = await axios.get('http://localhost:8080/hotels'); // Replace with your API endpoint
                this.hotels = response.data; // Update the hotels data property with fetched data
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        },

        deletehotel(hotelId) {
            const hotel_API_BASE_URL = "http://localhost:8080/hotel/";
            // let conf = confirm(`Etes-vous sûr de vouloir supprimer ${city} ${name} ?`);
            // if (conf)
                axios.delete(hotel_API_BASE_URL + hotelId)
                    .then(() => {
                        console.log("Personne supprimée avec succès!");
                    })
                    .catch(error => {
                        console.error("Erreur lors de la suppression de la personne:", error);
                    });
            window.location.reload();
            localStorage.setItem("hotels", JSON.stringify(this.hotels));
        },

        //Modification remplir les inputs en cliquant sur le bouton modifier
        edit(index) {
            this.$router.push('/update');

            this.hotelBeingEdited = index;
            const hotel = this.hotels[index];
            const IdBackList = hotel.id
            this.editedhotel = {
                name: hotel.name,
                city: hotel.city,
                description: hotel.description,
                price: hotel.price,
                rating: hotel.rating,
            };
            this.$emit('hotelUpdateFormList', index, this.editedhotel, IdBackList);
        },
        UpdateHotelModal(index) {
            this.$router.push('/infoshotel');

            this.hotelBeingEdited = index;
            const hotel = this.hotels[index];
            const IdBackList = hotel.id
            this.editedhotel = {
                name: hotel.name,
                city: hotel.city,
                description: hotel.description,
                price: hotel.price,
                rating: hotel.rating,
            };
            this.$emit('hotelUpdateFormList', index, this.editedhotel, IdBackList);
        },
        
        addForm() {
            this.$router.push('/add');
        },
        truncateText(text, maxLength) {
            if (text.length <= maxLength) {
                return text;
            } else {
                return text.slice(0, maxLength) + '...';
            }
        },
          generateStarRating(rating) {
            const maxStars = 5;
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 !== 0;
            const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);
            const stars = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
            return stars;
        },
    },
};
</script>

<style>
.custom-card {
  border: 2px solid #ccc;
  margin: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}

.card-body p {
    margin-bottom: 5px;
}

.custom-card:hover {
  transform: scale(1.05);
}
.text-warning{
    font-size: 25px;
}

#List{
    margin-top: 70px;
}
</style>
