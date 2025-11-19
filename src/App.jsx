import Header from "./layout/Header";
import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Pages />
            </BrowserRouter>
        </div>
    );
}

export default App;
