const logger = require('winston');


function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization').split(' ')[1];

    if(!authToken || authToken !== apiToken) {
        
        logger.error(`Unauthorized request to path: ${req.path}`)
        
        
        return res
            .status(401)
            .json({
                error: `Unathorized Access`
            });
    }
    next();
}


module.exports = validateBearerToken;