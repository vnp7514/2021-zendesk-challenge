import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
    background-color: red;
`;

const Div4 = styled.div`
    margin: 20px;
    padding: 20px;
    border: 15px solid green;
`;

const Div1 = styled.div`
    display: flex;
`;

const Div2 = styled.div`
    flex: 50%;
    text-align: left;
`;

const Div3 = styled.div`
    flex: 50%;
`;

function Ticket(props){
    // Used to decide whether to give the JSON string or not
    const [moreInfo, setMoreInfo] = useState(false);
    
    return (
        <Div4>
            <Div1>
                <Div2>
                    <p>Ticket ID: {props.ticket.id}</p>
                    <p>Type: {(props.ticket.type) ? props.ticket.type : ""}</p>
                    <p>Priority: {props.ticket.priority}</p>
                    <p>Status: {props.ticket.status}</p>
                </Div2>
                <Div3>
                    <p>Description: {props.ticket.description}</p>
                </Div3>
            </Div1>
            <div>
                {(moreInfo) ? JSON.stringify(props.ticket, null, 4) : ""}
            </div>
            <Button onClick={()=>setMoreInfo(!moreInfo)}>
                {moreInfo ? "Less information" : "More information"}
            </Button>
        </Div4>
    );
}

export default Ticket;