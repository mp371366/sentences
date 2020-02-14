import express from 'express';
import Sentence from '../models/sentence.js';

const router = express.Router();

async function getSentence(req, res, next) {
  try {
    const sentence = await Sentence.findById(req.params.id);

    if (sentence == null) {
      return res.status(404).json({ message: 'Cant find sentence' });
    }

    res.sentence = sentence;
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
  next();
}

router.get('/', async (req, res) => {
  try {
    const sentences = await Sentence.find();

    res.json(sentences);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get('/:id', getSentence, (req, res) => {
  res.json(res.sentence);
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

router.patch('/:id', getSentence, async (req, res) => {
  if (req.body.text != null) {
    res.sentence.text = req.body.text;
  }

  try {
    const updatedSentence = await res.sentence.save();
    res.json(updatedSentence);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.delete('/:id', getSentence, async (req, res) => {
  try {
    await res.sentence.remove();
    res.json({ message: 'Deleted this sentence.' });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

export default router;