from ..models import db, spot, environment, SCHEMA, SpotImage
from sqlalchemy.sql import text


def seed_spot_images():
    spot_images = [
    SpotImage(spot_id=1, img_url="https://upload.wikimedia.org/wikipedia/commons/2/25/The_Krusty_Krab.png", preview=True),
    SpotImage(spot_id=2, img_url="https://static.wikia.nocookie.net/spongebob/images/a/ac/SpongeBob%27sPlace.png", preview=True),
    SpotImage(spot_id=3, img_url="https://thespongeclub.com/wp-content/uploads/2022/08/Chum-Bucket-Guide.png", preview=True),
    SpotImage(spot_id=4, img_url="https://static.wikia.nocookie.net/spongebob/images/5/53/The_Salty_Spitoon.png", preview=True),
    SpotImage(spot_id=5, img_url="https://static.wikia.nocookie.net/russmarrs2-rise-of-sqeegee/images/7/7a/Weenie.png", preview=True),
    SpotImage(spot_id=6, img_url="https://static.wikia.nocookie.net/spongebob/images/4/4f/Goofy_Goobers_in_SpongeBob_SquarePants.png", preview=True),
    SpotImage(spot_id=7, img_url="https://static.wikia.nocookie.net/spongebob/images/9/91/License_to_Milkshake_147.png", preview=True),
    SpotImage(spot_id=8, img_url="https://static.wikia.nocookie.net/spongebob/images/d/d0/Patty_Hype_146.png", preview=True),
    SpotImage(spot_id=9, img_url="https://static.wikia.nocookie.net/spongebob/images/5/58/Caf%C3%A9_Poulpe.jpg", preview=True),
    SpotImage(spot_id=10, img_url="https://static.wikia.nocookie.net/spongebob/images/2/2d/Rusty%27s_Rib_Eye.png", preview=True),
    SpotImage(spot_id=11, img_url="https://static.wikia.nocookie.net/spongebob/images/6/6d/TheRustyAnchor.jpg", preview=True),
    SpotImage(spot_id=12, img_url="https://static.wikia.nocookie.net/nickelodeon/images/7/76/MrsPuffBoatingSchoolStock.png", preview=True),
    SpotImage(spot_id=13, img_url="https://static.wikia.nocookie.net/spongebob/images/c/c8/StinkyBurgers.png", preview=True),
    SpotImage(spot_id=14, img_url="https://static.wikia.nocookie.net/spongebob/images/a/ad/Taco_Sombrero.png", preview=True),
    SpotImage(spot_id=15, img_url="https://static.wikia.nocookie.net/spongebob/images/1/16/The_Krusty_Klam.png", preview=True),
    SpotImage(spot_id=16, img_url="https://static.wikia.nocookie.net/spongebob/images/7/7a/The_Slop_Pail.png", preview=True),
    SpotImage(spot_id=17, img_url="https://static.wikia.nocookie.net/spongebob/images/7/73/Friend_or_Foe_002.png", preview=True),
    SpotImage(spot_id=18, img_url="https://static.wikia.nocookie.net/spongebob/images/6/6f/Bossy_Boots_122.png", preview=True),
    SpotImage(spot_id=19, img_url="https://static.wikia.nocookie.net/spongebob/images/2/21/The_SpongeBob_SquarePants_Movie_631.png", preview=True),
    SpotImage(spot_id=20, img_url="https://static.wikia.nocookie.net/spongebob/images/e/e0/MuscleBob_BuffPants_094.png", preview=True),
    ]

    db.session.add_all(spot_images)

    db.session.commit()

def undo_spot_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spot_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spot_images"))

    db.session.commit()
