import { Button, Card } from 'react-bootstrap';
import './css/CreateProject.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function CreateProjectButton() {
    return (
        <Button id="the-button">
            <FontAwesomeIcon id="create-icon" icon={faPlus} size='2x' />
        </Button>
    );
}

export default CreateProjectButton;