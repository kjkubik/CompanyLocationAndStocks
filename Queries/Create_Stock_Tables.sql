-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/ZKS8Nc

CREATE TABLE ticker_name (
    ticker                  varchar   NOT NULL,
    company_name            varchar   NOT NULL,
    PRIMARY KEY (ticker))
;

CREATE TABLE ticker_daily_stat (
    ticker                  varchar   NOT NULL,
    date_val                date   NOT NULL,
    open_val                float   NOT NULL,
    high_val                float   NOT NULL,
    low_val                 float   NOT NULL,
    close_val               float   NOT NULL,
    volume                  float   NOT NULL,
    volume_weight           float   NOT NULL,
    number_of_transactions  float   NOT NULL,
    percent_change          float   NOT NULL,
    PRIMARY KEY (ticker, date_val),
    FOREIGN KEY (ticker) REFERENCES ticker_name(ticker))
;

CREATE TABLE ticker_location (
    ticker                  varchar   NOT NULL,
    city_name               varchar   NOT NULL,
    state_name              varchar   NOT NULL,
    country_code            varchar   NOT NULL,
    latitude                float   NOT NULL,
    longitude               float   NOT NULL,
    PRIMARY KEY (ticker),
    FOREIGN KEY (ticker) REFERENCES ticker_name(ticker))
;

CREATE TABLE company_info (
    ticker                  varchar   NOT NULL,
    company_url             varchar   NOT NULL,
    revenue                 varchar   NOT NULL,
    employee_count          varchar   NOT NULL,
    sector                  varchar   NOT NULL,
    PRIMARY KEY (ticker),
    FOREIGN KEY (ticker) REFERENCES ticker_name(ticker))
;

-- SQL used to combine stock tables for ML:
CREATE VIEW view_company_all_star AS 
(SELECT CI.ticker,
        date_val,	
        company_name,
        company_url,
        employee_count,
        revenue,
        sector,
        city_name,
        state_name,        
        country_code,
        latitude,
        longitude,
        open_val,
        high_val,
        low_val,
        close_val,
        volume,
        volume_weight,
        number_of_transactions,
        percent_change
    FROM company_info CI,
         ticker_location TL,
         ticker_name TN, 
         ticker_daily_stat TDS
    WHERE CI.ticker = TL.ticker AND
          TL.ticker = TN.ticker AND
          CI.ticker = TN.ticker AND
          TL.ticker = TDS.ticker
          )
;

-- CREATE TABLE begin_stock_price AS (
-- select date_val, ticker, volume_weight, volume
-- 	from ticker_daily_stat 
-- where date_val = '2022-02-01' 
-- );

-- CREATE TABLE end_stock_price AS (
-- select date_val, ticker, volume_weight, volume
-- 	from ticker_daily_stat 
-- where date_val = '2022-02-15'
-- );

-- select * from begin_stock_price;
-- select * from end_stock_price;

-- CREATE TABLE end_stock_price AS (
-- select
-- 	CI.ticker,
--     date_val,	
	
-- 	revenue,
--     sector,
--     city_name,
--     state_name,        
--     country_code,
-- 	a.ticker, 
-- 	a.volume_weight, 
-- 	b.volume_weight, 
-- 	a.volume_weight/b.volume_weight, --VWA
-- 	a.volume/b.volume --VA
-- from begin_stock_price a,
--      end_stock_price b, 
	
-- )