import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ShareCard from '../components/ShareCard';
import './css/Projects.css';
import './css/main.css';
import Notifications from '../components/Notifications';
import SideBar from '../components/SideBar';

function Explore() {
    const checkValidity = () => {
        fetch('/api/checkvalidity')
        .then(res => res.json())
        .then(ready => { 
            if(!ready) {
                console.log("POOP");
                window.location.replace("/");
            }
        });
    }

    const [exploreCards, SetExploreCards] = useState([]);
    const getExploreCards = () => {
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
                        username={item.owner}
                        link={item.pk}
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
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getExploreCards();
        checkValidity();
    }, []);
    
    return (
        <div id="page">
            <SideBar 
                className="side-area"
                page={1}
            />
            <div style={{display: 'flex', justifyContent: 'space-between', flexGrow: '2'}}>
                <div id="projects" className="main-page">
                    {exploreCards}
                </div>
            </div>
            <Notifications style={{flexGrow: '2'}} className="side-info" />
        </div>
    );
}

export default Explore;