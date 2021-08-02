import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ShareCard from '../components/ShareCard';
import './css/Projects.css';
import './css/main.css';
import './css/DocEditor.css';

function DocEditor() {
    return (
        <div id="doc-editor" className="main-page">
            <iframe src="https://docs.google.com/document/d/12b5TnxrHY9_3dsd1poFsBjDafoKkzvgOb5RIcFqJc-g/edit?usp=sharing"/>
        </div>
    );
}

export default DocEditor;