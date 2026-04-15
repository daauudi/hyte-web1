*** Settings ***
Library    Browser    auto_closing_level=KEEP
Library    BuiltIn
Variables    load_env.py

*** Test Cases ***
Login Test
    New Browser    chromium    headless=False
    New Page    http://localhost:5173/login.html

    Wait For Elements State    css=form.loginForm input[name="username"]    visible    5s
    Fill Text    css=form.loginForm input[name="username"]    ${LOGIN_USERNAME}

    Wait For Elements State    css=form.loginForm input[name="password"]    visible    5s
    Fill Text    css=form.loginForm input[name="password"]    ${LOGIN_PASSWORD}

    Click    css=form.loginForm input[value="Login and get new token"]

    Sleep    4s

    ${token}=    Evaluate JavaScript    localStorage.getItem('token')
    Should Not Be Empty    ${token}