package com.Jatin.stockvisualizer.model;

public class Stock {
    private String timestampEpoch;
    private String orderID;
    private String messageType;
    private String symbol;
    private double orderPrice;
    private String exchange;

    public Stock() {}

    public Stock(String timestampEpoch, String orderID, String messageType, String symbol, double orderPrice, String exchange) {
        this.timestampEpoch = timestampEpoch;
        this.orderID = orderID;
        this.messageType = messageType;
        this.symbol = symbol;
        this.orderPrice = orderPrice;
        this.exchange = exchange;
    }

    // Getters and setters
    public String getTimestampEpoch() {
        return timestampEpoch;
    }

    public void setTimestampEpoch(String timestampEpoch) {
        this.timestampEpoch = timestampEpoch;
    }

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getMessageType() {
        return messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public double getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(double orderPrice) {
        this.orderPrice = orderPrice;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }
}