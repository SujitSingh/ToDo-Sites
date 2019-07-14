const PostModel = require('../modals/TodoPost');

const handlers = {};
const restrictKeys = 'author message addedDate complete success';

handlers.getAll = (req, res, next) => {
  const isAdmin = req.decoded.isAdmin;
  if (isAdmin) {
    PostModel.find({}, restrictKeys).then(
      result => {
        res.send({
          posts: result,
          success: true
        });
      },
      err => {
        res.status(500).send(err);
      }
    );
  } else {
    // return only user's post
    next();
  }
};

handlers.getUserPosts = (req, res, next) => {
  const userId = req.decoded.id;
  PostModel.find({ author: userId}, restrictKeys).then(
    result => {
      res.send({
        posts: result,
        success: true
      });
    }
  ).catch(error => {
    res.status(500).send({
      message: error.message,
      success: false
    });
  });
}

handlers.getItem = (req, res, next) => {
  const userId = req.decoded.id;
  const id = req.params.id;
  PostModel.findOne({
    '_id': id,
    author: userId
   }, restrictKeys).then(
    result => {
      res.send({
        post: result,
        success: true
      });
    }
  ).catch(error => {
    res.status(500).send({
      message: 'Failed to find the item',
      success: false
    });
  });
}

handlers.addItem = (req, res, next) => {
  const userId = req.decoded.id;
  const newItem = new PostModel({
    ...req.body,
    author: userId
  });
  newItem.save().then(
    success => {
      res.send({
        post: success,
        message: 'Item added',
        success: true
      });
    },
    error => {
      res.status(500).send({
        message: error.message,
        success: false
      });
    }
  );
}

handlers.updateItem = (req, res, next) => {
  const userId = req.decoded ? req.decoded.id || '' : '';
  const id = req.params.id;
  PostModel.findOneAndUpdate({ '_id': id, author: userId },
    { $set: {
        message: req.body.message,
        complete: req.body.complete,
    } },
    { returnOriginal: false }
  ).then (
    result => {
      if (result) {
        res.send({
          post: { ...result.toJSON() },
          success: true
        });
      } else {
        res.status(400).send({
          message: 'Item not modified',
          success: false
        });
      }
    },
    err => {
      res.status(500).send({
        errmsg: err.errmsg,
        message: 'Failed to update item',
        success: false
      });
    }
  );
}

handlers.deleteItem = (req, res, next) => {
  const userId = req.decoded ? req.decoded.id || '' : '';
  const id = req.params.id;
  PostModel.deleteOne({ '_id': id, author: userId }).then(
    result => {
      if(result.n) {
        res.send({
          message: 'Item deleted',
          success: true
        });
      } else {
        res.status(404).send({
          message: 'Item not present',
          success: false
        });
      }
    },
    err => {
      res.status(500).send({
        message: 'Failed to deleted item',
        success: false
      });
    }
  );
}

// export functions
module.exports = handlers;