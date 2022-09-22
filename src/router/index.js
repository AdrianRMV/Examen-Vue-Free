import { createRouter, createWebHistory } from 'vue-router';

/*
  Views
*/
import LoginView from '/src/views/LoginView.vue';
import Base from '/src/components/Base.vue';
import MoviesView from '/src/views/MoviesView.vue';
import SingleMovieInfoView from '/src/views/SingleMovieInfoView.vue';
import ActorInformationView from '/src/views/ActorInformationView.vue';
import KeywordView from '/src/views/KeywordView.vue';
import SeriesView from '/src/views/SeriesView.vue';
import Temporada_serieView from '/src/views/Temporada_serieView.vue';
import EpisodiosView from '/src/views/EpisodiosView.vue';
import MoviesPopularView from '/src/views/MoviesPopularView.vue';
import SeriePopularView from '/src/views/SeriePopularView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/dashboard',
            component: Base,
            children: [
                {
                    path: '',
                    component: MoviesView,
                    name: 'moviesView',
                },
                {
                    path: '/movie_info/:id',
                    name: 'movie_info',
                    component: SingleMovieInfoView,
                },
                {
                    path: '/actor_details/:id',
                    name: 'actor_details',
                    component: ActorInformationView,
                },
                {
                    path: '/keywords/:id',
                    name: 'keywords',
                    component: KeywordView,
                },
                {
                    path: '/serie/:id/',
                    name: 'serie',
                    component: SeriesView,
                },
                {
                    path: '/temporadas/:id',
                    name: 'temporadas',
                    component: Temporada_serieView,
                },
                {
                    path: '/episodios/temporada/:id_serie/:id/:num',
                    name: 'episodios',
                    component: EpisodiosView,
                },
                {
                    path: '/movies_popular',
                    name: 'movies_popular',
                    component: MoviesPopularView,
                },
                {
                    path: '/series_popular',
                    name: 'series_popular',
                    component: SeriePopularView,
                },
            ],
        },
    ],
});

export default router;
