import { useState } from "react";

function Ticket(props){
    const [moreInfo, setMoreInfo] = useState(false);
    
    return (
        <div>
            <div>
                <p>Ticket ID: {props.ticket.id}</p>
                <p>Type: {(props.ticket.type) ? props.ticket.type : ""}</p>
                <p>Priority: {props.ticket.priority}</p>
                <p>Due at: {props.ticket.due_at}</p>
                <p>Status: {props.ticket.status}</p>
                <p>Description: {props.ticket.description}</p>
            </div>
            <div>
                {(moreInfo) ? JSON.stringify(props.ticket, null, 4) : ""}
            </div>
            <button onClick={()=>setMoreInfo(!moreInfo)}>
                {moreInfo ? "Less information" : "More information"}
            </button>
        </div>
    );
}

export default Ticket;