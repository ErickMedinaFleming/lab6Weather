const express = require('express')
const clima =  require('./clima.js')

const app = express()

const port = process.env.PORT || 3000

clima.geocode('Saltillo', function(error,data){
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
})