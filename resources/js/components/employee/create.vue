<template>
    <div class="container">
  

        <form @submit.prevent="submit"> 
            <div class="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" class="form-control" v-model="form.firstName">
            </div>
            <template v-if="errors.firstName">
                    <p class="error" v-for="error in errors.firstName">{{error}}</p>
                </template>
            
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" class="form-control" v-model="form.lastName">
            </div>
            <template v-if="errors.lastName">
                    <p class="error" v-for="error in errors.lastName">{{error}}</p>
                </template>
            


            <div class="form-group">
                <label>Company</label>
                <select class="form-control" id="exampleFormControlSelect1" name="company_id" v-model="form.company_id">
                    <option disabled value="">Please select one</option>
                    <template v-if="companies.length > 0">
                        <option  v-for="company in companies" :key="company.id" :value="company.id">{{company.name}}</option>
                    </template>

                </select>
            </div>
            <template v-if="errors.company_id">
                    <p class="error" v-for="error in errors.company_id">{{error}}</p>
                </template>

        
            <div class="form-group">
                <label>Email</label>
                <input type="text" name="email" class="form-control" v-model="form.email">
            </div>
            <template v-if="errors.email">
                    <p class="error" v-for="error in errors.email">{{error}}</p>
                </template>

            

            <div class="form-group">
                <label>Phone</label>
                <input type="text" name="phone" class="form-control" v-model="form.phone">
            </div>
            

            <button type="submit" class="btn btn-success">Add</button>
        </form>
  
    </div>
</template>
<!--   -->
<script>
    import {mapGetters} from 'vuex'
    export default {
        data(){
            return {
                companies: [],
                form: {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    company_id: this.companies ? this.companies[0].id : '',
                    email: 'mail@mail.ru',
                    phone: '123123123'
                },
                errors: {}
            }
        },
        mounted() {
            this.$store.dispatch('createEmployee').then(res => {
                this.companies = res.data
            });
        },
        methods: {
            submit() {
                const formData = new FormData();
                formData.append('firstName', this.form.firstName);
                formData.append('lastName', this.form.lastName);
                formData.append('company_id', this.form.company_id);
                formData.append('email', this.form.email);
                formData.append('phone', this.form.phone);
                this.$store.dispatch('addEmployee', formData).catch(err => this.errors = err.response.data.errors);
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
