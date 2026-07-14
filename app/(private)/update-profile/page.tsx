"use client";

import { useState } from "react";
import { useMyProfile } from "@/lib/hooks/queries/use-my-profile";
import { useUpdateProfile } from "@/lib/hooks/mutations/use-update-profile";
import { UpdateProfileHeader } from "@/components/profile/update-profile-header";
import { AvatarUpload } from "@/components/profile/avatar-upload";
import { ProfileFormField } from "@/components/profile/profile-form-field";
import { SuccessAlert } from "@/components/profile/success-alert";
import { LoadingState } from "@/components/state/loading-state";

export default function UpdateProfilePage() {
  const { data: profile, isLoading } = useMyProfile();
  const updateProfile = useUpdateProfile();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [name, setName] = useState(profile?.name ?? "");
  const [username, setUsername] = useState(profile?.username ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  if (isLoading || !profile) return <LoadingState />;

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Name is required";
    if (!username.trim()) nextErrors.username = "Username is required";
    if (!email.trim()) nextErrors.email = "Email is required";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("bio", bio);

    updateProfile.mutate(formData, {
      onSuccess: () => setShowSuccess(true),
    });
  };

  return (
    <div className="mx-auto flex max-w-[800px] flex-col gap-8 px-4 pt-6 md:flex-row md:gap-12 md:px-0 md:pt-10">
      <div className="flex flex-col gap-8 md:contents">
        <UpdateProfileHeader />

        {showSuccess && (
          <SuccessAlert
            message="Profile Success Update"
            onClose={() => setShowSuccess(false)}
          />
        )}
      </div>

      <div className="flex flex-col items-center gap-4 md:w-40 md:shrink-0">
        <AvatarUpload
          currentAvatarUrl={profile.avatarUrl ?? undefined}
          onChange={setAvatar}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 md:gap-6">
        <ProfileFormField
          label="Name"
          value={name}
          onChange={setName}
          error={errors.name}
        />
        <ProfileFormField
          label="Username"
          value={username}
          onChange={setUsername}
          error={errors.username}
        />
        <ProfileFormField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        <ProfileFormField
          label="Number Phone"
          value={phone}
          onChange={setPhone}
          error={errors.phone}
        />
        <ProfileFormField
          label="Bio"
          value={bio}
          onChange={setBio}
          multiline
          error={errors.bio}
        />

        <button
          onClick={handleSubmit}
          disabled={updateProfile.isPending}
          className="w-full rounded-full bg-brand-600 py-2 text-sm font-bold text-white disabled:opacity-60 md:py-3 md:text-md"
        >
          {updateProfile.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
