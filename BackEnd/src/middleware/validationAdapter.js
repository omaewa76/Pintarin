const { responseError } = require('../utils/errorHandler');

const validationAdapter = (validator, source = 'body') => {
    return (req, res, next) => {
        try {
            let data;
            if (source === 'body') data = req.body;
            else if (source === 'query') data = req.query;
            else if (source === 'params') data = req.params;
            else if (source === 'combined') data = { ...req.params, ...req.body, ...req.query };

            const validated = validator(data);
            req.validated = { ...req.validated, [source]: validated };
            next();
        } catch (error) {
            return responseError(res, error.message, 400);
        }
    };
};

module.exports = validationAdapter;