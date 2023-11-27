from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, SelectField, SubmitField, FileField
from wtforms.validators import DataRequired, NumberRange, Length, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import ValidationError

# allow_image = {'pdf', 'png', 'jpg', 'jpeg', 'gif'}

# def validate_image_url(form, field):
#     if field.data:
#         extension = field.data.lower().split('.')[-1]
#         if extension not in allow_image:
#             raise ValidationError('Invalid image URL format')
            
class ReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired(), Length(min=10, max=2000, message="Description needs to be at least 10 characters") ])
    # user_img = StringField("Image URL", validators=[URL(), validate_image_url])
    user_img = StringField("Image URL")
    submit = SubmitField("Submit")