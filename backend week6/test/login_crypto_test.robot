*** Settings ***
Library    Browser    auto_closing_level=KEEP
Library    BuiltIn
Library    CryptoLibrary    12345678    variable_decryption=False

*** Variables ***
${ENC_USERNAME}    crypt:omFa7QrWkTc+Ewi0npZCo3uVeHeErtOmC6Tc9noNuW8KCB8FkeNsHO5rKL2Ly997FKlZ6Yzu/Hw=
${ENC_PASSWORD}    crypt:Z7XFVZEZ3Etp3+zXhvxMdrQqABW5Hae1BlH+AtIPSSYMRtUnfmlU6gbumooEaJaaDXt+2I2i38k=

*** Test Cases ***
Login Test With Crypto
    New Browser    chromium    headless=False
    New Page    http://localhost:5173/login.html

    ${username}=    Get Decrypted Text    ${ENC_USERNAME}
    ${password}=    Get Decrypted Text    ${ENC_PASSWORD}

    Wait For Elements State    css=form.loginForm input[name="username"]    visible    5s
    Fill Text    css=form.loginForm input[name="username"]    ${username}

    Wait For Elements State    css=form.loginForm input[name="password"]    visible    5s
    Fill Text    css=form.loginForm input[name="password"]    ${password}

    Click    css=form.loginForm input[value="Login and get new token"]

    Sleep    3s

    ${token}=    Evaluate JavaScript    localStorage.getItem('token')
    Should Not Be Empty    ${token}