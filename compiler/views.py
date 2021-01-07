from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import CodeSerializer


@api_view(['POST'])
def compile_code(request):
    data = JSONParser().parse(request)
    code_serializer = CodeSerializer(data=data)
    if code_serializer.is_valid():
        return JsonResponse(code_serializer.data, status=status.HTTP_200_OK)
    return JsonResponse(code_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
