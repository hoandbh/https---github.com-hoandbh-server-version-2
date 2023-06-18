require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = 3600//  ||process.env.PORT 

// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Router
app.use('/', express.static(path.join(__dirname, 'public')))
//app.use('/files', express.static(path.join(__dirname, 'files')));
app.use('/', require('./routes/root'))

// Api
app.use("/api/auth", require("./routes/authRouter"))
app.use('/api/course', require("./routes/courseRouter"));
app.use('/api/version', require("./routes/versionRouter"));
app.use('/api/score', require("./routes/scoreRouter"));
app.use('/api/message', require('./routes/messageRouter'));
app.use('/api/questionnaire', require('./routes/questionnaireRouter'))
app.use('/api/question', require('./routes/questionRouter'))
app.use('/api/part', require('./routes/partRouter'));
app.use('/api/answer', require('./routes/answerRouter'));
app.use('/api/downloads', require('./routes/filesRouter'));


// Services
app.use('/api/check-test', require('./routes/testRouter'));
app.use('/api/print_version', require('./routes/servicesRouter'))
app.use('/api/download-folder', require('./routes/downloadRouter'))

// Handling not-found routes
app.all('*', require('./routes/notFound'));

// Error handling middleware
app.use(require('./middleware/errorHandler'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));   
