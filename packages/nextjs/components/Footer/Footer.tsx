import { classes } from "./Footer.styles";
import { SocialMediaLinks } from "./SocialMediaLinks";

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <label className={classes.copyrightlabel}>
        Copyright © 2025 - All right reserved
      </label>

      <div className={classes.rightSection}>
        <label className={classes.copyrightlabel}>
          Coded by Chonete Builders
        </label>
        <SocialMediaLinks />
      </div>
    </footer>
  );
};
