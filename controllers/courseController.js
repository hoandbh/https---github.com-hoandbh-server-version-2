const db = require('../models/index')
const Course = db.course 

class CourseController {

    //localhost:3600/api/messages
    getAllCourses = async (req, res) => {
        const courses = await Course.findAll({});
        if (!courses?.length)
            return res.status(400).json({ message: 'No messages found' })
        res.json(courses);
    }

}

const courseController = new CourseController();

module.exports = courseController;