//V
const { course: Course } = require('../models');

const where = (id) => ({
    where: {
      id: id
    }
  });

class CourseDal {

    getAllCourses = async () => {
        const courses = await Course.findAll({});
        return courses;
    }

    getCourseById = async (id) => {
        // var course = await Course.findOne(where(id));
        var course = await Course.findByPk(id);
        return course;
    }

    createNewCourse = async (content) => { 
        const course = await Course.create(content);
        return course;
    }
    
    deleteCourse =  async (id) => { 
        await Course.destroy(where(id));
    }

}

const courseDal = new CourseDal();
module.exports  = courseDal;


