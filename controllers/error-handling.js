exports.handle404Errors = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
