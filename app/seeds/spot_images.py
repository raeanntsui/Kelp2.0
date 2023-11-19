from ..models import db, spot, environment, SCHEMA, SpotImage
from sqlalchemy.sql import text


def seed_spot_images():
    # Spot 1
    spot_1_image = SpotImage(spotId=1, url="https://upload.wikimedia.org/wikipedia/commons/2/25/The_Krusty_Krab.png", preview=True)
    db.session.add(spot_1_image)

    # Spot 2
    spot_2_image = SpotImage(spotId=2, url="https://static.wikia.nocookie.net/spongebob/images/a/ac/SpongeBob%27sPlace.png", preview=True)
    db.session.add(spot_2_image)

    db.session.commit()

def undo_spot_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spot_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spot_images"))

    db.session.commit()
