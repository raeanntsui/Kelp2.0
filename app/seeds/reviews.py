# id = db.Column(db.Integer, primary_key=True)
#     rating = db.Column(db.Integer, nullable=False)
#     body = db.Column(db.String(2000), nullable=False)
#     created_at = db.column(db.DateTime, nullable=False, default=datetime.now())
#     updated_at = db.column(db.DateTime, nullable=False, default=datetime.now())

#     #foreign keys
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("user.id")), nullable=False)
#     spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("spot.id")), nullable=False)

from ..models import user, Review, spot, spot_image, review, db, environment, SCHEMA
from random import randint
from datetime import date
<<<<<<< HEAD
from sqlalchemy import text

=======
from sqlalchemy.sql import text
>>>>>>> main


def seed_reviews():
    review_1 = Review(
        rating = randint(1,5),
        description = "THIS PLACE IS OK1",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=1,
        spot_id=2
    )
    db.session.add(review_1)

    review_2 = Review(
        rating = randint(1,5),
        description = "THIS PLACE IS OK2",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=1,
        spot_id=3
    )
    db.session.add(review_2)

    review_3 = Review(
        rating = randint(1,5),
        description = "THIS PLACE IS OK3",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=2,
        spot_id=1
    )
    db.session.add(review_3)

    review_4 = Review(
        rating = randint(1,5),
        description = "THIS PLACE IS OK4",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=2,
        spot_id=3
    )
    db.session.add(review_4)

    review_5 = Review(
        rating = randint(1,5),
        description = "THIS PLACE IS OK5",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=3,
        spot_id=1
    )
    db.session.add(review_5)

    review_6 = Review(
        rating = randint(1,5),
        description = "THIS PLACE IS OK6",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=3,
        spot_id=2
    )
    db.session.add(review_6)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
