const express = require('express');
const TaskRouter = express.Router();
const TaskModel = require('../model/Task.models');
let todos = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
TaskRouter.get("/", async (req, res, next) => { // Parentheses added here
    //TaskModel.find()
//     .then((response) => {
//         if(response) { // Fixed typo: changed `resonse` to `response`
//             res.status(200).json({
//                 success: true,
//                 message: "Tasks fetched",
//                 data: response,
//             });
//         }
//     })
//     .catch((err) => {
//         res.status(500).json({
//             success: false,
//             error: err,
//             data: response, // It seems `response` variable is undefined here, you might want to remove this line
//         });
//     });
// });
try {
    const response = await TaskModel.find()
      if (response.length > 0) {
      res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        data: response,
       });
    } else {
       return res.status(200).json({
        success: true,
        message: "No Task Found",
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:error,
      message: "Internal server Error",
    });
  }
});

TaskRouter.post("/create", async(req, res, next) => {
  const NewTask = new TaskModel(req.body);
  try {
    const response = await NewTask.save();
    if (response && response._id) {
      return res.status(200).json({
        success: true,
        message: "Tasks created successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Internal server Error",
    });
  }
});
TaskRouter.put("/update/:id", async (req, res, next) => {
  try {
    const response = await TaskModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      req.body,
      { new: true }
    );
    if (response && response._id) {
      return res.status(200).json({
        success: true,
        message: "Tasks updated successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Internal server Error",
    });
  }
});

TaskRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    const response = await TaskModel.findOneAndDelete(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (response && response._id) {
      return res.status(200).json({
        success: true,
        message: "Tasks deleted successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Internal server Error",
    });
  }
});

module.exports = TaskRouter;


