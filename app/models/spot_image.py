from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .spot import Spot

class SpotImage(db.Model):
    __tablename__ = 'spot_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    #foreignkey
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)

    img_url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean, default=False)


    #relationship
    spot = db.relationship('Spot', back_populates="spot_image")

    def to_dict(self):
        return {
            'id': self.id,
            'spotId': self.spot_id,
            'imgUrl': self.img_url,
            'preview': self.preview
        }
