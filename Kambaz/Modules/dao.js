import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js";


export default function ModulesDao(db) {

    function deleteModule(moduleId) {
  const { modules } = db;
  db.modules = modules.filter((module) => module._id !== moduleId);
}

 async function findModulesForCourse(courseId) {
   const course = await model.findById(courseId);
   return course.modules;
 }
 
 async function createModule(courseId, module) {
  const newModule = { ...module, _id: uuidv4() };
   const status = await model.updateOne(
     { _id: courseId },
     { $push: { modules: newModule } }
   );

  return newModule;
}
async function updateModule(courseId, moduleId, moduleUpdates) {
  const course = await model.findById(courseId);
   const module = course.modules.id(moduleId);
   Object.assign(module, moduleUpdates);
   await course.save();
   return module;
}
 return {
   findModulesForCourse,
   createModule,
   updateModule,
   deleteModule,
 };





}
