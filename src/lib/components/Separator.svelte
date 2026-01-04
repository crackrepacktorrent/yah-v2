<script lang="ts">
  import { storyblokEditable } from "@storyblok/svelte";
  import type { SeparatorBlok } from "$lib/types/storyblok";

  let { blok }: { blok: SeparatorBlok } = $props();

  const type = blok.type ?? 'space';

  const sizeMap = {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '6rem',
    custom: blok.custom_size ?? '1rem'
  };

  const size = sizeMap[blok.size ?? 'md'];

  const lineStyle = blok.line_style ?? 'solid';
  const lineColor = blok.line_color ?? 'var(--color-border, #e5e7eb)';
  const lineWidth = blok.line_width ?? '1px';

  const spaceStyle = `height: ${size}; width: 100%;`;
  const lineStyleStr = `
    background-color: ${lineColor};
    height: ${lineWidth};
    margin: ${size} 0;
    border: none;
    ${lineStyle === 'dashed' ? 'background: none; border-top: ' + lineWidth + ' dashed ' + lineColor + ';' : ''}
    ${lineStyle === 'dotted' ? 'background: none; border-top: ' + lineWidth + ' dotted ' + lineColor + ';' : ''}
  `.trim();
</script>

{#if type === 'space'}
  <div
    use:storyblokEditable={blok}
    class="separator-space"
    style="{spaceStyle} {blok.custom_styles ?? ''}"
    aria-hidden="true"
  ></div>
{:else}
  <hr
    use:storyblokEditable={blok}
    class="separator-line"
    style="{lineStyleStr} {blok.custom_styles ?? ''}"
  />
{/if}

<style>
  .separator-space {
    display: block;
  }

  .separator-line {
    width: 100%;
  }
</style>
