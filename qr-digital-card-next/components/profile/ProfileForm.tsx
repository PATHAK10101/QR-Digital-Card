"use client"

import {
  ImagePlus,
  Mail,
  MapPin,
  Phone,
  User,
  BriefcaseBusiness,
  Building2,
  Globe,
  Link2,
} from "lucide-react"

import type {
  Profile,
  ProfileField,
} from "@/types/profile"

interface ProfileFormProps {
  profile: Profile
  onChange: (
    field: ProfileField,
    value: string,
  ) => void
  onPhotoChange: (
    file: File | null,
  ) => void
}

export default function ProfileForm({
  profile,
  onChange,
  onPhotoChange,
}: ProfileFormProps) {
  return (
    <div className="space-y-7">
      <div>
        <p className="section-label">
          PROFILE
        </p>

        <h2 className="mt-1 text-lg font-semibold">
          Your information
        </h2>

        <p className="mt-1 text-xs leading-5 text-white/30">
          Add only the information you want to
          share on your public digital card.
        </p>
      </div>

      <div>
        <label className="mb-3 block text-xs font-medium text-white/60">
          Profile photo
        </label>

        <label className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.025] p-4 transition hover:border-violet-300/30 hover:bg-white/[0.04]">
          <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlus
                size={20}
                className="text-white/30"
              />
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-white/70">
              Upload a photo
            </p>

            <p className="mt-1 text-[10px] leading-4 text-white/30">
              JPG, PNG or WEBP · Max 5 MB
            </p>
          </div>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) => {
              const file =
                event.target.files?.[0] ?? null

              onPhotoChange(file)
            }}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          icon={<User size={14} />}
          value={profile.name}
          placeholder="Your name"
          onChange={(value) =>
            onChange("name", value)
          }
        />

        <Field
          label="Role"
          icon={<BriefcaseBusiness size={14} />}
          value={profile.role}
          placeholder="Software Engineer"
          onChange={(value) =>
            onChange("role", value)
          }
        />

        <Field
          label="Company"
          icon={<Building2 size={14} />}
          value={profile.company}
          placeholder="Company name"
          onChange={(value) =>
            onChange("company", value)
          }
        />

        <Field
          label="Location"
          icon={<MapPin size={14} />}
          value={profile.location}
          placeholder="City, Country"
          onChange={(value) =>
            onChange("location", value)
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-white/60">
          Short bio
        </label>

        <textarea
          value={profile.bio}
          maxLength={500}
          rows={4}
          placeholder="Tell people a little about yourself..."
          onChange={(event) =>
            onChange(
              "bio",
              event.target.value,
            )
          }
          className="w-full resize-none rounded-xl border border-white/8 bg-white/[0.025] px-3.5 py-3 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-violet-300/30 focus:bg-white/[0.04]"
        />

        <p className="mt-1 text-right text-[9px] text-white/20">
          {profile.bio.length}/500
        </p>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-white/60">
          Contact
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Email"
            icon={<Mail size={14} />}
            value={profile.email}
            type="email"
            placeholder="you@example.com"
            onChange={(value) =>
              onChange("email", value)
            }
          />

          <Field
            label="Phone"
            icon={<Phone size={14} />}
            value={profile.phone}
            placeholder="+91 98765 43210"
            onChange={(value) =>
              onChange("phone", value)
            }
          />
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-white/60">
          Links
        </p>

        <div className="space-y-4">
          <Field
            label="GitHub"
            icon={<Link2 size={14} />}
            value={profile.github}
            placeholder="https://github.com/username"
            onChange={(value) =>
              onChange("github", value)
            }
          />

          <Field
            label="LinkedIn"
            icon={<Link2 size={14} />}
            value={profile.linkedin}
            placeholder="https://linkedin.com/in/username"
            onChange={(value) =>
              onChange("linkedin", value)
            }
          />

          <Field
            label="Website"
            icon={<Globe size={14} />}
            value={profile.website}
            placeholder="https://example.com"
            onChange={(value) =>
              onChange("website", value)
            }
          />
        </div>
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  icon: React.ReactNode
  value: string
  placeholder: string
  onChange: (value: string) => void
  type?: string
}

function Field({
  label,
  icon,
  value,
  placeholder,
  onChange,
  type = "text",
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/45">
        <span className="text-violet-300/60">
          {icon}
        </span>

        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-xl border border-white/8 bg-white/[0.025] px-3.5 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-violet-300/30 focus:bg-white/[0.04]"
      />
    </label>
  )
}