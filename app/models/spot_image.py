from .db import db, environment, SCHEMA
from .spot import Spot

class SpotImage(db.Model):
    __tablename__ = 'spot_image'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spotId = db.Column(db.Integer, db.ForeignKey('spot.id'), primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean)

    spot = db.relationship('Spot', back_populates="spot_image")

    def to_dict(self):
        return {
            'id': self.id,
            'spotId': self.spotId,
            'url': self.url,
            'preview': self.preview
        }