module.exports.getCompanies = (url) => {
	return new Promise((res, rej) => {
		axios.get(url).then(response => {
			res(response);
		}).catch(err => rej(err))
	})
}

module.exports.addCompany = (data) => {
	const config = {
		headers: { 'content-type': 'multipart/form-data' }
	};
	return new Promise((resolve, reject) => {
		axios.post('api/companies', data, config).then(res => resolve(res)).catch(err => reject(err))
	})
}

module.exports.deleteCompany = (id) => {
	return axios.delete(`api/companies/${id}`)
}

module.exports.editCompany = (id) => {
	return axios.get(`/api/companies/${id}/edit`);
}

module.exports.updateCompany = (data) => {
	const config = {
		headers: {'content-type': 'multipart/form-data'}
	};
	return axios.post(`/api/companies/${data.id}`, data.data);
}