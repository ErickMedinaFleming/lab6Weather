const express = require('express')
const clima =  require('./clima.js')

const app = express()

const port = process.env.PORT || 3000

app.get('/weather', function(req,res){
	if(!req.query.search){
		res.send({
			error: 'Busqueda con search'
		})
	}
	clima.geocode(req.query.search, function(error,response){
		if(error){
			return res.send({
				error: error
			})
		}
		var city = req.query.search
		clima.tiempo(response.coord[1], response.coord[0], function(error,response){
			if(error){
				return res.send({
					error: error
				})
			}
			res.send({
				ciudad: city,
				summary: response.summary,
				temperatura: response.temp,
				humedad: response.humidity
			})
		})

	})
})

/*clima.geocode('Saltillo', function(error,data){
	if(error){
		console.log(error)
	}else{
		clima.tiempo(data.coord[1],data.coord[0], function(error,data){
			if(error){
				console.log(error)
			} else {
				console.log('Saltillo\n')
				console.log(data)
			}
		})
	}
})*/

app.listen(port,function(req,res){
	console.log('Working')
})

app.get('*',function(req,res){
	res.send({
		error: 'Ruta no valida'
	})
})