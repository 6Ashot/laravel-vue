module.exports.getEmployee = (url) => {
	return new Promise((res, rej) => {
		axios.get(url).then(response => {
			res(response);
		}).catch(err => rej(err))
	})
}

module.exports.createEmployee = () => {
	 return axios.get('api/employee/create');
}

module.exports.addEmployee = (data) => {
	return axios.post(`api/employee`, data);
}

module.exports.deleteEmployee = (id) => {
	return axios.delete(`api/employee/${id}`)
}
module.exports.editEmployee = (id) => {
	return axios.get(`/api/employee/${id}/edit`)
}
