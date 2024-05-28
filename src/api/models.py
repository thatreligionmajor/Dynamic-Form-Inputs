from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    recipes = db.relationship('Recipes', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }

class Recipes(db.Model):
    __tablename__ = 'recipes'
    
    recipe_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    image = db.Column(db.String(2000), nullable=True)
    description = db.Column(db.String(240), nullable=True)
    ingredients = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Recipe {self.recipe_id}>'
   
    def serialize(self):
        return {
            "user_id": self.user_id,
            "recipe_id": self.recipe_id,
            "title": self.title,
            "image": self.image,
            "description": self.description,
            "ingredients": self.ingredients,
        }