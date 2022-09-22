<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import $ from 'jquery';
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';

const route = useRoute();
const router = useRouter();

let isLoading = ref(false);
let fullPage = ref(true);

const dataSettings = reactive({
    apiKey: '1ec227d026a02bc585507b3d8387bd6d',
    imgRoute: 'https://image.tmdb.org/t/p/w500/',
});

let popular_series_complet = ref(null);

let getPopularMovies = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${dataSettings.apiKey}&language=es-MX&page=1`
    );
    const json = await info.json();
    popular_series_complet.value = json.results;
};

// Extracted id from the movie selected
const moreInfoSerie = (serie) => {
    router.push(`/serie/${serie.id}`);
    // localStorage.setItem('movie', JSON.stringify(pelicula.id_pelicula));
};

// lifecycle hooks
onMounted(async () => {
    isLoading.value = true;

    await getPopularMovies();

    setTimeout(() => {
        isLoading.value = false;
    }, 700);
});
</script>

<template>
    <Loading v-model:active="isLoading" :is-full-page="fullPage" />

    <div class="title-m_p container">
        <h1>Peliculas Populares!</h1>
    </div>
    <section
        class="container popular_movies_container"
        v-if="popular_series_complet"
    >
        <div
            class="carousel-item movie_container"
            v-for="movie in popular_series_complet"
            :key="movie.id"
        >
            <div class="card movie_popular_card bg-secondary bg-gradient">
                <div class="img-wrapper">
                    <img
                        v-bind:src="dataSettings.imgRoute + movie.poster_path"
                        alt="movie image"
                        class="d-block w-100"
                    />
                </div>
                <div class="card-body bg-secondary bg-gradient">
                    <h5 class="card-title">{{ movie.name }}</h5>
                    <p class="card-text">
                        {{ movie.release_date }}
                    </p>
                    <a @click="moreInfoSerie(movie)" class="btn btn-dark"
                        >Leer mas</a
                    >
                </div>
            </div>
        </div>
    </section>
    <section v-else>
        <h1 style="color: #fff; text-align: center">
            No se encuentran las peliculas
        </h1>
    </section>
</template>

<style scooped lang="scss">
.popular_movies_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.movie_container {
    padding: 40px 0px;
}

.title-m_p {
    padding: 30px 0 0 15px;
    h1 {
        color: #fff;
    }
}
</style>
