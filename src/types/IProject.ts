import { BlockContentProps } from "@sanity/block-content-to-react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import IAuthor from "./IAuthor";

export default interface IProject {
    title: string;
    slug: string;
    author: IAuthor;
    mainImage: SanityImageSource;
    when: string;
    description: BlockContentProps["blocks"];
}
