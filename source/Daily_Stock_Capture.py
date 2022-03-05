import datetime
from numpy import record

from polygon import RESTClient

from config import stock_key

def ts_to_datetime(ts) -> str:
    return datetime.datetime.fromtimestamp(ts / 1000.0).strftime('%Y-%m-%d %H:%M')


def get_stock_price(client_key, ticker, time_span, from_, to):

    # open file once
    f = open(f"C:\\Stocks\\{ticker}{time_span}.csv", "a")
    record = f"Ticker,Date, Open, High, Low, Close, Volume, Volume Weight, Number of Transactions\n"
    f.write(record)

    with RESTClient(client_key) as client:

        resp = client.stocks_equities_aggregates(ticker, 1, time_span, from_, to, unadjusted=False)
        print(f"{time_span} aggregates for {ticker} between {from_} and {to}.")
        print(f"Ticker,Date, Open, High, Low, Close, Volume, Volume Weight, Number of Transactions")

        for result in resp.results:
            dt = ts_to_datetime(result["t"])
            print(f"{ticker}, {dt},{result['o']},{result['h']},{result['l']},{result['c']},{result['v']},{result['vw']},"
                  f"{result['n']}")
            record = f"{ticker}, {dt},{result['o']},{result['h']},{result['l']},{result['c']},{result['v']}," \
                     f"{result['vw']},{result['n']}\n"
            f.write(record)
        f.close()


def main():
    # displaying stock prices

    get_stock_price(stock_key, "AMD", "day", "2019-01-01", "2021-05-30")

    print("Data has been successfully stored in comma delimited file.")


if __name__ == '__main__':
    main()
    
    
    
    1) open stockfile  # all 100 stock names
    
    for records in stockfile:
        read record
        get_stock_price(stock = AMD) #now we have our stocks
        
    