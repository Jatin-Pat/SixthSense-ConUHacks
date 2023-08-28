class AnomalyDetector {
    constructor() {
        this.orders = Object.create(null);
    }

    addMessage(message) {
        const { messageType, symbol, orderID } = message;

        if (!this.orders[symbol]) {
            this.orders[symbol] = {};
        }

        if (!this.orders[symbol][orderID]) {
            this.orders[symbol][orderID] = { status: '', anomalies: [] };
        }

        this.checkForAnomalies(message);

        this.orders[symbol][orderID].status = messageType;
    }

    checkForAnomalies({ messageType, symbol, orderID }) {
        const order = this.orders[symbol][orderID];

        switch (messageType) {
            case 'NewOrderAcknowledged':
                if (order.status && order.status !== 'NewOrderRequest') {
                    order.anomalies.push('NewOrderAcknowledged without preceding NewOrderRequest');
                }
                break;

            case 'CancelRequest':
                if (order.status !== 'NewOrderAcknowledged') {
                    order.anomalies.push('CancelRequest without preceding NewOrderAcknowledged');
                }
                break;

            case 'CancelAcknowledged':
                if (order.status !== 'CancelRequest') {
                    order.anomalies.push('CancelAcknowledged without preceding CancelRequest');
                }
                break;

            case 'Cancelled':
                if (order.status !== 'CancelAcknowledged') {
                    order.anomalies.push('Cancelled without preceding CancelAcknowledged');
                }
                break;

            default:
                break;
        }
    }

    getAnomalies() {
        const anomalies = [];
        for (const symbol in this.orders) {
            for (const orderID in this.orders[symbol]) {
                const { anomalies: orderAnomalies } = this.orders[symbol][orderID];
                if (orderAnomalies.length > 0) {
                    anomalies.push({
                        symbol,
                        orderID,
                        anomalies: [...orderAnomalies],
                    });
                }
            }
        }
        return anomalies;
    }
}

export default AnomalyDetector;


