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
  },
  async fetchProjectById(_, { projectId }, { Project }) {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('No project found with that ID!');
    }
    return { ...project._doc, _id: project._id.toString() };
  },
  async searchProjects(_, { searchTerm }, { Project }) {
    if (searchTerm) {
      const searchResults = await Project.find(
        //perform text search
        { $text: { $search: searchProjects } },
        // asign a score to searchTerm to find the best matching results
        { score: { $meta: 'textScore' } }
        //sort results by the textScore being projected to the results
      )
        .sort({
          score: { $meta: 'textScore' }
        })
        .limit(5);
      return searchResults;
    }
  }
};

module.exports = Queries;
