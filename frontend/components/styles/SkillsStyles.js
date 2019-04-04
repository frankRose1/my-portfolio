import styled from 'styled-components';

const SkillsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #222;
`;

const IconList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  li {
    flex-basis: 50%;
    margin-bottom: 20px;
    text-align: center;
  }

  i {
    font-size: 60px;
    cursor: pointer;
  }

  li p {
    border-radius: 12px 6px;
    background-color: rgba(0, 0, 0, 0.68);
    max-width: 75px;
    padding: 5px 8px;
    color: #fff;
    opacity: 0;
    transition: 0.5s;
    margin: 0 auto;
  }

  li:hover p {
    opacity: 1;
  }

  @media (min-width: 768px) {
    display: block;
    position: relative;
    margin: 0 auto;
    max-width: 650px;
    height: 50vh;

    li {
      position: absolute;
      margin-bottom: 0;
    }

    .html {
      top: 20px;
      left: 10px;
    }

    .css {
      bottom: 20px;
      left: 10px;
    }

    .js {
      top: 150px;
      left: 55px;
    }
    .gulp {
      top: 150px;
      right: 55px;
    }

    .jquery {
      bottom: 10px;
      left: 25%;
    }
    .mongo {
      bottom: 10px;
      right: 25%;
    }

    .express {
      top: 20px;
      left: 25%;
    }
    .sequelize {
      top: 20px;
      right: 25%;
    }

    .node {
      top: 20px;
      right: 10px;
    }
    .react {
      bottom: 20px;
      right: 10px;
    }

    .git {
      top: 150px;
      right: 35%;
    }
    .vue {
      top: 150px;
      left: 35%;
    }
  }
`;

const SkillCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 50px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const Card = styled.article`
  border-radius: 5px;
  text-align: center;
  width: 100%;
  background-color: white;
  padding: 30px;
  margin: 20px 0;
  box-shadow: ${props => props.theme.bs};
  border-top: 10px solid ${props => props.theme[props.color]};

  i {
    font-size: 35px;
    margin-bottom: 15px;
    color: ${props => props.theme[props.color]};
  }

  h3 {
    font-size: 1.5rem;
    &::after {
      content: '';
      background-color: #222;
      display: block;
      margin: 15px auto;
      width: 120px;
      height: 1px;
    }
  }

  p {
    font-size: 18px;
    line-height: 23px;
  }

  .inline-gh {
    text-decoration: none;
    color: #c9510c;
    font-size: 20px;
    border-bottom: 1px solid transparent;
    transition: color 0.3s ease-in, border-bottom 0.3s ease-in;
    font-weight: 700;
  }

  .inline-gh:hover {
    color: #ac4103;
    border-bottom: 1px solid #ac4103;
  }

  @media (min-width: 768px) {
    width: 31%;
  }
`;

export { SkillsColumn, IconList, SkillCards, Card };
