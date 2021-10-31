import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ShareCard from '../components/ShareCard';
import './css/Projects.css';
import './css/main.css';
import Notifications from '../components/Notifications';
import SideBar from '../components/SideBar';

function Explore() {
    fetch('/api/checkvalidity')
    .then(res => res.json())
    .then(ready => { 
        if(!ready) {
            console.log("POOP");
            window.location.replace("/");
        }
    });

    const [exploreCards, SetExploreCards] = useState([]);
    fetch('/api/explore').then(res => { 
        console.log("SUCCESS");
        console.log(res);
        res.json().then(data => {
            console.log(data);
            var intermediateExploreCards = [];
            for (var item of data){
                console.log(res);
                intermediateExploreCards.push(
                    <ShareCard
                    title={item.title}
                    description={item.description}
                    />
                )
            }
            SetExploreCards(exploreCards.concat(intermediateExploreCards));
        }).then(err => {
            console.log("FAIL");
        });
        
    }).then(ready => {
        console.log("FAILURE");
        console.log(ready);
    });
    return (
        <div id="page">
            <SideBar 
                className="side-area"
                page={1}
            />
            <div style={{display: 'flex', justifyContent: 'space-between', flexGrow: '2'}}>
                <div id="projects" className="main-page">
                    {exploreCards}
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
    );
}

export default Explore;