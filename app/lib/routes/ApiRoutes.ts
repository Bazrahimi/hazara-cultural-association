export const ApiRoutes = {
  // Cloudinary
  cloudinaryUpload: () => "/api/cloudinary",
  cloudinaryDestroy: () => "/api/cloudinary/destroy",

  // Shop listings API (note: you currently have /api/shop/listings folder)
  shopListings: () => "/api/shop/listings",
} as const;