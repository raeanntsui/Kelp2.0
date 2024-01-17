from app.models import db, Spot, environment, SCHEMA
from sqlalchemy import text

def seed_spots():
    #1
    krusty_krab = Spot(
        business_name='Krusty Krab',
        address='831 Bottom Feeder Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32847,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Welcome to the world-famous Krusty Krab, an iconic eatery nestled in the heart of Bikini Bottom! Owned by the charismatic entrepreneur Mr. Krabs, this beloved establishment is not just a restaurant; it's an experience. Known for its delectable Krabby Patties and lively underwater ambiance, the Krusty Krab has become a must-visit destination for locals and tourists alike.",
        price_range=1,
        user_id=4
    )
    db.session.add(krusty_krab)

    #2
    weenie_hut_juniors = Spot(
        business_name='Weenie Hut Juniors',
        address='484 Bikini Bottom Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32847,
        categories="restaurant",
        open_hours=12,
        close_hours=21,
        description="Welcome to Weenie Hut Juniors, a quirky and charming eatery that caters to those who appreciate a cozy and laid-back dining experience. Nestled in the heart of Bikini Bottom, this beloved establishment is a haven for individuals seeking comfort food and a relaxed atmosphere.",
        price_range=2,
        user_id=1
    )
    db.session.add(weenie_hut_juniors)

    #3  
    chum_bucket = Spot(
        business_name='The Chum Bucket',
        address='830 Bottom Feeder Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32847,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Welcome to The Chum Bucket, a bold and avant-garde dining establishment in the heart of Bikini Bottom. Owned by the enigmatic Plankton, The Chum Bucket offers a unique culinary experience that pushes the boundaries of traditional fast food. Step into a world where innovation meets flavor, and embark on a journey of taste unlike any other.",
        price_range=1,
        user_id=5
    )
    db.session.add(chum_bucket)

    #4 The Salty Spitoon
    salty_spitoon = Spot(
        business_name='The Salty Spitoon',
        address='123 Pacific Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32847,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Welcome to The Salty Spitoon, the toughest hangout spot in all of Bikini Bottom! This legendary restaurant and bar cater exclusively to the roughest and toughest fish in the deep blue sea. Located in the gritty side of Bikini Bottom, The Salty Spitoon is not for the faint of heart – it's where the true sea warriors gather.",
        price_range=2,
        user_id=6
    )
    db.session.add(salty_spitoon)

    #5 Super Weenie Hut Junior's
    super_weenie_hut_jrs = Spot(
        business_name="Super Weenie Hut Junior's",
        address='342 Pacific Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32847,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Nestled in the heart of Bikini Bottom, Super Weenie Hut Juniors is the go-to spot for a laid-back and carefree dining experience. The interior is adorned with vibrant colors, whimsical decorations, and tables adorned with jellyfish-shaped centerpieces. It's a place that embraces the inner child in every fish.",
        price_range=1,
        user_id=7
    )
    db.session.add(super_weenie_hut_jrs)

    #6 Goofy Goober
    goofy_goober = Spot(
        business_name="Goofy Goober's Ice Cream Party Boat",
        address='143 Goofy Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32841,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Put on your goofiest hat, grab a seat, and get ready for a wacky and wonderful time at Goofy Goober. This is where every moment is a celebration of laughter, friendship, and the joy of being a true goofball!",
        price_range=2,
        user_id=7
    )
    db.session.add(goofy_goober)

    #7 MilkShake
    milkshake = Spot(
        business_name='Milk Shake',
        address='123 Pacific Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32842,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description='Welcome to Milk Shake, where every visit promises a delightful dip into the world of sweet nostalgia and frosty treats! As you approach, the restaurant stands out with its playful exterior, shaped like a giant milkshake cup painted in a delightful combination of pink, white, and blue.',
        price_range=3,
        user_id=8
    )
    db.session.add(milkshake)

    #8 Pretty Patties
    pretty_patties = Spot(
        business_name='Pretty Patties',
        address='124 Conch Street',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32845,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Welcome to the enchanting world of Pretty Patties, where flavor meets fantasy, and every bite is a burst of colorful delight! Nestled in the heart of Bikini Bottom, our charming restaurant, adorned with a violet metal stand, invites you to experience a culinary adventure like no other.",
        price_range=2,
        user_id=1
    )
    db.session.add(pretty_patties)

    #9 Café Poulpe
    cafe_pouple = Spot(
        business_name='Café Poulpe',
        address='433 Pacific Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32840,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Welcome to Café Poulpe, an exquisite culinary haven that transcends the ordinary, offering an unparalleled dining experience in the heart of sophistication. Nestled in a quaint and charming corner, our establishment is a testament to culinary excellence and refined taste. Come get your pastries here!",
        price_range=4,
        user_id=2
    )
    db.session.add(cafe_pouple)

    #10 Rusty's Ribeye
    rustys_ribeye = Spot(
        business_name="Rusty's Rib Eye",
        address='3452 Pacific Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32113,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description='Welcome to "Rustic Rib Retreat," a hidden gem nestled in the heart of simplicity, where the allure lies in the authenticity of flavors and the charm of a well-worn shack. This unassuming eatery invites you to experience the true essence of down-to-earth dining.',
        price_range=1,
        user_id=9
    )
    db.session.add(rustys_ribeye)

    #11 Rusty Anchor
    rusty_anchor = Spot(
        business_name='Rusty Anchor',
        address='2390 Waterfront Drive',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32821,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Nestled along the waterfront, Rusty Anchor is a captivating escape that beckons patrons with its weathered charm and maritime allure. As you approach, the exterior adorned with a genuine rusty anchor hints at the nautical journey awaiting within.",
        price_range=2,
        user_id=10
    )
    db.session.add(rusty_anchor)

    #12 Mrs. Puff's Driving School
    mrspuffs_driving_school = Spot(
        business_name="Mrs. Puff's Boating School",
        address='986 Boat Drive',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32337,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Ready to dive into the world of driving with confidence? Choose Mrs. Puff's Driving School, where the road to success is navigated with care, expertise, and a splash of underwater charm. Enroll today and discover the joy of driving!",
        price_range=5,
        user_id=11
    )
    db.session.add(mrspuffs_driving_school)

    #13 Stinky Burgers
    stinky_burgers = Spot(
        business_name='Stinky Burgers',
        address='165 Pacific Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=33437,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description='Stinky Burgers wears its character proudly. The metal roof, though humble, shelters a treasure trove of bold and satisfying bites. The orange rectangle sign boldly announces "Stinky" in vibrant yellow, with "Burgers" adding a touch of mystery in black.',
        price_range=2,
        user_id=12
    )
    db.session.add(stinky_burgers)

    #14 Taco Sombrero
    taco = Spot(
        business_name='Taco Sombrero',
        address='63 Pacific Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32847,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Welcome to Taco Sombrero, where every bite is a journey into the vibrant world of tacos that dance with flavor and ignite your taste buds! Nestled outside of Bikini Bottom, our taco haven promises an unforgettable experience for taco enthusiasts and culinary adventurers alike.",
        price_range=2,
        user_id=6
    )
    db.session.add(taco)

    #15 The Krusty Klam
    krusty_klam = Spot(
        business_name='Krusty Klam',
        address='123 Pacific Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=52847,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Brace yourself for a seafood extravaganza that showcases the finest catches from the ocean's depths. From succulent shrimp to flavorful fish dishes, our menu is a testament to the ocean's bounty, expertly prepared to tantalize your taste buds.",
        price_range=4,
        user_id=10
    )
    db.session.add(krusty_klam)

    #16 The Slop Pail
    slop_pail = Spot(
        business_name='The Slop Pail',
        address='1230 Pacific Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=22847,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="Experience bold flavors at The Slop Pail, a unique fast-food haven redefining culinary norms. Our menu features chum creations that defy expectations, from savory chum burgers to crispy chum fries. Embrace the unconventional with each bite in a lively atmosphere that celebrates the joy of unexpected taste adventures.",
        price_range=2,
        user_id=14
    )
    db.session.add(slop_pail)

    #17 The Poop Deck
    poopdeck = Spot(
        business_name='The Poop Deck',
        address='123 Drury Lane',
        city="Encino",
        state="California",
        zip_code=91316,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="At The Poop Deck, we blend maritime tradition with culinary innovation to create a dining experience that delights the senses. The Poop Deck invites you to savor the sea's bounty in every bite. Join us for a maritime feast that's as unforgettable as the ocean itself!",
        price_range=2,
        user_id=13
    )
    db.session.add(poopdeck)

    #18 Kuddly Krab
    kuddlykrab = Spot(
        business_name='Kuddly Krab',
        address='1223 Pacific Lane',
        city="Bikini Bottom",
        state="Pacific Ocean",
        zip_code=32447,
        categories="restaurant",
        open_hours=8,
        close_hours=21,
        description="From cuddly shakes to cozy clam chowder, the Kuddly Krab invites you to savor the warmth of comfort food served with a side of cuddles. Join us for a whimsical feast that combines the magic of SpongeBob's world with the culinary creativity that defines the Kuddly Krab!",
        price_range=2,
        user_id=4
    )
    db.session.add(kuddlykrab)

    #19 Shell City
    shellcity = Spot(
        business_name='Shell City',
        address='283 Drury Lane',
        city="Encino",
        state="California",
        zip_code=32847,
        categories="shop",
        open_hours=8,
        close_hours=21,
        description="Uncover a world of singular charm at Cyclops Treasures, where a cyclops's keen eye selects the most unique and enchanting gifts for you. From one-eyed plushies to mystical artifacts, our gift shop offers an eclectic array of treasures that captivate and delight.",
        price_range=2,
        user_id=9
    )
    db.session.add(shellcity)

    #20 Juice Bar
    juicebar = Spot(
        business_name='Juice Bar',
        address='123 Goo Lagoon Beach',
        city="Goo Lagoon",
        state="Pacific Ocean",
        zip_code=32847,
        categories="bar",
        open_hours=8,
        close_hours=21,
        description="Quench your thirst for seaside delights at the Bikini Bottom Juice Bar, an oasis of freshness nestled by the waves. Bask in the coastal vibes as you sip on our rejuvenating array of tropical smoothies, cold-pressed juices, and beach-inspired elixirs. Our vibrant menu, bursting with the flavors of sun-kissed fruits, is the perfect companion for your beach day escapade!",
        price_range=1,
        user_id=1
    )
    db.session.add(juicebar)

    db.session.commit()

def undo_spots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spots"))

    db.session.commit()
