const  express = require("express");
const router = express.Router();
const frontController= require("../controllers/frontController")

router.get('/',frontController.vers_accueil);
router.get('/blog',frontController.vers_blog )
router.get('/detail_blog/:id',frontController.vers_detail_blog)


module.exports = router
