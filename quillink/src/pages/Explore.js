import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ShareCard from '../components/ShareCard';
import './css/Projects.css';
import './css/main.css';

function Explore() {
    return (
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
    );
}

export default Explore;