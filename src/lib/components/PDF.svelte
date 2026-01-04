<script lang="ts">
  import { storyblokEditable } from "@storyblok/svelte";
  import type { PDFBlok } from "$lib/types/storyblok";

  let { blok }: { blok: PDFBlok } = $props();

  const pdfUrl = blok.pdf_file?.filename ?? "";
  const title = blok.title ?? "PDF Document";

  // PDF.js viewer configuration
  const spreadMode = blok.spread_mode ?? 'two-page-odd'; // Default to two-page spread (odd pages on right)
  const zoom = blok.zoom ?? 'auto';
  const customZoom = blok.custom_zoom ?? 100;
  const initialPage = blok.initial_page ?? 1;

  // Build PDF.js viewer URL with parameters
  const viewerUrl = $derived(() => {
    if (!pdfUrl) return "";

    // File goes in query params
    const queryParams = new URLSearchParams();
    queryParams.set('file', pdfUrl);

    // Viewer settings go in hash params
    const hashParams: string[] = [];

    // Set initial page
    if (initialPage > 1) {
      hashParams.push(`page=${initialPage}`);
    }

    // Set zoom level
    if (zoom === 'custom' && customZoom) {
      hashParams.push(`zoom=${customZoom}`);
    } else if (zoom !== 'auto') {
      hashParams.push(`zoom=${zoom}`);
    }

    // Set spread mode (controls one-page vs two-page view)
    if (spreadMode === 'one-page') {
      hashParams.push('spread=none');
    } else if (spreadMode === 'two-page-odd') {
      hashParams.push('spread=odd');
    } else if (spreadMode === 'two-page-even') {
      hashParams.push('spread=even');
    }

    // Build final URL
    const hash = hashParams.length > 0 ? `#${hashParams.join('&')}` : '';
    return `/pdfjs/web/viewer.html?${queryParams.toString()}${hash}`;
  });

  const height = blok.height ?? '75vh';
  const minHeight = blok.min_height ?? '400px';

  const containerStyles = `
    height: ${height};
    ${minHeight ? `min-height: ${minHeight};` : ''}
    ${blok.custom_styles ?? ''}
  `.trim();
</script>

<div
  use:storyblokEditable={blok}
  class="pdf-container"
  style={containerStyles}
>
  {#if pdfUrl}
    <iframe
      {title}
      src={viewerUrl()}
      width="100%"
      height="100%"
      aria-label={title}
    ></iframe>
  {:else}
    <div class="pdf-placeholder">
      <p>No PDF file selected</p>
    </div>
  {/if}
</div>

<style>
  .pdf-container {
    width: 100%;
    display: block;
    position: relative;
  }

  .pdf-container iframe {
    display: block;
    border: none;
  }

  .pdf-placeholder {
    width: 100%;
    height: 100%;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-muted, #f5f5f5);
    border: 2px dashed var(--color-border, #e5e7eb);
    border-radius: var(--radius-md, 0.5rem);
  }

  .pdf-placeholder p {
    color: var(--color-muted-foreground, #666);
    margin: 0;
  }
</style>
