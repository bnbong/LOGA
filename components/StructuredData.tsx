import Script from "next/script";

interface StructuredDataProps {
  type: "WebApplication" | "WebSite" | "Organization";
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "WebApplication":
        return {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: data.name || "League of Gacha",
          description:
            data.description ||
            "Build your dream League of Legends roster with pro players",
          url: data.url || "https://league-of-gacha.pages.dev",
          applicationCategory: "GameApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          aggregateRating: data.rating && {
            "@type": "AggregateRating",
            ratingValue: data.rating.value,
            ratingCount: data.rating.count,
          },
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "League of Gacha",
          url: "https://league-of-gacha.pages.dev",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://league-of-gacha.pages.dev/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        };

      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "League of Gacha",
          url: "https://league-of-gacha.pages.dev",
          logo: "https://league-of-gacha.pages.dev/lol.webp",
          sameAs: ["https://twitter.com/leagueofgacha"],
        };

      default:
        return {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
