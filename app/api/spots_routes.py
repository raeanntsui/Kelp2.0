from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Spot, SpotImage
from app.forms import SpotForm
from .auth_routes import validation_errors_to_error_messages


spots_routes = Blueprint("spots", __name__)

@spots_routes.route("/")
def get_spots():
    """
    Get all spots
    """
    spots = Spot.query.all()
    return jsonify([spot.to_dict() for spot in spots])

@spots_routes.route("/image/<int:spotId>")
def get_spotss(spotId):
    """
    Get spot img
    """
    spot_images = SpotImage.query.filter_by(spot_id=spotId).all()
    return jsonify([spot_image.to_dict() for spot_image in spot_images])

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


@spots_routes.route("/<int:spotId>/images", methods=['POST'])
@login_required
def post_img(spotId):
    '''
    CREATE AN IMAGE FOR A SPOT
    '''

    from app.forms.spot_images_form import SpotImageForm

    spot = Spot.query.get(spotId)
    if not spot:
        return {'errors': 'Spot not found'}, 404

    if current_user.business_owner == False:
        return {"message": "You do not have authorization to upload an image"}, 401

    form = SpotImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print(f"Form validation result: {form.validate()}")

    if form.validate_on_submit() and form.data['img_url'] is not None:
        new_image = SpotImage(
            preview=form.data['preview'],
            img_url=form.data['img_url'],
            spot_id=spotId
        )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()

    return {'errors': 'img_url cannot be None'}, 400



@spots_routes.route("/new", methods=["POST"])
@login_required
def create_spot():
    """
    Create spot (while logged in)
    """
    if current_user.business_owner == False:
        return {"message": "You do not have authorize to sell on your account"}, 403
    else:
        form = SpotForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            spot_params = Spot(
                business_name=form.data["business_name"],
                address=form.data["address"],
                city=form.data["city"],
                state=form.data["state"],
                zip_code=form.data["zip_code"],
                categories=form.data["categories"],
                open_hours=form.data["open_hours"],
                close_hours=form.data["close_hours"],
                description=form.data["description"],
                price_range=form.data["price_range"],
                user_id=current_user.id,
            )

            db.session.add(spot_params)
            db.session.commit()

            img_url = request.form.get("img_url")
            if img_url:
                new_image = SpotImage(
                    preview=False,
                    img_url=img_url,
                    spot_id=spot_params.id,
                )
                db.session.add(new_image)
                db.session.commit()

            return {"newSpot": spot_params.to_dict()}

        return {"error": validation_errors_to_error_messages(form.errors)}, 400

@spots_routes.route("/<int:spotId>", methods=["DELETE"])
@login_required
def delete_spot(spotId):
    """
    Delete spot (while logged in)
    """
    currentSpot = Spot.query.get(spotId)

    if not currentSpot:
        return {'error': 'Spot does not exists'}, 404

    if currentSpot.user_id != current_user.id:
        return {'error': 'You do not have permission to delete this spot'}, 401




    db.session.delete(currentSpot)
    db.session.commit()
    return {'error': 'Spot successfully deleted'}


@spots_routes.route("/img/<int:spotId>", methods=["DELETE"])
@login_required
def delete_spot_image(spotId):
    """
    Delete all images in a spot without deleting the spot
    """

    spot_images = SpotImage.query.filter_by(spot_id=spotId).all()
    currentSpot = Spot.query.get(spotId)

    if currentSpot.user_id != current_user.id:
        return {'error': 'You do not have permission to delete this spot'}, 401

    for spot_image in spot_images:
        db.session.delete(spot_image)

    db.session.commit()

    return {'message': 'Spot images successfully deleted'}


@spots_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_spot(id):
    """
    Update spot (while logged in)
    """
    spot = Spot.query.get(id)

    if not spot:
        return {"message": "Spot not found"}, 404

    if current_user.id != spot.user_id:
        return {"message": "You do not have permission to update this spot"}, 403

    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        spot.business_name = form.data["business_name"]
        spot.address = form.data["address"]
        spot.city = form.data["city"]
        spot.state = form.data["state"]
        spot.zip_code = form.data["zip_code"]
        spot.categories = form.data["categories"]
        spot.open_hours = form.data["open_hours"]
        spot.close_hours = form.data["close_hours"]
        spot.description = form.data["description"]
        spot.price_range = form.data["price_range"]

        db.session.commit()

        return {"resUpdateSpot": spot.to_dict()}

    return {"error": validation_errors_to_error_messages(form.errors)}, 400
