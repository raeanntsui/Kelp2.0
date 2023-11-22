from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, SelectField, SubmitField, FileField
from wtforms.validators import DataRequired, NumberRange, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired


class ReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired(), Length(min=30, max=2000, message="Description needs to be at least 30 characters") ])
    user_img = FileField("Image from User", validators=[FileAllowed(["pdf", "png", "jpg", "jpeg", "gif"])]) #might be able to change "User" to reflect username or user.id
    submit = SubmitField("Submit")