const db = require("../models");
const mongojs = require("mongojs");

module.exports = function(app) {

app.post("/api/workouts", ({ body }, res) => {
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

app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body);
    db.Workout.findOneAndUpdate(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        {
            $push: { exercises: req.body }
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