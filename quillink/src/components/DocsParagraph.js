import { Button, Card } from 'react-bootstrap';
import './css/CreateProject.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function DocsParagraph(props) {
    var textContent;
    var paragraphStyle;
    var textStyle;
    try {
        textContent = props.paragraph.elements[0].textRun.content;
        paragraphStyle = props.paragraph.paragraphStyle;
        textStyle = props.paragraph.elements[0].textRun.textStyle;
    } catch {
        return (<div></div>);
    }
    const bullet = props.bullet;

    const pfontWeight = textStyle.bold === true ? "bold" : "";
    const underline = textStyle.underline === true ? "underline" : "";
    const strikethrough = textStyle.strikethrough === true ? "line-through" : "";
    var pfontSize;
    if(textStyle.hasOwnProperty("fontSize")) {
        pfontSize = textStyle.fontSize.magnitude + "pt";
    } else {
        pfontSize = "";
    }
    var ptextIndent;
    if(paragraphStyle.hasOwnProperty("indentStart")) {
        ptextIndent = paragraphStyle.indentStart.magnitude + "pt";
    } else {
        ptextIndent = "";
    }

    var alignment = "left";
    if(paragraphStyle.hasOwnProperty("alignment")) {
        if(paragraphStyle.alignment == "CENTER") {
            alignment = "center";
        } else if(paragraphStyle.alignment == "END") {
            alignment = "right";
        } else if(paragraphStyle.alignment == "JUSTIFIED") {
            alignment = "justify";
        }
    }
    
    const ptextStyle = {
        fontWeight : pfontWeight,
        textDecoration: underline + " " + strikethrough,
        fontSize: pfontSize,
        marginLeft: ptextIndent,
        textAlign: alignment,
    }

    return (
        <div>
            { bullet != false ?
                <li>
                    <div style={ptextStyle}>
                        {textContent}
                    </div>
                </li>
                :
                <div style={ptextStyle}>
                    { textContent === "\n" ?
                        <br></br>
                        :
                        <div>{textContent}</div>
                    }
                </div>
            } 
        </div>
    );
}

export default DocsParagraph;