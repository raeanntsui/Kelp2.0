from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review
from ..forms import ReviewForm



reviews_routes = Blueprint("reviews", __name__)

# @reviews_routes.route("/")
# def get_all_reviews():
#     '''
#     get all reviews 
#     '''
#     reviews = Review.query.all()
#     return jsonify([review.to_dict() for review in reviews])

@reviews_routes.route("/<int:spot_id>")
def spot_reviews(spot_id):
    '''
    get all reviews for a specific spot
    '''
    reviews = Review.query.filter_by(spot_id=spot_id).all()
    return jsonify([review.to_dict() for review in reviews])

@reviews_routes.route("/new/<int:spot_id>", methods=["POST"])
@login_required
def create_review(spot_id):
    '''
    create a new review for a specific spot
    '''
    # print(f"Current user: {current_user}")
    # print(f"Current user id: {current_user.id}")
    form = ReviewForm(request.form)
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():

        description = form.description.data
        rating = form.rating.data

        new_review = Review(spot_id=spot_id, description=description, rating=rating, user_id=current_user.id)

        db.session.add(new_review)
        db.session.commit()

        return jsonify({"message": "Review created successfully"})
    else:

        errors = form.errors
        return jsonify({"message": "Invalid form submission", "errors": errors}), 400

@reviews_routes.route("/<int:review_id>", methods=["PUT"])
def update_review(review_id):
    '''
    update an existing review
    '''
    form = ReviewForm(request.form)

    if form.validate_on_submit():
        review = Review.query.get(review_id)

        if not review:
            return (jsonify({"error": "Review not found"}), 404)

        review.description = form.description.data
        review.rating = form.rating.data

        db.session.commit()

        return jsonify({"message": "Review updated successfully"})
    else:
        return (jsonify({"error": "Invalid form data"}), 400)

# @app.route('/<int:review_id>', methods=['DELETE'])
# def delete_review(review_id):
#     review = Review.query.get(review_id)
#     if review:
#         db.session.delete(review)
#         db.session.commit()
#         return jsonify({"message": "Review deleted successfully"})
#     else:
#         return jsonify({"error": "Review not found"}), 404
    