<script lang="ts">
  import { storyblokEditable, StoryblokComponent } from "@storyblok/svelte";
  import * as CarouselPrimitive from "$lib/components/ui/carousel";
  import Autoplay from "embla-carousel-autoplay";
  import type { CarouselBlok } from "$lib/types/storyblok";

  let { blok }: { blok: CarouselBlok } = $props();

  const showArrows = blok.show_arrows ?? true;
  const autoplayDelay = Number(blok.autoplay_delay) || 3000; // Convert to number
  const loop = blok.loop ?? true;
  const align = blok.align ?? 'center'; // Default to center (peek effect)

  // stopOnInteraction defaults to true - autoplay stops when user clicks arrows
  const plugins = blok.autoplay ? [Autoplay({ delay: autoplayDelay })] : [];

  // Enable peek effect when align is center (for Embla flex-basis override)
  const isPeekEffect = align === 'center';
</script>

<div
  use:storyblokEditable={blok}
  class="carousel-wrapper"
  class:peek-effect={isPeekEffect}
  style={blok.custom_styles ?? ""}
>
  <CarouselPrimitive.Root opts={{ align, loop }} {plugins}>
    <CarouselPrimitive.Content>
      {#each blok.slides ?? [] as slide}
        <CarouselPrimitive.Item class="carousel-item">
          <StoryblokComponent blok={slide} />
        </CarouselPrimitive.Item>
      {/each}
    </CarouselPrimitive.Content>
    {#if showArrows}
      <CarouselPrimitive.Previous />
      <CarouselPrimitive.Next />
    {/if}
  </CarouselPrimitive.Root>
</div>

<style>
  .carousel-wrapper {
    position: relative;
    width: 100%;
  }

  .carousel-wrapper :global(.carousel-item) {
    height: 45vh;
  }

  /* Carousel controls Image sizing via CSS variables and targeting */
  .carousel-wrapper :global(.image-container) {
    height: 100%;
    display: block;
  }

  .carousel-wrapper :global(.image-container .image-link) {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .carousel-wrapper :global(.image-container img) {
    height: 100%;
    width: 100%;
  }

  /* Peek effect - override Embla's flex-basis and Image sizing */
  .carousel-wrapper.peek-effect :global([data-embla-slide]) {
    flex-basis: auto;
  }

  .carousel-wrapper.peek-effect :global(.image-container) {
    display: inline-block;
    width: auto;
  }

  .carousel-wrapper.peek-effect :global(.image-container .image-link) {
    display: inline-block;
    width: auto;
    height: 100%;
  }

  .carousel-wrapper.peek-effect :global(.image-container img) {
    width: auto;
    max-width: none;
    height: 100%;
  }

  @media (max-width: 1024px) {
    .carousel-wrapper :global(.carousel-item) {
      height: 40vh;
    }
  }

  @media (max-width: 640px) {
    .carousel-wrapper :global(.carousel-item) {
      height: 30vh;
    }
  }
</style>
