import React, { useState } from 'react';
import Router from 'next/router';
import { ProjectCardStyles } from './styles/PortfolioStyles';

const ProjectCard = ({ project }) => {
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  return (
    <ProjectCardStyles>
      <img src={project.imageUrl} alt={project.title} />
      <p>{project.title}</p>
      <p>{project.dateAdded}</p>
    </ProjectCardStyles>
  );
};

export default ProjectCard;
