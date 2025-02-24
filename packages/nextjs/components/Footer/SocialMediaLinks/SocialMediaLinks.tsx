"use client";

import {
  IconBrandGithub,
  IconBrandX,
  IconBrandDiscordFilled,
} from "@tabler/icons-react";
import { classes } from "./SocialMediaLinks.styles";
import { SOCIAL_MEDIA_URLS } from "./SocialMediaLinks.data";

const socialMediaIcons = [
  {
    icon: IconBrandGithub,
    url: SOCIAL_MEDIA_URLS.Github,
    label: "Github",
  },
  {
    icon: IconBrandX,
    url: SOCIAL_MEDIA_URLS.X,
    label: "X",
  },
  {
    icon: IconBrandDiscordFilled,
    url: SOCIAL_MEDIA_URLS.Discord,
    label: "Discord",
  },
];

export const SocialMediaLinks = () => {
  return (
    <div className={classes.container}>
      {socialMediaIcons.map(({ icon: Icon, url, label }) => (
        <Icon
          key={label}
          className={classes.icon}
          size={24}
          onClick={() => window.open(url, "_blank")}
          aria-label={`Open ${label}`}
          role="button"
        />
      ))}
    </div>
  );
};
