from django.urls import path

from .views import (
    ProfileListCreateView,
    PublicProfileView,
)


urlpatterns = [
    path(
        "",
        ProfileListCreateView.as_view(),
        name="profile-list-create",
    ),

    path(
        "<str:slug>/",
        PublicProfileView.as_view(),
        name="public-profile",
    ),
]