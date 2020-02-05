<template>
    <div class="container">
        <router-link :to="'/add'" class="link btn btn-primary">
            Add Employee
        </router-link>
        <template v-if="employee.length > 0">
           <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Company</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                            <tr v-for="e in employee" :key="e.id">
                                {{e.id}}
                                <td>{{e.firstName}}</td>
                                <td>{{e.lastName}}</td>
                                <td>{{e.company.name}}</td>
                                <td>{{e.email}}</td>
                                <td>{{e.phone}}</td>
                                <td><router-link class="btn btn-success" style="color: white" :to="{ name: 'employeeUpdate', params: { id: e.id } }">Edit</router-link></td>
                                <td>
                                    <button type="sumbit" class="btn btn-danger" @click='onDelete' :data-id='e.id'>Delete</button>
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
                pagination: {}
            }
        },
        mounted() {
            this.getResults();
        },
        computed: {
            ...mapGetters(['employee','getUser']),
        },
        methods: {
            onDelete(e) {
                const id = +e.target.getAttribute('data-id');
                this.$store.dispatch('deleteEmployee', id).then(res => {
                    // console.log(res)
                    if(this.companies.length < 1){
                        this.getResults(this.pagination.last_page - 1);
                        // console.log(this.companies.length)
                    }

                }).catch(err => console.log(err))
            },
            getResults(page = 1) {
                this.$store.dispatch('getEmployee', 'api/employee?page=' + page).then(res => {
                    delete res.data;
                    this.pagination = res
                    // console.log(this.pagination)
                }).catch(err => console.log(err))
            },
            // update(e) {
            //     const id = +e.target.getAttribute('data-id');
            //     this.$router.push(`update/${id}`)
            // }
        }
    }
</script>

<style @scoped>
    .pagination{
        width: 20%;
        margin: auto;
    }
</style>
