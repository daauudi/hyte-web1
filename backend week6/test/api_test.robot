*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
${BASE_URL}    http://127.0.0.1:3000

*** Test Cases ***
Test API Root
    Create Session    mysession    ${BASE_URL}
    ${response}=    GET On Session    mysession    /api
    Should Be Equal As Integers    ${response.status_code}    200

Test Login API
    Create Session    mysession    ${BASE_URL}
    ${data}=    Create Dictionary    username=testuser    password=testpass
    ${response}=    POST On Session    mysession    /api/users/login    json=${data}
    Should Be Equal As Integers    ${response.status_code}    200