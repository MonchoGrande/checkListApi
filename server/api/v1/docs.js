const swaggerJSDoc = require('swagger-jsdoc');
const merge = require('lodash/merge');

const { swaggerDefinition } = require.main.requiere('./server/config/docs');

//Override default definitions
const localDefinition = {
  info: {
    version: '1.0.0',
  },
  basePath: 'api/v1/',
};

const options = {
  swaggerDefinition: merge(swaggerDefinition, localDefinition),
  apis: ['./server/api7v1/tasks/routes.js'],
};

module.exports = swaggerJSDoc(options);