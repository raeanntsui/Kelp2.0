from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_users():
    user_1 = User(
        email='spongebob@bb.io',
        username="spongebob",
        first_name="Spongebob",
        last_name="Squarepants",
        business_owner=True,
        password='password',
        )
    db.session.add(user_1)

    user_2 = User(
        email='patrick@bb.io',
        username="patrick",
        first_name="Patrick",
        last_name="Star",
        business_owner=False,
        password='password',
        )
    db.session.add(user_2)

    user_3 = User(
        email='sandy@bb.io',
        username="sandy",
        first_name="Sandy",
        last_name="Cheeks",
        business_owner=False,
        password='password',
        )
    db.session.add(user_3)

    user_4 = User(
        email='mrkrabs@bb.io',
        username="mrkrabs",
        first_name="Eugene",
        last_name="Krabs",
        business_owner=True,
        password='password',
        )
    db.session.add(user_4)

    user_5 = User(
        email='plankton@bb.io',
        username="plankton",
        first_name="Sheldon",
        last_name="Plankton",
        business_owner=True,
        password='password',
        )
    db.session.add(user_5)

    user_6 = User(
        email='sally@bb.io',
        username="sally",
        first_name="Sally",
        last_name="Spitoon",
        business_owner=True,
        password='password',
        )
    db.session.add(user_6)

    user_7 = User(
        email='squilliam@bb.io',
        username="squilliam",
        first_name="Squilliam",
        last_name="Fancyson",
        business_owner=True,
        password='password',
        )
    db.session.add(user_7)

    user_8 = User(
        email='frostymug@bb.io',
        username="captfrostymug",
        first_name="Captain",
        last_name="Frostymug",
        business_owner=True,
        password='password',
        )
    db.session.add(user_8)

    user_9 = User(
        email='rustyrickets@bb.io',
        username="rustyrickets",
        first_name="Rusty",
        last_name="Rickets",
        business_owner=True,
        password='password',
        )
    db.session.add(user_9)

    user_10 = User(
        email='bigmac@bb.io',
        username="bigmac",
        first_name="Big",
        last_name="Mac",
        business_owner=True,
        password='password',
        )
    db.session.add(user_10)

    user_11 = User(
        email='mrspuff@bb.io',
        username="mrspuff",
        first_name="Penelope",
        last_name="Puff",
        business_owner=True,
        password='password',
        )
    db.session.add(user_11)    

    user_12 = User(
        email='stinky@bb.io',
        username="stinky",
        first_name="Stinky",
        last_name="Fish",
        business_owner=True,
        password='password',
        )
    db.session.add(user_12) 


    user_13 = User(
        email='mrpirateson@bb.io',
        username="mrpirateson",
        first_name="Gregory",
        last_name="Pirateson",
        business_owner=True,
        password='password',
        )
    db.session.add(user_13) 

    user_14 = User(
        email='sal@bb.io',
        username="salfish",
        first_name="Sal",
        last_name="Fish",
        business_owner=True,
        password='password',
        )
    db.session.add(user_14) 
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
