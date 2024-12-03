const tf = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const result = prediction.dataSync()[0];

        tensor.dispose();

        const label = result > 0.5 ? 'Cancer' : 'Non-cancer';

        let suggestion;

        if (label === 'Cancer') {
            suggestion = "Segera periksa ke dokter!";
        } else {
            suggestion = "Penyakit kanker tidak terdeteksi.";
        }

        return {
            result: label,
            suggestion: suggestion,
        };
    } catch (error) {
        throw new Error("Terjadi kesalahan dalam melakukan prediksi");
    }
}

module.exports = predictClassification;
