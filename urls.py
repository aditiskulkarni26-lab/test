"""from django.urls import path
from . import views

urlpatterns = [
    path('', views.plan_list, name='customer-list'),
    path('<int:pk>/', views.plan_detail, name='plan-detail'),
]"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.plan_list, name='plan-list'),  # Corrected name
    path('<int:pk>/', views.plan_detail, name='plan-detail'),
]
