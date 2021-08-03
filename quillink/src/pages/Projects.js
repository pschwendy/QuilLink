import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import './css/Projects.css';
import './css/main.css';

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
        <div id="projects" className="main-page">
            <div>
                <span className="p-toggler bolded">
                    <div onClick={ToggleProjects} className="toggle" id="first-toggle">
                        <div className={toggle === true ?  "toggled": ""}> My Projects</div> 
                    </div>
                    <div onClick={ToggleReviewing} className="toggle">
                        <div className={toggle === true ?  "": "toggled"}> Reviewing</div>
                    </div>
                </span>
                <div id="project-list">
                    { toggle === true ? 
                    <div>
                        <ProjectCard
                        title='My Project'
                        description='My Review'
                        />
                    </div>
                    : 
                    <div>
                        <ProjectCard
                        title='My Review'
                        description='My Review'
                        />
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Projects;