<script lang="ts">
  import { storyblokEditable, StoryblokComponent } from "@storyblok/svelte";
  import type { GridBlok } from "$lib/types/storyblok";

  let { blok }: { blok: GridBlok } = $props();

  const columnCount = blok.column_count ?? 2;
  const customTemplate = blok.custom_template?.trim();
  const template = customTemplate || `repeat(${columnCount}, 1fr)`;
  const gap = blok.gap || '2rem';
  const equalHeightRows = blok.equal_height_rows ?? false;

  const gridStyles = `grid-template-columns: ${template}; gap: ${gap};${equalHeightRows ? ' grid-auto-rows: 1fr;' : ''} ${blok.custom_styles ?? ''}`;
</script>

<div
  use:storyblokEditable={blok}
  class="grid-container"
  style={gridStyles}
>
  {#each blok.blocks ?? [] as block}
    <StoryblokComponent blok={block} />
  {/each}
</div>

<style>
  .grid-container {
    display: grid;
    width: 100%;
  }

  /* Stack to single column on mobile */
  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr !important;
    }
  }
</style>
