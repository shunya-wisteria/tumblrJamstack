export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/about/") {
    const config = useRuntimeConfig();
    return navigateTo(config.public.extAbout, { redirectCode: 301, external:true } );
  }
  if (to.path === "/archive/") {
    const config = useRuntimeConfig();
    return navigateTo(config.public.extArchive, { redirectCode: 301, external:true } );
  }
});