const Bug = require('../models/Bug');

// @desc    Get all bugs
// @route   GET /api/bugs
// @access  Public
const getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 }); 
    res.status(200).json(bugs);
  } catch (error) {
    next(error); 
  }
};

// @desc    Report a new bug
// @route   POST /api/bugs
// @access  Public
const reportBug = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Please provide a title and description');
    }

    const bug = await Bug.create({
      title,
      description,
      status: 'Open',
    });

    res.status(201).json(bug);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a bug's status
// @route   PUT /api/bugs/:id
// @access  Public
const updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      res.status(404);
      throw new Error('Bug not found');
    }

    const updatedBug = await Bug.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true } 
    );

    res.status(200).json(updatedBug);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a bug
// @route   DELETE /api/bugs/:id
// @access  Public
const deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      res.status(404);
      throw new Error('Bug not found');
    }

    await bug.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Bug removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBugs,
  reportBug,
  updateBug,
  deleteBug,
};