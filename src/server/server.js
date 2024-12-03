if (process.env.APP_ENV !== 'prod') {
    require("dotenv").config();
}

const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const loadModel = require("../services/loadModel");

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

        if (response.isBoom) {
            const newResponse = h.response({
                status: "fail",
                message: response.message
            });
            newResponse.code(400);
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();
