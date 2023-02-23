exports.handle404Errors = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.handle400Errors = (req, res, next) => {
  res.status(400).send({ msg: "Bad request" });
};

exports.handleServerErrors = (err, req, res, next) => {
  if (err === "review_id not found" || err.code === "23503") {
    res.status(404).send({ msg: "Review not found." });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request." });
  } else {
    next(err);
  }
};

exports.handle500statuses = (err, req, res, next) => {
  console.log(err, "<-error");
  res.status(500).send({ msg: "Internal Server Error" });
};
