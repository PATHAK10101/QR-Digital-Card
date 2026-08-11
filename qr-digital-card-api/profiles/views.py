from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile
from .serializers import ProfileSerializer


class ProfileListCreateView(APIView):
    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def get(self, request):
        profiles = Profile.objects.all()

        serializer = ProfileSerializer(
            profiles,
            many=True,
            context={"request": request},
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = ProfileSerializer(
            data=request.data,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)

        profile = serializer.save()

        return Response(
            ProfileSerializer(
                profile,
                context={"request": request},
            ).data,
            status=status.HTTP_201_CREATED,
        )


class PublicProfileView(APIView):
    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def get(self, request, slug):
        profile = get_object_or_404(
            Profile,
            slug=slug,
        )

        serializer = ProfileSerializer(
            profile,
            context={"request": request},
        )

        return Response(serializer.data)

    def patch(self, request, slug):
        profile = get_object_or_404(
            Profile,
            slug=slug,
        )

        serializer = ProfileSerializer(
            profile,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)

        profile = serializer.save()

        return Response(
            ProfileSerializer(
                profile,
                context={"request": request},
            ).data,
            status=status.HTTP_200_OK,
        )