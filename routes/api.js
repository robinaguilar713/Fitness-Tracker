const db = require("../models");
const mongojs = require("mongojs");

module.exports = function(app) {

    let durationStart;

app.post("/api/workouts", ({ body }, res) => {
    durationStart = 0;
    db.Workout.create({})
    .then((dbExercise) => {
        res.json(dbExercise);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then((dbExercises) => {
        res.json(dbExercises);
    })
    .catch((err) => {
        res.json(err);
    })
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
});

app.put("/api/workouts/:id", (req, res) => {

    let data = req.body;

    durationStart += data.duration;

     db.Workout.findOneAndUpdate(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        {
            $push: { exercises: req.body },
            totalDuration: durationStart
        },
        {
            new: true
        }
    )
    .then(dbUpdate => {
        res.send(dbUpdate);
        console.log(dbUpdate);
    })
    .catch(err => {
        res.send(err);
    });
});

}