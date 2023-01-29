const express = require('express');

const router = express.Router();

router.get('/healthz', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Application is healthy, API Node.js + PostgreSQL'
  });
});

module.exports = router;