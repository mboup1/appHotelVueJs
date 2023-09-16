<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg">
      <!-- <img src="./components/LogoPersonnel.jpg" alt="LogoPersonnel" class="nav-logo"> -->
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/hotels">Teranga Hôtel</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
<router-view :hotels="hotels" @HotelAdded="addHotel" @HotelUpdateFormList="editHotelForm"
@HotelUpdate="saveEditedHotel" :editHotelPros="editedHotel" />
<!-- <FooterHotel></FooterHotel> -->
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
        imageUrl:'',
      },

      hotelBeingEdited: null,
      IdBack: null,
      editedHotel: {
        city: '',
        name: '',
        description: '',
        price: null,
        rating: null,
        imageUrl: '',
      },
    };
  },

  methods: {
    //Ajouter un hotel
    addHotel(newHotel, formData, image) {
    axios.post('http://localhost:8080/hotel/id', newHotel)
        .then(response => {
            response.data;  // Assuming the backend returns the new hotel with its ID.
            console.log("response.data hotel ", response.data)

            formData.append('image', image);
            return axios.post(`http://localhost:8080/image/${1}`, formData);
        })
        .then(() => {
            this.hotels.push(newHotel);
            this.newHotel = {
                name: '',
                city: '',
                description: '',
                price: null,
                rating: null,
                imageUrl: '',
            };
            this.$router.push('/hotels');
        })
        .catch(error => {
          // console.log("erreur post hotel")
            console.error('Error:', error);
        });
},

    // addHotel(newHotel, formData, image) {
    //   console.log("addhotel", formData, "-----", image)
    //   axios.post('http://localhost:8080/hotel/id', newHotel)
    //   .then(() => {
    //     this.hotels.push(newHotel);
    //     this.newHotel = {
    //       name: '',
    //       city: '',
    //       description: '',
    //       price: null,
    //       rating: null,
    //       imageUrl: '',
    //     };
    //   })
    //   .catch(error => {
    //     console.error('Error adding hotel:', error);
    //   });
    //   axios.post('http://localhost:8080/image/id', formData)
    //   console.log("after axios image")
    //   this.$router.push('/hotels');
    //   // setTimeout(() => {
    //   //   window.location.reload();
    //   // },);
    // },
    // //Modification remplir les inputs en cliquant sur le bouton modifier
    editHotelForm(index, updateHotelList, IdBackList) {
      this.editedHotel = updateHotelList
      this.hotelBeingEdited = index;
      this.IdBack = IdBackList
    },

    saveEditedHotel(editedHotel) {

      if (this.hotelBeingEdited !== null) {
        const updatedHotel = {
          id: this.IdBack,
          name: editedHotel.name,
          city: editedHotel.city,
          description: editedHotel.description,
          price: editedHotel.price,
          rating: editedHotel.rating,
          imageUrl:  editedHotel.imageUrl,
        };
        const BASE_URL = `http://localhost:8080/hotel/${this.IdBack}`;

        axios.put(BASE_URL, updatedHotel)
          .then(() => {
            this.hotelBeingEdited = null;
            this.$router.push('/hotels');
          })
          .catch(error => {
            console.error('Error updating hotel:', error);
          });
      }
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
  font-size: 24px; /* Augmenter la taille du texte à 24px */
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  background-color: lightgrey;
}

/* Style pour les liens dans la barre de navigation */
#nav a {
  color: blue;
  text-decoration: none;
  font-size: 24px; /* Augmenter la taille du texte à 24px */
}

/* Style pour les liens actifs */
#nav .router-link-exact-active {
  color: #007bff;
  font-size: 25px;
  border: 2px solid blue; /* Ajouter une bordure bleue */
  padding: 5px 10px; /* Espacement intérieur pour la bordure */
  border-radius: 10px; /* Ajouter une bordure arrondie */
}

.nav-logo {
  margin-right: 10px; /* Marge à droite de la forme circulaire */
  margin-left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px; /* Marge à droite de l'image */
}


</style>


