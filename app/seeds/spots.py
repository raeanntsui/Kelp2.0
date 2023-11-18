from app.models import db, Spot, environment, SCHEMA
from sqlalchemy import text

def seed_spots():
    krusty_krab = Spot(
        business_name='Krusty Krab',
        address='831 Bottom Feeder Lane'
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32847,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Welcome to the world-famous Krusty Krab, an iconic eatery nestled in the heart of Bikini Bottom! Owned by the charismatic entrepreneur Mr. Krabs, this beloved establishment is not just a restaurant; it's an experience. Known for its delectable Krabby Patties and lively underwater ambiance, the Krusty Krab has become a must-visit destination for locals and tourists alike."
        price_range=1
    )
    weenie_hut_juniors = Spot(
        business_name='Weenie Hut Juniors',
        address='484 Bikini Bottom Lane'
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32847,
        categories="restaurant",
        open_hours=12,
        close_hours=21,
        description="Welcome to Weenie Hut Juniors, a quirky and charming eatery that caters to those who appreciate a cozy and laid-back dining experience. Nestled in the heart of Bikini Bottom, this beloved establishment is a haven for individuals seeking comfort food and a relaxed atmosphere."
        price_range=2
    )
    chum_bucket = Spot(
        business_name='The Chum Bucket',
        address='830 Bottom Feeder Lane'
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32847,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Welcome to The Chum Bucket, a bold and avant-garde dining establishment in the heart of Bikini Bottom. Owned by the enigmatic Plankton, The Chum Bucket offers a unique culinary experience that pushes the boundaries of traditional fast food. Step into a world where innovation meets flavor, and embark on a journey of taste unlike any other."
        price_range=1
    )

    db.session.add(krusty_krab)
    db.session.add(weenie_hut_juniors)
    db.session.add(chum_bucket)
    db.session.commit()

def undo_spots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spots"))
        
    db.session.commit()
