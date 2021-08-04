
function NotificationCard(){

    function hide(){
        document.getElementById('id01').style.display='none';
    }

    return(

        <div>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            <div id="id01" class="w3-modal" style={{"display":"initial"}}>
                <div class="w3-modal-content w3-blue">
                    <div class="w3-container">
                    <span onclick={hide}
                    class="w3-button w3-display-topright">&times;</span>
                    <h1><b>Uh Oh!</b></h1>
                    <p>Some text in the Modal..</p>
                    </div>
                </div>
            </div>
        </div>




    );


}

export default NotificationCard;