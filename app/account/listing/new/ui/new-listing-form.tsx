// app/account/listing/new/NewListingForm.tsx
"use client";

import { Button, Input } from "@/app/ui/global/components";

import Modal from "@/app/ui/global/modal";
import QuillEditor from "@/app/ui/global/QuillEditor";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";

import { createListing } from "../lib/action";
import { ListingActionState } from "../lib/schema";
import ProductImgUpload from "./ProductImgUpload";

const initialState: ListingActionState = {};

const NewListingForm = () => {
  const [state, formAction, isPending] = useActionState(
    createListing,
    initialState
  );

  // local controlled pieces
  const [descriptionHTML, setDescriptionHTML] = useState(
    state.data?.description ?? ""
  );
  const [mainImg, setMainImg] = useState(state.data?.mainImg ?? "");
  const [otherImgs, setOtherImgs] = useState(state.data?.otherImgs ?? "");

  // success modal
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  // When the server action returns success, open modal and reset fields
  useEffect(() => {
    if (state.ok) {
      setShowSuccess(true);

      // reset local state
      setDescriptionHTML("");
      setMainImg("");
      setOtherImgs("");

      // reset uncontrolled inputs in the form
      formRef.current?.reset();
    }
  }, [state.ok]);

  return (
    <>
      <form className="space-y-6" action={formAction} ref={formRef}>
        <Input
          id="title"
          label="Title"
          type="text"
          placeholder="e.g. Hand-embroidered Khamak textile"
          required
          defaultValue={state.data?.title ?? ""}
          error={state.errors?.title}
        />

        <div className="grid sm:grid-cols-2 gap-x-2">
          <Input
            id="price"
            label="Price"
            type="number"
            placeholder="e.g. 120"
            min={0}
            max={10000}
            step={0.01}
            required
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            defaultValue={state.data?.price as any}
            endAdornment={<span className="text-gray-500 text-sm">AUD</span>}
            error={state.errors?.price}
          />
          <Input
            id="postage"
            label="Postage"
            type="number"
            placeholder="e.g. 15"
            min={0}
            max={10000}
            step={0.01}
            required
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            defaultValue={state.data?.postage as any}
            endAdornment={<span className="text-gray-500 text-sm">AUD</span>}
            error={state.errors?.postage}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-x-2">
          <Input
            id="category"
            label="Category"
            type="text"
            placeholder="e.g. Textile, Jewelry, Instrument"
            required
            defaultValue={state.data?.category ?? ""}
            error={state.errors?.category}
          />
          <Input
            id="origin"
            type="text"
            label="Region / Origin"
            placeholder="e.g. Hazaristan, Iran, Pakistan"
            defaultValue={state.data?.origin ?? ""}
            error={state.errors?.origin}
          />
        </div>

        <QuillEditor
          id="Product-description"
          label="Item Description"
          value={descriptionHTML}
          onChange={setDescriptionHTML}
          placeholder="Describe the item and cultural context…"
          maxChars={2000}
          className="min-h-[200px] max-h-[400px]"
        />
        {/* Submit the HTML */}
        <input type="hidden" name="description" value={descriptionHTML} />
        {state.errors?.description && (
          <p className="text-sm text-red-600">{state.errors.description[0]}</p>
        )}

        <ProductImgUpload
          mainImg={mainImg}
          otherImgs={otherImgs}
          setMainImg={setMainImg}
          setOtherImgs={setOtherImgs}
          errors={{
            mainImg: state.errors?.mainImg,
            otherImgs: state.errors?.otherImgs,
          }}
        />
        {/* Submit image paths */}
        <input type="hidden" name="mainImg" value={mainImg} />
        <input type="hidden" name="otherImgs" value={otherImgs} />

        {state.message && !state.ok && (
          <p className="text-sm text-gray-700">{state.message}</p>
        )}

        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? "Publishing…" : "List product for sale"}
        </Button>
      </form>

      {/* Success Modal */}
      <Modal
        open={showSuccess}
        title="Listing published 🎉"
        onClose={() => setShowSuccess(false)}
      >
        <p className="text-sm text-gray-700">
          Your product has been listed successfully.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <Button
            as="link"
            href="/account/listing/new"
            variant="outline"
            fullWidth
            onClick={() => setShowSuccess(false)}
          >
            List another
          </Button>
          <Button
            as="link"
            href="/shop"
            variant="secondary"
            fullWidth
            onClick={() => setShowSuccess(false)}
          >
            Go to Shop
          </Button>
          <Button
            as="link"
            href="/"
            variant="primary"
            fullWidth
            onClick={() => setShowSuccess(false)}
          >
            Home
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default NewListingForm;
