import {
  Dribbble,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
} from "preact-feather";
import SocialLinkWrapperComponent from "./SocialLinkWrapperComponent.tsx";

export default function SocialLinksComponent(props: { socialAccounts: any }) {
  const { socialAccounts } = props;

  const svgProps = {
    size: 18,
    color: "#1f2937",
    "stroke-width": 2.5,
  };

  return (
    <div>
      <div class="flex justify-center mb-6 space-x-2">
        {socialAccounts?.twitter && (
          <SocialLinkWrapperComponent href={socialAccounts.twitter}>
            <Twitter {...svgProps} />
          </SocialLinkWrapperComponent>
        )}
        {socialAccounts?.instagram && (
          <SocialLinkWrapperComponent href={socialAccounts.instagram}>
            <Instagram {...svgProps} />
          </SocialLinkWrapperComponent>
        )}
        {socialAccounts?.youtube && (
          <SocialLinkWrapperComponent href={socialAccounts.youtube}>
            <Youtube {...svgProps} />
          </SocialLinkWrapperComponent>
        )}
        {socialAccounts?.linkedin && (
          <SocialLinkWrapperComponent href={socialAccounts.linkedin}>
            <Linkedin {...svgProps} />
          </SocialLinkWrapperComponent>
        )}
        {socialAccounts?.facebook && (
          <SocialLinkWrapperComponent href={socialAccounts.facebook}>
            <Facebook {...svgProps} />
          </SocialLinkWrapperComponent>
        )}
        {socialAccounts?.github && (
          <SocialLinkWrapperComponent href={socialAccounts.github}>
            <Github {...svgProps} />
          </SocialLinkWrapperComponent>
        )}
        {socialAccounts?.dribbble && (
          <SocialLinkWrapperComponent href={socialAccounts.dribbble}>
            <Dribbble {...svgProps} />
          </SocialLinkWrapperComponent>
        )}
        {socialAccounts?.website && (
          <SocialLinkWrapperComponent href={socialAccounts.website}>
            <Globe {...svgProps} />
          </SocialLinkWrapperComponent>
        )}
        {socialAccounts?.mail && (
          <SocialLinkWrapperComponent href={`mailto:${socialAccounts.mail}`}>
            <Mail {...svgProps} />
          </SocialLinkWrapperComponent>
        )}
      </div>
    </div>
  );
}
