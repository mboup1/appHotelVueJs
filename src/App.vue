<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg">
      <!-- <img src="./components/LogoPersonnel.jpg" alt="LogoPersonnel" class="nav-logo"> -->
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/hotels">Teranga Hôtel</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/add">Ajouter un hôtel</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Vol + hôtel</router-link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="chercher un hôtel" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Recherche</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
  <router-view @HotelAdded="addHotel" 
  :hotelsPros="hotels" 
  @HotelUpdateFormList ="editModalForm"
  @HotelUpdateFormEmit="saveUpdateHotel" 
  :editHotelPros="editedHotel" />
  <!-- <FooterHotel></FooterHotel> 
  Enregistrer les données d'un hotel de addHotel à App.vue
  @HotelAdded="addHotel"
  :hotels="hotels" 
  //Emit :Infos venant HotelsList => App.vue => update sous forme de props (editHotelFormList), pour modifier un hotel
  @hotelModalFormList="editHotelFormList"
  //Emit : Récupérer les doonées saisies d'un hotel dans les inputs de UpdateHotelForm pour la mise à jour de l'hôtel
  @HotelUpdateFormEmit="saveUpdateHotel" 
  Passage des données de mise à jour d un hotel de App.vue =>UpdateHotel/ModalHotel sous forme de props
  :editHotelPros="editedHotel"
  -->
</template>


<script>
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import AddHotelForm from './components/AddHotelForm.vue';
import HotelsList from './components/HotelsList.vue';
import UpdateHotelForm from './components/UpdateHotelForm.vue';
import ModalHotel from './components/ModalHotel.vue';
// import FooterHotel from './components/FooterHotel.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/add', component: AddHotelForm },
    { path: '/hotels', component: HotelsList },
    { path: '/update', component: UpdateHotelForm },
    { path: '/infoshotel', component: ModalHotel },
  ]
});

export default {
  //   components: {
  //   FooterHotel, // Ajoutez le composant Footer ici pour qu'il soit disponible dans le template
  // },

  name: 'App',
  data() {
    return {
      hotels: [],
      newHotel: {
        name: '',
        city: '',
        description: '',
        price: null,
        rating: null,
      },

      hotelBeingEdited: null,
      IdBack: null,
      editedHotel: {
        city: '',
        name: '',
        description: '',
        price: null,
        rating: null,
      },
    };
  },

  methods: {

    //Ajouter un hotel
    addHotel(newHotel, formData, image) {
      formData.append('image', image);

      // Essayer d'envoyer l'image d'abord
      axios.post('http://localhost:8080/image/id', formData)
        .then(() => {
          // Si l'envoi de l'image réussit, essayez d'enregistrer les détails de l'hôtel
          return axios.post('http://localhost:8080/hotel/id', newHotel);
        })
        .then(response => {
          response.data
          this.hotels.push(newHotel);
          this.newHotel = {
            name: '',
            city: '',
            description: '',
            price: null,
            rating: null,
          };
          this.$router.push('/hotels');
        })
        .catch(error => {
          console.log("image non enregistrée")
          console.error('Error:', error);
        });
    },

    //Enregistrer les modifications des données de l'hotel venant de UpdateHotelForm
    saveUpdateHotel(editedHotel, formData, image) {
      if (image) {
        formData.append('image', image);
        axios.put(`http://localhost:8080/image/update/${this.IdBack}`, formData);
      }
      if (this.hotelBeingEdited !== null) {
        //Récup données venant de App.vue sous forme de props
        const updatedHotel = {
          id: this.IdBack,
          name: editedHotel.name,
          city: editedHotel.city,
          description: editedHotel.description,
          price: editedHotel.price,
          rating: editedHotel.rating,
        };

        const BASE_URL = `http://localhost:8080/hotel/${this.IdBack}`;
        axios.put(BASE_URL, updatedHotel)
          .then(() => {
            this.hotelBeingEdited = null;
            this.$router.push('/hotels');
                setTimeout(() => {
                  window.location.reload();
                },);
          })
          .catch(error => {
            console.error('Error updating hotel:', error);
          });
      }
    },
    // //Remplir les <p> deModalHotel en cliquant sur le bouton Reserver
    editModalForm(index, updateHotelList, IdBackList) {
      this.editedHotel = updateHotelList
      this.hotelBeingEdited = index;
      this.IdBack = IdBackList
    },
  },
  router
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

#nav {
  font-size: 24px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  background-color: lightgrey;
}

#nav a {
  color: blue;
  text-decoration: none;
  font-size: 24px;
}

#nav .router-link-exact-active {
  color: #007bff;
  font-size: 25px;
  border: 2px solid blue;
  padding: 5px 10px;
  border-radius: 10px;
}

.nav-logo {
  margin-right: 10px;
  margin-left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
}
</style>


