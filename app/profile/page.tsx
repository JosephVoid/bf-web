import EditProfileForm from "@/components/edit-profile-form";
import SetAlert from "@/components/set-alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserDesireList from "@/components/user-desires";
import UserOfferList from "@/components/user-offers";
import { fetchUserProfile } from "@/lib/actions/fetch/user.fetch";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Suspense } from "react";

export default async function ProfilePage() {
  const user = await fetchUserProfile(0);
  return (
    <div className="m-3 p-4">
      <EditProfileForm prop={user} />
      <SetAlert />
      <Suspense fallback={<>Loading...</>}>
        <UserDesireList />
      </Suspense>
      <Suspense fallback={<>Loading...</>}>
        <UserOfferList />
      </Suspense>
    </div>
  );
}
