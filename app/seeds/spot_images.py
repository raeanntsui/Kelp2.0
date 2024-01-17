from ..models import db, spot, environment, SCHEMA, SpotImage
from sqlalchemy.sql import text


def seed_spot_images():
    spot_images = [
    SpotImage(spot_id=1, img_url="https://upload.wikimedia.org/wikipedia/commons/2/25/The_Krusty_Krab.png", preview=True),
    SpotImage(spot_id=2, img_url="https://static.wikia.nocookie.net/spongebob/images/a/ac/SpongeBob%27sPlace.png", preview=True),
    SpotImage(spot_id=3, img_url="https://thespongeclub.com/wp-content/uploads/2022/08/Chum-Bucket-Guide.png", preview=True),
    SpotImage(spot_id=4, img_url="https://static.wikia.nocookie.net/spongebob/images/5/53/The_Salty_Spitoon.png/revision/latest/scale-to-width-down/1000?cb=20221116190853", preview=True),
    SpotImage(spot_id=5, img_url="https://static.wikia.nocookie.net/russmarrs2-rise-of-sqeegee/images/7/7a/Weenie.png/revision/latest?cb=20190411064849", preview=True),
    SpotImage(spot_id=6, img_url="https://static.wikia.nocookie.net/spongebob/images/4/4f/Goofy_Goobers_in_SpongeBob_SquarePants.png/revision/latest/scale-to-width-down/1200?cb=20230117072521", preview=True),
    SpotImage(spot_id=7, img_url="https://static.wikia.nocookie.net/spongebob/images/9/91/License_to_Milkshake_147.png/revision/latest?cb=20190127013017", preview=True),
    SpotImage(spot_id=8, img_url="https://static.wikia.nocookie.net/spongebob/images/d/d0/Patty_Hype_146.png/revision/latest?cb=20191126041530", preview=True),
    SpotImage(spot_id=9, img_url="https://static.wikia.nocookie.net/spongebob/images/5/58/Caf%C3%A9_Poulpe.jpg/revision/latest?cb=20230803095515", preview=True),
    SpotImage(spot_id=10, img_url="https://static.wikia.nocookie.net/spongebob/images/2/2d/Rusty%27s_Rib_Eye.png/revision/latest?cb=20230405040932", preview=True),
    SpotImage(spot_id=11, img_url="https://static.wikia.nocookie.net/spongebob/images/6/6d/TheRustyAnchor.jpg/revision/latest?cb=20111022043032", preview=True),
    SpotImage(spot_id=12, img_url="https://static.wikia.nocookie.net/nickelodeon/images/7/76/MrsPuffBoatingSchoolStock.png/revision/latest/scale-to-width-down/1200?cb=20230420021224", preview=True),
    SpotImage(spot_id=13, img_url="https://static.wikia.nocookie.net/spongebob/images/c/c8/StinkyBurgers.png/revision/latest/scale-to-width-down/1200?cb=20220206210204", preview=True),
    SpotImage(spot_id=14, img_url="https://static.wikia.nocookie.net/spongebob/images/a/ad/Taco_Sombrero.png/revision/latest?cb=20160922104541", preview=True),
    SpotImage(spot_id=15, img_url="https://static.wikia.nocookie.net/spongebob/images/1/16/The_Krusty_Klam.png/revision/latest?cb=20150702030541", preview=True),
    SpotImage(spot_id=16, img_url="https://static.wikia.nocookie.net/spongebob/images/7/7a/The_Slop_Pail.png/revision/latest?cb=20191208132248", preview=True),
    SpotImage(spot_id=17, img_url="https://static.wikia.nocookie.net/spongebob/images/7/73/Friend_or_Foe_002.png/revision/latest?cb=20230302032441", preview=True),
    SpotImage(spot_id=18, img_url="https://static.wikia.nocookie.net/spongebob/images/6/6f/Bossy_Boots_122.png/revision/latest?cb=20191026024914", preview=True),
    SpotImage(spot_id=19, img_url="https://static.wikia.nocookie.net/spongebob/images/2/21/The_SpongeBob_SquarePants_Movie_631.png/revision/latest?cb=20190223044441", preview=True),
    SpotImage(spot_id=20, img_url="https://static.wikia.nocookie.net/spongebob/images/e/e0/MuscleBob_BuffPants_094.png/revision/latest/scale-to-width-down/1200?cb=20190905112848", preview=True),
    ]

    db.session.add_all(spot_images)

    db.session.commit()

def undo_spot_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spot_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spot_images"))

    db.session.commit()
