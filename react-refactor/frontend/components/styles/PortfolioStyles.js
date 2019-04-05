import styled from 'styled-components';

const ProjectLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const ProjectCardStyles = styled.div`
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: ${props => props.theme.bs};
  }
`;

export { ProjectLayout, ProjectCardStyles };
