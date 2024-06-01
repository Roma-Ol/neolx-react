import Pages from "./routes";
import {styled} from "@mui/joy";
import Header from "./components/header";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    const Layout = styled('main')({});

    return (
        <Router>
            <Layout sx={{p: '16px', margin: '16px', display: 'flex', flexDirection: 'column', gap: 2}}>
                <Header/>
                <Pages/>
            </Layout>
        </Router>
    )
}

export default App
