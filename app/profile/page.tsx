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
      <Suspense
        fallback={
          <div className="flex justify-center h-screen my-20">
            <Loader dark large />
          </div>
        }
      >
        {user && <EditProfileForm prop={user} />}
      </Suspense>
      <SetAlert alertTags={tagsAlerted} />
      <Suspense
        fallback={
          <div className="flex justify-center h-screen my-20">
            <Loader dark large />
          </div>
        }
      >
        <UserDesireList />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex justify-center h-screen my-20">
            <Loader dark large />
          </div>
        }
      >
        <UserOfferList />
      </Suspense>
    </div>
  );
}
