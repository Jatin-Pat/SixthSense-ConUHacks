import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Legend, Cell } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import Dropdown from 'react-bootstrap/Dropdown';
import { schemeCategory10 } from 'd3-scale-chromatic';
import AnomalyDetector from './AnomalyDetector';
import '../styles/OrderAcknowledgeChart.css';

const colorScale = scaleOrdinal(schemeCategory10);

const OrderAcknowledgeChart = ({ stocks, selectedSymbol }) => {
    const [scatterData, setScatterData] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [anomalies, setAnomalies] = useState([]);
    const anomalyDetector = new AnomalyDetector();

    useEffect(() => {
        const filteredStocks = stocks.filter(({ messageType, symbol }) =>
            messageType === 'NewOrderAcknowledged' &&
            (!selectedSymbol || symbol === selectedSymbol)
        );

        filteredStocks.forEach(stock => {
            anomalyDetector.addMessage(stock);
        });

        const uniqueSymbols = [...new Set(filteredStocks.map(stock => stock.symbol))];

        const symbolColorMap = {};
        uniqueSymbols.forEach(symbol => {
            symbolColorMap[symbol] = colorScale(symbol);
        });

        const orderAckData = filteredStocks.map(stock => ({
            time: new Date(parseInt(stock.timestampEpoch) / 1000000),
            price: stock.orderPrice,
            symbol: stock.symbol,
            color: symbolColorMap[stock.symbol],
        }));

        const detectedAnomalies = anomalyDetector.getAnomalies();
        setAnomalies(detectedAnomalies);
        setScatterData(orderAckData);
    }, [stocks, selectedSymbol]);

    const increment = 5000; // 5 seconds in milliseconds

    const timeOptions = [];
    if (scatterData.length > 0) {
        const firstTimestamp = scatterData[0].time.getTime();
        const lastTimestamp = scatterData[scatterData.length - 1].time.getTime();

        for (let timestamp = firstTimestamp; timestamp <= lastTimestamp; timestamp += increment) {
            timeOptions.push(new Date(timestamp));
        }
    }

    const filteredScatterData = selectedTime
        ? scatterData.filter(entry =>
            entry.time >= selectedTime && entry.time < new Date(selectedTime.getTime() + increment)
        )
        : [];

    return (
        <div>
            <h3>Price Over Time (New Order Acknowledged Messages)</h3>
            <div className="custom-dropdown-container">
                <span className="dropdown-label">Select Time:</span>
                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="time-dropdown">
                        {selectedTime ? selectedTime.toISOString() : 'Select Time'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="custom-dropdown-menu">
                        <Dropdown.Item onClick={() => setSelectedTime(null)}>
                            Clear Selection
                        </Dropdown.Item>
                        {timeOptions.map((time, index) => (
                            <Dropdown.Item
                                key={index}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time.toISOString()}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <ScatterChart
                width={800}
                height={400}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <CartesianGrid />
                <XAxis dataKey="time" name="Time" tick={{ fontSize: 15 }} />
                <YAxis dataKey="price" name="Price" tick={{ fontSize: 15 }} />
                <Legend />
                <Scatter name="Price over time" data={filteredScatterData}>
                    {filteredScatterData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Scatter>
            </ScatterChart>

            <div>
                <h3>Anomalies</h3>
                <ul>
                    {anomalies.map((anomaly, index) => (
                        <li key={index}>
                            {`Symbol: ${anomaly.symbol}, OrderID: ${anomaly.orderID}, Anomalies: ${anomaly.anomalies.join(', ')}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrderAcknowledgeChart;









