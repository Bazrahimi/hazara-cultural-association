"use client";
import { Button, Input } from "@/app/ui/global/components";
import QuillEditor from "@/app/ui/global/QuillEditor";
import { useState } from "react";

const NewListingForm = ({ userId }: { userId: number }) => {
  const [descriptionHTML, setDescriptionHTML] = useState("");
  return (
    <form className="space-y-6">
      <Input
        id="title"
        label="Title"
        type="text"
        placeholder="e.g. Hand-embroidered Khamak textile"
        required
      />
      <div className="grid sm:grid-cols-2 gap-x-2">
        <Input
          id="price"
          label="Price"
          type="number"
          placeholder="e.g. 120"
          min="0"
          max={10000}
          step="0.01"
          required
          endAdornment={<span className="text-gray-500 text-sm">AUD</span>}
        />
        <Input
          id="postage"
          label="Postage"
          placeholder="e.g. 15"
          type="number"
          min="0"
          max={10000}
          step="0.01"
          required
          endAdornment={<span className="text-gray-500 text-sm">AUD</span>}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-x-2">
        <Input
          id="category"
          label="Category"
          type="text"
          placeholder="e.g. Textile, Jewelry, Instrument"
          required
        />

        <Input
          id="origin"
          type="text"
          label="Region / Origin"
          placeholder="e.g. Hazaristan, Iran, Pakistan"
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

      {/* <textarea
        name="culturalContext"
        placeholder="Explain how this item relates to Hazara heritage, traditions, or history…"
        rows={4}
        required
      /> */}

      {/* <Input
        name="image"
        label="Upload Image"
        type="file"
        accept="image/*"
        required
      /> */}

      <Button type="submit" fullWidth>
        {/* { ? "Submitting…" : "Publish Listing"} */}
        List Product for Sell
      </Button>
    </form>
  );
};

export default NewListingForm;
