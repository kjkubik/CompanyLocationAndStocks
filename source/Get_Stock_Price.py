from polygon import RESTClient
import pandas as pd
from numpy import record
import datetime
import time
from config import stock_key

def ts_to_datetime(ts) -> str:
    return datetime.datetime.fromtimestamp(ts / 1000.0).strftime('%Y-%m-%d')

from_ = (datetime.datetime.now() - datetime.timedelta(days=729)).strftime('%Y-%m-%d')
to = datetime.datetime.now().strftime('%Y-%m-%d')
time_span = "day"

# get stock prices
def get_stock_price(output, client_key, ticker, time_span, from_, to):

    with RESTClient(client_key) as client:
        
        resp = client.stocks_equities_aggregates(ticker, 1, time_span, from_, to, unadjusted=False)
        
        for result in resp.results:
            dt = ts_to_datetime(result["t"])
   
            # print(f"{ticker}, {dt},{result['o']},{result['h']},{result['l']},{result['c']},{result['v']},{result['vw']},"
            #       f"{result['n']}")
            record = f"{ticker}, {dt}, {result['o']}, {result['h']}, {result['l']}, {result['c']}, {result['v']}," \
                     f"{result['vw']}, {result['n']}\n"
            output.write(record)
        
def main():
    
    # Store the CSV you saved created in part one into a DataFrame.
    tickers_df = pd.read_csv("resources/InputTickers.csv")
    #print(tickers_df.head())
    
    # open file once
    output = open(f"resources/StockPrices.csv", "w")
    
    # write header record once
    record = f"Ticker,Date, Open, High, Low, Close, Volume, Volume Weight, Number of Transactions\n"
    output.write(record)
    
    # initialize
    record_count = 0 
    
    # iterating through all stocks to get prices and calculate differences
    for record, row in tickers_df.iterrows(): 
        
        record_count = record_count + 1
        stock = row['Ticker']
        
        if record_count <= 5: 
            print(f"count less or equal to than 5: {record_count}")
            print(f"going to find ticker: {row['Ticker']} price\n")

            get_stock_price(output, stock_key, stock, time_span, from_, to)
            
        else: 
            record_count = 1
            print(f"Just changed count to 1 ({record_count}), waiting for a minute.")
            time.sleep(62) # Sleep for 62 seconds
            print(f"okay, going to find ticker: {row['Ticker']} price\n")

            get_stock_price(output, stock_key, stock, time_span, from_, to)

    # get_stock_price(stock_key, "AMD", "day", "2019-03-04", "2022-03-04")
    output.close()
    print("Get_Stock_Price has completed.")

# MAIN
if __name__ == '__main__':
    main()