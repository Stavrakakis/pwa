'use strict';
const request = require('request');

module.exports.getSales = (event, context, callback) => {

  request('https://www.secretescapes.com/v1/sales', function (error, res, body) {
    console.log('error:', error); // Print the error if one occurred

    const response = {
      statusCode: 200,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      body,
    };

    callback(null, response);
  });
};
