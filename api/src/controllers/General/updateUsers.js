const User = require("../../models/Users/User");


module.exports = async (req, res, next) => {
    const { id } = req.params;
    const update = { ...req.body }
    try {
        const userUpdating = await User.findByIdAndUpdate(id, update,{new:true})
        res.json({
            ok: true,
            user: userUpdating
        })
    } catch (error) {
        console.log('controlles/General/updateUsers/Error',error);
        res.json({
            ok: false
        })
    }
}

