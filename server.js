const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/database');

// requirements
require("dotenv").config()
const PORT = process.env.PORT || 5000

var bodyParser = require('body-parser');
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json());

app.use(cors());

//chile routes

const groupeRouter = require("./Routes/GroupeRoutes")
const joueurRouter = require('./Routes/joueurRoutes')
const medecinRouter = require('./Routes/MedecinRouter')
const groupeJouRouter = require('./Routes/GrpJouRouter')
const adminRouter = require('./Routes/AdminRouter')
const userRouter = require('./Routes/UserRoute')
const consultationRouter = require('./Routes/ConsultationRouter')
const ordonnanceRouter = require('./Routes/OrdonnanceRouter')
const ExamRouter = require('./Routes/ExamRouter')
const ResumeRouter = require('./Routes/ResumeRouter')
    //parent routes
app.use("/groupes", groupeRouter);
app.use("/joueurs", joueurRouter);
app.use("/medecins", medecinRouter);
app.use("/groupeJou", groupeJouRouter);
app.use("/admins", adminRouter)
app.use("/users", userRouter)
app.use("/consultations", consultationRouter)
app.use("/ordonnances", ordonnanceRouter)
app.use("/exams", ExamRouter)
app.use("/resumes", ResumeRouter)

app.get('/', (req, res) => {
    res.send('hello world')

})

app.get('/hello/:name', (req, res) => {
    res.send('hello ' + req.params.name)
})

app.get("/getfile/:image", function(req, res) {
    res.sendFile(__dirname + "/uploads/" + req.params.image);
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})