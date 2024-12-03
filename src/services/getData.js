const { Firestore } = require("@google-cloud/firestore");

async function getData() {
    const db = new Firestore();

    const snapshot = await db.collection("predictions").get();

    const dataHistories = snapshot.docs.map((doc) => {
        return {
            id: doc.id,
            history: doc.data(),
        };
    });

    console.log(dataHistories);

    return dataHistories;
}

module.exports = getData;
