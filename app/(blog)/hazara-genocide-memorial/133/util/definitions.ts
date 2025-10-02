export type ImageGallery = {
  src: string;
  alt: string;
  caption?: string;
  source?: string;
};

export type VideoGallery = {
  /** Full Cloudinary URL to the video (mp4/webm) */
  src: string;
  title?: string;
  caption?: string;
  /** Small credit text (e.g. "Video: HCA media team") */
  source?: string;
  /** Poster frame time in seconds (default 2s) */
  posterSecond?: number;
};