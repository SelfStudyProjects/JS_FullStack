const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello Express' });
});

app.get('/api/customers', (req, res) => {
    res.send([
        {
            "id": 1,
            "image": "https://placeimg.com/64/64/1",
            "name": "나자신",
            "birthday": "961222",
            "gender": "남자",
            "job": "대학생"
        },
        {
            "id": 2,
            "image": "https://placeimg.com/64/64/2",
            "name": "정진영",
            "birthday": "961022",
            "gender": "남자",
            "job": "대학생"
        },
        {
            "id": 3,
            "image": "https://placeimg.com/64/64/3",
            "name": "밉지않은관종",
            "birthday": "961122",
            "gender": "남자",
            "job": "대학생"
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));