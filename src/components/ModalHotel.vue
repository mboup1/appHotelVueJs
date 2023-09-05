<template>
    <div class="InfosHotel">
        <div class="container shadow p-4 ">
            <h5 class="display-6 bg-success rounded-4 p-2">Informations hôtel {{ this.editHotelPros.name }}</h5>
            <hr/>
            <form @submit.prevent="saveEditedHotel2">
                <div>
                    <p>Nom : {{ this.editHotelPros.name }}</p>
                </div>
                <div>
                    <p>Ville : {{ this.editHotelPros.city }}</p>
                </div>
                <div>
                    <p>Description : {{ this.editHotelPros.description }}</p>
                </div>
                <div>
                    <p>Prix : {{ this.editHotelPros.price }} €</p>
                </div>
                <div>
                    <button class="btn btn-success me-2 " style="width: 100px" type="submit">Reserver</button>
                    <button class="btn btn-dark" style="width: 100px" @click="cancelEdit">Accueil</button>
                </div>
            </form>
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
        },
    },

    name: 'HotelsList',
    data() {
        return {
            hotelBeingEdited: null, // Index of the hotel being edited
            editedHotel: {
                name: this.editHotelPros.name,
                city: this.editHotelPros.city,
                description: this.editHotelPros.description,
                price: this.editHotelPros.price,
                rating: this.editHotelPros.rating,
            },
            members: [],
        };
    },

    methods: {
        saveEditedHotel2() {
            this.$emit('HotelUpdate', { ...this.editedHotel });
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
    }

}
</style>