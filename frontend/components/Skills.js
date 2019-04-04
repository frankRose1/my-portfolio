import {
  SkillsColumn,
  IconList,
  SkillCards,
  Card
} from './styles/SkillsStyles';
import Container from './styles/Container';
import PageTitle from './styles/PageTitle';

const Skills = () => {
  const skillItems = [
    { icon: 'devicon-html5-plain colored', text: 'HTML5', liClass: 'html' },
    { icon: 'devicon-css3-plain colored', text: 'CSS3', liClass: 'css' },
    {
      icon: 'devicon-javascript-plain colored',
      text: 'JavaScript',
      liClass: 'js'
    },
    { icon: 'devicon-jquery-plain colored', text: 'jQuery', liClass: 'jquery' },
    { icon: 'devicon-git-plain colored', text: 'git', liClass: 'git' },
    { icon: 'devicon-gulp-plain colored', text: 'Gulp', liClass: 'gulp' },
    {
      icon: 'devicon-sequelize-plain colored',
      text: 'Sequelize',
      liClass: 'sequelize'
    },
    { icon: 'devicon-nodejs-plain colored', text: 'Node.js', liClass: 'node' },
    {
      icon: 'devicon-express-original colored',
      text: 'Express',
      liClass: 'express'
    },
    {
      icon: 'devicon-mongodb-plain colored',
      text: 'MongoDB',
      liClass: 'mongo'
    },
    { icon: 'devicon-react-original colored', text: 'React', liClass: 'react' },
    { icon: 'devicon-vuejs-plain colored', text: 'Vue', liClass: 'vue' }
  ];
  return (
    <Container>
      <PageTitle>Here's What I Know</PageTitle>
      {/* Skills */}
      <SkillsColumn>
        {/* Skill Icons */}
        <IconList>
          {skillItems.map(el => (
            <li key={el.text} className={el.liClass}>
              <i className={el.icon} />
              <p>{el.text}</p>
            </li>
          ))}
        </IconList>

        {/* Skill Cards */}
        <SkillCards>
          <Card color='secondary'>
            <i className='fas fa-code' />
            <h3>Full Stack JavaScript</h3>
            <p>
              The projects I've built with JavaScript have really shown me how
              awesome of a language it is! After building command line apps, to
              backend APIs, and working with front-end libraries like React, my
              passion for becoming a better developer grows with each project I
              build.
            </p>
          </Card>
          <Card color='info'>
            <i className='fas fa-graduation-cap' />
            <h3>Continued Learning</h3>
            <p>
              I'm committed to learning everything I can about the wonderful
              world of web development! I'm working on new projects all the time
              to challenge myself and become a better developer. Currently, I'm
              learning python and enjoying building client and server side
              applications with GraphQL.
            </p>
          </Card>
          <Card color='accent'>
            {' '}
            <i className='fas fa-desktop' />
            <h3>Web Development</h3>
            <p>
              Building web apps is what I love to do. From working with
              databases on the backend to building a responsive frontend, I
              enjoy all of it! My goal on every project is to put my best foot
              forward and give the end user a great final product. Check out my{' '}
              <a
                href='https://github.com/frankRose1'
                target='_blank'
                className='inline-gh'
              >
                github
              </a>{' '}
              to see what I'm working on next.
            </p>
          </Card>
        </SkillCards>
      </SkillsColumn>
    </Container>
  );
};

export default Skills;
