import express from "express";
const app = express();
const port = 3000;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/items", (req, res) => {
    res.json({ message: "ok"});
});

app.listen(port, () => {
    console.log(`localhost:${port}`);
});

const dbConfig = {
    host: 'localhost',
    user: 'doftopia',
    password: '1234',
    database: 'doftopia'
};

