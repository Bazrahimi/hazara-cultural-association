import { requireUser } from "@/app/lib/auth";
import Modal from "@/app/account/settings/ui/Modal";
import AddressForm from "../AddressForm";

export default async function NewAddressModal() {
  await requireUser(); // ensures auth; redirects if not logged in

  const initial = {
    label: "",
    type: "shipping" as const,
    isDefault: false,
    address: "",
    address2: "",
    suburb: "",
    stateCode: "",
    postcode: "",
    country: "AU",
  };

  return (
    <Modal title="Add Address">
      <AddressForm initial={initial} mode="create" />
    </Modal>
  );
}
