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
    actor_id: route.params.id,
    apiKey: '1ec227d026a02bc585507b3d8387bd6d',
    imgRoute: 'https://image.tmdb.org/t/p/original/',
    facebookRoute: 'https://www.facebook.com/',
    instagramRoute: 'https://www.instagram.com/',
    twitterRoute: 'https://twitter.com/',
});

let actor_details = ref(null);
let actor_social_medias = ref(null);
let actor_filmography = ref(null);
let actor_filmography_series = ref(null);

let actor_aparitions = ref(null);

// Actor details getter
let getActorDetails = async () => {
    const info = await fetch(
        ` https://api.themoviedb.org/3/person/${dataSettings.actor_id}?api_key=${dataSettings.apiKey}&language=es-MX`
    );
    const json = await info.json();
    actor_details.value = json;
};

// Actor social Medias getter
let getActorSocialMedias = async () => {
    const info = await fetch(
        `  https://api.themoviedb.org/3/person/${dataSettings.actor_id}/external_ids?api_key=${dataSettings.apiKey}&language=es-MX`
    );
    const json = await info.json();
    actor_social_medias.value = json;
};

// Actor filmography Movies
let getActorFilmography = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/person/${dataSettings.actor_id}/movie_credits?api_key=${dataSettings.apiKey}&language=es-MX`
    );
    const json = await info.json();
    actor_filmography.value = json.cast;

    console.log(actor_filmography);

    for (let key in actor_filmography._rawValue) {
        actor_aparitions.value++;
    }
};

// Actor filmography Series
let getActorFilmographySeries = async () => {
    const info = await fetch(
        `https://api.themoviedb.org/3/person/${dataSettings.actor_id}/tv_credits?api_key=${dataSettings.apiKey}&language=es-MX`
    );
    const json = await info.json();
    actor_filmography_series.value = json.cast;

    console.log(actor_filmography_series);

    for (let key in actor_filmography_series._rawValue) {
        actor_aparitions.value++;
    }
};

onMounted(async () => {
    isLoading.value = true;

    // await call functions
    await getActorDetails();
    await getActorSocialMedias();
    await getActorFilmography();
    await getActorFilmographySeries();

    // Loading animation
    setTimeout(() => {
        isLoading.value = false;
    }, 700);
});
</script>

<template>
    <Loading v-model:active="isLoading" :is-full-page="fullPage" />
    <div class="actor_information_container container" v-if="actor_details">
        <div class="left-side_info">
            <div class="img-container">
                <img
                    :src="dataSettings.imgRoute + actor_details.profile_path"
                    alt="Actor Profile Image"
                />
            </div>

            <div class="social-medias" v-if="actor_social_medias">
                <a
                    :href="
                        dataSettings.facebookRoute +
                        actor_social_medias.facebook_id
                    "
                    target="_blank"
                    v-if="actor_social_medias.facebook_id"
                    title="Facebook"
                >
                    <i class="fa-brands fa-square-facebook"></i>
                </a>
                <a
                    :href="
                        dataSettings.instagramRoute +
                        actor_social_medias.instagram_id
                    "
                    target="_blank"
                    v-if="actor_social_medias.instagram_id"
                    title="Instagram"
                >
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a
                    :href="
                        dataSettings.twitterRoute +
                        actor_social_medias.twitter_id
                    "
                    target="_blank"
                    v-if="actor_social_medias.twitter_id"
                    title="Twitter"
                >
                    <i class="fa-brands fa-twitter"></i>
                </a>
            </div>

            <div class="personal-info" style="color: #fff !important">
                <h3>Informacion Personal</h3>

                <div class="personal-row">
                    <p><b>Conocido por</b></p>
                    <p>{{ actor_details.known_for_department }}</p>
                </div>

                <div class="personal-row">
                    <p><b>Créditos conocidos</b></p>
                    <p v-if="actor_filmography">{{ actor_aparitions }}</p>
                </div>

                <div class="personal-row">
                    <p><b>Sexo</b></p>
                    <p v-if="actor_details.gender == 1">Mujer</p>
                    <p v-else>Hombre</p>
                </div>

                <div class="personal-row">
                    <p><b>Cumpleaños</b></p>
                    <p>{{ actor_details.birthday }}</p>
                </div>

                <div class="personal-row">
                    <p v-if="actor_details.place_of_birth">
                        <b>Lugar de Nacimiento</b>
                    </p>
                    <p>{{ actor_details.place_of_birth }}</p>
                </div>

                <div class="personal-row">
                    <p v-if="actor_details.also_known_as">
                        <b>Tambien Conocido Como</b>
                    </p>
                    <p v-for="alias in actor_details.also_known_as">
                        {{ alias }}
                    </p>
                </div>
            </div>
        </div>

        <div class="right-side_info">
            <h1 style="color: #fff">{{ actor_details.name }}</h1>
            <div style="color: #fff; padding-bottom: 20px" class="biography">
                <h3 style="color: #fff; padding-top: 20px">Biografía</h3>
                <p v-if="actor_details.biography">
                    {{ actor_details.biography }}
                </p>
                <p v-else>No existe biografia</p>
            </div>
            <div class="all-apparitions">
                <div class="cta-apparitions" v-if="actor_filmography">
                    <h3
                        style="color: #fff; padding-top: 20px"
                        class="title-table"
                    >
                        Peliculas
                    </h3>
                    <table class="table table-light">
                        <tbody>
                            <tr v-for="info in actor_filmography">
                                <th scope="row" class="year-row">
                                    <!-- year -->
                                    <span
                                        class="year"
                                        v-if="info.release_date"
                                        >{{
                                            info.release_date.substring(0, 4)
                                        }}</span
                                    >
                                    <span class="year" v-else>Actual</span>
                                </th>
                                <td>
                                    <span>&#186;</span>
                                </td>
                                <td>
                                    <!-- title -->
                                    <span class="title">
                                        {{ info.original_title }}
                                    </span>
                                </td>
                                <td>
                                    <!-- Character name -->
                                    <span class="alias_actor_movie">como</span>
                                    <span
                                        class="character-name"
                                        v-if="info.character"
                                        >{{ info.character }}</span
                                    >
                                    <span class="character-name" v-else
                                        >Desconocido</span
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="cta-apparitions" v-if="actor_filmography_series">
                    <h3
                        style="color: #fff; padding-top: 20px"
                        class="title-table"
                    >
                        Series tv
                    </h3>
                    <table class="table table-light">
                        <tbody>
                            <tr v-for="info in actor_filmography_series">
                                <th scope="row" class="year-row">
                                    <!-- year -->
                                    <span
                                        class="year"
                                        v-if="info.first_air_date"
                                        >{{
                                            info.first_air_date.substring(0, 4)
                                        }}</span
                                    >
                                    <span class="year" v-else>Actual</span>
                                </th>
                                <td>
                                    <span>&#186;</span>
                                </td>
                                <td>
                                    <!-- title -->
                                    <span class="title">
                                        {{ info.original_name }}
                                    </span>
                                </td>
                                <td>
                                    <!-- Character name -->
                                    <span class="alias_actor_movie">como</span>
                                    <span
                                        class="character-name"
                                        v-if="info.character"
                                        >{{ info.character }}</span
                                    >
                                    <span class="character-name" v-else
                                        >Desconocido</span
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.actor_information_container {
    margin-top: 90px;
    display: flex;
    gap: 100px;
    background-color: rgba(grey, 0.5);
    padding: 30px;
    border-radius: 5px;
}
.left-side_info {
    width: 30%;
    .img-container {
        img {
            width: 100%;
            border-radius: 20px;
        }
    }
}
.right-side_info {
    width: 70%;
}

// Table movies
.year-row {
    width: 100px !important;
}
.year {
    padding-right: 53px;
}

.alias_actor_movie {
    color: rgba($color: grey, $alpha: 0.7);
}
.character-name {
    padding-left: 20px;
    font-style: italic;
    font-stretch: condensed;
}

.title-table {
    color: #fff;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.social-medias {
    display: flex;
    gap: 20px;
    padding: 20px 0px;
    a {
        font-size: 1.5em;
        color: #fff;
        transition: all ease-in-out 300ms;

        &:hover {
            color: grey;
        }
    }
}
.personal-info {
    background: grey;
    padding: 20px;
    border-radius: 5px;
}
</style>
