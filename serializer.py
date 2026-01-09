from rest_framework import serializers
from .models import Plan

class PlanSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Plan
        fields = ['id', 'plan_name', 'price','purchased_date','validation_date']
    
    """def validate_price(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Price must contain only digits")
        return value

    def validate_pincode(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Pincode must contain only digits")
        return value
    """