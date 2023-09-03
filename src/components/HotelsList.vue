
<template>
    <div id="List" class="container">
        <!-- hotel List -->
        <button v-if="hotelBeingEdited == null" class="btn btn-success mt-5" @click="addForm">Ajouter un hotel
        </button>
        <div v-if="hotelBeingEdited == null" class="pt-5 text-center">
            <h1>Liste des hôtels</h1>
            <div class="container">
                <div class="row">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nom</th>
                                <th>Ville</th>
                                <th>Description</th>
                                 <th>Prix</th>
                                 <th>Note</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(hotel, index) in hotels" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ hotel.name }}</td>
                                <td>{{ hotel.city }}</td>
                                <td>{{ hotel.description }}</td>
                                    <td>{{ hotel.price }}</td>
                                    <td>{{ hotel.rating }}</td>
                                <td>
                                    <button class="btn btn-success me-2" @click="edit(index)">Modifier</button>
                                    <button class="btn btn-danger"
                                        @click="deletehotel(hotel.id, hotel.city, hotel.name)">Supprimer</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            hotelBeingEdited: null, // Index of the hotel being edited
            editedhotel: {
                city: '',
                name: '',
                description: '',
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
                // console.log(this.hotels)
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
            // console.log("IdBackList : " + IdBackList)
            this.editedhotel = {
                name: hotel.name,
                city: hotel.city,
                description: hotel.description,
                rating: hotel.rating,
            };
            this.$emit('hotelUpdateFormList', index, this.editedhotel, IdBackList);
        },

        addForm() {
            this.$router.push('/add');
        },
    },
};
</script>

<style>
#List {
    margin-top: 50px;
}
</style>
