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
                            <label>Image *</label>
                            <input type="file" class="form-control mb-3" @change="onFileChangeImage" ref="imageInput"/>
                            <!-- Aperçu de l'image ajoutée -->
                            <img v-if="imageSrc" :src="imageSrc" alt="Preview Image" style="height: 150px; width: 200px;"/>
                        </div>
                        <div>                            
                        </div>
                        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
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
            imageSrc: '',
            newHotel: {
                city: '',
                name: '',
                description: '',
                price:null,
                rating: null,
            },
            image: null, // ensure you have this defined
            errorMessage: '', // add this line
        };
    },

    methods: {

        onFileChangeImage(e) {
            const file = e.target.files[0];
            this.image = file;
            this.previewImage()
        },

        addHotel2() {
            if (!this.image) {
                this.errorMessage = "Veuillez ajouter une image";
                return;
            }
            const formData = new FormData();
            formData.append('image', this.image);
            this.$emit('HotelAdded', { ...this.newHotel }, formData, this.image);

        },
        previewImage() {
            const input = this.$refs.imageInput;
            if (input.files && input.files[0]) {
                let reader = new FileReader();

                reader.onload = (e) => {
                    this.imageSrc = e.target.result;
                }

                reader.readAsDataURL(input.files[0]);
            }
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