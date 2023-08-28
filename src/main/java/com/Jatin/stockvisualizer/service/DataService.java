package com.Jatin.stockvisualizer.service;

import com.Jatin.stockvisualizer.model.Stock;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.io.InputStream;

@Service
public class DataService {

    private volatile boolean isSendingComplete = false;

    public void processAndSendData(SseEmitter emitter) throws IOException {
        JsonFactory factory = new JsonFactory();
        InputStream Istream = TypeReference.class.getResourceAsStream("/TSXData.json");
        JsonParser parser = factory.createParser(Istream);

        if (parser.nextToken() != JsonToken.START_ARRAY) {
            throw new IllegalStateException("Expected an array");
        }

        while (!isSendingComplete && parser.nextToken() == JsonToken.START_OBJECT) {
            Stock stock = processSingleStock(parser);
            try {
                emitter.send(stock);
                Thread.sleep(5);
            } catch (IOException | IllegalStateException | InterruptedException e) {
                System.out.println(e);
            }
        }

        isSendingComplete = true; // Set the flag to indicate sending is complete
        emitter.complete();
    }
    private Stock processSingleStock(JsonParser parser) throws IOException {
        Stock stock = new Stock();

        while (parser.nextToken() != JsonToken.END_OBJECT) {
            String name = parser.getCurrentName();
            parser.nextToken();

            switch (name) {
                case "TimeStampEpoch":
                    stock.setTimestampEpoch(parser.getText());
                    break;
                case "OrderID":
                    stock.setOrderID(parser.getText());
                    break;
                case "MessageType":
                    stock.setMessageType(parser.getText());
                    break;
                case "OrderPrice":
                    stock.setOrderPrice(parser.getDoubleValue());
                    break;
                case "Exchange":
                    stock.setExchange(parser.getText());
                    break;
                case "Symbol":
                    stock.setSymbol(parser.getText());
                    break;
            }
        }
        return stock;
    }
} 