import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MessageTypeChart = ({ stocks, selectedSymbol }) => {
    const [messageTypeData, setMessageTypeData] = useState([]);

    useEffect(() => {
        const typeCounts = {};

        const filteredStocks = selectedSymbol === null ? stocks : stocks.filter(stock => stock.symbol === selectedSymbol);

        for (const stock of filteredStocks) {
            if (typeCounts[stock.messageType]) {
                typeCounts[stock.messageType] += 1;
            } else {
                typeCounts[stock.messageType] = 1;
            }
        }

        const formattedData = Object.keys(typeCounts).map((key) => ({ messageType: key, count: typeCounts[key] }));
        setMessageTypeData(formattedData);
    }, [stocks, selectedSymbol]);

    return (
        <div>
            <h3>Message Type Frequency</h3>
            <BarChart
                width={800}
                height={400}
                data={messageTypeData}
                margin={{
                    top: 20, right: 50, left: 50, bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="messageType" angle={-45} textAnchor="end" height={70} tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
        </div>
    );
};

export default MessageTypeChart;


