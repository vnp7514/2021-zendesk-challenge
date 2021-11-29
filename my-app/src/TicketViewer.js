import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Ticket from './Ticket';

const BigDiv = styled.div`
    text-align: center;
`;


function TicketViewer() {
    // Decide whether to run the query or not. Default is not to run the query.
    const [enable, setEnable] = useState(false);
    // Determine which page we need to look at. Default is the first page.
    const [which, setWhich] = useState('/gettickets');
    const {isLoading, isError, data, error} = useQuery('tickets', fetchTickets, {
        enabled: enable,
        initialData: null
    });

    // The function that will be called to fetch the data from Node.js
    async function fetchTickets(){
        setEnable(false);
        const response = await fetch(which);
        if (response.ok) {
            const result = response.json();
            return result;
        } else {
            throw new Error("Error fetching tickets.");
        }
    }

    // Handling displaying data
    function displayData(){
        if (data.error) {
            return (<p>Error: {data.error}</p>);
        } else{
            // Render the displaying component for each ticket
            const listTickets = data.tickets.map((ticket) => 
                <Ticket ticket={ticket} />
            );
            // Always display the tickets. If there is a link of the next page, the button "Next Page" will show up.
            // If there is a link for the previous page, the button "Previous Page" will show up.
            return (
                <div>
                    {listTickets}
                    {(data.links.next) ? (
                        <button onClick={() => {setWhich('/get/'+btoa(data.links.next.split('?')[1])); setEnable(true);}}>
                            Next Page
                        </button>) :
                        <p></p>
                    }
                    {(data.links.prev) ? (
                        <button onClick={() => {setWhich('/get/'+btoa(data.links.prev.split('?')[1])); setEnable(true);}}>
                            Previous Page
                        </button>) :
                        <p></p>
                    }
                </div>
            );
        }
    }


    return (
        <BigDiv>
            {isLoading ? (<p>Loading</p>) : (<p></p>)}
            {isError ? (<p>Error: {error.message}</p>) : (<p></p>)}
            {data ? displayData() : (<p></p>)}
            <button data-testid="gettickets" onClick={() => {setWhich('/gettickets'); setEnable(true);}}>
                Fetch Data
            </button>
        </BigDiv>
      );
}

export default TicketViewer;