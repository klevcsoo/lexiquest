# LexiQuest

# *Szerver oldal beüzemelése*

## **Környezet létrehozása**

Hozzon létre egy virtuális környezetet a projekt könyvtárában, és telepítse a szükséges függőségeket:

bash =>

python -m venv venv

macOS esetén: source venv/bin/activate

Windows esetén: venv\Scripts\activate

pip install fastapi sqlalchemy uvicorn pymysql

## **MySQL adatbázis konfigurálása**

Telepítse a MySQL-t és a MySQL Workbench-et, majd hozzon létre egy adatbázist a MySQL Workbench segítségével, és jegyezze fel a következő adatokat:

- Adatbázis neve (pl. yourdb)
- Felhasználónév (pl. youruser)
- Jelszó (pl. yourpassword)
- Host (alapértelmezett: localhost)
- Port (alapértelmezett: 3306)

## **Alkalmazás konfigurálása**

Nyissa meg az alkalmazás konfigurációs fájlját (database.py), és módosítsa az adatbázis beállításokat az előző lépésben megadott adatokkal:

URL\_DATABASE = "mysql+pymysql://youruser:yourpassword@localhost:3306/yourdb"

## **Alkalmazás indítása**

Inditsa el a XampP-ot és futassa az Apache-t és a MySQL-t

Most már elindíthatja az alkalmazást az Uvicorn segítségével:

bash =>

uvicorn main:app --reload

## **Webböngészőben tesztelés**

Nyissa meg a webböngészőt, és látogassa meg az alkalmazást a http://localhost:8000/docs címen. Ott találja az alkalmazás FastAPI endpointjait, amelyeket használhat.
