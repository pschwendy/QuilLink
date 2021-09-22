import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import WriterInfo from '../components/WriterInfo';
import './css/Projects.css';
import './css/main.css';
import './css/DocEditor.css';
import SideBar from '../components/SideBar';

function DocViewer() {
    const [document, setDocument] = useState("");
    var getDocument = () => {
        console.log("hi");
        fetch('/api/getDocumentView')
        .then(res => res.json())
        .then(link => { 
            setDocument(link);
            console.log(link);
        });
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
            <WriterInfo style={{flexGrow: '2'}} className="side-info" />
        </div>
    );
}

export default DocViewer;