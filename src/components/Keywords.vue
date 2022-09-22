<script setup>
import $ from 'jquery';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const route = useRoute();
const router = useRouter();

let isLoading = ref(false);
let fullPage = ref(true);


const dataSettings = reactive({
    keyword_id: route.params.id,
    keyword: route.params,
    apiKey: '1ec227d026a02bc585507b3d8387bd6d',
    imgRoute: 'https://image.tmdb.org/t/p/original/',
});

let movies_keyword = ref(null);
let keyword_name = ref(null);
let total_movies_keyword = ref(null);


let getMoviesForKeyword = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/keyword/${dataSettings.keyword_id}/movies?api_key=${dataSettings.apiKey}&language=en-US&include_adult=false`
    );
    const json = await info.json();
    movies_keyword.value = json.results;
    total_movies_keyword.value = json.results.length;
}

let getKeywordName = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/keyword/${dataSettings.keyword_id}?api_key=${dataSettings.apiKey}`
    );
    const json = await info.json();
    keyword_name.value = json.name;
}

// Stract the id from the movie selected
const moreInfoMovie = (movie) => {
    let pelicula = {
        id_pelicula: movie.id,
    };

    // Change the route to the movie page
    router.push(`/movie_info/${pelicula.id_pelicula}`);
    localStorage.setItem('movie', JSON.stringify(pelicula.id_pelicula));
};


onMounted(async () => {
    isLoading.value = true;

    await getMoviesForKeyword();
    await getKeywordName();

    setTimeout(() => {
        isLoading.value = false;
    }, 700);

});


</script>

<template>
    <Loading v-model:active="isLoading" :is-full-page="fullPage" />

    <div class="container-fluid word_header">
        <div class="word_results">
            <h1>{{keyword_name}}</h1>
            <h1>{{total_movies_keyword}}</h1>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <a @click="moreInfoMovie(movie)" :title="movie.original_title" class="col-sm-12 cta-movie-keyword" v-for="movie in movies_keyword"
                v-if="movies_keyword">
                <div class="img-container">
                    <img v-bind:src="
                        dataSettings.imgRoute +
                        movie.poster_path
                    " alt="Movie poster">
                </div>
                <div class="info-movie-container">
                    <h2 class="movie-title">{{movie.title}}</h2>
                    <span class="date">{{movie.release_date}}</span>
                    <p class="movie-description">{{movie.overview}}</p>
                </div>
            </a>
            <div class="col-sm-12" v-else>
                <h1>No hay resultados</h1>
            </div>
        </div>
    </div>

</template>

<style scooped lang="scss">
.word_header {
    background-color: rgba($color: grey, $alpha: 0.7);
}

.word_results {
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    color: #fff;
}

.cta-movie-keyword {
    display: flex;
    margin: 20px 0;
    background-color: #fff;
    border-radius: 6px;
    padding: 30px;
    cursor: pointer;
    text-decoration: none !important;
    transition: 200ms linear all;
    color: #000 !important;

    &:hover{
        transform: scale(1.02);
    }

    .img-container {
        width: 10%;

        img {
            width: 100%;
        }
    }

    .info-movie-container {
        width: 90%;
        padding-left: 30px;
    }
}
</style>