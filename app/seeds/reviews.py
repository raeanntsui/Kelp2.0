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
from sqlalchemy.sql import text


def seed_reviews():
    ## sandy reviews weenie hut juniors
    review_1 = Review(
        rating = 4,
        description = "Yeehaw! Tried Weenie Hut Junior's for a change. Cozy spot, friendly staff, and decent weenies. But for a Texan like me, portions were a tad small. Might stick to homemade meals next time.",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=3, 
        spot_id=2
    )
    db.session.add(review_1)

    patrick_chumbkt = Review(
        rating = 4,
        description = "Visited the Chum Bucket. Food looked strange, tasted even stranger. Plankton seems nice, but his food is... different. Wouldn't go back unless I'm really hungry.",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=2,
        spot_id=3
    )
    db.session.add(patrick_chumbkt)

    patrick_kk = Review(
        rating = 5,
        description = "Krusty Krab! Home of the Krabby Patty! Went there for a bite, and boy, was it good! SpongeBob makes the best Krabby Patties in Bikini Bottom. Ate until I couldn't move.",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=2,
        spot_id=1
    )
    db.session.add(patrick_kk)

    patrick_whj = Review(
        rating = 4,
        description = "Tried Weenie Hut Junior's. They have lots of weenies, but they're so small! I ended up eating a bunch, but I was still hungry. Maybe it's better for small appetites.",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=2,
        spot_id=2
    )
    db.session.add(patrick_whj)

    patrick_salty_spitoon = Review(
        rating = 2,
        description = "Tried to get into the Salty Spitoon. They said I wasn't tough enough! Can you believe it? I even told them my name was 'Danger'! Oh well, maybe I'll try again after a nap.",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=2,
        spot_id=4
    )
    db.session.add(patrick_salty_spitoon)

    spongebob_chumbkt = Review(
        rating = 3,
        description = "Visited the Chum Bucket out of curiosity. Plankton's creations are... unique. While the food wasn't quite up to Krabby Patty standards, I appreciate Plankton's passion. It's worth a try if you're feeling adventurous!",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=1,
        spot_id=3
    )
    db.session.add(spongebob_chumbkt)

    spongebob_kk = Review(
        rating = 5,
        description = "Ahoy there! The Krusty Krab is my home away from home! The Krabby Patty is a true masterpiece, and Mr. Krabs and Squidward make every visit a blast. From the delicious food to the fun atmosphere, the Krusty Krab never disappoints!",
        created_at = date.today(),
        updated_at = date.today(),
        user_id=1,
        spot_id=1
    )
    db.session.add(spongebob_kk)

    spongebob_spitoon = Review(
    rating = 3,
    description = "I got into the Salty Spitoon after they watched me eat a bowl of nails with no milk! But I'll still stick to jellyfishing at Jellyfish Fields. The drinks were bitter.",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=1,
    spot_id=4
    )
    db.session.add(spongebob_spitoon)

    krabs_chumbkt = Review(
    rating = 1,
    description = "The Chum Bucket... bah! Went there once out of curiosity, but I'll never go back. Plankton's food is nothing but a sorry excuse for cuisine. Tasteless, bland, and downright awful. Stick to the Krusty Krab if you want a real meal! Arg arg arg!",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=4,
    spot_id=3
    )
    db.session.add(krabs_chumbkt)


    krabs_whj = Review(
    rating = 3,
    description = "Weenie Hut Junior's? Ha! That place is for weenies! I wouldn't be caught dead eating there. The portions are small, the prices are too high, and the atmosphere is just plain silly. You won't find me wasting me hard-earned money on weenies when I can have a real meal at the Krusty Krab!",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=4,
    spot_id=2
    )
    db.session.add(krabs_whj)


    sandy_kk = Review(
    rating = 5,
    description = "Y'all, let me tell ya about the Krusty Krab! It's a real gem in Bikini Bottom. The Krabby Patty is a culinary delight, bursting with flavor. The service is top-notch, and the atmosphere is lively. Whether you're a local or just passing through, the Krusty Krab is a must-visit for a delicious meal!",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=3,
    spot_id=1
    )
    db.session.add(sandy_kk)


    sandy_weenie = Review(
    rating = 4,
    description = "Tried out Weenie Hut Junior's for a change of pace. While the weenies were small, they were surprisingly tasty. The atmosphere was fun and laid-back, perfect for a casual meal with friends. Overall, it's a decent spot for a quick bite, but it ain't nothin' like a Texan meal.",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=3,
    spot_id=2
    )
    db.session.add(sandy_weenie)


    plankton_krusty_krab = Review(
    rating = 1,
    description = "The Krusty Krab may be popular, but it can't compete with the superior cuisine of the Chum Bucket!",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=5,
    spot_id=1
    )
    db.session.add(plankton_krusty_krab)


    plankton_whj = Review(
    rating = 1,
    description = "Weenie Hut Junior's, what a joke! The food is subpar, the portions are laughable, and the atmosphere is utterly ridiculous. It's no wonder why my Chum Bucket remains superior in every way. Weenie Hut Junior's is a waste of time for anyone with discerning taste.",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=5,
    spot_id=2
    )
    db.session.add(plankton_whj)


    plankton_spitoon = Review(
    rating = 4,
    description = "The Salty Spitoon... now that's more like it! A rough and tough establishment for the true hard cases of Bikini Bottom. I attempted to gain entry, but alas, they deemed me unworthy. Nevertheless, the Salty Spitoon exudes an air of intimidation that commands respect. A place for the real tough customers.",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=5,
    spot_id=4
    )
    db.session.add(plankton_spitoon)


    squilliam_chumbkt = Review(
    rating = 1,
    description = "The Chum Bucket? Plankton's establishment lacks the refinement and sophistication one expects from fine dining. The ambiance is dreary, the service is subpar, and the cuisine leaves much to be desired. I'm afraid I simply cannot recommend it to anyone with discerning taste.",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=7,
    spot_id=3
    )
    db.session.add(squilliam_chumbkt)


    squilliam_krustykrab = Review(
    rating = 5,
    description = "The Krusty Krab, on the other hand, is a shining beacon of excellence in the culinary world. From the moment you step inside, you are greeted with the delightful aroma of sizzling Krabby Patties and the warm hospitality of Mr. Krabs and his diligent staff. And despite Squidward's best efforts to dampen the mood with his usual lackadaisical demeanor, even he can't deny the undeniable allure of the Krusty Krab's charm. The food is exceptional, the atmosphere is lively, and the service is impeccable. It is truly a pleasure to dine at such an esteemed establishment.",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=7,
    spot_id=1
    )
    db.session.add(squilliam_krustykrab)


    squilliam_whj = Review(
    rating = 5,
    description = "Weenie Hut Junior's... oh, heavens, what a quaint little establishment. While it may lack the sophistication of finer dining establishments, it does have its own charm. The weenies are modest in size but surprisingly flavorful, and the casual atmosphere lends itself well to a laid-back dining experience. It's not for everyone, but for those seeking a simple and unpretentious meal, it's worth a visit.",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=7,
    spot_id=2
    )
    db.session.add(squilliam_whj)


    mrspuff_chumbkt = Review(
    rating = 2,
    description = "Plankton's creations are certainly unique, but I found the atmosphere to be rather gloomy and the food to be less than appetizing. I'm not sure how this establishment is still in business",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=11,
    spot_id=3
    )
    db.session.add(mrspuff_chumbkt)


    mrspuff_krustykrab = Review(
    rating = 4,
    description = "Mr. Krabs and his staff are always welcoming, and the Krabby Patties are simply to die for. It's no wonder why it's such a popular spot in Bikini Bottom!",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=11,
    spot_id=1
    )
    db.session.add(mrspuff_krustykrab)

    bubblebass = Review(
    rating = 2,
    description = "MY PICKLES!!!!",
    created_at = date.today(),
    updated_at = date.today(),
    user_id=15,
    spot_id=1
    )
    db.session.add(bubblebass)    

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
