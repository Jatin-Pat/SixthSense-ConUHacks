import React, { useEffect, useState } from 'react';
import SymbolSelector from './SymbolSelector';
import MessageTypeChart from "./MessageTypeChart";
import OrderAcknowledgeChart from "./OrderAcknowledgeChart";
import AnomalyList from './AnomalyList';

function StockDataComponent() {
    const [stocks, setStocks] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState(null);

    useEffect(() => {
        const eventSource = new EventSource('/api/stream');

        eventSource.onmessage = (event) => {
            const stock = JSON.parse(event.data);
            setStocks(prevStocks => [...prevStocks, stock]);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <SymbolSelector stocks={stocks} setSelectedSymbol={setSelectedSymbol} selectedSymbol={selectedSymbol} />
            <MessageTypeChart stocks={stocks} selectedSymbol={selectedSymbol} />
            <OrderAcknowledgeChart stocks={stocks} selectedSymbol={selectedSymbol} />
            <AnomalyList messages={stocks} />
        </div>
    );
}

export default StockDataComponent;


