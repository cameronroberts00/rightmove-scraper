const cheerio = require("cheerio");

const searchUrl =
  "https://www.rightmove.co.uk/property-to-rent/find.html?searchType=RENT&locationIdentifier=REGION%5E1019&insId=1&radius=0.0&minPrice=&maxPrice=&minBedrooms=&maxBedrooms=&displayPropertyType=&maxDaysSinceAdded=&sortByPriceDescending=&_includeLetAgreed=on&primaryDisplayPropertyType=&secondaryDisplayPropertyType=&oldDisplayPropertyType=&oldPrimaryDisplayPropertyType=&letType=&letFurnishType=&houseFlatShare=";

const getData = async () => {
  const res = fetch(searchUrl);
  const response = await res;
  const html = await response.text();
  const $ = cheerio.load(html);
  const propertyCards = $("div.propertyCard-wrapper");
  let results = [];

  propertyCards.each((_, e) => {
    const rawHTML = $(e);
    // console.log(
    //   rawHTML.find(".propertyCard-content a.propertyCard-link").attr("href")
    // );
    results.push({
      name: rawHTML.find(".propertyCard-address").text().trim(),
      link: `https://www.rightmove.co.uk${rawHTML
        .find(".propertyCard-content a.propertyCard-link")
        .attr("href")}`,
      price: rawHTML.find(".propertyCard-priceValue").text().trim(),
      description: rawHTML.find(".propertyCard-description").text().trim(),
    });
  });
  console.log(results);
};

getData();
