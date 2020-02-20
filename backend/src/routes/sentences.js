import express from 'express';
import Sentence from '../models/sentence.js';

const router = express.Router();

router.get('/random', async (req, res) => {
  try {
    const sentences = await Sentence.find();
    const randomIndex = Math.floor((Math.random() * sentences.length));

    res.json(sentences[randomIndex].text);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/', async (req, res) => {
  const sentence = new Sentence({
    text: req.body.text
  });

  try {
    const newSsentence = await sentence.save();
    res.status(201).json(newSsentence);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

export default router;