const { tokenValidator } = require("./tokens");

module.exports = async (req, res, next) => {
    const { jwt } = req.cookies;
    const validToken = await tokenValidator(jwt);
    if(validToken) {
        next();
    } else {
        res.send("Access Denied");
    }
};