<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Companies</div>
                    <div class="flash-message alert alert-success col-md-5" v-if="flashMessage">{{message}}</div>
                    <div class="card-body">
                        <router-view @show-flash-message="asd"></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                flashMessage: false,
                message: 'Message'
            }
        },
        methods: {
            showMessage(message) {
                this.message = message;
                this.flashMessage = true;
                setTimeout(() => {
                    this.flashMessage = false;
                }, 3000)
            },
            asd(){
                console.log('ok')
            }
        },
        mounted() {
            // this.showMessage('company was created');
        }
    }
</script>

<style @scoped>
    .link{
        width: 200px;
        margin: 15px auto;
    }
    .flash-message{
        margin: 0 auto;
        text-align: center;
    }
</style>
