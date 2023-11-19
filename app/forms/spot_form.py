from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, NumberRange


class SpotForm(FlaskForm):
    business_name = StringField('Business Name', validators=[DataRequired()])
    address = StringField("Address", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired()])
    state = StringField("State", validators=[DataRequired()])
    zip_code = IntegerField("Zip Code", validators=[DataRequired(), NumberRange(min=1, max = 99999)])
    categories = StringField("Categories", validators=[DataRequired()])
    open_hours = IntegerField("Open Hours", validators=[DataRequired()])
    close_hours = IntegerField("Close Hours", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    price_range = IntegerField("Price Range", validators=[DataRequired()])
    submit = SubmitField("Submit")
