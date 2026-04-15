*** Settings ***
Documentation     Tehtävä 3 - ympäristömuuttujat
Variables         load_env.py

*** Test Cases ***
Näytä ympäristömuuttujat
    Log    API Key: ${API_KEY}
    Log    Base URL: ${BASE_URL}