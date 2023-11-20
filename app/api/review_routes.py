from flask import Blueprint, jsonify, request
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

@reviews_routes.route("/<int:spot_id>")
def spot_reviews(spot_id):
    '''
    get all reviews for a specific spot
    '''
    reviews = Review.query.filter_by(spot_id=spot_id).all()
    return jsonify([review.to_dict() for review in reviews])

@reviews_routes.route("/<int:spot_id>", methods=["POST"])
def create_review(spot_id):
    '''
    create a new review for a specific spot
    '''
    data = request.get_json()

    description = data.get("description")
    rating = data.get("rating")

    if not all([description, rating]):
        return jsonify({"error": "Review text and star rating are required"}), 400

    if not 1 <= rating <= 5:
        return jsonify({"error": "Star rating must be between 1 and 5"}), 400

    new_review = Review(spot_id=spot_id, text=description, star_rating=rating)

    db.session.add(new_review)
    db.session.commit()

    return jsonify({"message": "Review created successfully"})


