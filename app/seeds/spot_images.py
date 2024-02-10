from ..models import db, spot, environment, SCHEMA, SpotImage
from sqlalchemy.sql import text


def seed_spot_images():
    spot_images = [
    SpotImage(spot_id=1, img_url="https://upload.wikimedia.org/wikipedia/commons/2/25/The_Krusty_Krab.png", preview=True),
    SpotImage(spot_id=2, img_url="https://cdn.discordapp.com/attachments/1110721109076221993/1205648793576411247/image.png?ex=65d922f0&is=65c6adf0&hm=3fc0f3fe09ea7fd14b04f7ecf6747b74219a0b9286a6f4a784e4e87909b2cff3&", preview=True),
    SpotImage(spot_id=3, img_url="https://wallpapercave.com/wp/wp10268662.png", preview=True),
    SpotImage(spot_id=4, img_url="https://m.media-amazon.com/images/M/MV5BZWIxYzVkNTMtYTBiYi00YmY4LTkwYjQtYWZmODgxMWI2NzFhXkEyXkFqcGdeQXVyMTI4NzYxNTk4._V1_.jpg", preview=True),
    SpotImage(spot_id=5, img_url="https://i.pinimg.com/originals/28/32/20/283220287e9a8aa039232ecf9eab9cf3.jpg", preview=True),
    SpotImage(spot_id=6, img_url="https://m.media-amazon.com/images/M/MV5BZWE2OWUwYmUtYmU4MC00YTU4LTkxZTktODI4NDNkOTFlZjIwXkEyXkFqcGdeQXVyOTQ2NDA3Mjc@._V1_.jpg", preview=True),
    SpotImage(spot_id=7, img_url="https://i.imgur.com/haPpLG9.png", preview=True),
    SpotImage(spot_id=8, img_url="https://i.imgur.com/657eief.png", preview=True),
    SpotImage(spot_id=9, img_url="https://i.imgur.com/hZlnTwB.png", preview=True),
    SpotImage(spot_id=10, img_url="https://i.imgur.com/ytukh65.png", preview=True),
    SpotImage(spot_id=11, img_url="https://i.imgur.com/r9c5ZOt.png", preview=True),
    SpotImage(spot_id=12, img_url="https://i.imgur.com/CTiccho.png", preview=True),
    SpotImage(spot_id=13, img_url="https://i.imgur.com/t8Mp9eR.png", preview=True),
    SpotImage(spot_id=14, img_url="https://i.imgur.com/kBBOEzq.png", preview=True),
    SpotImage(spot_id=15, img_url="https://i.imgur.com/UMmfxEH.png", preview=True),
    SpotImage(spot_id=16, img_url="https://i.imgur.com/JGifEsN.png", preview=True),
    SpotImage(spot_id=17, img_url="https://i.imgur.com/6O6R4g7.png", preview=True),
    SpotImage(spot_id=18, img_url="https://i.imgur.com/XkVgY9R.png", preview=True),
    SpotImage(spot_id=19, img_url="https://i.imgur.com/RS3skDQ.png", preview=True),
    SpotImage(spot_id=20, img_url="https://i.imgur.com/cFgo20Z.jpeg", preview=True),
    ]

    db.session.add_all(spot_images)

    db.session.commit()

def undo_spot_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spot_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spot_images"))

    db.session.commit()
