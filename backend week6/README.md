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


## Tehtävä 4 raportit ja lokitiedostot

### Mitä tehtiin
- Tehtiin testi uuden päiväkirjamerkinnän lisäämisestä
- Täytettiin lomake ja tallennettiin merkintä

### Kommentit
- Testattiin että merkintä voidaan lisätä



## Tehtävä 5 Kirjautumistesti .env-tiedostolla

### Mitä tehtiin
- Tehtiin kirjautumistesti omalle sovellukselle
- Käyttäjänimi ja salasana luettiin `.env`-tiedostosta
- Testissä kirjauduttiin sisään login-lomakkeella

### Komento
-robot -d outputs login_test.robot

### Kommentit
- Tunnukset luettiin `.env` tiedostosta
- Kirjautuminen onnistui
- Token tallentui localStorageen




## Tehtävä 6 kirjautumistesti cryptolibrary

### Toteutus

-Käyttäjänimi ja salasana salattiin komentorivillä käyttäen `python -m CryptoLibrary` -työkalua.  

-Salatut arvot tallennettiin testiin `crypt:`-muodossa.

## Testaus 

- Testi ajettiin komennolla:
robot -d outputs test/login_crypto_test.robot

### Kommentit

-Aluksi CryptoLibraryn käyttö oli epäselvää, koska se ei toimi samalla tavalla kuin tavallinen encrypt/decrypt yhdellä avaimella.  

-Lopulta ratkaisu löytyi käyttämällä kirjaston omaa komentorivityökalua ja `crypt:`-arvoja.

-Testi toimii oikein ja kirjautuminen onnistuu salatuilla tiedoilla.

### Tehtävä 7 raportit ja lokit 

### Toteutus

-Testi ajettiin komennolla:


robot -d outputs test/login_crypto_test.robot

### Tulokset

Ajon jälkeen outputs-kansioon tuli:

- log.html  
- report.html  
- output.xml  

### Kommentit

Raportit avautuvat selaimessa ja niistä näkee helposti testin tulokset.

