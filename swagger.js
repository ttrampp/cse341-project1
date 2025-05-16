const swaggerAutogen = require('swagger-autogen')();

const doc ={
    info: {
        title: 'Contacts Api',
        description: 'Contacts Api'
    },
    host: 'cse341-project1-0ktq.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
