"use server";

import EditProfileForm from "@/components/edit-profile-form";
import SetAlert from "@/components/set-alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserDesireList from "@/components/user-desires";
import UserOfferList from "@/components/user-offers";
import {
  fetchUserAlerts,
  fetchUserProfile,
} from "@/lib/actions/fetch/user.fetch";
import { getUserFromTokenId, getUserId } from "@/lib/helpers";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function ProfilePage() {
  const userId = getUserFromTokenId(cookies().get("auth")?.value ?? "");
  const user = await fetchUserProfile(userId!);
  const tagsAlerted = await fetchUserAlerts(userId!);
  return (
    <div className="m-3 p-4">
      {user && <EditProfileForm prop={user} />}
      <SetAlert alertTags={tagsAlerted} />
      <Suspense fallback={<>Loading...</>}>
        <UserDesireList />
      </Suspense>
      <Suspense fallback={<>Loading...</>}>
        <UserOfferList />
      </Suspense>
    </div>
  );
}
