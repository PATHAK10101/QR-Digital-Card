from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField(
        read_only=True
    )

    class Meta:
        model = Profile

        fields = [
            "id",
            "slug",
            "name",
            "role",
            "company",
            "bio",
            "email",
            "phone",
            "location",
            "github",
            "linkedin",
            "website",
            "photo",
            "photo_url",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "slug",
            "photo_url",
            "created_at",
            "updated_at",
        ]

    def get_photo_url(self, obj):
        request = self.context.get("request")

        if not obj.photo:
            return None

        url = obj.photo.url

        if request:
            return request.build_absolute_uri(url)

        return url