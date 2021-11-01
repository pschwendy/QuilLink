import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import WriterInfo from '../components/WriterInfo';
import './css/Projects.css';
import './css/main.css';
import './css/DocEditor.css';
import SideBar from '../components/SideBar';
import DocsParagraph from '../components/DocsParagraph';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift().replace(/%20/g, " ");
}

function DocViewer() {
    fetch('/api/checkvalidity')
    .then(res => res.json())
    .then(ready => { 
        if(!ready) {
            console.log("POOP");
            window.location.replace("/");
        }
    });
    const [paragraphContent, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [reviewers, setReviewers] = useState([]);
    const [description, setDescription] = useState("");
    const [requested, SetRequested] = useState(false);
    let path = window.location.pathname;
    path = path.substring(1, path.length - 5);
    const paragraphs = [];
    var getDocument = async function() {
        console.log("hi");
        
        fetch('/api/viewDocument', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                docId: path
            })
        })
        .then(res => res.json())
        .then(project => { 
            const resContent = project.content;
            const info = project.info;
            setTitle(info.title);
            setDescription(info.description);
            setReviewers(info.data.reviewers);
            setWriter(info.owner);
            console.log(reviewers);
            console.log("IN HERE");
            console.log(resContent);
            var bulletID = "";
            //resContent.forEach((paragraph) => {
            for(var i = 0; i < resContent.length; ++i) {
                var paragraph = resContent[i];
                console.log("HIIIIIIIIIII!!!!!!!!!!!!!!!!!!!");
                console.log(paragraph);
                if (paragraph.hasOwnProperty("paragraph") && paragraph.paragraph.hasOwnProperty("bullet")) {
                    const listId = paragraph.paragraph.bullet.listId;
                    const bullets = [];
                    var condition1 = paragraph.hasOwnProperty("paragraph")
                    var condition2 = paragraph.paragraph.hasOwnProperty("bullet");
                    while(condition1 && condition2 && paragraph.paragraph.bullet.listId == listId) {
                        bullets.push(
                            <div style={{textAlign: "left"}}>
                                <DocsParagraph
                                    paragraph={paragraph.paragraph}
                                    bullet={paragraph.paragraph.hasOwnProperty("bullet")}
                                />
                            </div>
                        );
                        ++i;
                        paragraph = resContent[i];
                        try {
                            condition1 = paragraph.hasOwnProperty("paragraph");
                        } catch {
                            condition1 = false;
                        }
                        try {
                            condition2 = paragraph.paragraph.hasOwnProperty("bullet");
                        } catch {
                            condition2 = false;
                        }
                        
                    }
                    paragraphs.push(
                        <ul>
                            {bullets}
                        </ul>  
                    )
                }
                try {
                    paragraphs.push(
                        <div style={{textAlign: "left"}}>
                            <DocsParagraph
                                paragraph={paragraph.paragraph}
                                bullet={paragraph.hasOwnProperty("bullet")}
                            />
    
                        </div>
                    )
                } catch {
                    continue;
                }
                
            }
            console.log("PARAGRAPH");
            setContent(paragraphs);
            
            try {
                console.log(info.data.requested_reviewers);
                for(var requestedReviewer of info.data.requested_reviewers) {
                    if(requestedReviewer == getCookie("username")) {
                        SetRequested(true);
                    }
                }
            } catch {
                console.log("old version");
            }
            
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
            <div id="doc-viewer" className="main-page">
                <div>
                        {paragraphContent}
                        {/*<DocsParagraph
                            paragraph={content.paragraph}
                            bullet={content.hasOwnProperty("bullet")}
                        />*/}
                </div>
            </div>
            <WriterInfo style={{flexGrow: '2'}} className="side-info" 
                title={title}
                description={description}
                writer={writer}
                reviewers={reviewers}
                requested={requested}
                projectpk={path}
            />
        </div>
    );
}

export default DocViewer;