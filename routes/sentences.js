import express from 'express';
const router = express.Router();

// Get all sentences
router.get('/', (req, res) => {
  res.send('Hello World')
})

// Get one sentence
router.get('/:id', (req, res) => {
})

// Create one sentence
router.post('/', (req, res) => {
})

// Update one sentence
router.patch('/:id', (req, res) => {
})

// Delete one sentence
router.delete('/:id', (req, res) => {
})

export default router;