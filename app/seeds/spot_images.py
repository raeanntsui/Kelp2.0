from ..models import db, spot_image, spot, environment, SCHEMA
from sqlalchemy.sql import text


def seed_spot_images():
    # Spot 1
    spot_1_image = spot_image(url="https://upload.wikimedia.org/wikipedia/commons/2/25/The_Krusty_Krab.png", preview=True)
    spot_1 = spot.query.get(1)
    spot_1.spot_image.append(spot_1_image)
    db.session.add(spot_1_image)

    # Spot 2
    spot_2_image = spot_image(url="https://static.wikia.nocookie.net/spongebob/images/a/ac/SpongeBob%27sPlace.png", preview=False)
    spot_2 = spot.query.get(2)
    spot_2.spot_image.append(spot_2_image)
    db.session.add(spot_2_image)


    db.session.commit()

def undo_spot_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spot_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spot_images"))
        
    db.session.commit()