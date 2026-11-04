
from django.urls import path
from . import views


urlpatterns = [

    # Submit a new travel enquiry
    path(
        'submit/',
        views.submit_enquiry,
        name='submit-enquiry'
    ),

    # Get all travel enquiries
    path(
        'all/',
        views.get_enquiries,
        name='get-enquiries'
    ),

    # Update enquiry status
    path(
        'update-status/<int:enquiry_id>/',
        views.update_enquiry_status,
        name='update-enquiry-status'
    ),

    # Delete a travel enquiry
    path(
        'delete/<int:enquiry_id>/',
        views.delete_enquiry,
        name='delete-enquiry'
    ),

]
