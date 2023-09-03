<template>
    <div id="AddForm" class="container text-center">
        <div id="add" class="row text-center mt-5 container ">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <div class="bg-white shadow rounded p-4">
                    <h1 class="display-6 text-dark text-center">Ajouter un hotel</h1>
                    <hr class="bg-dark mb-5" />
                    <form @submit.prevent="addHotel2()">
                        <div class="form-group mb-3">
                            <label>Nom</label>
                            <input v-model="newHotel.name" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Ville</label>
                            <input v-model="newHotel.city" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Description</label>
                            <input v-model="newHotel.description" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Note</label>
                            <input v-model="newHotel.rating" type="text" class="form-control" placeholder="Entre 0 et 5"/>
                        </div>
                        <div>
                            <button class="btn btn-success mx-auto mb-2" type="submit">Enregistrer</button>
                        </div>
                    </form>
                    <button class="btn btn-danger" style="width: 100px" @click="cancelAdd">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {

    name: 'HotelsList',
    data() {
        return {
            newHotel: {
                city: '',
                name: '',
                description: '',
                rating:null,
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
    margin-top: 80px;
}
</style>