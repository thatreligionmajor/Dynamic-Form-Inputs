"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Recipes
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# @api.route("/token", methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     user = User.query.filter_by(email=email, password=password).first()
#     if user is None:
#         raise APIException('User not found', status_code=404)
#     access_token = create_access_token(identity=email)
#     user_id = user.id
#     return jsonify(access_token=access_token, user=user.serialize())

# @api.route('/user', methods=['GET'])
# def get_all_users():
#     users = User.query.all()
#     all_users = list(map(lambda x: x.serialize(), users))
#     return jsonify(all_users), 200

@api.route("/user-recipes", methods=["POST"])
def add_user_recipe():
    body = request.get_json()

    if 'user_id' not in body:
        return jsonify({"msg": "Missing user_id"}), 400
    
    new_recipe = Recipes(
        title=body['title'],
        image=body.get('image', ''),
        description=body.get('description', ''),
        ingredients=body['ingredients'],
        user_id=body['user_id']
    )

    db.session.add(new_recipe)
    db.session.commit()
    return jsonify(new_recipe.serialize()), 201