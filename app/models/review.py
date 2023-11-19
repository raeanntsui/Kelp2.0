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
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("spots.id")), nullable=False)

   #relationships
    user = db.relationship("User", back_populates="review")
    spot = db.relationship("Spot", back_populates="review")


    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'description': self.description,
            'user_img':self.user_img,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id,
            'spot_id': self.spot_id
        }
