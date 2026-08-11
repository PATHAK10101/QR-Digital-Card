from django.contrib import admin

from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "role",
        "company",
        "slug",
        "created_at",
    )

    search_fields = (
        "name",
        "role",
        "company",
        "email",
        "slug",
    )

    readonly_fields = (
        "slug",
        "created_at",
        "updated_at",
    )