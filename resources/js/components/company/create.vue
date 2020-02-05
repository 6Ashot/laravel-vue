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
	            	<label>Logo</label>
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

    export default {
		data(){
			return {
				formData: {
					name: 'name-',
					email: 'mail@mail.ru',
					// logo: null,
					website: 'google.ru'
				},
				errors: {}
			}
		},
		methods: {
			onFileInputChange(e){
				// console.log(e.target.files[0])
				this.formData.logo = e.target.files[0];
				// console.log(this.formData.logo.name)
			},
			submit(){
				// console.log(this.formData)
				let data = new FormData();
				data.append('name', this.formData.name);
				data.append('email', this.formData.email);
				if(this.formData.logo){
					data.append('logo', this.formData.logo);
				}
				data.append('website', this.formData.website);
				this.$store.dispatch('addCompany', data).then(res => {
					// console.log('res ', res)
					this.$router.app.$emit('show-flash-message', 'Company was created!')
				})
				.catch(err => this.errors = err.response.data.errors)
			}
		}
    }
</script>

<style @scoped>
	.error{
		color: red
	}
</style>
