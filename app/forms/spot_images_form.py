from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class SpotImageForm(FlaskForm):
    img_url = StringField("URL")
    preview = BooleanField("Preview", default=False)
    spot_id = IntegerField()

def validate_image_url(form, field):
    validate_image_obj = {'png', 'jpeg', 'jpg'}

    # check if the image ends with png, jpeg, jpg
    if not any(field.data.lower().endswith(arg) for arg in validate_image_obj):
        raise ValidationError('URL must end with png, jpeg, or jpg')
