from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api/', include('rest_api.urls')),
    path("customer/",include('customer.urls')),
    path("user/",include('user.urls')),
    path("plan/",include('plan.urls')),
    path("investment_table/",include('investment_table.urls')),
    path("investment_stocks/",include('investment_stocks.urls')),
    path("investment_mutual_fund/",include('investment_mutual_fund.urls')),
    path("investment_fd/",include('investment_fd.urls')),
    path("investment_commodity/",include('investment_commodity.urls')),
]