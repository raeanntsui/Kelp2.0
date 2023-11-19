# from flask import Blueprint, jsonify
# from flask_login import login_required
# from app.models import db, Spot


# spots_routes = Blueprint("spots", __name__)

# @spots_routes.route("/")
# def get_spots():
#     spots = Spot.query.all()
#     return jsonify([spot.to_dict() for spot in spots])