var express = require('express');
var app = express();
var request = require('request');
var cors = require('cors');


app.use(cors());

app.get('/api/items', function (req, res) {
    var query = req.query.q;

    request({
        uri: 'https://api.mercadolibre.com/sites/MLA/search?q='+query+'&limit=4',
    }, function(error, response, body) {
        resp = JSON.parse(body);
        if(resp.results.length == 0) {
            res.json([]);
        } else {
            data = getItems(resp);
            res.json(data);
        }
    });
});
app.get('/api/items/:id', function (req, res) {
    var id = req.params.id;
    
    request({
        uri: 'https://api.mercadolibre.com/items/'+id,
    }, function(error, response, body) {
        resp = JSON.parse(body);
        if(resp.status == 404) {
            res.json([]);
        } else {
			resp = JSON.parse(body);
            data = setProduct(resp);
            request({
				uri: 'https://api.mercadolibre.com/items/'+id+'/description',
			}, function(error, response, body) {
				description = JSON.parse(body);
				data.item.description = description.plain_text.replace(/(?:\r\n|\r|\n)/g, '<br />');
				res.json(data);
			});
			
            
        }
    });
});
app.listen(3001, function () {
    console.log('server: http://localhost:3001');
});

function setProduct(resp) {
	var data = {};
    //item
	data.item = {
		'id': resp.id,
		'title': resp.title,
		'price': {
			'currency': resp.currency_id,
			'amount': resp.price,
			'decimals': 00,
		},
		'picture': resp.pictures[0].url,
		'condition': resp.condition,
		'free_shipping': resp.shipping.free_shipping,
		'sold_quantity': resp.sold_quantity,
	};
	
	return data;
}
function getItems(resp) {
    var data = {};
    data.categories = [];
    //categories
    if(resp.filters.length > 0 && resp.filters[0].id == 'category') {
        for (i = 0; i < resp.filters[0].values[0].path_from_root.length; i++) {
            data.categories.push(resp.filters[0].values[0].path_from_root[i].name);
        }
    }
    data.items = [];
    //items
    if(resp.results.length > 0) {
        for (i = 0; i < resp.results.length; i++) {
            data.items.push({
                'id': resp.results[i].id,
                'title': resp.results[i].title,
                'price': {
                    'currency': resp.results[i].currency_id,
                    'amount': resp.results[i].price,
                    'decimals': 00,
                },
                'picture': resp.results[i].thumbnail,
                'condition': resp.results[i].condition,
                'free_shipping': resp.results[i].shipping.free_shipping,
            });
        }
    }
    return data;
}
