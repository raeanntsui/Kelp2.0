from .db import db, environment, SCHEMA, add_prefix_for_prod

class Spot(db.Model):
    __tablename__ = 'spots'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(user.id))
    business_name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False, unique=True)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    categories = db.Column(db.String, nullable=False)
    open_hours = db.Column(db.Integer, nullable=False)
    close = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    price_range = db.Column(db.Integer, nullable=False)
    
    # relationship => 1 spot can have 1 user
    user = db.relationship("User", back_populates="spots")