from dataclasses import dataclass
from rest_framework import serializers
from .compilers import CodeOutput


@dataclass
class Code:
    language: str
    code: str


class CodeSerializer(serializers.Serializer):
    language = serializers.CharField(max_length=200)
    code = serializers.CharField()

    def create(self, validated_data):
        return Code(**validated_data)


class CodeRunOutputSerializer(serializers.Serializer):
    output = serializers.ListField()
    error = serializers.ListField()

    def create(self, validated_data):
        return CodeOutput(**validated_data)
