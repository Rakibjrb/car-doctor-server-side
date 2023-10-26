const sendResponse = (res, data, statusCode, message) => {
  res.send({
    statusCode,
    data,
    message,
  });
};

module.exports = sendResponse;
