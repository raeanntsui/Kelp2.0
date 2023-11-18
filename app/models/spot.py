from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Spot(db.Model):
    __tablename__ = 'spots'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False, unique=True)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    categories = db.Column(db.String, nullable=False)
    open_hours = db.Column(db.Integer, nullable=False)
    close_hours = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    price_range = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("user.id")), nullable=False)

    # relationship => 1 spot can have 1 user
    user = db.relationship("User", back_populates="spots")
    spot_img = db.relationship("SpotImages", back_populates="spot" )
    review = db.relationship("Review", back_populates="spot")

    def to_dict(self):
        return {
            'id': self.id,
            'business_name': self.business_name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'categories': self.categories,
            'open_hours': self.open_hours,
            'close_hours': self.close_hours,
            'description': self.description,
            'price_range': self.price_range,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'userId': self.user_id,
        }
