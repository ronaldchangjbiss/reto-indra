const axios = require('axios');

exports.handler = async (event, context) => {
    let response = {};
    /*Reglas de Validacion*/
    if (isEmpty(event.schema)) {
        response.code = 'ERR-INTEGRATION-SCHEMA-01';
        response.message = 'No se puede realizar la consulta, porque el schema es obligatorio';
        return response;
    }
    
    /*Reglas de Validacion*/
   if (!isEmpty(event.id) && isNaN(event.id)) {
        response.code = 'ERR-INTEGRATION-ID-02';
        response.message = 'No se puede realizar la consulta, porque el id debe ser un numero';
        return response;
    }
    
    let API_URL;
    try {
        let id = '';
        if (!isEmpty(event.id)) {
            id = '/' + event.id;
        }
         API_URL = process.env.SWAPI_URL + event.schema + id
        const results = await invoke(API_URL);
        
        
        
        if (event.schema === 'people') {
            if (!isEmpty(event.id)) {
              const mundoNatal = await invoke(results.homeworld)
              response.data = translatePeople(results,mundoNatal); 
            }
            
           // 
        }

        response.code = 'OK_TRX';
        response.message = 'Integración '||API_URL|| ' correcta';
        
        return response;
    }
    catch (e) {
        response.code = 'ERR_TRX';
        response.message = 'Integración '||API_URL|| ' dio errores, ';
        response.error = e;
        
    }


};

function translatePeople(people,mundoNatal) {
    let translate = {};
    translate.nombre = people.name;
    translate.altura = people.height;
    translate.masa = people.mass;
    translate.color_cabello = people.hair_color;
    translate.color_piel = people.skin_color;
    translate.color_ojo = people.eye_color;
    translate.fecha_nacimiento = people.birth_year;
    translate.genero = people.gender;
    translate.mundo_natal = mundoNatal;//people.homeworld;
    translate.peliculas = people.films;
    translate.especies = people.species;
    translate.vehiculos = people.vehicles;
    translate.naves_estelares = people.starships;
    translate.creado = people.created;
    translate.editado = people.edited;
    translate.url = people.url;

    return translate;
}

//Metodo para invocar un API REST - GET con Axios
const invoke = (API_URL) => new Promise((resolve, reject) => {
    axios.get(API_URL).then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error.message);
        });
});

function isEmpty(value) {
    return value == null || typeof value == 'string' && (!value.trim() || typeof value == 'undefined');
}