
<template>
    <div id="List" class="pt-5 hotels-list">
        <h1>Hôtels disponibles ({{ this.hotels.length }})</h1>
        <div class="row justify-content-center" v-if="hotels && hotels.length">
            <div v-for="(hotel, index) in hotels" :key="index" id="colCard" class=" col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                <div class="card custom-card"  >
                    <img src="./LogoPersonnel.jpg" alt="Image de {{ hotel.name }}"/>
                    <div style="height: 140px; padding: 5px;" class="card-body" >
                            <h3> {{ truncateText(hotel.name, 15) }} - {{ truncateText(hotel.city, 10) }}</h3>
                                <p> {{ truncateText(hotel.description, 40) }}</p>
                            <p>Prix : {{ hotel.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }) }}</p>
                        <p >Note : <span class="text-warning" v-html="generateStarRating(hotel.rating)"></span></p>
                    </div>
                    <div>
                         <button class="btn btn-primary rounded-pill" @click="UpdateHotelModal(index)">
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
         <!-- Display this message if there are no hotels -->
            <p class="btn btn-outline-danger  p-3" v-else>Il n'y a pas d'hôtel disponible</p>
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
                imageUrl: '',
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
                // console.log("response.data : "+JSON.stringify(response.data))
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        },

        deletehotel(hotelId) {
            const hotel_API_BASE_URL = "http://localhost:8080/hotel/";
            // let conf = confirm(`Etes-vous sûr de vouloir supprimer ?`);
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
                imageUrl: hotel.imageUrl,                
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
                imageUrl: hotel.imageUrl,
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
  margin-top: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  width: 350px;
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

#colCard{
width: auto
}

#List{
    margin-top: 70px;
}

.hotels-list {
  height: 100vh; /* Fixez la hauteur de la page à 100% de la hauteur de la fenêtre */
  overflow-y: auto; /* Ajoutez une barre de défilement vertical si nécessaire */
    margin-bottom: 10px; /* Ajoutez une marge basse équivalente à la hauteur du pied de page */

  /* Autres styles pour votre page hotelsList */
}

</style>
