const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { result, suggestion } = predictClassification(model, image);

    const id = crypto.randomUUID();
    const createdAt = (new Date()).toISOString();

    const data = {
        id,
        result,
        suggestion,
        createdAt
    };

    const response = h.response({
        status: "success",
        message: "Model is predicted successfully",
        data,
    });
}

module.exports = postPredictHandler;
