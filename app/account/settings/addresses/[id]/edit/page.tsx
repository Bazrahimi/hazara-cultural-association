import { requireUser } from "@/app/lib/auth";
import { sql } from "@/app/lib/db";
import Modal from "@/app/account/settings/ui/Modal";
import AddressForm from "../../AddressForm";

type Row = {
  id: number;
  label: string | null;
  type: "shipping" | "billing";
  is_default: boolean;
  address1: string;
  address2: string | null;
  suburb: string;
  state_code: string;
  postcode: string;
  country: string;
};

export default async function EditAddressModal({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await requireUser();
  const id = Number(params.id);

  const rows = await sql<Row[]>`
    SELECT id, label, type, is_default, address1, address2, suburb, state_code, postcode, country
    FROM user_addresses
    WHERE id = ${id} AND user_id = ${userId}
    LIMIT 1
  `;

  if (!rows.length) {
    // address not found or not owned by user — simple fallback: close modal
    return null;
  }

  const a = rows[0];
  const initial = {
    id: String(a.id),
    label: a.label ?? "",
    type: a.type,
    isDefault: a.is_default,
    address: a.address1,
    address2: a.address2 ?? "",
    suburb: a.suburb,
    stateCode: a.state_code,
    postcode: a.postcode,
    country: a.country,
  };

  return (
    <Modal title="Edit Address">
      <AddressForm initial={initial} mode="edit" />
    </Modal>
  );
}
