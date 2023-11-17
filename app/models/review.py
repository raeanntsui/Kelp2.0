from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    body = db.Column(db.String(2000), nullable=False)
    created_at = db.column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.column(db.DateTime, nullable=False, default=datetime.now())

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
            'body': self.body,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'userId': self.user_id,
            'spotId': self.spot_id
        }
