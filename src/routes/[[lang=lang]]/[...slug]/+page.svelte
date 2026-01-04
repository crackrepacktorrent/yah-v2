<script lang="ts">
  import { StoryblokComponent, useStoryblokBridge } from "@storyblok/svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";

  let { data }: { data: PageData } = $props();
  let story = $state(data.story);
  let loaded = $state(false);

  $effect(() => {
    story = data.story;
  });

  onMount(() => {
    loaded = true;
    if (data.story) {
      useStoryblokBridge(data.story.id, (newStory) => (story = newStory), {
        preventClicks: true,
        resolveLinks: "url",
      });
    }
  });
</script>

{#if loaded && story?.content}
  <StoryblokComponent blok={story.content} />
{/if}
