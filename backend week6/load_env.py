from dotenv import load_dotenv
import os

load_dotenv()

LOGIN_USERNAME = os.getenv("LOGIN_USERNAME")
LOGIN_PASSWORD = os.getenv("LOGIN_PASSWORD")
BASE_URL = os.getenv("BASE_URL")