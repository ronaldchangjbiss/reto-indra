# RETO - INDRA - RONALD CHANG

## Contenido
1. Necesidad del Reto
2. Solucion del Reto
3. Pruebas Unitarias
4. Documentacion Swagger

### Necesidad del Reto
Descripción del reto técnico:

Crear una API en Node.js con el framework Serverless para un despliegue en AWS.
Adaptar y transformar los modelos de la API de prueba. Se tienen que mapear todos los nombres de atributos modelos del inglés al español (Ej: name -> nombre).
Integrar la API de prueba StarWars API (líneas abajo está el link) se deben integrar uno o más endpoints.
Crear un modelo de su elección mediante el uso de un endpoint POST, la data se tendrá que almacenar dentro de una base de datos.
Crear un endpoint GET que muestre la data almacenada.
API de prueba SWAPI: https://swapi.py4e.com/documentation

Puntos de evaluación:

Mínimo 2 endpoints, GET para recuperar la información y POST para crear un elemento
Integración con una base de datos (DynamoDB o MySQL)
Integración con SWAPI
Uso de Serverless Framework
Uso de Node.js
Respeto de las buenas prácticas de desarrollo
Traducción de campos de inglés a español
Puntos bonus:

Documentación de uso (2 puntos)
Pruebas unitarias (10 puntos)
Documentación en Open API/Swagger (2 puntos)
Desplegar sin errores en AWS con el comando deploy del framework serverless (2 puntos)
Mayor complejidad de Integración (3 puntos)

### Solucion del Reto
  La solucion se ha implementado en AWS utilizando los siguientes servicios: Lambdas (Severless), Api Gateway y DynamoDb. Las lambdas fueron implementadas   con NodeJS 14.x.
  
  
  #### Integracion con Swapi
    Se ha creado una lambda para integrarnos con la Api SWAPI, esta lambda consume el api pasandole como parametros el esquema (schema) y el identificador     (id):
            {
              "schema": "people",
              "id": "4"
            }
            
   Importante:Solo se ha realizado la traduccion para el schema:people
  #### Metodo Post y Get con DynamoDB
    Se ha creado un CRU (Create, reade y updade) para una entidad persona.
    1. POST Metodo para crear o actualizar una persona
    2. GET Metodo para obtener una persona


### Pruebas Unitarias
Las pruebas unitarias las podemos encontrar en el archivo  RETO INDRA DOC.PDF

### Documentacion Swagger
Las documentacion de la api https://app.swaggerhub.com/apis/greipcompany/ag-reto_indra/v2
