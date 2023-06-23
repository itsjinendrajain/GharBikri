const { Router } = require('express');
// const authMiddleware = require('../../middlewares/authMiddleware');
const { getPropertyHome, getBuyRentFilter } = require('../../controllers/homePropertyController');
const router = Router();

router.get('/', getPropertyHome);


router.get('/search', getBuyRentFilter);

module.exports = router;