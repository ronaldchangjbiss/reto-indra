const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let response = {}
    
    /*Reglas de Validacion*/
    if (isEmpty(event.dni)) {
        response.code = 'ERR-PERSON-DNI-01';
        response.message = 'No se ha podido agregar la persona, porque el dni es obligatorio';
        return response;
    }else if (isNaN(event.dni)) {
         response.code = 'ERR-PERSON-DNI-02';
        response.message = 'No se ha podido agregar la persona, porque el dni debe ser un numero';
        return response;
    }
    
    if (isEmpty(event.nombre)) {
        response.code = 'ERR-PERSON-NOMBRE-03';
        response.message = 'No se ha podido agregar la persona, porque el nombre es obligatorio';
        return response;
    }
    
    if (isEmpty(event.apellido_paterno)) {
        response.code = 'ERR-PERSON-APEPAT-01';
        response.message = 'No se ha podido agregar la persona, porque el apellido_paterno es obligatorio';
        return response;
    }
    
    if (isEmpty(event.email)) {
        response.code = 'ERR-PERSON-EMAIL-01';
        response.message = 'No se ha podido agregar la persona, porque el email es obligatorio';
        return response;
    }
    
    if (isEmpty(event.edad)  ) {
        response.code = 'ERR-PERSON-EDAD-01';
        response.message = 'No se ha podido agregar la persona, porque la edad es obligatoria';
        return response;
    }else if (isNaN(event.edad)) {
        response.code = 'ERR-PERSON-EDAD-02';
        response.message = 'No se ha podido agregar la persona, porque la edad debe ser un numero';
        return response;
    }else if (event.edad < 18 ||event.edad >=100){
        response.code = 'ERR-PERSON-EDAD-03';
        response.message = 'No se ha podido agregar la persona, porque la edad debe ser mayor o igual a 18 y menor a 100 años';
        return response;
    }
    
    //Construccion de parametros de la transaccion
    const params = {
        TableName: 'personas',
        Item: event
    }

    //Ejecucion de la Transaccion
    try {
        await docClient.put(params).promise();
        
        response.code = 'OK-TRX';
        response.message = 'Persona agregada Correctamente';
    }
    catch (err) {
        response.code = 'ERR-TRX';
        response.message = 'Transaccion con errores';
        response.error = err; 
    }

    
    return response;
};

/*Funcion para validar si un atributo es vacio, nulo o undefined*/
function isEmpty (value) {
    return value == null || typeof value == 'string' && (!value.trim() || typeof value == 'undefined');
}
