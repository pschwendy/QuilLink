import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import './css/Projects.css';

function Projects() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const [toggle, SetToggle] = useState(true);
    const ToggleProjects = () => {
        SetToggle(true);
    };
    const ToggleReviewing = () => {
        SetToggle(false);
    };

    return (
        <div>
            <Container>
                <span className="p-toggler">
                    <div onClick={ToggleProjects} className={toggle === true ?  "toggle toggled": "toggle"} id="first-toggle">
                        My Projects
                    </div>
                    <div onClick={ToggleReviewing} className={toggle === true ?  "toggle": "toggle toggled"} >
                        Reviewing
                    </div>
                </span>
                { toggle === true ? 
                <div>
                    <p>My Projects</p>
                    
                </div>
                : 
                <div>
                    Reviewing
                    <ProjectCard/>
                </div>
                }
                
            </Container>
        </div>
    );
}

export default Projects;