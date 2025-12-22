// app/blog/lib/enhanceContent.ts

// Match <a href="https://youtube...">anything</a> OR bare youtube URLs
const YOUTUBE_LINK_REGEX =
  /<a[^>]+href="(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})[^"]*)"[^>]*>.*?<\/a>|(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})[^\s<]*)/gi;

export function enhanceContentWithYoutubeEmbeds(html: string): string {
  if (!html) return html;

  return html.replace(YOUTUBE_LINK_REGEX, (...args) => {
    // When matching the <a> pattern, url is args[1], videoId is args[2]
    // When matching bare URL, url is args[3], videoId is args[4]
    const url = args[1] || args[3];
    const videoId = args[2] || args[4];

    if (!url || !videoId) return args[0]; // fallback: leave original

    return `
        <div class="not-prose my-4">
          <div class="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
            <iframe
              src="https://www.youtube.com/embed/${videoId}"
              title="YouTube video player"
              class="w-full h-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <p class="mt-2 text-xs text-gray-500 break-all">
            Source: 
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 hover:underline">
              ${url}
            </a>
          </p>
        </div>
      `;
  });
}
