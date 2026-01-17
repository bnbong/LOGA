import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community - League of Gacha",
  description:
    "Share your dream LoL rosters with the community! Discover amazing team combinations, like rosters, and discuss strategies with League of Legends esports fans.",
  openGraph: {
    title: "Community - League of Gacha",
    description:
      "Share and discover amazing LoL pro player rosters from the community",
    url: "https://league-of-gacha.pages.dev/community",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
