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

      <label className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <QuillEditor
        value={descriptionHTML}
        onChange={setDescriptionHTML}
        placeholder="Describe the item and cultural context…"
        maxChars={2000}
      />

      <Input
        id="price"
        label="Price"
        type="number"
        min="0"
        max={10000}
        step="0.01"
        required
        endAdornment={<span className="text-gray-500 text-sm">AUD</span>}
      />

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
        placeholder="e.g. Hazaristan"
      />

      <textarea
        name="culturalContext"
        placeholder="Explain how this item relates to Hazara heritage, traditions, or history…"
        rows={4}
        required
      />

      {/* <Input
        name="image"
        label="Upload Image"
        type="file"
        accept="image/*"
        required
      /> */}

      <Button type="submit" fullWidth>
        {/* { ? "Submitting…" : "Publish Listing"} */}
        list
      </Button>
    </form>
  );
};

export default NewListingForm;
