import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import './css/Projects.css';
import './css/main.css';
import Notifications from '../components/Notifications';
import SideBar from '../components/SideBar';
import ShareCard from '../components/ShareCard';
import CreateProjectButton from '../components/CreateProject';
import '../components/css/CreateProject.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Projects() {
    console.log(document.cookie);
    fetch('/api/checkvalidity')
    .then(res => res.json())
    .then(ready => { 
        if(!ready) {
            console.log("POOP");
            window.location.replace("/");
        }
    });
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

    const [create, SetCreate] = useState(false);
    const ToggleCreateProject = (event) => {
        SetCreate(!create);
        console.log("ready to create project");
        //event.preventDefault();
    };

    const [title, SetTitle] = useState("");
    const UpdateTitle = (event) => {
        SetTitle(event.target.value);
    }

    const [addTag, SetTag] = useState("");
    const UpdateTag = (event) => {
        SetTag(event.target.value);
    }

    const [tags, SetTags] = useState([]);
    const [tagstrings, SetTagStrings] = useState([]);
    const AddToTags = () => {
        SetTag(addTag.charAt(0).toUpperCase() + addTag.slice(1));
        SetTags(tags.concat(
            <div className="tag">
                {addTag}
            </div>
        ));
        SetTagStrings(tagstrings.concat(addTag));
        SetTag("");
    }

    const [link, SetLink] = useState("");
    const UpdateLink = (event) => {
        SetLink(event.target.value);
    }

    const [description, SetDescription] = useState("");
    const UpdateDescription = (event) => {
        SetDescription(event.target.value);
    }

    const CreateProject = () => {
        var data = {
            "title": title,
            "tags": tagstrings,
            "link": link,
            "description": description
        }

        fetch('/api/createProject', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        /*.then(res => res.json())
        .then(result => {
            if(result = "") {
                window.location.replace('/projects');
            } else {
                // error code
            }
        });*/
    }

    return (
        <div id="page">
            <SideBar 
                className="side-area"
                page={0} />

            <Button style={create === true ? {display: "none"} : {}} id="the-button" onClick={ToggleCreateProject}>
                <FontAwesomeIcon id="create-icon" icon={faPlus} size='2x' />
            </Button>
           
                <div style={{display: 'flex', justifyContent: 'space-between', flexGrow: '2'}}>
                    <div id="projects" className="main-page">
                        { create === false ?
                            <div>
                                <span className="p-toggler bolded">
                                    <div onClick={ToggleProjects} className={toggle === true ?  "toggled toggle": "toggle"} id="first-toggle">
                                        <div className = ""> <a> My Projects </a> </div> 
                                    </div>
                                    <div onClick={ToggleReviewing} className={toggle === true ?  "toggle": "toggled toggle"}>
                                        <div className = "" > <a> Reviewing </a> </div>
                                    </div>
                                </span>
                                { toggle === true ? 
                                    <div id="project-list">
                                        <ProjectCard
                                        title='My Project'
                                        description='My Review'
                                        />
                                        <ProjectCard
                                        title='My Project'
                                        description='My Review'
                                        />
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
                                        <ProjectCard
                                        title='My Review'
                                        description='My Review'
                                        />
                                        <ProjectCard
                                        title='My Review'
                                        description='My Review'
                                        />
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <span id="create-header" className="p-toggler bolded">
                                    Create Project
                                </span>
                                <div className="project-input-group">
                                    <div>Title</div>
                                    <input value={title} onChange={UpdateTitle} className="project-input" type='text' required/>
                                </div>
                                <div className="project-input-group">
                                    <div>Tags</div>
                                    <div className="group">
                                        <input value={addTag} onChange={UpdateTag} className="project-input" type='text' required/>
                                        <Button onClick={AddToTags}>Add</Button>
                                    </div>
                                    <div className="added-tags">
                                        {tags}
                                    </div>
                                </div>
                                <div className="project-input-group">
                                    <div>Link (optional)</div>
                                    <input value={link} onChange={UpdateLink} className="project-input" type='text'/>
                                </div>
                                <div className="project-input-group">
                                    <div>Description</div>
                                    <div className="">
                                        <textarea value={description} onChange={UpdateDescription} className="project-input" type='textarea' rows="5" cols="50" required/>
                                    </div>
                                </div>
                                <div id="button-group">
                                    <Button className="float-right" onClick={CreateProject}>Create Project</Button>
                                    <Button className="float-right" onClick={ToggleCreateProject}>Exit</Button>
                                </div>
                            </div>
                        }
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
