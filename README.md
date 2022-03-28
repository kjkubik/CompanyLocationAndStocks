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

- Code used to record company stock price data: [link](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/source/Get_Stock_Price.py)
- Code used to record company online information data: [link](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/source/Get_Companies_Datas.ipynb)
- Code used to record company revenue and size data: [link](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/getting_coordinates/Size_Revenue_Extract-FINAL.ipynb)
- Code used to record company geolocation data: [link](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/getting_coordinates/coordinate_acqusition_FINAL.ipynb)

Additional information that was required was searched manually online by the team.

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
- An additional table was created to represent the city/state locations of the companies as regions within the country
- The tables created for each were then joined into a master table to hold all data
- The data was then brought into Jupyter Notebook for additional processing and analysis

### Machine Learning Model

We are considering the usage of Random Forest Models and Gradient Boosted Decision Trees.  

#### Intended Training and Testing 	

We are considering training and testing our models primarily on the following features:
- most recent stock performance history
- company geolocations
- size of company (number of employees)
- company revenue

Additional feature types have been considered experimentally to help improve the accuracy of our models.

While we have access to two years worth of data, but in order to not confuse our models with too many features we are considering only using a subset of of this data (maybe certain points in time across the most recent year).

#### Model Type - Random Forest 

[Link to Code](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/source/random_forest_v3_1C.ipynb)

Feature Selection:
- STOCK HISTORY
```
begin_date = '2022-01-01'
end_date = '2022-03-12'
day_range_of_iter = 2
```

Engineering Features:
```
n_estimators=3000, max_depth=15, min_samples_leaf=10, random_state=1 
```

#### Model Type - Gradient Boosted Decision Trees 

Attempt 1:
[Link to Code](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/source/Run_GBDT_Model-OnlyLocationConsidered.ipynb)

Attempt 2:
[Link to Code](https://github.com/kjkubik/CompanyLocationAndStocks/blob/main/source/Run_GBDT_Model-MOREFeaturesBesidesLocation.ipynb)

Feature Selection (attempt 1):
- REGION
- COUNTRY CODE
- PERCENT_CHANGE_VOLUME (calculated)
- PERCENT_CHANGE_VOLUME_WEIGHT (calculated)

Feature Selection (attempt 2):
- REGION
- COUNTRY CODE
- EMPLOYEE COUNT (added)
- REVENUE (added)
- SECTOR (added)
- PERCENT_CHANGE_VOLUME (calculated)
- PERCENT_CHANGE_VOLUME_WEIGHT (calculated)

Engineering Features (attempt 1):
```
regressor = GradientBoostingRegressor(
max_depth=10,
n_estimators=2500,
learning_rate=.001
)
regressor.fit(X_train, y_train)

best_regressor = GradientBoostingRegressor(
     max_depth=10,
     n_estimators=best_n_estimators,
     learning_rate=.01
)
```

Engineering Features (attempt 2):
```
regressor = GradientBoostingRegressor(
max_depth=16,
n_estimators=500,
learning_rate=.01,
criterion='mse', # ‘mse’, ‘mae’
)

best_regressor = GradientBoostingRegressor(
     max_depth=15,
     n_estimators=best_n_estimators,
     learning_rate=.01
)
```

#### Limitations and Benefits of Models

At this time it is difficult to determine fully what our limitations and benefits are to the models we've chosen, as we are working properly with model types for the first time.  With more time and research, we should be able to experiment with our features and learn more about what the model types can really provide for us given our chosen datasets.

Some general notes:

- Random Forest Models are great at providing accurate results because of reducing overfitting and variance, but the more trees that are added to the model the more ineffective and slow it performs for real-time predictions.
- Gradient Boosting as a whole also provides accurate results and is great at handling missing data or data that hasn't been necessarily pre-processed, but is prone to overfitting and placing emphasis outliers.

### Analysis Phase

Results of initial attempts with Random Forest Model:
```
r2 Score: 0.26188752627863454
mean absolute error: 0.5406947967061854
mean squared error: 0.9034786131604057
```

Results of initial attempts with GBDT (attempt 1):
```
r2 Score: 0.26188752627863454
mean absolute error: 0.5406947967061854
mean squared error: 0.9034786131604057
```

Results of initial attempts with GBDT (attempt 2):
```
r2_score:  0.2402913633123388
mean_absolute_error 1.7237831788579878
mean_squared_error:  6.0706505975617935
begin_date:  2022-03-01
end_date:  2022-03-03
day_range_of_iter:  2
```

We've made multiple attempts to work with the different model types we wanted to use for accurate predictions, but ultimately it became apparent that we have not been going in the right direction.  We will need to rework our models to ensure that:

1) Our models are providing results that are accurate
2) The results of our model hold meaning when it comes to answering our questions

### Dashboard

#### Proposed Blueprint

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
 
#### Proposed Tools

#### Proposed Interactive Elements
 
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

