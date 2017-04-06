import axios from 'axios';
const jsonurl = 'http://data.okfn.org/data/core/s-and-p-500/r/data.json';
const TWENTY = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const helpers = {
    TWENTY: TWENTY,
    getStocks() {
        return axios.get(jsonurl).then((res) => {
            return res.data;
        }).catch(() => {
            return TWENTY.reduce((memo, add) => {
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
    		return match && match.length && iso >= min;
    	});
    },
    transformStocks(list) {
        return list.map(function (item) {
            return {
                price: +item['Real Price'],
                year: +((new Date(item.Date)).toISOString().split('-')[0])
            };
        });
    },
    generateCappedPoints(data, cap) {
        return data.reduce(function (memo, item, index) {
            const year = item.year;
            let rise, delta, previous, previousPrice, previousCapPrice, newitem,
                price = item.price;
            if (memo.length) {
                previous = data[index - 1];
                previousPrice = previous.price;
                delta = item.price - previousPrice;
                previousCapPrice = memo[index - 1].price;
                if (delta > 0) {
                    // it went up
                    rise = delta / previousPrice;
                    // up to the ceiling
                    if (rise > cap) {
                        rise = cap;
                    }
                    // apply to the current price
                    price = (rise + 1) * previousCapPrice;
                } else {
                    // it went down
                    price = previousCapPrice;
                }
                newitem = {
                    year: year,
                    price: price
                };
            } else {
                newitem = {
                    price: price,
                    year: year
                };
            }
            memo.push(newitem);
            return memo;
        }, []);
    },
    transformToStackData(data) {
        var first = data[0];
        return data.map(function (point) {
            return {
                y: point.price,
                x: point.year - first.year
            };
        });
    }
};
export { helpers };