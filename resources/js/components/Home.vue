<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Home</div>

                    <div class="card-body">
                        Home
                    </div>
                     <div class="card-body">
                        {{getUser}} <br>
                        {{getToken}} <br>
                        {{isLoggedIn}} <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        name: 'Home',
        computed: {
            ...mapGetters(['getUser', 'getToken', 'isLoggedIn'])
        },
    }
</script>

<style>

</style>
