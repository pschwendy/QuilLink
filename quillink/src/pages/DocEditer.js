import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ShareCard from '../components/ShareCard';
import './css/Projects.css';
import './css/main.css';
import './css/DocEditor.css';
import SideBar from '../components/SideBar';

function DocEditor() {
    const [document, setDocument] = useState("");
    fetch('/api/checkvalidity')
    .then(res => res.json())
    .then(ready => { 
        if(!ready) {
            console.log("POOP");
            window.location.replace("/");
        }
    });
    /*.then(res => res.json())
    .then(ready => { 
        if(!ready) {
            window.location.replace("/");
        }
    });*/
    var getDocument = () => {
        /*let path = window.location.pathname;
        path = path.substring(1, path.length - 5);
        fetch('/api/getDocument/' + path)
        .then(res => res.json())
        .then(link => { 
            setDocument(link);
            console.log(link);
        });*/
        let link = window.location.pathname;
        link = link.substring(1, link.length - 5);
        setDocument("https://docs.google.com/document/d/" + link + '/');
    };

    useEffect(() => {
        getDocument();
    }, []);

    return (
        <div id="page">
            <SideBar
                collapsed={true}
            />
            <div id="doc-editor" className="main-page">
                <iframe src={document} />
            </div>
        </div>
    );
}

export default DocEditor;