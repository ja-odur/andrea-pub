"""Module for users resource"""

# Third-party libraries
from flask_restx import Resource
from flask import request

# Middlewares
from main import api

# # Model serializers
# from api.utilities.model_serializers import UserSchema
#
# # Models
# from api.models import User

# USER_SCHEMA = UserSchema(exclude=['deleted'])


@api.route('/compile')
class CompileCodeResource(Resource):

    def post(self):

        request_data = request.get_json()

        # user_data = USER_SCHEMA.load_object_into_schema(request_data)
        # # print('user_data', user_data)
        #
        # user = User(**user_data).save()

        return (
            {
                'status': 'success',
                'message': 'message',
                'data': "test endpoint"
            }, 200)
