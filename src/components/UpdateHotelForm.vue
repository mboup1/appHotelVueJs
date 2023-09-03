<template>
    <div id="EditForm" class="container text-center">
        <div id="add" class="row text-center mt-5 ">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <div class="bg-white shadow rounded p-4">
                    <h1 class="display-6 text-dark text-center">Modifier un hotel</h1>
                    <hr class="bg-dark mb-5" />
                    <form @submit.prevent="saveEditedHotel2">
                        <div class="form-group mb-3">
                            <label>Nom</label>
                            <input v-model="editedHotel.name" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Ville</label>
                            <input v-model="editedHotel.city" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Description</label>
                            <input v-model="editedHotel.description" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Note</label>
                            <input v-model="editedHotel.rating" type="text" class="form-control" placeholder="Entre 0 et 5" />
                        </div>
                        <div>
                            <button class="btn btn-success me-2 " style="width: 100px" type="submit">Enregistrer</button>
                            <button class="btn btn-danger" style="width: 100px" @click="cancelEdit">Annuler</button>
                        </div>
                    </form>
                </div>
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
                rating: this.editHotelPros.rating,
            },
            members: [],
        };
    },

    methods: {
        saveEditedHotel2() {
            console.log(this.hotelBeingEdited)
            this.$emit('HotelUpdate', { ...this.editedHotel });
        },

        cancelEdit() {
            this.$router.push('hotels');
        },
    },
};
</script>

<style>
#EditForm {
    margin-top: 70px;
}
</style>