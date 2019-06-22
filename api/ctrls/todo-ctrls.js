const PostModel = require('../modals/TodoPost');

const handlers = {};
const restrictKeys = 'message addedDate complete success';

handlers.getAll = (req, res, next) => {
  PostModel.find({}, restrictKeys).then(
    result => {
      res.send({
        list: result,
        success: true
      });
    },
    err => {
      res.status(500).send(err);
    }
  );
};

handlers.getItem = (req, res, next) => {
  let id = req.params.id;
  PostModel.findById(id, restrictKeys).then(
    result => {
      if(result) {
        res.send({
          ...result.toJSON(),
          success: true
        });
      } else {
        res.status(404).send({
          message: 'Item not found',
          success: false
        });
      }
    },
    err => {
      res.status(500).send({
        message: 'Failed to find the item',
        success: false
      });
    }
  )
}

handlers.addItem = (req, res, next) => {
  let newItem = new PostModel(req.body);
  newItem.save().then(
    success => {
      res.status(200).send({
        result: success,
        message: 'Item added',
        success: true
      });
    },
    err => {
      res.status(500).send(err);
    }
  );
}

handlers.updateItem = (req, res, next) => {
  let id = req.body.id;
  PostModel.updateOne({ '_id': id },
    { $set: {
        message: req.body.message,
        complete: req.body.complete,
    } },
  ).then (
    result => {
      if(result.n && result.nModified) {
        res.status(200).send({
          message: 'Item updated successfully',
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
  let id = req.body.id;
  PostModel.deleteOne({ '_id': id }).then(
    result => {
      if(result.n) {
        res.status(200).send({
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