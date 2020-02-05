<template>
    <div class="container">
        <div class="row justify-content-center">
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="name" class="form-control" v-model="formData.name">
                </div>
                <template v-if="errors.name">
                    <p class="error" v-for="error in errors.name">{{error}}</p>
                </template>

                <div class="form-group">
                    <label>Email</label>
                    <input type="text" name="email" class="form-control" v-model="formData.email">
                </div>
                <template v-if="errors.email">
                    <p class="error" v-for="error in errors.email">{{error}}</p>
                </template>
                <div class="form-group">
                    <label>Change Logo</label><br>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01" name="logo" @change="onFileInputChange">
                        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                    </div>
                </div>
               
        
                <template v-if="errors.logo">
                    <p class="error" v-for="error in errors.logo">{{error}}</p>
                </template>
                <div class="form-group">
                    <label>Website</label>
                    <input type="text" name="website" class="form-control" v-model="formData.website">
                </div>
                <button type="submit" class="btn btn-success">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data(){
            return {
               id: this.$route.params.id,
               formData: {
                    name: '',
                    email: '',
                    // logo: null,
                    website: ''
                },
                errors: {}
            }
        },
        mounted() {
           // console.log(this.id)
            this.$store.dispatch('editCompany', +this.id).then(response => {
                console.log(response.data)
                this.formData.name = response.data.name;
                this.formData.email = response.data.email;
                this.formData.website = response.data.website;
            }).catch(err => console.log(err.response))
        },
        computed: {
            ...mapGetters(['companies','getUser']),
        },
        methods: {
            onFileInputChange(e){
                // console.log(e.target.files[0])
                this.formData.logo = e.target.files[0];
                // console.log(this.formData.logo.name)
            },
            submit() {
                let data = new FormData();
                data.append('name', this.formData.name);
                data.append('email', this.formData.email);
                if(this.formData.logo){
                    data.append('logo', this.formData.logo);
                }
                data.append('website', this.formData.website);
                data.append('_method', 'PUT');
                // const data = {
                //     name: this.formData.name,
                //     email: this.formData.email,
                //     // logo: this.formData.logo,
                //     website: this.formData.website,
                // }
                //  if(this.formData.logo){
                //     data.logo = this.formData.logo;
                // }
                this.$store.dispatch('updateCompany', {data, id: +this.id}).then(res => {
                    this.$router.push('/companies')
                    console.log('res ', res)
                })
                .catch(err => this.errors = err.response.data.errors)
            }
        }
    }
</script>

<style @scoped>

</style>
