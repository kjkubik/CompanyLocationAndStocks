-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/ZKS8Nc
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- RUN THIS SCRIPT FIRST WHEN CREATING TABLES FOR THE FIRST TIME --
CREATE TABLE ticker_name (
    ticker varchar   NOT NULL,
    company_name varchar   NOT NULL,
    CONSTRAINT pk_ticker_name PRIMARY KEY (
        ticker
     )
);

CREATE TABLE ticker_daily_stat (
    ticker varchar   NOT NULL,
    date date   NOT NULL,
    open_val float   NOT NULL,
    high_val float   NOT NULL,
    low_val float   NOT NULL,
    close_val float   NOT NULL,
    volume float   NOT NULL,
    volume_weight float   NOT NULL,
    number_of_transactions float   NOT NULL,
    percent_change float   NOT NULL,
    CONSTRAINT pk_ticker_daily_stat PRIMARY KEY (
        ticker,date
     )
);

CREATE TABLE ticker_location (
    ticker varchar   NOT NULL,
    city_name varchar   NOT NULL,
    state_name varchar   NOT NULL,
    country varchar   NOT NULL,
    latitude float   NOT NULL,
    longitude float   NOT NULL,
    CONSTRAINT pk_ticker_location PRIMARY KEY (
        ticker
     )
);

CREATE TABLE company_info (
    ticker varchar   NOT NULL,
    url varchar   NOT NULL,
    revenue varchar   NOT NULL,
    employee_count varchar   NOT NULL,
    sector varchar   NOT NULL,
    CONSTRAINT pk_company_info PRIMARY KEY (
        ticker
     )
);

ALTER TABLE ticker_daily_stat ADD CONSTRAINT fk_ticker_daily_stat_ticker FOREIGN KEY(ticker)
REFERENCES ticker_name (ticker);

ALTER TABLE ticker_location ADD CONSTRAINT fk_ticker_location_ticker FOREIGN KEY(ticker)
REFERENCES ticker_name (ticker);

ALTER TABLE company_info ADD CONSTRAINT fk_company_info_ticker FOREIGN KEY(ticker)
REFERENCES ticker_name (ticker);


-- CREATE SCRIPTS FOR TEMP TABLES BELOW

CREATE TABLE company_data_temp AS
    (SELECT city_name,
        company_name,
        country,
        employee_count,
        latitude,
        longitude,
        revenue,
        sector,
        state_name,
        CI.ticker,
        url
    FROM company_info CI,
        ticker_location TL,
        ticker_name TN
    WHERE CI.ticker = TL.ticker AND
        TL.ticker = TN.ticker AND
        CI.ticker = TN.ticker)
;

CREATE TABLE company_all_star_temp AS
    (SELECT CD.ticker,
        date,	
        company_name,
        url,
        employee_count,
        revenue,
        sector,
        city_name,
        state_name,        
        country,
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
    FROM company_data_temp CD,
        ticker_daily_stat TDS
    WHERE CD.ticker = TDS.ticker);
	
-- SELECT QUERIES SECTION --
-- if you want to use more than one remember to add semi-colons at the end of the statements except for the final statement used
-- SELECT * FROM ticker_name
-- SELECT * FROM ticker_location
-- SELECT * FROM ticker_daily_stat
-- SELECT * FROM company_info
-- SELECT * FROM company_data_temp
-- SELECT * FROM company_all_star_temp

-- DROP SCRIPTS SECTION --
-- if you want to use more than one remember to add semi-colons at the end of the statements except for the final statement used
-- DROP TABLE company_all_star_temp CASCADE
-- DROP TABLE company_data_temp CASCADE
-- DROP TABLE company_info CASCADE
-- DROP TABLE ticker_daily_stat CASCADE
-- DROP TABLE ticker_location CASCADE
-- DROP TABLE ticker_name