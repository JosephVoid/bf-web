import EditProfileForm from "@/components/edit-profile-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil1Icon } from "@radix-ui/react-icons";

export default function ProfilePage() {
  return (
    <div className="m-3 p-4">
      <EditProfileForm />
    </div>
  );
}
