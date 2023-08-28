import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import StockDataComponent from "./StockDataComponent";

function App() {
    return (
        <div className="App container-fluid bg-dark text-white">
            <header className="App-header py-5">
                <h1 className="display-4">SixthSense: Financial Data Visualization</h1>
                <StockDataComponent />
            </header>
        </div>
    );
}

export default App;
