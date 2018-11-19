export const handleSuccess = (req, res, payload) => {
  res.status(200).send(JSON.stringify(payload));
  return Promise.resolve(payload);
};

export const handleError = (req, res, error) => {
  res.status(500).send(error.message);
  return Promise.reject(new Error(error.message));
};

export const noAuth = (req, res) => {
  res.status(401).send();
};
