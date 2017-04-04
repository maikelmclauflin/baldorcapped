import axios from 'axios';
const jsonurl = 'http://data.okfn.org/data/core/s-and-p-500/r/data.json';
const helpers = {
    getStocks() {
        return axios.get(jsonurl).then(function (res) {
            return res.data;
        });
    },
    filterStocks(list, min) {
    	return list.filter(function (item) {
    		const current = new Date(item.Date);
    		return current.getMonth() === 1 && current >= min;
    	});
    }
};
export { helpers };