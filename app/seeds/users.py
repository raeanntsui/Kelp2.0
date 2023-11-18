# business_owner = db.Column(db.Boolean, nullable=False)
#     first_name = db.Column(db.String, nullable=False)
#     last_name = db.Column(db.String, nullable=False)
#     # username = db.Column(db.String(40), nullable=False, unique=True)
#     email = db.Column(db.String(255), nullable=False, unique=True)
#     hashed_password = db.Column(db.String(255), nullable=False)


from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    user_1 = User(
        email='spongebob@bb.io',
        password='password',
        first_name = "Sponge",
        last_name = "Bob",
        business_owner = "False"
        )
    db.session.add(user_1)

    user_2 = User(
        email='patrick@bb.io',
        password='password',
        first_name = "Patrick",
        last_name = "Star",
        business_owner = "False"
        )
    db.session.add(user_2)

    user_3 = User(
        email='sandy@bb.io',
        password='password',
        first_name = "Sandy",
        last_name = "Cheek",
        business_owner = "False"
        )
    db.session.add(user_3)

    user_4 = User(
        email='mrkrabs@bb.io',
        password='password',
        first_name = "Eugene",
        last_name = "Krabs",
        business_owner = "True"
        )
    db.session.add(user_4)

    user_5 = User(
        email='plankton@bb.io',
        password='password',
        first_name = "Sheldon",
        last_name = "Plankton",
        business_owner = "True"
        )
    db.session.add(user_5)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
