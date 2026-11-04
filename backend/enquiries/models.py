from django.db import models

# Create your models here.

from django.db import models


class TravelEnquiry(models.Model):

    name = models.CharField(max_length=100)

    email = models.EmailField()

    destination = models.CharField(max_length=100)

    travel_date = models.DateField()

    travellers = models.PositiveIntegerField()

    budget = models.CharField(max_length=50)

    message = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    status = models.CharField(
    max_length=20,
    default='Pending',
    choices=[
        ('Pending', 'Pending'),
        ('Contacted', 'Contacted'),
        ('Confirmed', 'Confirmed'),
    ]
)

    def __str__(self):
        return f"{self.name} - {self.destination}"
