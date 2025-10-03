import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de ejemplo",
            version: "1.0.0",
            description: "API para gestionar movimientos y usuarios",
        },
    },
    apis: ["./pages/api/*.ts", "./pages/api/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;