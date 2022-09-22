<script setup>
import {reactive} from 'vue';
import {useRouter} from 'vue-router';
import Swal from 'sweetalert2'

const router = useRouter();

const dataLogin = reactive({
    username: '',
    password: ''
})

let login = () => {


    var data = new FormData();
    data.append('username', `${dataLogin.username}`);
    data.append('password', `${dataLogin.password}`);
    data.append('request_token', '');

    var config = {
        method: 'post',
        url: 'https://api.themoviedb.org/3/authentication/token/validate_with_login',
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWMyMjdkMDI2YTAyYmM1ODU1MDdiM2Q4Mzg3YmQ2ZCIsInN1YiI6IjYzMWQxMDhjYmQzMjA5MDA3YWQwODM2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uds2RHtfQ3hu0hxPviDimJZyHVVZWNRUR0uCQ-qicp0',
        },
        data,
    };

    axios(config)
        .then(function (response) {
            if (response.data.success) {
                router.push('/dashboard')
                sessionStorage.setItem("usuario", dataLogin.username);
            }
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o Contraseña incorrecta',
            });
            console.log(error);
        });
};
</script>

<template>
    <div class="login-body">
        <div class="login-container">
            <div class="login-info-container">
                <form v-on:submit.prevent class="inputs-container">
                    <h1 class="login-title">Login</h1>
                    <input
                        type="text"
                        placeholder="Usuario"
                        id="email"
                        required
                        v-model="dataLogin.username"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        id="password"
                        required
                        v-model="dataLogin.password"
                    />
                    <button @click="login" id="btn-login" class="loginBtn">
                        Entrar
                    </button>
                </form>
            </div>
            <img
                class="imagenLogin"
                src="/src/images/UDsecurity.svg"
                alt="login"
            />
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.login-body {
    height: 100vh;
    font-family: 'Poppins', sans-serif;
    background-image: linear-gradient(
        to top,
        #0c3483 0%,
        #a2b6df 100%,
        #6b8cce 100%,
        #a2b6df 100%
    );
    overflow: hidden;
}

.login-container {
    height: 43.75em;
    width: 60em;
    margin: 6em auto;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 15px;
    overflow: hidden;
}

.login-info-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    padding-top: 0.5rem;
    background-color: var(--login-bg);
}

.inputs-container > * {
    display: block;
    margin: 0 auto;
}

.imagenLogin {
    width: 50%;
    padding: 2rem;
    background-color: var(--image-bg);
    box-sizing: border-box;
}

.login-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--title-bg);
    margin-bottom: 1rem;
    text-transform: capitalize;
    letter-spacing: 1px;
}

.inputs-container {
    margin-top: 8rem;
    /* border: 1px solid red; */
    height: 55%;
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.inputs-container > input {
    width: 60%;
    height: 2.4rem;
    font-size: 1em;
    padding-left: 20px;
    border: none;
    border-radius: 5px;
}

.inputs-container > input {
    border: 2px solid transparent;
}

.inputs-container > input:hover {
    border: 2px solid var(--button-bg);
}

@media screen and (max-width: 1000px) {
    .imagenLogin {
        display: none;
    }

    .login-container {
        width: 70%;
        margin-top: 3rem;
    }

    .login-info-container {
        width: 100%;
    }
}

.loginBtn {
    font-size: 18px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow, transform;
    background: radial-gradient(100% 100% at 100% 0%, #88e3ee 0%, #5468ff 100%);
    box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%),
        0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%),
        inset 0px -0.01em 0px rgb(58 65 111 / 50%);
    padding: 0 2em;
    border-radius: 0.3em;
    color: #fff;
    height: 2.6em;
    text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
    transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.loginBtn:hover {
    box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%),
        0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #3c4fe0;
    transform: translateY(-0.1em);
}

.loginBtn:active {
    box-shadow: inset 0px 0.1em 0.6em #3c4fe0;
    transform: translateY(0em);
}
</style>
