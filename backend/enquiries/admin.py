from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import TravelEnquiry


@admin.register(TravelEnquiry)
class TravelEnquiryAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'email',
        'destination',
        'travel_date',
        'travellers',
        'budget',
        'created_at'
    )

    search_fields = ('name', 'email', 'destination')

    list_filter = ('destination', 'budget', 'created_at')
