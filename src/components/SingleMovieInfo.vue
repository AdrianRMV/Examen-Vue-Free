<script setup>
import $ from 'jquery';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref, inject  } from 'vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const route = useRoute();
const router = useRouter();

let isLoading = ref(false);
let fullPage = ref(true);

const swal = inject('$swal')


// settings
const dataSettings = reactive({
    movie_id: route.params.id, // Id movie pasada por ruta
    apiKey: '1ec227d026a02bc585507b3d8387bd6d',
    imgRoute: 'https://image.tmdb.org/t/p/original/',
});

let movie_info = ref(null);
let movie_cast = ref(null);
let movie_keyword = ref(null);

let getPeliculaInfo = async () => {
    const info = await fetch(
        ` https://api.themoviedb.org/3/movie/${dataSettings.movie_id}?api_key=${dataSettings.apiKey}&language=es-MX`
    );
    const json = await info.json();
    movie_info.value = json;
};

let getMovieCast = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/movie/${dataSettings.movie_id}/credits?api_key=${dataSettings.apiKey}&language=es-MX`
    );
    const json = await info.json();
    movie_cast.value = json.cast;
};

let getKeywordMovie = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/movie/${dataSettings.movie_id}/keywords?api_key=${dataSettings.apiKey}&language=es-MX`
    );
    const json = await info.json();
    movie_keyword.value = json.keywords;
};

// =================================================================================================================





const moreInfoActor = (actor) => {
    const id_actor = actor.id;
    router.push(`/actor_details/${id_actor}`);
};

const keyWordsMovie = (keyword) => {
    const id_keyword = keyword.id;
    router.push(`/keywords/${id_keyword}`);
};

onMounted(async () => {
    isLoading.value = true;
    
    await getPeliculaInfo();
    await getMovieCast();
    await getKeywordMovie();

    setTimeout(() => {
        isLoading.value = false;
    }, 700);

    // =================================================================================================================
    // Cast scripts
    // =================================================================================================================
    var multipleCardCarousel = document.querySelector(
        '#carouselExampleControls'
    );
    if (window.matchMedia('(min-width: 768px)').matches) {
        var card = $('.actor_container').width();
        var scrollPosition = 0;
        $('#carouselExampleControls .carousel-control-next').on(
            'click',
            function () {
                scrollPosition += card;
                $('.carousel-inner').animate(
                    { scrollLeft: scrollPosition },
                    600
                );
            }
        );
        $('#carouselExampleControls .carousel-control-prev').on(
            'click',
            function () {
                scrollPosition -= card;
                $('.carousel-inner').animate(
                    { scrollLeft: scrollPosition },
                    600
                );
            }
        );
    } else {
        $(multipleCardCarousel).addClass('slide');
    }

    // Rate Movie
    $('.rating-group .star_input').click(function (e) {
        swal.fire({
            icon: 'success',
            title: 'Calificacion Guardada',
            text: `Su calificacion fue: ${e.target.value} de 5`,
        });
    });

    $('.rating-group .rating__input--none').click(function (e) {
        swal.fire({
            icon: 'error',
            title: 'Calificacion Cancelada',
        });
    })

});
</script>

<template>
    <Loading v-model:active="isLoading" :is-full-page="fullPage" />
    <div
        v-if="movie_info && movie_cast"
        class="section container"
        style="color: #fff"
    >
        <div class="first-row">
            <img
                v-bind:src="dataSettings.imgRoute + movie_info.backdrop_path"
                alt="movie backdrops"
                class="d-block w-100"
            />

            <div class="info-container">
                <h1>
                    {{ movie_info.title }} ({{
                        movie_info.release_date.substring(0, 4)
                    }})
                </h1>
                <p class="full_date">
                    {{ movie_info.release_date }}

                    <div class="categorys">
                        <span>Generos: </span>
                        <span class="category" v-for="category in movie_info.genres">
                            {{category.name}}
                        </span>
                    </div>
                </p>
                <div class="puntuacion">
                    <span>{{ movie_info.vote_average.toFixed(1) }}</span>
                </div>
                <span>Puntuacion por usuarios</span>
                <p class="tagline">{{ movie_info.tagline }}</p>
                <h2>Resumen</h2>
                <p class="overview">{{ movie_info.overview }}</p>
            </div>

            <div class="poster_image">
                <img
                    v-bind:src="dataSettings.imgRoute + movie_info.poster_path"
                    alt="movie poster"
                    class="d-block w-100"
                />
            </div>
        </div>
        <div class="reviews-rows">
            <h2>Calificar Pelicula</h2>
            <div id="half-stars-example">
                <div class="rating-group">
                    <label
                        aria-label="0 stars"
                        class="rating__label"
                        for="rating2-0"
                        >&nbsp;</label
                    >
                    <label
                        aria-label="0.5 stars"
                        class="rating__label rating__label--half"
                        for="rating2-05"
                        ><i
                            class="rating__icon rating__icon--star fa fa-star-half"
                        ></i
                    ></label>
                    <input
                        class="rating__input star_input"
                        name="rating2"
                        id="rating2-05"
                        value="0.5"
                        type="radio"
                    />
                    <label
                        aria-label="1 star"
                        class="rating__label"
                        for="rating2-10"
                        ><i
                            class="rating__icon rating__icon--star fa fa-star"
                        ></i
                    ></label>
                    <input
                        class="rating__input star_input"
                        name="rating2"
                        id="rating2-10"
                        value="1"
                        type="radio"
                    />
                    <label
                        aria-label="1.5 stars"
                        class="rating__label rating__label--half"
                        for="rating2-15"
                        ><i
                            class="rating__icon rating__icon--star fa fa-star-half"
                        ></i
                    ></label>
                    <input
                        class="rating__input star_input"
                        name="rating2"
                        id="rating2-15"
                        value="1.5"
                        type="radio"
                    />
                    <label
                        aria-label="2 stars"
                        class="rating__label"
                        for="rating2-20"
                        ><i
                            class="rating__icon rating__icon--star fa fa-star"
                        ></i
                    ></label>
                    <input
                        class="rating__input star_input"
                        name="rating2"
                        id="rating2-20"
                        value="2"
                        type="radio"
                    />
                    <label
                        aria-label="2.5 stars"
                        class="rating__label rating__label--half"
                        for="rating2-25"
                        ><i
                            class="rating__icon rating__icon--star fa fa-star-half"
                        ></i
                    ></label>
                    <input
                        class="rating__input star_input"
                        name="rating2"
                        id="rating2-25"
                        value="2.5"
                        type="radio"
                        checked
                    />
                    <label
                        aria-label="3 stars"
                        class="rating__label"
                        for="rating2-30"
                        ><i
                            class="rating__icon rating__icon--star fa fa-star"
                        ></i
                    ></label>
                    <input
                        class="rating__input star_input"
                        name="rating2"
                        id="rating2-30"
                        value="3"
                        type="radio"
                    />
                    <label
                        aria-label="3.5 stars"
                        class="rating__label rating__label--half"
                        for="rating2-35"
                        ><i
                            class="rating__icon rating__icon--star fa fa-star-half"
                        ></i
                    ></label>
                    <input
                        class="rating__input star_input"
                        name="rating2"
                        id="rating2-35"
                        value="3.5"
                        type="radio"
                    />
                    <label
                        aria-label="4 stars"
                        class="rating__label"
                        for="rating2-40"
                        ><i
                            class="rating__icon rating__icon--star fa fa-star"
                        ></i
                    ></label>
                    <input
                        class="rating__input star_input"
                        name="rating2"
                        id="rating2-40"
                        value="4"
                        type="radio"
                    />
                    <label
                        aria-label="4.5 stars"
                        class="rating__label rating__label--half"
                        for="rating2-45"
                        ><i
                            class="rating__icon rating__icon--star fa fa-star-half"
                        ></i
                    ></label>
                    <input
                        class="rating__input star_input"
                        name="rating2"
                        id="rating2-45"
                        value="4.5"
                        type="radio"
                    />
                    <label
                        aria-label="5 stars"
                        class="rating__label"
                        for="rating2-50"
                        ><i
                            class="rating__icon rating__icon--star fa fa-star"
                        ></i
                    ></label>
                    <input
                        class="rating__input star_input"
                        name="rating2"
                        id="rating2-50"
                        value="5"
                        type="radio"
                    />
                    <input
                        class="rating__input rating__input--none"
                        name="rating"
                        id="rating-none"
                        value="0"
                        type="radio"
                    />
                    <label
                        aria-label="No rating"
                        class="rating__label"
                        for="rating-none"
                        ><i
                            class="rating__icon rating__icon--none fa fa-ban"
                        ></i
                    ></label>
                    <input
                        class="rating__input rating__input--none"
                        checked
                        name="rating2"
                        id="rating2-0"
                        value="0"
                        type="radio"
                    />
                </div>
            </div>
        </div>
        <div class="second-row-container container">
            <div class="second-row">
                <section class="cast-container">
                    <div
                        id="carouselExampleControls"
                        class="carousel"
                        data-bs-ride="carousel"
                    >
                        <div class="carousel-inner">
                            <div
                                class="carousel-item active"
                                style="display: none"
                            >
                                <div class="card">
                                    <div class="img-wrapper">
                                        <img
                                            src=""
                                            class="d-block w-100"
                                            alt=""
                                        />
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title"></h5>
                                        <p class="card-text"></p>
                                        <a href="#" class="btn btn-primary"></a>
                                    </div>
                                </div>
                            </div>
                            <a
                                @click="moreInfoActor(actor)"
                                class="carousel-item actor_container"
                                v-for="actor in movie_cast"
                                :title="actor.name"
                            >
                                <div class="card bg-secondary bg-gradient">
                                    <div class="img-wrapper">
                                        <img
                                            v-bind:src="
                                                dataSettings.imgRoute +
                                                actor.profile_path
                                            "
                                            alt="Actor Image"
                                            class="d-block w-100"
                                        />
                                    </div>
                                    <div
                                        class="card-body bg-secondary bg-gradient"
                                    >
                                        <h5 class="card-title">
                                            {{ actor.name }}
                                        </h5>
                                        <p class="card-text">
                                            {{ actor.character }}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <button
                            class="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleControls"
                            data-bs-slide="prev"
                        >
                            <span
                                class="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button
                            class="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleControls"
                            data-bs-slide="next"
                        >
                            <span
                                class="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </section>
            </div>
            <section class="details-movie">
                <div class="info-contenedor">
                    <h3>Título Original</h3>
                    <p>{{ movie_info.original_title }}</p>
                    <h3>Estado</h3>
                    <p>{{ movie_info.status }}</p>
                    <h3>Idioma original</h3>
                    <p>{{ movie_info.original_language }}</p>
                    <h3>Presupuesto</h3>
                    <p>${{ movie_info.budget }}</p>
                    <div class="keywords">
                        <a @click="keyWordsMovie(keyword)" class="word" v-if="movie_keyword" v-for="keyword in movie_keyword">
                            {{keyword.name}}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style lang="scss">
.vld-overlay.is-full-page {
    z-index: 99999999999999999 !important;
}
// .container {
//     padding: 100px 0px;
// }
.actor_container {
    cursor: pointer !important;
    text-decoration: none !important;
}
.first-row {
    position: relative;
    z-index: 0;
    border-radius: 10px;
    height: 470px;
    width: 100%;
    img {
        height: 100%;
        border-radius: 14px;

    }
    &::before {
        content: '';
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
        position: absolute;
        z-index: 0;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#34345c, 0.9);
    }

    .poster_image {
        position: absolute;
        height: 284px;
        width: 228px;
        top: 78px;
        left: 52px;
        background-color: #fff;
        border-radius: 12px;

        img {
            border-radius: 7px;
            height: 100%;
        }
    }

    .info-container {
        position: absolute;
        left: 25%;
        top: 9%;
        color: #fff;
        padding-right: 25px;
    }

    .puntuacion {
        display: inline-block;
        width: max-content;
        background: #06b063;
        padding: 12px;
        border-radius: 50%;
        margin-right: 10px;
        span {
            font-weight: bold;
        }
    }

    .tagline {
        color: rgba(#fff, 0.5) !important;
        font-style: italic;
        padding-top: 5px;
    }

    h2 {
        font-size: 1.4em;
        font-weight: bold;
    }
}

.second-row-container{
    display: flex;
    .second-row {
        display: flex;
        width: 78%;
        justify-content: center;
        .cast-container {
            width: 80%;
        }
    
        .details-movie {
            width: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    
        .info-contenedor {
            padding: 30px 50px;
            background: linear-gradient(0deg, #22272e, #272727);
            border-radius: 20px;
            margin: 0px 30px;
            border: 2px solid #d3d3d3;
            color: #fff;
    
            h3 {
                font-size: 0.9em;
                font-weight: bold;
                width: max-content !important;
            }
            p {
                font-size: 0.7em;
            }
        }
    }
    .details-movie{
        width: 25%
    }

}

.cast-container,
.details-movie {
    margin-top: 0px;
    padding-top: 120px;
    padding-bottom: 140px;
}

.carousel-inner {
    padding: 50px 0;
}

.card {
    margin: 0 1em;
    box-shadow: 2px 6px 8px 0 rgba(22, 22, 26, 0.18);
    border: none;
    height: 350px;
}

.carousel-item {
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
}
.carousel-control-prev,
.carousel-control-next {
    background-color: #e1e1e1;
    width: 6vh;
    height: 6vh;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
}
@media (min-width: 768px) {
    .carousel-item {
        margin-right: 0;
        flex: 0 0 18%;
        display: block;
    }
    .carousel-inner {
        display: flex;
    }
}
.card .img-wrapper {
    max-width: 100%;
    height: 13em;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card img {
    max-height: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
@media (max-width: 767px) {
    .card .img-wrapper {
        height: 17em;
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
        font-size: 1.2em;
        font-weight: bold;
    }
    p {
        font-size: 0.7em;
        font-style: italic;
    }
}

// stars rating styles

#half-stars-example {
    .rating-group {
        display: inline-flex;
    }

    .rating__icon {
        pointer-events: none;
    }

    .rating__input {
        position: absolute !important;
        left: -9999px !important;
    }

    .rating__label {
        cursor: pointer;
        padding: 0 0.1em;
        font-size: 1rem;
    }

    .rating__label--half {
        padding-right: 0;
        margin-right: -1.2em;
        z-index: 2;
    }

    .rating__icon--star {
        color: orange;
    }

    .rating__icon--none {
        color: #eee;
    }

    .rating__input--none:checked + .rating__label .rating__icon--none {
        color: red;
    }

    .rating__input:checked ~ .rating__label .rating__icon--star {
        color: #ddd;
    }

    .rating-group:hover .rating__label .rating__icon--star,
    .rating-group:hover .rating__label--half .rating__icon--star {
        color: orange;
    }

    .rating__input:hover ~ .rating__label .rating__icon--star,
    .rating__input:hover ~ .rating__label--half .rating__icon--star {
        color: #ddd;
    }

    .rating-group:hover
        .rating__input--none:not(:hover)
        + .rating__label
        .rating__icon--none {
        color: #eee;
    }

    .rating__input--none:hover + .rating__label .rating__icon--none {
        color: red;
    }
}

.reviews-rows {
    h2 {
        color: #fff;
        margin-right: 20px;
    }
    padding: 25px 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    margin: 20px auto;
    border-radius: 72px;
    background-color: #06b063;
}

.keywords{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .word{
        padding: 3px 10px;
        border-radius: 5px 10px;
        background-color: rgba(grey, 0.5);
        text-decoration: none !important;
        color: #fff;
        cursor: pointer;
        transition: all00ms linear;

        &:hover{
            transform: scale(1.1);
        }
    }
}

.categorys{
    display: inline-block;
    padding-left: 20px;
    font-style: italic;
    font-stretch: condensed;
    .category{
        padding-left: 10px;
    }
}
</style>
