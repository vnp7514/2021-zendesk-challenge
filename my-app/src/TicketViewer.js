import { useState } from 'react';
import { useQuery } from 'react-query';
import Ticket from './Ticket';

function TicketViewer() {
    const [enable, setEnable] = useState(false);
    const [which, setWhich] = useState('/gettickets');
    const {isLoading, isError, data, error} = useQuery('tickets', fetchTickets, {
        enabled: enable,
        initialData: null
    });

    console.log(which);
    async function fetchTickets(){
        setEnable(false);
        // The long string after Basic is the Base64 encoded string 
        //   that represents my username and the API token
        var response;
        response = await fetch(which);
        if (response.ok) {
            const result = response.json();
            return result;
        } else {
            throw new Error("Error fetching tickets.");
        }
    }

    
    function displayData(){
        console.log(data);
        if (data.error) {
            return (<p>Error: {data.error}</p>);
        } else{
            const listTickets = data.tickets.map((ticket) => 
                <Ticket ticket={ticket} />
            );
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
        <div>
            {isLoading ? (<p>Loading</p>) : (<p></p>)}
            {isError ? (<p>Error: {error.message}</p>) : (<p></p>)}
            {data ? displayData() : (<p></p>)}
            <button onClick={() => {setWhich('/gettickets'); setEnable(true);}}>
                Fetch Data
            </button>
        </div>
        // <ul>
        //   {data.map(todo => (
        //     <li key={todo.id}>{todo.title}</li>
        //   ))}
        // </ul>
      );
}

export default TicketViewer;