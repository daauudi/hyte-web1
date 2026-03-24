#  Tehtävä 1 Robot Framework 

###  Ympäristön asennus

 -Luotiin Python virtuaaliympäristö (.venv)

 -Asennettiin tarvittavat kirjastot:Robot Framework,Browser,requests, CryptoLibrary

###  Asennustesti

-Suoritettiin asennustesti (asennustesti.py)

Testi suoritettiin komennolla: python tests/asennustesti.py

-Varmistettiin, että kaikki kirjastot toimivat oikein

## Kommentit

 -Alussa moduuleja ei löytynyt, koska virtuaaliympäristö puuttui

 -Ongelma ratkaistiin luomalla .venv ja asentamalla paketit pipillä

 -Ymmärsin paremmin miten python-ympäristöt toimii


## Tehtävä 2 GUI-testaus

### Mitä tehtiin
- Käytettiin Robot Frameworkia ja Browser-kirjastoa
- Luotiin testejä selaimen kautta (GUI-testaus)
- Avattiin sivu ja tehtiin toimintoja (esim. navigointi, klikkaus)

Testit ajettiin komennolla: robot_browserdemo.robot


Testin jälkeen syntyi raportit:
- log.html
- report.html

GUI-testaus onnistui ja testit myös (PASS).


### Kommentit

- Testien tekeminen oli helppoa valmiilla keywordeilla





## Tehtävä 3  Tietojen salaus ja piilottaminen

### Mitä tehtiin
- Luotiin `.env`-tiedosto
- Lisättiin muuttujat (API_KEY, BASE_URL)
- Käytettiin `python-dotenv` kirjastoa
- Luotiin `load_env.py`, joka lukee muuttujat
- Käytettiin muuttujia Robot Frameworkissa

### Testaus
Testi ajettiin komennolla: robot moodle.robot

Testi onnistui (PASS).

### Kommentit
- Aluksi `.env` ei toiminut oikein
- Ongelma ratkesi käyttämällä `load_env.py`
- Muuttujat saatiin toimimaan Robot Frameworkissa