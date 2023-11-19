"""empty message

Revision ID: 42a6daec0115
Revises: ffdc0a98111c
Create Date: 2023-11-18 20:41:49.666123

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '42a6daec0115'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('spots',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('business_name', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('city', sa.String(), nullable=False),
    sa.Column('state', sa.String(), nullable=False),
    sa.Column('zip_code', sa.Integer(), nullable=False),
    sa.Column('categories', sa.String(), nullable=False),
    sa.Column('open_hours', sa.Integer(), nullable=False),
    sa.Column('close_hours', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('price_range', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('address')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=2000), nullable=False),
    sa.Column('user_img', sa.String(length=250), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('spot_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['spot_id'], ['spots.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('spot_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=255), nullable=False),
    sa.Column('preview', sa.Boolean(), nullable=True),
    sa.Column('spotId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['spotId'], ['spots.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('business_owner', sa.Boolean(), nullable=False))
    op.add_column('users', sa.Column('first_name', sa.String(), nullable=False))
    op.add_column('users', sa.Column('last_name', sa.String(), nullable=False))
    op.drop_column('users', 'username')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('username', sa.VARCHAR(length=40), nullable=False))
    op.drop_column('users', 'last_name')
    op.drop_column('users', 'first_name')
    op.drop_column('users', 'business_owner')
    op.drop_table('spot_images')
    op.drop_table('reviews')
    op.drop_table('spots')
    # ### end Alembic commands ###
