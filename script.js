let apiKey = 'e00cfc90c8ea59bfdec9109aaddc6bc3'
let difKevin = 273.15
let urlBase = 'https://api.openweathermap.org/data/2.5/weather'




document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
if(ciudad){
    fetchDatosClima(ciudad)
}    
})

function fetchDatosClima(ciudad){
   fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`)
.then(response => response.json())
.then(response =>mostrarDatosClima(response))
}

function mostrarDatosClima(response){
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML=''

    const ciudadNombre = response.name
    const temperatura = response.main.temp
    const descripcion = response.weather[0].description
    const icono = response.weather[0].icon

    const temperaturainfo = document.createElement('p')
    temperaturainfo.textContent = `La temperatura es : ${Math.floor(temperatura-difKevin)}°C`

     const ciudadTitulo = document.createElement('h2')
    ciudadTitulo.textContent = ciudadNombre 

    const iconoInfo = document.createElement('img')
    iconoInfo.src =`https://openweathermap.org/img/wn/${icono}@2x.png`

    const descripcionTitulo = document.createElement('p')
    descripcionTitulo.textContent = `La descripcion meteorologica es : ${descripcion}`

    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturainfo)
    divDatosClima.appendChild(iconoInfo)
    divDatosClima.appendChild(descripcionTitulo)

}