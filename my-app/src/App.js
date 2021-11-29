import { QueryClient, QueryClientProvider } from 'react-query';

import TicketViewer from './TicketViewer';
import { ThemeProvider } from 'styled-components';


const theme = {
  main: "mediumseagreen"
};

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <TicketViewer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
