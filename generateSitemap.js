const fs = require("fs-extra");
const { createSitemap } = require("xmlbuilder2");

async function generateSitemap() {
  const sitemap = createSitemap({ encoding: "UTF-8" });

  // Agrega las URLs de tu sitio web
  sitemap
    .ele("urlset")
    .ele("url")
    .ele("loc")
    .txt("https://agora-techsolutions.com/") // URL base de tu sitio

    .up() // Sube al elemento padre 'url'
    .ele("url")
    .ele("loc")
    .txt("https://agora-techsolutions.com/login") // URL de la página de login
    .up() // Sube al elemento padre 'url'
    .ele("url")
    .ele("loc")
    .txt("https://agora-techsolutions.com/register"); // URL de la página de registro

  // Agrega más URLs según la estructura de tu sitio web

  const sitemapXML = sitemap.end({ prettyPrint: true });

  // Guarda el archivo sitemap.xml en la carpeta de compilación
  await fs.writeFile("dist/sitemap.xml", sitemapXML);
}

generateSitemap()
  .then(() => console.log("Sitemap generado correctamente."))
  .catch((error) => console.error("Error al generar el sitemap:", error));
