const {selectUsers} = require('../models/user-models')

exports.getUsers = (request, response, next) => {
  selectUsers()
    .then((users) => {
      response.status(200).send({ users: users });

    })
    .catch((err) => {
      next(err);
    });

};


