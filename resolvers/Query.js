const Queries = {
  async fetchProjects(_, args, { Project }) {
    const projects = await Project.find({});
    return { projects };
  }
};

module.exports = Queries;
