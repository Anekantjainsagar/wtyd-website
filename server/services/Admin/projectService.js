const Project = require("../../models/Project");

const getAllProjects = async () => {
  return await Project.find();
};

const addProject = async (data) => {
  return await Project.create(data);
};

const updateProject = async (id, data) => {
  const updated = await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("Project not found or update failed");
  return updated;
};

const deleteProject = async (id) => {
  const deleted = await Project.findByIdAndDelete(id);
  if (!deleted) throw new Error("Project not found or delete failed");
  return deleted;
};

module.exports = { getAllProjects, addProject, updateProject, deleteProject };
