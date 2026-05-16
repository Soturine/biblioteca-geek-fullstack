function successResponse(res, statusCode, message, data = undefined, meta = undefined) {
  const body = {
    success: true,
    message
  };

  if (data !== undefined) {
    body.data = data;
  }

  if (meta !== undefined) {
    body.meta = meta;
  }

  return res.status(statusCode).json(body);
}

function noContentResponse(res) {
  return res.status(204).send();
}

module.exports = {
  successResponse,
  noContentResponse
};
