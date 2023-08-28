import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import "../styles/SymbolSelector.css"

function SymbolSelector({ stocks, setSelectedSymbol, selectedSymbol }) {
    const symbols = Array.from(new Set(stocks.map(s => s.symbol)));
    const currentSymbol = selectedSymbol || "Select Symbol";

    return (
        <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {currentSymbol}
            </Dropdown.Toggle>

            <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item onClick={() => setSelectedSymbol(null)}>
                    Global
                </Dropdown.Item>
                {symbols.length > 0 ? (
                    symbols.map((symbol, index) => (
                        <Dropdown.Item
                            key={index}
                            onClick={() => setSelectedSymbol(symbol)}
                        >
                            {symbol}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>No symbols available</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default SymbolSelector;


