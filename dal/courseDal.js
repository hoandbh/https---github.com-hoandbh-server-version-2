const db = require('../models/index')
const Course = db.course

class CourseDal {

    getAllCourses = async () => {
        const courses = await Course.findAll({});
        return courses;
    }

    createNewCourse = async (content) => {
        const course = await Course.create(content);
        return course;
    }
}

const courseDal = new CourseDal();
module.exports  = courseDal;