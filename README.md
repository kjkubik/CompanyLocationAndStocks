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

1. Polygon.io - where all stock prices were retrieved for two years
2. RapidAPI.com - The API used to get all companies data was - "companies-datas"
3. finance.yahoo.com - Some sectors found
4. Geopy - python library used to get Long. and Lat., as well as locations

### Technologies

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
  - Tableau

## Proposed Structures

### Data Input Tables

![ERD_proposed_Deliverable_2.png](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/images/ERD_proposed_Deliverable_2.png)

### Flowchart of Project

![proposed_flowchart_v1.png](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/images/proposed_flowchart_v1.png)

### Data Exploration and Analysis

#### Data Exploration

- We collected two years worth of history regarding the top 100 performing stocks in the US Market, ending in March of 2022
- We collected geolocation data of all of the headquarters of each company 
- We collected specific information regarding each of the company regarding their revenues and sizes (number of employees)

#### Description of Preprocessing

- Each individual data set was saved into a CSV file 
- Cleanup was done on each data set to confirm there were no missing values
- The datasets were then imported into Postgres 
- An additional table was created to represent the city/state locaitons of the companies as regions within the country
- The tables created for each were then joined into a master table to hold all data
- The data was then brought into Jupyter Notebook for additional processing and analysis

#### Analysis Phase

#### Preliminary Feature Engineering and Feature Selection

### Machine Learning Model

#### Model Types

We are considering the usage of Random Forest Models and Gradient Boosted Decision Trees.  

#### Training and Testing

We are considering training and testing our models on the following features:
- most recent stock performance history
- company geolocations
- size of company (number of employees)
- company revenue

We have access to two years worth of data, but in order to not confuse our models with too many features we are considering only using a subset of of this data (maybe certain points in time across the most recent year).

ADD DESCRIPTION OF HOW DATA WAS SPLIT INTO TRAINING AND TESTING SETS

#### Limitations and Benefits of Model

### Proposed Dashboard

We are proposing the following blueprint for our presentation:
1) overview of our project
 - what we chose for our topic
 - why we chose it
 - what we hoped to learn from it
2) how did we go through our process
3) explain the model we used and why we said this worked as opposed to other model choices
4) show the results of the model that we used
5) closing thoughts
 - what we learned about what impacts stock performance and what doesn't
 - some graphs showing our analysis to play with 
 
[Link to Dashboard](https://public.tableau.com/app/profile/sarah.wiggins/viz/FinalProjectVisuals_16483188121560/Sheet5?publish=yes)

## Team Information

### Members
- Alexis Crooks
- Kim Kubik
- Armando Latigo
- Nikita Mathur
- Sarah Wiggins

### Communication Protocols
- Slack conversations multiple times a week
- Zoom calls, both during class/office hours and outside of class 
- reviews and comments left on GitHub pull requests

