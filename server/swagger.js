// import {swaggerJSDoc} from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import pkg from 'swagger-jsdoc';
const {swaggerJSDoc} = pkg;

const options = {
  swaggerDefinition: {
    restapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My REST API',
    },
    servers: [
      {
        url: process.env.APP_URL,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
}
const specs = pkg(options)

export const  swagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
