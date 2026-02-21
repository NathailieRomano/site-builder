import { Config } from "@puckeditor/core";
import { HeroConfig } from "@/components/blocks/Hero";
import { TextBlockConfig } from "@/components/blocks/TextBlock";
import { ImageBlockConfig } from "@/components/blocks/ImageBlock";
import { GalleryConfig } from "@/components/blocks/Gallery";
import { CTAButtonConfig } from "@/components/blocks/CTAButton";
import { ContactFormConfig } from "@/components/blocks/ContactForm";
import { SpacerConfig } from "@/components/blocks/Spacer";
import { DividerConfig } from "@/components/blocks/Divider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const puckConfig: Config<any> = {
  components: {
    Hero: HeroConfig as any,
    TextBlock: TextBlockConfig as any,
    ImageBlock: ImageBlockConfig as any,
    Gallery: GalleryConfig as any,
    CTAButton: CTAButtonConfig as any,
    ContactForm: ContactFormConfig as any,
    Spacer: SpacerConfig as any,
    Divider: DividerConfig as any,
  },
};

export default puckConfig;
