from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import db, Review


reviews_routes = Blueprint("reviews", __name__)

@reviews_routes.route("/")
def spot_reviews():
    '''
    get all reviews for a spot
    '''
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews])
