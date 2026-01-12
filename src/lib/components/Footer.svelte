<script lang="ts">
  import { storyblokEditable } from "@storyblok/svelte";
  import { Instagram, Twitter, Facebook, Linkedin, Youtube } from "@lucide/svelte";
  import type { FooterBlok } from "$lib/types/storyblok";

  let { blok }: { blok: FooterBlok } = $props();

  const defaultCopyright = `© ${new Date().getFullYear()} Youth Alliance for Housing`;
  const copyrightText = $derived(blok.copyright_text?.trim() || defaultCopyright);
</script>

<footer use:storyblokEditable={blok} class="footer" style={blok.custom_styles ?? ""}>
  {#if blok.social_links && blok.social_links.length > 0}
    <nav class="flex flex-row justify-center mt-4 gap-2">
      {#each blok.social_links as link}
        {@const Icon = link.icon === 'twitter' ? Twitter :
                      link.icon === 'facebook' ? Facebook :
                      link.icon === 'linkedin' ? Linkedin :
                      link.icon === 'youtube' ? Youtube : Instagram}
        {@const label = link.icon === 'instagram' ? 'Instagram' :
                       link.icon === 'twitter' ? 'Twitter' :
                       link.icon === 'facebook' ? 'Facebook' :
                       link.icon === 'linkedin' ? 'LinkedIn' :
                       'YouTube'}
        <a
          href={link.url}
          class="flex text-white hover:opacity-90 transition-opacity"
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon size={28} />
        </a>
      {/each}
    </nav>
  {/if}
  <div class="text-white text-xs text-center mt-2">
    {copyrightText}
  </div>
</footer>

<style>
  .footer {
    margin-top: 2rem;
  }
</style>
