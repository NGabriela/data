const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const  express = require('express');
const diagram = require('./Diagram');
const cors = require('cors');
const app = express();
app.use(cors())
app.get('/', (req, res) =>  res.json(diagram));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`port ${PORT}`)});

exports.app = functions.https.onRequest(app);
