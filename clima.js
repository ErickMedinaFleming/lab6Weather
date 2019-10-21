const credentials = require('./credentials.js')
const request = require('request')

const geocode = function(ciudad, callback) {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?access_token=' + credentials.MapBoxToken

	request({url,json:true}, function(error, response){
		if(error) {
			callback(error, undefined)
		}
		else {
			const data = response.body
			if(data.message){
				callback(data.message, undefined)
			} else if(data.features[0]==undefined){
				callback('404 no encontrado', undefined)
			} else {
				const info = {
					nombre : data.features[0].place_name,
					coord : data.features[0].center
				}
				callback(undefined, info)
			}
		}
	})
}

const tiempo = function(latitud, longitud, callback){
	const url = 'https://api.darksky.net/forecast/' + credentials.DarkSkyToken + '/' + latitud +',' + longitud

	request({url,json:true}, function(error, response){
		if(error) {
			callback(error, undefined)
		}
		else {
			const data = response.body
			if(data.code){
				callback(data.code + ' ' + data.error, undefined)
			} else {
				const info = {
					summary : data.currently.summary,
					temp : data.currently.temperature,
					temp2 : data.currently.apparentTemperature,
					humidity : data.currently.humidity
				}
				callback(undefined, info)
			}
		}
	})
}

module.exports = {
	geocode : geocode,
	tiempo : tiempo
}