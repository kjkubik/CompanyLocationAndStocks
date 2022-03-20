# CompanyLocationAndStocks

## Overview

### Purpose

#### Topic

We are investing the impacts geographic locations of companies on their stock performances.  

#### Reasoning

There are multiple pockets in the country that are at risk for becoming modern-day ghost towns based on decreases in economic activities.  These cities can benefit from diversifying the types of work available by introducing new businesses from other sectors that are already visibly successful, especially using stock performance as a metric.  As a result of introducing these new businesses, communities will seek to invest in them and boost local economies long-term as opposed to shifting focus to other cities or only setting up short-term plans.  If it isn't necessary for a company to be located in the same general area as other companies that operate similarly, local communites can benefit greatly.

#### Questions to Answer

1) When investigating the performance of companies by their stocks, do geographical locations have a significant impact in comparison to other factors such as the size of the company or revenue?
2) Is it necessary to move the locations of headquarters to cities that have high concentrations of other company headquarters within the same sectors in order to improve stock performance?
3) Is how company crowds buy and sell stocks measurable by geographical location? 
4) Does the geographical location of the home office matter?

## Resources

### Data Sources
What are our data sources?  Where did we get our info from?

What are we using for each portion of the project?
1. Polygon.io - where all stock prices were retrieved for two years
2. RapidAPI.com - The API used to get all companies data was - "companies-datas"
3. finance.yahoo.com - Some sectors found
4. Geopy - python library used to get Long. and Lat., as well as locations

### Technologies
What are we using for each portion of the project?
- Data Collection
  - OpenStreetMap
  - .csv files
  - Polygon
  - GeoPy
  - JSON
  - SQL
- Data Processing
  - Python
  - pandas
  - SQLAlchemy
  - Jupyter Notebook
  - postgreSQL
- Analysis
  - NumPy
  - TensorFlow
  - SKLearn
- Presentation
  - matplotlib
  - Google Slides
  - JavaScript
  - HTML
  - CSS

## Proposed Structures

### Data Input Tables

![ERD_proposed.JPG](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/images/ERD_proposed.JPG)

### Flowchart of Project

![proposed_flowchart_v1.png](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/images/proposed_flowchart_v1.png)

### Machine Learning Model

#### Model Types

We are considering the usage of Random Forest Models and Gradient Boosted Decision Trees.  

#### Training and Testing

We are considering training and testing our models on the following features:
- company geolocations
- size of company (number of employees)
- company revenue

We have access to two years worth of data, but in order to not confuse our models with too many features we are considering only using a subset of of this data (maybe certain points in time across the most recent year).

## Team Information

### Members
- Alexis Crooks
- Kim Kubik
- Armando Latigo
- Nikita Mathur
- Sarah Wiggins

### Communication Protocols
- Slack
- Zoom
- Slack conversations multiple times a week
- Zoom calls, both during class/office hours and outside of class 
- reviews and comments left on GitHub pull requests

