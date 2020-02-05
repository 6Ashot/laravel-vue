<template>
    <div class="container">
        <router-link :to="'/create'" class="link btn btn-primary">
            Create Company
        </router-link>
        <template v-if="companies.length > 0">
            <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Logo</th>
                            <th scope="col">Email</th>
                            <th scope="col">Website</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="company in companies" :key="company.id">
                                <td>{{company.id}}</td>
                                <td>{{company.name}}</td>
                                <td><img :src="company.logo ? company.logo : defaultLogo" width="50px"></td>
                                <td>{{company.email}}</td>
                                <td>{{company.website}}</td>
                                <!-- <td><a class="btn btn-success" style="color: white" @click='update' :data-id='company.id'>Edit</a></td> -->
                                <td><router-link class="btn btn-success" style="color: white" :to="{ name: 'companyUpdate', params: { id: company.id } }">Edit</router-link></td>
                                <td>
                                    <button type="sumbit" class="btn btn-danger" @click='deleteCompany' :data-id='company.id'>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <pagination :data="pagination" @pagination-change-page="getResults"></pagination>
                    </div>
        </template>
        <template v-else>
            <h3 align="center">Empty</h3>
        </template>
    </div>
</template>
<!--   -->
<script>
    import {mapGetters} from 'vuex'
    export default {
        data(){
            return {
                defaultLogo: 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image-800x600.jpg',
                pagination: {}
            }
        },
        mounted() {
            this.getResults();
        },
        computed: {
            ...mapGetters(['companies','getUser']),
        },
        methods: {
            deleteCompany(e) {
                const id = +e.target.getAttribute('data-id');
                this.$store.dispatch('deleteCompany', id).then(res => {
                    // console.log(res)
                    if(this.companies.length < 1){
                        this.getResults(this.pagination.last_page - 1);
                        // console.log(this.companies.length)
                    }

                }).catch(err => console.log(err))
            },
            getResults(page = 1) {
                this.$store.dispatch('getCompanies', 'api/companies?page=' + page).then(res => {
                    delete res.data;
                    this.pagination = res
                    // console.log(this.pagination)
                }).catch(err => console.log(err))
            },
            update(e) {
                const id = +e.target.getAttribute('data-id');
                this.$router.push(`update/${id}`)
            }
        }
    }
</script>

<style @scoped>
    .pagination{
        width: 20%;
        margin: auto;
    }
</style>
