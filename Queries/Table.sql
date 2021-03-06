-- Creating tables for stock data
CREATE TABLE Ticker_Name (
     ticker VARCHAR NOT NULL,
     company_name VARCHAR NOT NULL,
     PRIMARY KEY (ticker)
);
SELECT*FROM Ticker_Name

CREATE TABLE Ticker_Daily_Stat (
  ticker VARCHAR NOT NULL,
  date DATE NOT NULL,
  open INT NOT NULL,
  close INT NOT NULL,
  volumn INT NOT NULL,
  high INT NOT NULL,
  low INT NOT NULL,
  percent_change INT NOT NULL,
  FOREIGN KEY (ticker) REFERENCES Ticker_Name (ticker),
  PRIMARY KEY (ticker)
);
SELECT*FROM Ticker_Daily_Stat

CREATE TABLE Ticker_Location (
  ticker VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  state VARCHAR NOT NULL,
  country VARCHAR NOT NULL,
  longitude INT NOT NULL,
  latitude INT NOT NULL,
  Foreign KEY(ticker) REFERENCES Ticker_Name(ticker),
  PRIMARY KEY (ticker)
);
SELECT*FROM Ticker_Location