from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, Regexp, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

        
def contains_at_symbol(form, field):
    if '@' not in field.data:
        raise ValidationError('Invalid email.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, contains_at_symbol])
    password = PasswordField('password', validators=[DataRequired(),  Length(min=6, message='Password must be at least 6 characters long')])
    # zip_code = IntegerField("Zip Code", validators=[DataRequired()])
    first_name = StringField("First name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    business_owner = BooleanField("Business Owner")
