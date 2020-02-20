import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sentencesRouter from './routes/sentences.js';

dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

const app = express();
app.use(express.json());
app.use(express.static('static'));
app.use((request, result, next) => {
  result.header('Access-Control-Allow-Origin', '*');
  result.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});
app.use('/sentences', sentencesRouter);

app.listen(PORT, HOST);