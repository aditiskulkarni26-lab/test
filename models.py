from django.db import models

class Plan(models.Model):
    plan_name = models.CharField(max_length=10)
    price = models.CharField()
    purchased_date = models.DateField()
    validation_date = models.DateField()
    
    def __str__(self):
        return self.plan_name
