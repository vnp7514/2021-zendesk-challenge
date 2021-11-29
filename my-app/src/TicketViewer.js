import { useState } from 'react';
import { useQuery } from 'react-query';

function TicketViewer() {
    const [enable, setEnable] = useState(false);
    const [initialData, setInitialData] = useState(null);
    const {isLoading, isError, data, error} = useQuery('tickets', fetchTickets, {
        enabled: enable
    });

    async function fetchTickets(){
        setEnable(false);
        // The long string after Basic is the Base64 encoded string 
        //   that represents my username and the API token
        const response = await fetch('/gettickets');
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error fetching tickets.");
        }
    }

    
    function displayData(){
        if (data.error) {
            return (<p>Error: {data.error}</p>);
        } else{
            return (<p>We have data</p>);
        }
    }


    return (
        <div>
            {isLoading ? (<p>Loading</p>) : (<p></p>)}
            {isError ? (<p>Error: {error.message}</p>) : (<p></p>)}
            {data ? displayData() : (<p></p>)}
            <button onClick={() => setEnable(true)}>
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