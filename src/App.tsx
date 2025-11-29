import AppRoutes from "@/routes/AppRoutes.tsx";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
export default function App() {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools  initialIsOpen={false}/>
                <AppRoutes/>
            </QueryClientProvider>


        </div>);
}