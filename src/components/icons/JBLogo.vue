<template>
  <svg
    class="b_logo"
    style="view-transition-name: jb-logo"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="b_logo__back"
      d="M64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32Z"
      fill="#2E3340"
    ></path>
    <path
      class="b_logo__front"
      d="M20.6769 16.7385C20.6769 15.6509 21.5586 14.7692 22.6462 14.7692H42.3385C43.426 14.7692 44.3077 15.6509 44.3077 16.7385V28.5538C44.3077 29.6414 45.1893 30.5231 46.2769 30.5231H50.2154C51.303 30.5231 52.1846 31.4047 52.1846 32.4923V44.3077C52.1846 45.3953 51.303 46.2769 50.2154 46.2769H38.4C37.3124 46.2769 36.4308 45.3953 36.4308 44.3077V32.4923C36.4308 31.4047 35.5491 30.5231 34.4615 30.5231H30.5231C29.4355 30.5231 28.5538 31.4047 28.5538 32.4923V44.3077C28.5538 45.3953 27.6722 46.2769 26.5846 46.2769H14.7692C13.6817 46.2769 12.8 45.3953 12.8 44.3077V32.4923C12.8 31.4047 13.6817 30.5231 14.7692 30.5231H18.7077C19.7953 30.5231 20.6769 29.6414 20.6769 28.5538V16.7385Z"
      fill="#EDE5D6"
    ></path>
  </svg>
</template>

<style lang="scss" scoped>
.b_logo {
  max-width: var(--brand-logo-width);

  &__back {
    fill: var(--brand-logo-back-clr);
  }

  &__front {
    fill: var(--brand-logo-front-clr);
  }
}
</style>
