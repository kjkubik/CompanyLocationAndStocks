from polygon import RESTClient
import pandas as pd
from numpy import record
import datetime
import time
from config import stock_key
import requests


def ts_to_datetime(ts) -> str:
    return datetime.datetime.fromtimestamp(ts / 1000.0).strftime('%Y-%m-%d')

# initialize all values for calling  get_stock_price    
from_ = (datetime.datetime.now() - datetime.timedelta(days=729)).strftime('%Y-%m-%d')
to = datetime.datetime.now().strftime('%Y-%m-%d')
time_span = "day"

def get_stock_price(client_key, ticker, time_span, from_, to):

    with RESTClient(client_key) as client:
        
        resp = client.stocks_equities_aggregates(ticker, 1, time_span, from_, to, unadjusted=False)
        print(f"{time_span} aggregates for {ticker} between {from_} and {to}.")
        print(f"Ticker,Date, Open, High, Low, Close, Volume, Volume Weight, Number of Transactions")

        for result in resp.results:
            dt = ts_to_datetime(result["t"])
   
            print(f"{ticker}, {dt},{result['o']},{result['h']},{result['l']},{result['c']},{result['v']},{result['vw']},"
                  f"{result['n']}")
    #         record = f"{ticker}, {dt},{result['o']},{result['h']},{result['l']},{result['c']},{result['v']}," \
    #                  f"{result['vw']},{result['n']}\n"
    #       output.write(record)
    # output.close()
        
def main():
    
    # Store the CSV you saved created in part one into a DataFrame.
    tickers_df = pd.read_csv("resources/InputTickers.csv")
    print(tickers_df.head())
    
    # open file once
    output = open(f"C:\\Stocks\\StockPrices.csv", "a")
    
    # write header record once
    record = f"Ticker,Date, Open, High, Low, Close, Volume, Volume Weight, Number of Transactions\n"
    output.write(record)
    
    # initialize
    record_count = 0 
    
    # iterating through all stocks to get prices and calculate differences
    for record, row in tickers_df.iterrows(): 
        
        record_count = record_count + 1
        stock = row['Ticker']
        print(f'stock: {stock}')
        print(f'from {from_}')
        print(f'to {to}')

        if record_count <= 2: 
            print(f"count less or equal to than 5: {record_count}")
            print(f"going to find ticker: {row['Ticker']} price\n")

            get_stock_price(stock_key, stock, time_span, from_, to)
            
        else: 
            record_count = 1
            print(f"Just changed count to 1 ({record_count}), waiting for a minute.")
            time.sleep(6) # Sleep for 90 seconds
            print(f"okay, going to find ticker: {row['Ticker']} price\n")

            get_stock_price(stock_key, stock, time_span, from_, to)
        
    #    output.write(record)


    # get_stock_price(stock_key, "AMD", "day", "2019-03-04", "2022-03-04")
    output.close()
    print("Data has been successfully stored in comma delimited file.")
    
    


if __name__ == '__main__':
    main()