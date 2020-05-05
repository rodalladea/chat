const express = require('express');

const router = express.Router();

router.get('/chat', (req, res) => {
  res.json({ response: 'I am alive' });
})

module.exports = router;