const { Firestore } = require("@google-cloud/firestore");

async function getData() {
    const db = new Firestore({
        databaseId: process.env.FIRESTORE_ID,
    });

    const snapshot = await db.collection("predictions").get();

    const dataHistories = snapshot.docs.map((doc) => {
        return {
            id: doc.id,
            history: doc.data(),
        };
    });

    return dataHistories;
}

module.exports = getData;
