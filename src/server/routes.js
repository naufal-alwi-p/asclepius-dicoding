const { postPredictHandler, getHistories } = require("./handler");

const router = [
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000,
            },
        },
    },
    {
        path: '/predict/histories',
        method: 'GET',
        handler: getHistories,
    }
];

module.exports = router;
