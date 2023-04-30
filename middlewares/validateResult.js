const { validationResult } = require('express-validator');


const validation = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        res.errors = errors.mapped();

    };

    console.log('VALIDATION:', res.errors);

    next();
    
};


module.exports = validation;