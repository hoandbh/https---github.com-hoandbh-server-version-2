//V
const courseDal = require("../dal/courseDal");

class CourseController {

    getAllCourses = async (req, res) => {
        const courses = await courseDal.getAllCourses();
        if (!courses?.length)
            return res.status(400).json({ message: 'No messages found' })
        res.json(courses);
    }
    
    createNewCourse = async (req, res) => {
        const name = req.body;
        if(!name)
            return res.status(400).json({ message: 'All fields are required' });
        const course = await courseDal.createNewCourse(name);
        if (course)
            return res.status(201).json(course);
        return res.status(400);
    }

    getCourseById =  async (req, res) => {
        const id = req.params.id;
        var course = await courseDal.getCourseById(id);
        if(course)
            res.json(course);
        else
            res.status(204).send();
    }

    deleteCourse = async (req, res) => {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Course ID required' });
        }
        const result = await courseDal.deleteCourse(id);
        if (result === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(`Course ID ${id} deleted`);
    }

}

const courseController = new CourseController();

module.exports = courseController;

