const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = 'JP#M$*XYw$=7&W&Ymg$GebN*d}6fuCA*[VHUY9Wt=Ub-Mc&7auwMWpaYqhdMYpiZh==yp4?G&++j:@#}c7zN.[%xv;mc}#8D$+FM';

const tokenGenerator = (email) => {
    const token = jwt.sign({email}, JWT_SECRET_KEY);
    return token;
};

const tokenValidator =  (token) => {
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        return data;
    } catch(err) {
        return false;
    }
};

module.exports.tokenGenerator = tokenGenerator;
module.exports.tokenValidator = tokenValidator;