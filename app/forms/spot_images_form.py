from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError


def validate_image(form, field):
    validate_image_obj = {'png', 'jpeg', 'jpg'}

    #check if the image endwith png, jpeg, jpg
    if not any(field.data.lower().endswith(arg) for arg in validate_image_obj):
        raise ValidationError('URL must end with png, jpeg, or jpg')

class SpotForm(FlaskForm):
    URL = StringField("URL", validators=[DataRequired(), validate_image])
    preview = BooleanField("Preview", validators=[DataRequired()])