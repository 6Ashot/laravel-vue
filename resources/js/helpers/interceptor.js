export function interceptor(store, router){
	axios.interceptors.response.use(null, err => {
		if(err.response.status === 401){
			store.dispatch('logout');
			router.push('/login');
		}
		return Promise.reject(err)
	})
	// axios.defaults.headers.common["Authorization"] = `Bearer ${store.getters.getToken}`
	axios.interceptors.request.use(
   		config => {
			config.headers['Authorization'] = `Bearer ${store.getters.getToken}`;
			config.headers['Content-Type'] = 'application/json';
			return config;
   		},
   		error => {
       Promise.reject(error)
   });


	// axios.interceptors.request.use(function(config) {
 //        const token = store.state.token;
 //        if(token) {
 //            config.headers.Authorization = `Bearer ${token}`;
 //            //console.log(config);
 //            return config;
 //        } else {
 //            return config;
 //        }
 //    }, function(err) {
 //        return Promise.reject(err);
 //    });
 //    axios.interceptors.response.use((response) => {
 //        return response;
 //    }, (err) => {
 //        console.log(err.response.status)
 //        return Promise.reject(err); // i didn't have this line before
 //    });
}