class InferenceError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = "Inference Error";
    }
}

module.exports = InferenceError;
