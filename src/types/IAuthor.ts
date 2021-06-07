import { BlockContentProps } from "@sanity/block-content-to-react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export default interface IAuthor {
    name: string;
    slug: string;
    image: SanityImageSource;
    tagline: string;
    bio: BlockContentProps["blocks"];
}
