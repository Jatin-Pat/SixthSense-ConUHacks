import React, { useEffect, useState } from 'react';
import AnomalyDetector from './AnomalyDetector';

const AnomalyList = ({ messages }) => {
    const [anomalies, setAnomalies] = useState([]);
    const detector = new AnomalyDetector();

    useEffect(() => {
        messages.forEach((msg) => detector.addMessage(msg));
        setAnomalies(detector.getAnomalies());
    }, [messages]);

    const containerStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '85%',
        margin: 'auto',
        fontSize: '0.8em',

    };

    const titleStyle = {
        fontSize: '1.2em',
        marginBottom: '5px'
    };

    const listStyle = {
        listStyleType: 'none',
        height: '400px',
        overflowY: 'auto'
    };

    const listItemStyle = {
        border: '1px solid #eee',
        padding: '5px',
        borderRadius: '3px',
        marginBottom: '5px'
    };

    return (
        <div style={containerStyle}>
            <h3 style={titleStyle}>Anomalies Detected</h3>
            <ul style={listStyle}>
                {anomalies.map(({symbol, orderID, anomalies: issueList}, index) => (
                    <li key={index} style={listItemStyle}>
                        <strong>Symbol: {symbol}, Order ID: {orderID}</strong>
                        <ul>
                            {issueList.map((issue, idx) => (
                                <li key={idx}>{issue}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnomalyList;
