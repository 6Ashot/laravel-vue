<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Login</div>

                <div class="card-body">
                    <form @submit.prevent='onSubmit'>
                       

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                            <div class="col-md-6">
                                <input id="email" v-model='email' type="email" class="form-control" value="" required autocomplete="email" autofocus>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                            <div class="col-md-6">
                                <input id="password" v-model='password' type="password" class="form-control " name="password" required autocomplete="current-password">
                                <span class="error" role="alert"  v-if="error">
                                    <strong>Wrong email or password</strong>
                                </span>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>
                                 <!--    <a class="btn btn-link">
                                        Forgot Password
                                    </a> -->
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                email: 'admin@admin.com',
                password: 'password',
                error: false
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('login', {email:this.email, password: this.password})
                .catch(e => this.error = true)
            }
        },
        computed: {
            ...mapGetters(['getUser', 'getToken', 'isLoggedIn'])
        }
       
    }
</script>

<style scoped>
    .container{
        margin-top: 20px!important;
    }
    .error{
        width: 100%;
        margin-top: 0.5rem;
        font-size: 80%;
        color: #e3342f;
    }
</style>
