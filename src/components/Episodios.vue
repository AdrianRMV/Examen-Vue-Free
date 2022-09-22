<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref, inject } from 'vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const route = useRoute();
const router = useRouter();

// settings
const dataSettings = reactive({
    serie_id: route.params.id_serie,
    temporada_id: route.params.id, // Id movie pasada por ruta
    num_temporada: route.params.num,
    apiKey: '1ec227d026a02bc585507b3d8387bd6d',
    imgRoute: 'https://image.tmdb.org/t/p/original/',
});

let isLoading = ref(false);
let fullPage = ref(true);

let list_episodes = ref(null);
let temp_by_id = ref(null);

let getSerieById = async () => {
    const info = await fetch(
        ` https://api.themoviedb.org/3/tv/${dataSettings.serie_id}?api_key=${dataSettings.apiKey}&language=es-MX`
    );
    const json = await info.json();
    temp_by_id.value = json;
};

let getListEpisodes = async () => {
    const info = await fetch(
        ` https://api.themoviedb.org/3/tv/${dataSettings.serie_id}/season/${dataSettings.num_temporada}?api_key=${dataSettings.apiKey}&language=es-MX`
    );
    const json = await info.json();
    list_episodes.value = json.episodes;
};

onMounted(async () => {
    isLoading.value = true;

    await getSerieById();
    await getListEpisodes();

    console.log(list_episodes);

    setTimeout(() => {
        isLoading.value = false;
    }, 700);
});
</script>

<template>
    <Loading v-model:active="isLoading" :is-full-page="fullPage" />
    <section v-if="list_episodes && temp_by_id">
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
                    <a @click="router.go(-1)" style="cursor: pointer">
                        &#8592; Volver a principal
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section v-if="list_episodes && temp_by_id" class="container">
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item" v-for="episode in list_episodes">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                    >
                        <div class="episode-container">
                            <div class="img-episode">
                                <img :src="dataSettings.imgRoute + episode.still_path"
                            alt=" Episodio Image"
                            class="d-block w-100">
                            </div>
                            <div class="text-episode">
                                <h3>{{episode.episode_number}} - {{ episode.name}}</h3>
                            </div>
                        </div>
                    </button>
                </h2>
                <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                >
                    <div class="accordion-body">
                        <p>{{episode.overview}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scooped lang="scss">
    .episode-container{
        display: flex;
        width: 100%;
        .img-episode{
            width: 10%;
        }
        .text-episode{
            padding-left: 30px;
            width: 90%;
        }
    }
</style>
