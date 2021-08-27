const { Router } = require("express");
const router = Router();
const { authenticateToken } = require('../middlewares/auth');
const {
  login,
  register,
  resetPassword,
  recoveryPassword
} = require("../controllers/Admin/Auth");

// Auth
router.post("/login", 
	function(req, res, next){
		if (!req.body.token){
			return login(req, res, next);
		}
		req.headers['authorization'] = `Bearer ${req.body.token}`;
		req.populate = 'orders'
		next();
	},
 	authenticateToken,
 	function(req, res, next){
 		const { password, ...userProps } = req.user._doc;
 		res.json({ ...userProps, token: req.body.token })
 	}
);
router.post("/register", register);

router.put("/user/reset", resetPassword);
router.post("/user/pass", recoveryPassword);

module.exports = router;