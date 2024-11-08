const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('Donation Exit Routes funcionando');
});

module.exports = router;
