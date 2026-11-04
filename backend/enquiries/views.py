
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .serializers import TravelEnquirySerializer
from .models import TravelEnquiry


# Submit a new travel enquiry (Public API)
@api_view(['POST'])
@permission_classes([AllowAny])
def submit_enquiry(request):

    serializer = TravelEnquirySerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                'message': 'Travel enquiry submitted successfully!',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# Get all travel enquiries (Admin only)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_enquiries(request):

    enquiries = TravelEnquiry.objects.all().order_by('-created_at')

    serializer = TravelEnquirySerializer(enquiries, many=True)

    return Response(
        serializer.data,
        status=status.HTTP_200_OK
    )


# Update enquiry status (Admin only)
@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def update_enquiry_status(request, enquiry_id):

    enquiry = get_object_or_404(TravelEnquiry, id=enquiry_id)

    new_status = request.data.get('status')

    allowed_statuses = ['Pending', 'Contacted', 'Confirmed']

    if new_status not in allowed_statuses:
        return Response(
            {'error': 'Invalid status'},
            status=status.HTTP_400_BAD_REQUEST
        )

    enquiry.status = new_status
    enquiry.save()

    serializer = TravelEnquirySerializer(enquiry)

    return Response(
        {
            'message': 'Enquiry status updated successfully!',
            'data': serializer.data
        },
        status=status.HTTP_200_OK
    )


# Delete a travel enquiry (Admin only)
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_enquiry(request, enquiry_id):

    enquiry = get_object_or_404(TravelEnquiry, id=enquiry_id)

    enquiry.delete()

    return Response(
        {'message': 'Travel enquiry deleted successfully!'},
        status=status.HTTP_200_OK
    )
