from rest_framework import serializers
from .models import TravelEnquiry


class TravelEnquirySerializer(serializers.ModelSerializer):

    class Meta:
        model = TravelEnquiry
        fields = '__all__'