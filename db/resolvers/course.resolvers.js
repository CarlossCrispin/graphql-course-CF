const Course = require('../models/course');
const courses = [];
module.exports = {
    Query:{
        getCourses(obj,{page,limit}){
            if(page !== undefined){
                return courses.slice((page - 1)* limit, page * limit);
            }
            return courses;
        },
        getCourse(obj, { id } ){
            console.log(id);
            return courses.find( ( course) => id == course.id); 
        }
    },
    Mutation:{
        async addCourse(obj,{input}){
            console.log(input);
            const course = new Course({input})
            await course.save();
            return course;
        },
        updateCourse(obj,{id,input}){
            const courseIndex = courses.findIndex((course) => id == course.id);
            const course = courses[courseIndex];
    
            const newCourse = Object.assign(course, input);
    
            course[courseIndex] = newCourse;
            return newCourse;
        },
        deleteCourse(obj, { id }){
            courses = courses.filter((course) => course.id != id);
            return{
                message: `El curso con el ${id} fue eliminado.`
            }
        }
    }
}