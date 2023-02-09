const express = require('express');
const courseRoutes = express.Router();
const courseController = require('../controllers/courseController');

courseRoutes.route('/')
.get(courseController.getAllCourses);

module.exports = courseRoutes;