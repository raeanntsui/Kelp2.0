from ..models import db, spot, environment, SCHEMA, SpotImage
from sqlalchemy.sql import text


def seed_spot_images():
    spot_images = [
    SpotImage(spot_id=1, img_url="https://upload.wikimedia.org/wikipedia/commons/2/25/The_Krusty_Krab.png", preview=True),
    SpotImage(spot_id=2, img_url="https://static.wikia.nocookie.net/spongebob/images/a/ac/SpongeBob%27sPlace.png", preview=True),
    SpotImage(spot_id=3, img_url="https://thespongeclub.com/wp-content/uploads/2022/08/Chum-Bucket-Guide.png", preview=True),


    ]

    db.session.add_all(spot_images)

    db.session.commit()

def undo_spot_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spot_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spot_images"))

    db.session.commit()
