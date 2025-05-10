const TeamMember = require("../../models/TeamMember");

const getAllMembers = async () => {
  return await TeamMember.find();
};

const addMember = async (data) => {
  return await TeamMember.create(data);
};

const updateMember = async (id, data) => {
  const updated = await TeamMember.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("Member not found or update failed");
  return updated;
};

const deleteMember = async (id) => {
  const deleted = await TeamMember.findByIdAndDelete(id);
  if (!deleted) throw new Error("Member not found or delete failed");
  return deleted;
};

module.exports = { getAllMembers, addMember, updateMember, deleteMember };
