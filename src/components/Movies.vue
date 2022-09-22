<script setup>
// Imports
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import $ from 'jquery';

const router = useRouter();

const dataSettings = reactive({
    apiKey: '1ec227d026a02bc585507b3d8387bd6d',
    imgRoute: 'https://image.tmdb.org/t/p/w500/',
});

let popular_movies = ref(null);
let trending_movies = ref(null);
let upcoming_movies = ref(null);
let trending_stuff = ref(null);
let popular_series = ref(null);

// getter popular movies
let getPopularMovies = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${dataSettings.apiKey}&language=es-MX&page=1`
    );
    const json = await info.json();
    popular_movies.value = json.results;
};

// getter popular movies
let getUpcomingMovies = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${dataSettings.apiKey}&language=es-MX&page=1`
    );
    const json = await info.json();
    upcoming_movies.value = json.results;
};

// getter top rated movies
let getTopRatedMovies = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${dataSettings.apiKey}&language=es-MX&page=1`
    );
    const json = await info.json();
    trending_movies.value = json.results;
};

let getTrendingStuff = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${dataSettings.apiKey}`
    );
    const json = await info.json();
    trending_stuff.value = json.results;
}

let getPopularSeries = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${dataSettings.apiKey}&language=es-MX&page=1`
    );
    const json = await info.json();
    popular_series.value = json.results;
};

// Extracted id from the movie selected
const moreInfoMovie = (movie) => {
    let pelicula = {
        id_pelicula: movie.id,
    };

    // Change the route to the movie page
    router.push(`/movie_info/${pelicula.id_pelicula}`);
    // localStorage.setItem('movie', JSON.stringify(pelicula.id_pelicula));
};

// Extracted id from the movie selected
const moreInfoSerie = (serie) => {

    router.push(`/serie/${serie.id}`);
    // localStorage.setItem('movie', JSON.stringify(pelicula.id_pelicula));
};

// lifecycle hooks
onMounted(async () => {

    await getPopularMovies();
    await getTopRatedMovies();
    await getUpcomingMovies();
    await getTrendingStuff();
    await getPopularSeries();


    // =================================================================================================================
    // Cast scripts
    // =================================================================================================================
    var multipleCardCarousel = document.querySelector(
        '#carouselExampleControls'
    );
    if (window.matchMedia('(min-width: 768px)').matches) {
        var card_movie = $('.movie_container').width();
        var scrollPosition = 0;
        $('#carouselExampleControls .carousel-control-next').on(
            'click',
            function () {
                scrollPosition += card_movie;
                $('.carousel-inner').animate(
                    { scrollLeft: scrollPosition },
                    600
                );
            }
        );
        $('#carouselExampleControls .carousel-control-prev').on(
            'click',
            function () {
                scrollPosition -= card_movie;
                $('.carousel-inner').animate(
                    { scrollLeft: scrollPosition },
                    600
                );
            }
        );
    } else {
        $(multipleCardCarousel).addClass('slide');
    }
});
</script>

<template>

    <div class="banner container-fluid">
        <video autoplay loop muted plays-inline class="back-video">
            <source src="@/videos/marvel-intro.mp4" type="video/mp4" />
        </video>

        <h1>Bienvenidos</h1>
        <h2>
            Millones de películas, programas de televisión y personas por
            descubrir. Explora ahora.
        </h2>
    </div>

    <!-- Popular Movies Section -->
    <div class="popular_movies_section">
        <h1 class="titles container container-titles">Lo más popular</h1>
        <section class="container container_movies">
            <div id="carouselExampleControls" class="carousel" data-bs-ride="carousel">
                <div class="carousel-inner c_movies">
                    <div class="carousel-item active" style="display: none !important">
                        <div class="card">
                            <div class="img-wrapper">
                                <img src="" class="d-block w-100" alt="" />
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Card title 1</h5>
                                <p class="card-text">
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div class="carousel-item movie_container" v-for="movie in popular_movies" :key="movie.id">
                        <div class="card bg-secondary bg-gradient">
                            <div class="img-wrapper">
                                <img v-bind:src="
                                    dataSettings.imgRoute +
                                    movie.poster_path
                                " alt="movie image" class="d-block w-100" />
                            </div>
                            <div class="card-body bg-secondary bg-gradient">
                                <h5 class="card-title">{{ movie.title }}</h5>
                                <p class="card-text">
                                    {{ movie.release_date }}
                                </p>
                                <a @click="moreInfoMovie(movie)" class="btn btn-dark">Leer mas</a>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    </div>

    <!-- Latest Movies Section -->
    <div class="latest_movies_section" v-if="trending_movies">
        <h1 class="titles container container-titles">Lo mejor calificado</h1>

        <section class="container container_movies">
            <div id="carouselExampleControls" class="carousel" data-bs-ride="carousel">
                <div class="carousel-inner c_movies">
                    <div class="carousel-item active" style="display: none !important">
                        <div class="card">
                            <div class="img-wrapper">
                                <img src="" class="d-block w-100" alt="" />
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Card title 1</h5>
                                <p class="card-text">
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div class="carousel-item movie_container" v-for="movie in trending_movies" :key="movie.id">
                        <div class="card bg-secondary bg-gradient">
                            <div class="img-wrapper">
                                <img v-bind:src="
                                    dataSettings.imgRoute +
                                    movie.poster_path
                                " alt="movie image" class="d-block w-100" />
                            </div>
                            <div class="card-body bg-secondary bg-gradient">
                                <h5 class="card-title">{{ movie.title }}</h5>
                                <p class="card-text">
                                    {{ movie.release_date }}
                                </p>
                                <a @click="moreInfoMovie(movie)" class="btn btn-dark">Leer mas</a>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    </div>

    <!-- upcoming Movies Section -->
    <div class="upcoming_movies_section" v-if="upcoming_movies">
        <h1 class="titles container container-titles">Próximo por estrenar</h1>

        <section class="container container_movies">
            <div id="carouselExampleControls" class="carousel" data-bs-ride="carousel">
                <div class="carousel-inner c_movies">
                    <div class="carousel-item active" style="display: none !important">
                        <div class="card">
                            <div class="img-wrapper">
                                <img src="" class="d-block w-100" alt="" />
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Card title 1</h5>
                                <p class="card-text">
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div class="carousel-item movie_container" v-for="movie in upcoming_movies" :key="movie.id">
                        <div class="card bg-secondary bg-gradient">
                            <div class="img-wrapper">
                                <img v-bind:src="
                                    dataSettings.imgRoute +
                                    movie.poster_path
                                " alt="movie image" class="d-block w-100" />
                            </div>
                            <div class="card-body bg-secondary bg-gradient">
                                <h5 class="card-title">{{ movie.title }}</h5>
                                <p class="card-text">
                                    {{ movie.release_date }}
                                </p>
                                <a @click="moreInfoMovie(movie)" class="btn btn-dark">Leer mas</a>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    </div>

    <!-- trending Movies Section -->
    <div class="trending_section" v-if="trending_stuff">
        <h1 class="titles container container-titles">Tendencias</h1>
        <section class="container container-trending container_movies">
            <div id="carouselExampleControls" class="carousel" data-bs-ride="carousel">
                <div class="carousel-inner c_movies">
                    <div class="carousel-item active" style="display: none !important">
                        <div class="card">
                            <div class="img-wrapper">
                                <img src="" class="d-block w-100" alt="" />
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Card title 1</h5>
                                <p class="card-text">
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div class="carousel-item movie_container" v-for="movie in trending_stuff" :key="movie.id">
                        <div class="card bg-secondary bg-gradient">
                            <div class="img-wrapper">
                                <img v-bind:src="
                                    dataSettings.imgRoute +
                                    movie.poster_path
                                " alt="movie image" class="d-block w-100" />
                            </div>
                            <div class="card-body bg-secondary bg-gradient">
                                <h5 class="card-title">{{ movie.title }}</h5>
                                <p class="card-text">
                                    {{ movie.release_date }}
                                </p>
                                <a @click="moreInfoMovie(movie)" class="btn btn-dark">Leer mas</a>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    </div>

    <!-- Popular Series Section -->
    <div class="trending_section" v-if="popular_series">
        <h1 class="titles container container-titles ">Series Populares</h1>
        <section class="container container_movies">
            <div id="carouselExampleControls" class="carousel" data-bs-ride="carousel">
                <div class="carousel-inner c_movies">
                    <div class="carousel-item active" style="display: none !important">
                        <div class="card">
                            <div class="img-wrapper">
                                <img src="" class="d-block w-100" alt="" />
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Card title 1</h5>
                                <p class="card-text">
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div class="carousel-item movie_container" v-for="serie in popular_series" :key="serie.id">
                        <div class="card bg-secondary bg-gradient">
                            <div class="img-wrapper">
                                <img v-bind:src="
                                    dataSettings.imgRoute +
                                    serie.poster_path
                                " alt="serie image" class="d-block w-100" />
                            </div>
                            <div class="card-body bg-secondary bg-gradient">
                                <h5 class="card-title">{{ serie.name }}</h5>
                                <p class="card-text">
                                    {{ serie.first_air_date }}
                                </p>
                                <a @click="moreInfoSerie(serie)" class="btn btn-dark">Leer mas</a>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    </div>

</template>

<style lang="scss">
// General
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');


// .c_movies{
//     padding: 0px !important;
// }

.container_movies{
    margin-top: 0px !important;
}

body {
    margin: 0;
    padding: 0px;
    background-color: #22272e !important;
}

.banner {
    background-color: rgba(#34345c, 0.6);
    padding: 200px 76px !important;
    color: #fff;
    position: relative;
    text-align: center;

    .back-video {
        position: absolute;
        inset: 0;
        z-index: -1;
        width: 100% !important;
        height: 100% !important;
    }
}

.container-titles {
    padding: 70px 0 0 25px !important;
}

.titles {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    color: #fff;
    margin: 115px auto 0 auto;
    width: max-content;
}

.Logo {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-58%);
}

// Header animations
.block {
    position: relative !important;
    margin: -50px auto 0 !important;
    width: 100% !important;
    height: 250px !important;
    background: linear-gradient(0deg, #22272e, #272727) !important;
}

.block:before,
.block:after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    background: linear-gradient(45deg,
            #fb0094,
            #0000ff,
            #00ff00,
            #ffff00,
            #ff0000,
            #fb0094,
            #0000ff,
            #00ff00,
            #ffff00,
            #ff0000);
    background-size: 400%;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: steam 30s linear infinite;
}

@keyframes steam {
    0% {
        background-position: 0 0;
    }

    50% {
        background-position: 400% 0;
    }

    100% {
        background-position: 0 0;
    }
}

.block:after {
    filter: blur(50px);
}

.container {
    margin-top: 40px;
}

.card {
    margin: 0 1em !important;
    box-shadow: 2px 6px 8px 0 rgba(22, 22, 26, 0.18);
    border: none;
    height: 400px !important;
}

.carousel-control-prev,
.carousel-control-next {
    background-color: #e1e1e1 !important;
    width: 6vh !important;
    height: 6vh !important;
    border-radius: 50%;
    top: 50% !important;
    transform: translateY(-50%) !important;
}

@media (min-width: 768px) {
    .carousel-item {
        margin-right: 0 !important;
        flex: 0 0 25% !important;
        display: block !important;
    }

    .carousel-inner {
        display: flex !important;
    }
}

.card .img-wrapper {
    max-width: 100% !important;
    height: 13em !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}

.card img {
    max-height: 100% !important;
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
}

@media (max-width: 767px) {
    .card .img-wrapper {
        height: 17em !important;
    }
}

.card-body {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    h5 {
        font-size: 1em;
        font-weight: bold;
        font-family: 'Open Sans', sans-serif;
    }

    p {
        font-size: 0.7em;
        font-style: italic;
        font-family: 'Open Sans', sans-serif;
    }

    a {
        font-family: 'Open Sans', sans-serif;
    }
}

.carousel-inner {
    .carousel-item:first-child {
        display: none !important;
    }
}

.container-trending {
    background-image: url("@/images/trending.svg") !important;
    background-position: 50% 144px;
    background-size: 1300px;
    background-repeat: no-repeat;
}
</style>
