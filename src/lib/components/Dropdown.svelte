<script lang="ts">
  interface DropdownItem {
    label: string;
    value?: string;
    href?: string;
    target?: string;
    rel?: string;
  }

  let {
    items = [],
    trigger,
    onSelect,
    class: className = "",
  }: {
    items: DropdownItem[];
    trigger: any;
    onSelect?: (value: string) => void;
    class?: string;
  } = $props();

  let isOpen = $state(false);
</script>

<div
  class="dropdown-wrapper {className}"
  role="group"
  onmouseenter={() => isOpen = true}
  onmouseleave={() => isOpen = false}
>
  <div class="dropdown-trigger">
    {@render trigger()}
  </div>

  {#if isOpen}
    <div class="dropdown-menu" role="menu">
      {#each items as item}
        {#if item.href}
          <a
            href={item.href}
            class="dropdown-item"
            role="menuitem"
            target={item.target}
            rel={item.rel}
          >
            {item.label}
          </a>
        {:else if onSelect}
          <button
            type="button"
            class="dropdown-item"
            role="menuitem"
            onclick={() => {
              onSelect?.(item.value || item.label);
              isOpen = false;
            }}
          >
            {item.label}
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .dropdown-wrapper {
    position: relative;
    display: inline-block;
  }

  .dropdown-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    padding: 0.5rem 0 0 0;
    background-color: transparent;
    border-radius: var(--radius-md);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    min-width: 100%;
    width: max-content;
    z-index: 50;
    overflow: hidden;
  }

  .dropdown-menu::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.5rem;
    /* Transparent hover bridge */
  }

  .dropdown-item {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.625rem 1rem;
    color: var(--color-yahrange);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    border: none;
    background-color: white;
    transition: background-color 150ms ease-in-out;
    cursor: pointer;
  }

  .dropdown-item:first-child {
    border-radius: var(--radius-md) var(--radius-md) 0 0;
  }

  .dropdown-item:hover {
    background-color: var(--color-accent);
  }
</style>
