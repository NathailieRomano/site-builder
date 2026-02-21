import { Config } from "@puckeditor/core";
import React from "react";
import { AnimationWrapper, animationFields, defaultAnimation } from "@/components/blocks/AnimationWrapper";
import type { AnimationSettings } from "@/components/blocks/AnimationWrapper";
import { HeroConfig } from "@/components/blocks/Hero";
import { TextBlockConfig } from "@/components/blocks/TextBlock";
import { ImageBlockConfig } from "@/components/blocks/ImageBlock";
import { GalleryConfig } from "@/components/blocks/Gallery";
import { CTAButtonConfig } from "@/components/blocks/CTAButton";
import { ContactFormConfig } from "@/components/blocks/ContactForm";
import { SpacerConfig } from "@/components/blocks/Spacer";
import { DividerConfig } from "@/components/blocks/Divider";
import { TestimonialsConfig } from "@/components/blocks/Testimonials";
import { FAQConfig } from "@/components/blocks/FAQ";
import { VideoEmbedConfig } from "@/components/blocks/VideoEmbed";
import { NavigationConfig } from "@/components/blocks/Navigation";
import { FooterConfig } from "@/components/blocks/Footer";
import { SocialLinksConfig } from "@/components/blocks/SocialLinks";
import { OpeningHoursConfig } from "@/components/blocks/OpeningHours";
import { GoogleMapConfig } from "@/components/blocks/GoogleMap";
import { IconBlockConfig } from "@/components/blocks/IconBlock";
import { FormBuilderConfig } from "@/components/blocks/FormBuilder";
import { ColumnsConfig } from "@/components/blocks/Columns";

// Blocks that should NOT get animation controls (structural elements)
const noAnimateBlocks = new Set(["Navigation", "Footer", "Spacer", "Divider"]);

// Wrap a block config with animation fields + wrapper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withAnimation(config: any, name: string): any {
  if (noAnimateBlocks.has(name)) return config;

  const OriginalRender = config.render;
  return {
    ...config,
    fields: {
      ...config.fields,
      ...animationFields,
    },
    defaultProps: {
      ...config.defaultProps,
      animation: defaultAnimation,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: function AnimatedBlock(props: any) {
      const { animation, ...rest } = props;
      return React.createElement(
        AnimationWrapper,
        { animation: animation || defaultAnimation, children: React.createElement(OriginalRender, rest) }
      );
    },
  };
}

const rawComponents: Record<string, unknown> = {
  Hero: HeroConfig,
  TextBlock: TextBlockConfig,
  ImageBlock: ImageBlockConfig,
  Gallery: GalleryConfig,
  CTAButton: CTAButtonConfig,
  ContactForm: ContactFormConfig,
  Testimonials: TestimonialsConfig,
  FAQ: FAQConfig,
  Video: VideoEmbedConfig,
  Navigation: NavigationConfig,
  Footer: FooterConfig,
  SocialLinks: SocialLinksConfig,
  OpeningHours: OpeningHoursConfig,
  GoogleMap: GoogleMapConfig,
  Icon: IconBlockConfig,
  FormBuilder: FormBuilderConfig,
  Columns: ColumnsConfig,
  Spacer: SpacerConfig,
  Divider: DividerConfig,
};

// Apply animation wrapper to all eligible blocks
const components: Record<string, unknown> = {};
for (const [name, config] of Object.entries(rawComponents)) {
  components[name] = withAnimation(config, name);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const puckConfig: Config<any> = { components: components as any };

export default puckConfig;
