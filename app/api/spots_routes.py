from flask import Blueprint, jsonify, redirect
from flask_login import login_required
from app.models import db, Spot
from app.forms import SpotForm

spots_routes = Blueprint("spots", __name__)

@spots_routes.route("/")
def get_spots():
    """
    Get all spots
    """
    spots = Spot.query.all()
    return jsonify([spot.to_dict() for spot in spots])

@spots_routes.route("/<int:id>")
def get_spot(id):
    """
    Get one spot
    """
    spot = Spot.query.get(id)
    if spot:
        return spot.to_dict()
    else:
        return {"error": "Spot could not be found"}, 404
    
# @spots_routes.route("/new", methods=["POST"])
# @login_required
# def create_spot():
#     """
#     User must be logged in before creating a new spot
#     """
#     form['csrf_token'].data = request.cookies['csrf_token']
#     form = SpotForm()
#     if form.validate_on_submit():
#         spot_params = Spot(
#         business_name=form.data["business_name"],
#         address=form.data["address"],
#         city=form.data["city"],
#         state=form.data["state"],
#         zip_code=form.data["zip_code"],
#         categories=form.data["categories"],
#         open_hours=form.data["open_hours"],
#         close_hours=form.data["close_hours"],
#         description=form.data["description"],
#         price_range=form.data["price_range"]
#         )
#         db.session.add(spot_params)
#         db.session.commit()
#         return spot_params.to_dict()
#     return {"error": validation_}