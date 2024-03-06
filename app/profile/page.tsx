import EditProfileForm from "@/components/edit-profile-form";
import SetAlert from "@/components/set-alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserDesireList from "@/components/user-desires";
import UserOfferList from "@/components/user-offers";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <div className="m-3 p-4">
      <EditProfileForm />
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
