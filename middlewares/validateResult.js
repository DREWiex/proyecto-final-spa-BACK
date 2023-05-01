const { validationResult } = require('express-validator');


const validation = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        res.errors = errors.mapped();

    };

    next();
    
};


module.exports = validation;