import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import TicketViewer from './TicketViewer';

// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <TicketViewer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
