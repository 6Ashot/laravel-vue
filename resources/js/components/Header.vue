<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <router-link :to="isLoggedIn ? '/home': '/'" class="navbar-brand" >
                    Laravel-Vue
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>
                            
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                            <li class="nav-item" v-if="!isLoggedIn">
                                <router-link :to="'login'" class="dropdown-item">
                                        Login
                                </router-link>
                            </li>



                        <!-- Authentication Links -->
                            <li class="nav-item" v-if="isLoggedIn">
                                <router-link :to="'/companies'" class="nav-link">
                                        Companies
                                </router-link>
                            </li>
                             <li class="nav-item" v-if="isLoggedIn">
                                <router-link :to="'/employee'" class="nav-link">
                                        Employee
                                </router-link>
                            </li>
                            <!-- <li class="nav-item" v-if="isLoggedIn"> -->
                                <!-- <router-link :to="'login'" class="dropdown-item"> -->
                                        <!-- Login -->
                                <!-- </router-link> -->
                            <!-- </li> -->

                            <li class="nav-item dropdown" v-if="isLoggedIn">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                   {{getUser.name}} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a @click="logout"class="dropdown-item">
                                        Logout
                                    </a>
                                </div>
                            </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
               
            }
        },
        name: 'Header',
        methods: {
            logout() {
                this.$store.dispatch('logout')
            }
        },
        computed: {
            ...mapGetters(['getUser', 'getToken', 'isLoggedIn'])
        }
    }
</script>

<style>

</style>
