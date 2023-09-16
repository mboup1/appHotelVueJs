<template>
    <div id="AddForm" class="container text-center">
        <div id="add" class="row text-center mt-5 container ">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto ">
                <div class="bg-white shadow rounded p-4 rounded-5">
                    <h1 class="display-6 text-dark text-center bg-success rounded-4 p-2">Ajouter un hotel</h1>
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
                            <label>Prix</label>
                            <input v-model="newHotel.price" type="number" class="form-control"/>
                        </div>
                        <div class="form-group mb-3">
                            <label>Note</label>
                            <input v-model="newHotel.rating" type="number" class="form-control" placeholder="Entre 0 et 5"/>
                        </div>
                        <div class="form-group mb-3">
                            <label>Image</label>
                            <input type="file" class="form-control" @change="onFileChangeImage"/>
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
// import axios from 'axios';

export default {

    name: 'AddHotelForm',
    data() {
        return {
            newHotel: {
                city: '',
                name: '',
                description: '',
                price:null,
                rating: null,
            },
        };
    },

    methods: {
        onFileChangeImage(e) {
            // console.log("onFileChangeImage newhotel", this.newHotel)
            const file = e.target.files[0];
            this.image = file;
           
            //     .then(() => {
            //         this.hotels.push(formData);
            //         })
            //     .catch(error => {
            //         console.error('Error adding hotel:', error);
            //     });
            // this.$router.push('/hotels');
        },

        addHotel2() {
            // console.log("newhotel", this.newHotel)
            const formData = new FormData();
            formData.append('image', this.image);
            // axios.post('http://localhost:8080/image/1', formData)

            this.$emit('HotelAdded', { ...this.newHotel }, formData, this.image);

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