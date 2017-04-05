import axios from 'axios';
const jsonurl = 'http://data.okfn.org/data/core/s-and-p-500/r/data.json';
const helpers = {
    getStocks() {
        return axios.get(jsonurl).then(function (res) {
            return res.data;
        }).catch(function () {
            return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19, 20].reduce(function (memo, add) {
                memo.push({
                    Date: (1996 + add) + '-01-01'
                });
                return memo;
            }, []);
        });
    },
    filterStocks(list, min) {
    	return list.filter(function (item) {
            const current = new Date(item.Date);
            const iso = current.toISOString();
            const match = iso.match(/-01-01T/igm);
            if (match && match.length) {
                //
            }
    		return match && match.length && current >= min;
    	});
    },
    transformStocks(list) {
        return list.map(function (item) {
            return {
                price: +item['Real Price'],
                year: +((new Date(item.Date)).toISOString().split('-')[0])
            };
        });
    }
};
export { helpers };