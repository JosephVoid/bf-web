import EditProfileForm from "@/components/edit-profile-form";
import Loader from "@/components/loader";
import SetAlert from "@/components/set-alert";
import UserDesireList from "@/components/user-desires";
import UserOfferList from "@/components/user-offers";
import {
  fetchUserAlerts,
  fetchUserProfile,
} from "@/lib/actions/fetch/user.fetch";
import { getUserFromTokenId } from "@/lib/helpers";
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
      <Suspense fallback={<Loader />}>
        <UserDesireList />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <UserOfferList />
      </Suspense>
    </div>
  );
}
