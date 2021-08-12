const { Router } = require("express");
const router = Router();
const { authenticateToken } = require('../middlewares/auth');
const {
  login,
  register
} = require("../controllers/Admin/Auth");

// Auth
router.post("/login", 
	function(req, res, next){
		if (!req.body.token){
			return login(req, res, next);
		}
		next();
	},
 	authenticateToken,
 	function(req, res, next){
 		const { password, ...userProps } = req.user._doc;
 		res.json({ ...userProps, token: req.body.token })
 	}
);
router.post("/register", register);

module.exports = router;