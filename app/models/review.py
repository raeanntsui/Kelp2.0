from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    user_img = db.Column(db.String(250))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    #foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("user.id")), nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("spot.id")), nullable=False)

   #relationships
    user = db.relationship("User", back_populates="reviews")
    spot = db.relationship("Spot", back_populates="reviews")


    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'description': self.description,
            'user_img':self.user_img,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'userId': self.user_id,
            'spotId': self.spot_id
        }
