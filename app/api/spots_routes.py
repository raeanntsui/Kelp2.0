from flask import Blueprint, jsonify
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
    
@spots_routes.route("/new", methods=["POST"])
@login_required
def create_spot():
    """
    User must be logged in before creating a new spot
    """
    form = SpotForm()
    if request.method == "POST":
        new_spot = Spot(
        business_name=request.form["business_name"],
        address=request.form["address"],
        city=request.form["city"],
        state=request.form["state"],
        zip_code=request.form["zip_code"],
        categories=request.form["categories"],
        open_hours=request.form["open_hours"],
        close_hours=request.form["close_hours"],
        description=request.form["description"],
        price_range=request.form["price_range"]
        )
    db.session.add(new_spot)
    db.session.commit()
    return new_spot.to_dict()