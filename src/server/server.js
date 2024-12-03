if (process.env.APP_ENV !== 'prod') {
    require("dotenv").config();
}

const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const loadModel = require("../services/loadModel");
const InferenceError = require("../exceptions/InferenceError");

(async () => {
    const server = Hapi.server({
        port: 8000,
        host: "localhost",
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    const model = await loadModel();
    server.app.model = model;

    server.route(routes);

    server.ext("onPreResponse", (request, h) => {
        const response = request.response;

        if (response instanceof InferenceError) {
            const newResponse = h.response({
                status: "fail",
                message: response.message
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }

        if (response.isBoom) {
            const newResponse = h.response({
                status: "fail",
                message: response.message
            });
            newResponse.code(413);
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();
