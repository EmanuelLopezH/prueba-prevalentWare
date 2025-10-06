import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Prueba PrevalentWare",
      version: "1.0.0",
      description: "Documentación de la API con Swagger para usuarios y movimientos",
    },
    servers: [
      {
        url: "http://localhost:3000/api", // Cambia si tienes otro dominio
      },
    ],
  },
  apis: ["./pages/api/**/*.js"], // Aquí Swagger buscará anotaciones
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
