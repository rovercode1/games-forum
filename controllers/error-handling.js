//400 = bad request

exports.handle404Errors = (req, res, next) => {
  res.status(404).send({ msg: "Path not found." });
};

exports.handle400Errors = (req, res, next) => {
  res.status(400).send({ msg: "Bad request." });
};

exports.handleServerErrors = (err, req, res, next) => {
  if (err === "review_id not found") {
    res.status(404).send({ msg: "review_id not found." });
  } else if (err === "Invalid review_id") {
    res.status(400).send({ msg: "Bad request." });
  }
  else if(err === 'Comments not found.'){
    res.status(404).send({msg: 'Comments not found.'})
  }
   else {
    next(err);
  }
}

exports.handle500statuses = (err, req, res, next) => {
  console.log(err, "<-error");
  res.status(500).send({ msg: "Internal Server Error" });

};

exports.handle500statuses = (err, req, res, next) =>{
  console.log(err, '<-error');
  res.status(500).send({ msg: "Internal Server Error" });
}