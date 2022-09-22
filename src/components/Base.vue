<script setup>
import { RouterView } from 'vue-router';

// Datos de sesion
const username = sessionStorage.getItem('usuario');
</script>

<template>
    <!-- HEADER  -->
    <div class="header-content">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Películas
                            </a>
                            <ul
                                class="dropdown-menu"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <RouterLink to="/movies_popular" class="dropdown-item"
                                        >Popular</RouterLink
                                    >
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Series
                            </a>
                            <ul
                                class="dropdown-menu"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <RouterLink to="/series_popular" class="dropdown-item"
                                        >Popular</RouterLink
                                    >
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
        <div class="info-login">
            <div class="icon-user">
                <img
                    src="@/images/profile.png"
                    class="img-fluid"
                    alt="profile user"
                />
            </div>
            <!-- <div class="user-info">
                <p>{{username}}</p>
            </div> -->
            <nav
                class="navbar navbar-expand-lg navbar-light bg-light user-info"
            >
                <div class="container-fluid">
                    <div
                        class="collapse navbar-collapse"
                        id="navbarNavDropdown"
                    >
                        <ul class="navbar-nav">
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle username"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {{ username }}
                                </a>
                                <ul
                                    class="dropdown-menu"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <li>
                                        <RouterLink to="/" class="dropdown-item"
                                            >Cerrar Sesion</RouterLink
                                        >
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <header class="block">
        <RouterLink to="/dashboard" title="Home">
            <img src="@/images/samurai.png" alt="Logo Samurai" class="Logo" />
        </RouterLink>
    </header>

    <!--  RouterView -->
    <router-view v-slot="{ Component, route }">
        <transition name="fade">
            <component :is="Component" :key="route.path" />
        </transition>
    </router-view>

    <!-- FOOTER  -->
    <footer class="container-fluid">
        <div class="container container-footer">
            <div class="row">
                <div
                    class="col-sm-4 justify-content-center align-items-center text-center"
                >
                    <div class="uni-datos">
                        <img src="@/images/DASC.png" alt="Dasc logo" />
                        <h2>
                            Universidad Autonoma de Baja California Sur <br />
                            Programacion Web Avanzada (VUE)
                        </h2>
                    </div>
                </div>
                <div
                    class="col-sm-4 justify-content-center align-items-center text-center"
                >
                    <div class="personal-info">
                        <img src="https://github.com/AdrianRMV.png" alt="Me" />
                        <h2>Adrian Ramirez Vazquez</h2>
                        <div class="social-medias">
                            <a
                                href="https://www.facebook.com/blackwizart123/"
                                target="_blank"
                                title="Facebook"
                            >
                                <i class="fa-brands fa-facebook"></i>
                            </a>
                            <a
                                href="https://github.com/AdrianRMV"
                                title="Github"
                                target="_blank"
                            >
                                <i class="fa-brands fa-github"></i>
                            </a>
                            <a
                                href="https://www.instagram.com/adrianrmv01/"
                                title="Instagram"
                                target="_blank"
                            >
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    class="col-sm-4 justify-content-center align-items-center text-center"
                ></div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.header-content {
    display: flex !important;
    position: absolute !important;
    top: 52px !important;
    width: 100% !important;

    nav {
        width: 80% !important;
    }

    .info-login {
        width: max-content !important;
        text-align: center;
        position: relative;
        z-index: 9999999;
        color: #fff;

        .img-fluid {
            width: 51px;
            border: 1px solid grey;
            background-color: rgba(#fff, 0.8);
            padding: 10px;
            border-radius: 50%;
        }

        .user-info {
            padding: 0px !important;

            .username {
                text-transform: capitalize;
                border: 0px !important;
                padding: 10px 20px !important;
                margin-right: 0px !important;
                margin-top: 0px;

                &:hover,
                &:active {
                    margin-top: 10px;
                }
            }
        }
    }
}

.navbar {
    padding-left: 60px !important;
    z-index: 99999;
    // background-color: #22272e !important;
    background: linear-gradient(0deg, #22272e, #272727) !important;

    a {
        color: #fff !important;
    }

    .nav-link {
        &::after {
            display: none !important;
        }

        padding: 10px 40px !important;
        border-radius: 10px;
        border: 1px solid grey;
        margin-right: 30px;
        transition: all linear 300ms;
        background-color: transparent !important;

        &:hover,
        &:active {
            background-color: rgba(#fff, 0.6) !important;
        }
    }

    .dropdown-menu {
        a {
            color: #000 !important;
        }
    }
}

.block {
    a {
        img {
            z-index: 999999;
        }
    }
}

footer {
    background: linear-gradient(0deg, #22272e, #272727) !important;
    margin-top: 50px;
    color: #fff;

    .container-footer {
        padding: 40px 0px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .uni-datos {
            img {
                padding-bottom: 35px;
                width: 100%;
            }
            h2,
            h3 {
                font-size: 1em !important;
            }
        }

        .personal-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: 30%;
                margin-bottom: 35px;
                border-radius: 50%;
            }

            .social-medias {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                a {
                    font-size: 2em;
                    transition: all linear 200ms;

                    i {
                        transition: all linear 200ms;
                    }
                    &:hover {
                        i{
                            transform: scale(1.1);
                        }
                    }
                }
            }
        }
    }
}
</style>
