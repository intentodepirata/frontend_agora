const fs = require("fs-extra");
const { createSitemap } = require("xmlbuilder2");

async function generateSitemap() {
  const sitemap = createSitemap({ encoding: "UTF-8" });

  sitemap
    .ele("urlset")
    .ele("url")
    .ele("loc")
    .txt("https://agora-techsolutions.com/")

    .up()
    .ele("url")
    .ele("loc")
    .txt("https://agora-techsolutions.com/login")
    .up()
    .ele("url")
    .ele("loc")
    .txt("https://agora-techsolutions.com/register");

  const sitemapXML = sitemap.end({ prettyPrint: true });

  await fs.writeFile("dist/sitemap.xml", sitemapXML);
}

generateSitemap()
  .then(() => console.log("Sitemap generado correctamente."))
  .catch((error) => console.error("Error al generar el sitemap:", error));
