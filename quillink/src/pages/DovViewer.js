import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import WriterInfo from '../components/WriterInfo';
import './css/Projects.css';
import './css/main.css';
import './css/DocEditor.css';
import SideBar from '../components/SideBar';
import DocsParagraph from '../components/DocsParagraph';

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
    const paragraphs = [];
    var getDocument = async function() {
        console.log("hi");
        fetch('/api/viewDocument')
        .then(res => res.json())
        .then(resContent => { 
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
            console.log(paragraphs);
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
            <WriterInfo style={{flexGrow: '2'}} className="side-info" />
        </div>
    );
}

export default DocViewer;