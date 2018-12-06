const Queries = {
  async fetchProjects(_, args, { Project }) {
    const projects = await Project.find({});
    return projects.map(project => ({
      ...project._doc,
      _id: project._id.toString()
    }));
  },
  async getCurrentAdmin(_, args, { Admin, currentAdmin }) {
    if (!currentAdmin) {
      return null;
    }
    const admin = await Admin.findOne({ email: currentAdmin.email });
    return { ...admin._doc, _id: admin._id.toString() };
  },
  async infiniteScrollProjects(_, { pageNum, pageSize }, { Project }) {
    let projects;
    if (pageNum === 1) {
      projects = await Project.find({})
        .sort({ dateAdded: -1 })
        .limit(pageSize);
    } else {
      const skip = pageSize * (pageNum - 1);
      projects = await Project.find({})
        .sort({ dateAdded: -1 })
        .skip(skip)
        .limit(pageSize);
    }
    const totalDocs = await Project.countDocuments();
    const hasMore = pageNum * pageSize < totalDocs;
    return {
      hasMore,
      projects: projects.map(proj => ({
        ...proj._doc,
        _id: proj._id.toString()
      }))
    };
  }
};

module.exports = Queries;
