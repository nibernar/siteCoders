/**
 * Utilitaire pour formater les réponses API
 */

exports.success = (res, data = {}, message = "Success", statusCode = 200, meta = null) => {
    const response = {
      success: true,
      message,
      data
    };
  
    if (meta) {
      response.meta = meta;
    }
  
    return res.status(statusCode).json(response);
  };
  
  exports.error = (res, message = "Error occurred", statusCode = 400, errors = null) => {
    const response = {
      success: false,
      message
    };
  
    if (errors) {
      response.errors = errors;
    }
  
    return res.status(statusCode).json(response);
  };