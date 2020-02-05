<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Employee</div>
                    <div class="card-body">
                        <router-view></router-view>
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
                
            }
        },
        methods: {
            
        },
        mounted() {
           
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
