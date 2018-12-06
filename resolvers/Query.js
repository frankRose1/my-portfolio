const Queries = {
  async fetchProjects(_, args, { Project }) {
    const projects = await Project.find({});
    return projects.map(project => ({
      ...project._doc,
      _id: project._id.toString()
    }));
  }
};

module.exports = Queries;
