<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/hotels">Teranga Hôtel</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/add">Ajouter un hôte</router-link> 
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
  <router-view />
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
#nav {
  font-size: 24px; /* Augmenter la taille du texte à 24px */
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
</style>
