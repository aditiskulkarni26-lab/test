from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Plan
from .serializer import PlanSerializer

@api_view(['GET', 'POST'])
def plan_list(request):
    """
    GET: Retrieve all plan
    POST: Create a new plan
    """
    if request.method == 'GET':
        plan = Plan.objects.all()
        serializer = PlanSerializer(plan, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = PlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def plan_detail(request, pk):
    """
    GET: Retrieve a specific plan
    PUT: Update a specific plan
    DELETE: Delete a specific plan
    """
    try:
        plan = Plan.objects.get(pk=pk)
    except Plan.DoesNotExist:
        return Response({'error': 'Plan not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PlanSerializer(plan)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = PlanSerializer(plan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        plan.delete()
        return Response({'message': 'Plan deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


