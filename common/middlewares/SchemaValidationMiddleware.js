const Ajv = require('ajv').default

module.exports = {

  /**
   * @description Compiles the schema provided in argument and validates the data for the
   * compiled schema, and returns errors if any
   *
   * @param {Object} schema - AJV Schema to validate against
   *
   * @returns {Function} - Express request handler
   */
  verify: (schema) => {
    if (!schema) {
      throw new Error('Schema not provided');
    }

    return (req, res, next) => {
      const { body } = req;
      const ajv = new Ajv({allErrors: true});
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      //If valid, continue with process
      if (isValid) {
        return next();
      }

      return res.send({
        status: false,
        error: {
          message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`
        }
      });
    }
  }
};
