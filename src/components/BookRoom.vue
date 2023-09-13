<template>
    <div id="AddForm" class="container text-center">
        <div id="add" class="row text-center mt-5 container ">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto ">
                <div class="bg-white shadow rounded p-4 rounded-5">
                    <h1 class="display-6 text-dark text-center bg-success rounded-4 p-2">Réservation d'une chambre</h1>
                    <hr class="bg-dark mb-5" />
                    <form @submit.prevent="addHotel2()">
                        <div class="form-group mb-3">
                            <label>Nom</label>
                            <input v-model="newHotel.name" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Prénom</label>
                            <input v-model="newHotel.firstName" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Email</label>
                            <input v-model="newHotel.email" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Numéro de téléphone *</label>
                            <input v-model="newHotel.phone" type="number" class="form-control"/>
                        </div>
                        <div>
                            <button class="btn btn-success me-2" type="submit">Enregistrer</button>
                            <button class="btn btn-danger" style="width: 100px" @click="cancelAdd">Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {

    name: 'BookRoom',
    data() {
        return {
            newHotel: {
                firstName: '',
                name: '',
                email: '',
                phone:null,
                rating: null,
                imageUrl: '',
            },
        };
    },

    methods: {
        addHotel2() {
            this.$emit('HotelAdded', { ...this.newHotel });
        },
        cancelAdd() {
            this.$router.push('hotels');
        },
    },
};
</script> 

<style>
#AddForm {
    margin-top: 70px;
}
</style>