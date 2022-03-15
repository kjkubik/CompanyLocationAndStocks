-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/ZKS8Nc
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Ticker_Name" (
    "ticker" varchar   NOT NULL,
    "company_name" varchar   NOT NULL,
    CONSTRAINT "pk_Ticker_Name" PRIMARY KEY (
        "ticker"
     )
);

CREATE TABLE "Ticker_Daily_Stat" (
    "ticker" varchar   NOT NULL,
    "date" date   NOT NULL,
    "open" float   NOT NULL,
    "high" float   NOT NULL,
    "low" float   NOT NULL,
    "close" float   NOT NULL,
    "volume" float   NOT NULL,
    "volume_weight" float   NOT NULL,
    "number_of_transactions" float   NOT NULL,
    "percent_change" float   NOT NULL,
    CONSTRAINT "pk_Ticker_Daily_Stat" PRIMARY KEY (
        "ticker","date"
     )
);

CREATE TABLE "Ticker_Location" (
    "ticker" varchar   NOT NULL,
    "city" varchar   NOT NULL,
    "state" varchar   NOT NULL,
    "country" varchar   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    CONSTRAINT "pk_Ticker_Location" PRIMARY KEY (
        "ticker"
     )
);

CREATE TABLE "Company_Info" (
    "ticker" varchar   NOT NULL,
    "url" varchar   NOT NULL,
    "revenue" varchar   NOT NULL,
    "employee_count" varchar   NOT NULL,
    "sector" varchar   NOT NULL,
    CONSTRAINT "pk_Company_Info" PRIMARY KEY (
        "ticker"
     )
);

ALTER TABLE "Ticker_Daily_Stat" ADD CONSTRAINT "fk_Ticker_Daily_Stat_ticker" FOREIGN KEY("ticker")
REFERENCES "Ticker_Name" ("ticker");

ALTER TABLE "Ticker_Location" ADD CONSTRAINT "fk_Ticker_Location_ticker" FOREIGN KEY("ticker")
REFERENCES "Ticker_Name" ("ticker");

ALTER TABLE "Company_Info" ADD CONSTRAINT "fk_Company_Info_ticker" FOREIGN KEY("ticker")
REFERENCES "Ticker_Name" ("ticker");

