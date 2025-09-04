// app/account/listing/new/NewListingForm.tsx
"use client";

import { Button, Input } from "@/app/ui/global/components";
import QuillEditor from "@/app/ui/global/QuillEditor";
import { useActionState, useState } from "react";

import ProductImgUpload from "./ProductImgUpload";
import { createListing } from "../lib/action";
import { ListingActionState } from "../lib/schema";

const initialState: ListingActionState = {};

const NewListingForm = () => { 
  const [state, formAction, isPending] = useActionState(
    createListing,
    initialState
  );

  const [descriptionHTML, setDescriptionHTML] = useState(
    state.data?.description ?? ""
  );
  const [mainImg, setMainImg] = useState(state.data?.mainImg ?? "");
  const [otherImgs, setOtherImgs] = useState(state.data?.otherImgs ?? "");

  return (
    <form className="space-y-6" action={formAction}>
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
      {/* Submit image URLs */}
      <input type="hidden" name="mainImg" value={mainImg} />
      <input type="hidden" name="otherImgs" value={otherImgs} />

      {state.message && (
        <p
          className={`text-sm ${state.ok ? "text-green-600" : "text-gray-600"}`}
        >
          {state.message}
        </p>
      )}

      <Button type="submit" fullWidth disabled={isPending}>
        {isPending ? "Publishing…" : "List product for sale"}
      </Button>
    </form>
  );
};

export default NewListingForm;
