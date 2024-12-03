const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const storeData = require("../services/storeData");
const getData = require("../services/getData");

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { result, suggestion } = await predictClassification(model, image);

    const id = crypto.randomUUID();
    const createdAt = (new Date()).toISOString();

    const data = {
        id,
        result,
        suggestion,
        createdAt
    };

    await storeData(id, data);

    const response = h.response({
        status: "success",
        message: "Model is predicted successfully",
        data: data,
    });
    response.code(201);
    return response;
}

async function getHistories(request, h) {
    const dataHistories = await getData();

    const response = h.response({
        status: "success",
        data: dataHistories,
    });
    return response;
}

module.exports = { postPredictHandler, getHistories };
