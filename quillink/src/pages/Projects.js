import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import './css/Projects.css';
import './css/main.css';
import Notifications from '../components/Notifications';
import SideBar from '../components/SideBar';
import ShareCard from '../components/ShareCard';
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
        <div id="page">
            <SideBar className="side-area" />
            <div style={{display: 'flex', justifyContent: 'space-between', flexGrow: '2'}}>
                <div id="projects" className="main-page">
                    <span className="p-toggler bolded">
                        <div onClick={ToggleProjects} className="toggle" id="first-toggle">
                            <div className = "" className={toggle === true ?  "toggled": ""}> <a> My Projects </a> </div> 
                        </div>
                        <div onClick={ToggleReviewing} className="toggle">
                            <div className = "" className={toggle === true ?  "": "toggled"}> <a> Reviewing </a> </div>
                        </div>
                    </span>
                    { toggle === true ? 
                        <div id="project-list">
                            <ProjectCard
                            title='My Project'
                            description='My Review'
                            />
                        </div>
                        : 
                        <div id="project-list">
                            <ProjectCard
                            title='My Review'
                            description='My Review'
                            />
                        </div>
                    }
                    {/*<div>
                        {/*<span className="p-toggler bolded">
                            <div onClick={ToggleProjects} className="toggle" id="first-toggle">
                                <div className = "" className={toggle === true ?  "toggled": ""}> <a> My Projects </a> </div> 
                            </div>
                            <div onClick={ToggleReviewing} className="toggle">
                                <div className = "" className={toggle === true ?  "": "toggled"}> <a> Reviewing </a> </div>
                            </div>
                        </span>}
                        
                        { toggle === true ? 
                        <div id="project-list">
                            <ShareCard
                            title='My Project'
                            description='My Review'
                            />
                        </div>
                        : 
                        <div id="project-list">
                            <ShareCard
                            title='My Review'
                            description='My Review'
                            />
                        </div>
                        }
                    </div>*/}
                </div>
            </div>
            <Notifications style={{flexGrow: '2'}} className="side-info" />
        </div>
        
    );
}

export default Projects;


/*
<div id="page">
        <SideBar className="side-area"/>
        <div style={{display: 'flex', justifyContent: 'space-between', flexGrow: '8'}}>
            <div id="projects" className="main-page">
                <ShareCard
                title="Novel 1"
                description="Novel 1 is the best novel ever created"
                />
                <ShareCard
                title="Novel 2"
                description="Novel 2 is the best novel ever created"
                />
                <ShareCard
                title="Novel 3"
                description="Novel 3 is the best novel ever created"
                />
                <ShareCard
                title="Novel 3"
                description="Novel 3 is the best novel ever created"
                />
                <ShareCard
                title="Novel 3"
                description="Novel 3 is the best novel ever created"
                />
            </div>
        </div>
        <Notifications style={{flexGrow: '2'}} className="side-info" />
    </div>
*/
