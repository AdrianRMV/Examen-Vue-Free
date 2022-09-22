<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref, inject } from 'vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const route = useRoute();
const router = useRouter();

// settings
const dataSettings = reactive({
    serie_id: route.params.id, // Id serie pasada por ruta
    apiKey: '1ec227d026a02bc585507b3d8387bd6d',
    imgRoute: 'https://image.tmdb.org/t/p/original/',
});

let isLoading = ref(false);
let fullPage = ref(true);

let temp_by_id = ref(null);

let getSerieById = async () => {
    const info = await fetch(
        ` https://api.themoviedb.org/3/tv/${dataSettings.serie_id}?api_key=${dataSettings.apiKey}&language=es-MX`
    );
    const json = await info.json();
    temp_by_id.value = json;
};

let getEpisodios = (serie,temporada, numTemp)=> {
        router.push(`/episodios/temporada/${serie.id}/${temporada.id}/${numTemp}`);
}

onMounted(async () => {
    isLoading.value = true;

    await getSerieById();


    setTimeout(() => {
        isLoading.value = false;
    }, 700);
});
</script>

<template>
    <Loading v-model:active="isLoading" :is-full-page="fullPage" />
    <section v-if="temp_by_id">
        <div class="container-fluid temp-container-fluid">
            <div class="container banner-temp">
                <div class="img-serie">
                    <img
                        :src="dataSettings.imgRoute + temp_by_id.backdrop_path"
                        alt="movie backdrops"
                        class="d-block w-100"
                    />
                </div>
                <div class="info-serie">
                    <h2>
                        {{ temp_by_id.name }} ({{
                            temp_by_id.first_air_date.substring(0, 4)
                        }})
                    </h2>
                    <a @click="router.go(-1)" style="cursor: pointer;"> &#8592; Volver a principal </a>
                </div>
            </div>
        </div>

        <div class="container temporadas-container">
            <section v-if="temp_by_id.seasons && temp_by_id">
                <div class="cta-temp" v-for="temporada in temp_by_id.seasons">
                    <div class="img-temp-ind">
                        <img
                            :src="dataSettings.imgRoute + temporada.poster_path"
                            alt=" temporada backdrops"
                            class="d-block w-100"
                        />
                    </div>
                    <div class="text-temp-ind">
                        <h2 class="temp-title-ind">
                            <a
                                @click="getEpisodios(temp_by_id,temporada, temporada.season_number)"
                                style="cursor: pointer"
                                >{{ temporada.name }}</a
                            >
                            <span class="date-temp-ind"
                                >{{ temporada.air_date.substring(0, 4) }} |
                                {{ temporada.episode_count }} Episodios</span
                            >
                        </h2>
                        <p>
                            Temporada {{ temporada.season_number }} de
                            {{ temp_by_id.name }} se estreno el
                            {{ temporada.air_date }}
                        </p>
                        <p>{{ temporada.overview }}</p>
                    </div>
                </div>
            </section>
            <div v-else><h1>No hay temporadas</h1></div>
        </div>
    </section>
</template>

<style scooped lang="scss">
.temp-container-fluid {
    background-color: rgba($color: grey, $alpha: 0.7);
}
.banner-temp {
    display: flex;
    margin-top: 0px;
    padding: 50px 0px !important;
}
.img-serie {
    width: 11%;
    img {
        height: 100%;
    }
}
.info-serie {
    padding-left: 30px;
    a {
        color: inherit !important;
        text-decoration: none !important;
    }
}

.temporadas-container {
    section {
        display: flex;
        flex-direction: column;
        gap: 35px;

        .cta-temp {
            display: flex;
            background-color: #fff;
            color: #000 !important;
            height: 220px;

            .img-temp-ind {
                width: 15%;
                img {
                    width: 100% !important;
                    height: 100%;
                }
            }

            .text-temp-ind {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 75%;
                padding-left: 30px;
                color: #000 !important;
                h2 {
                    font-weight: 600;
                }
                .date-temp-ind {
                    font-weight: 300;
                    font-size: 0.7em !important;
                }
            }

            a {
                color: #000 !important;
                padding-right: 25px;
            }
        }
    }
}
</style>
