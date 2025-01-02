export default defineNuxtRouteMiddleware((to) => {
  // aboutページリダイレクト
  if (to.path === "/about/") {
    const config = useRuntimeConfig();
    return navigateTo(config.public.extAbout, { redirectCode: 301, external:true } );
  }
  // カテゴリページリダイレクト
  if (to.path === "/categories/") {
    const config = useRuntimeConfig();
    return navigateTo(config.public.extCategories, { redirectCode: 301, external:true } );
  }
  // archiveページリダイレクト
  if (to.path === "/archive/") {
    const config = useRuntimeConfig();
    return navigateTo(config.public.extArchive, { redirectCode: 301, external:true } );
  }
});