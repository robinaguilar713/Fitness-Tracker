const path = require("path");

module.exports = app => {

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercises.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
});

}