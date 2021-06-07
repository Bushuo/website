import BlockContent from "@sanity/block-content-to-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SocialIcon } from "react-social-icons";

import sanityClient from "../utils/client";
import urlFor from "../utils/urlFor";
import ScrollDown from "../ScrollDown";
import IAuthor from "../types/IAuthor";

interface IntroProps {}

const Intro: React.FC<IntroProps> = () => {
    const [author, setAuthor] = useState<IAuthor | null>(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "author"] [0] {
                    name,
                    image,
                    tagline,
                    bio,
                }`
            )
            .then(setAuthor)
            .catch(console.error);
    }, []);

    return (
        author && (
            <Section id="me">
                <div>
                    <AuthorImg
                        src={urlFor(author.image).url() ?? undefined}
                        alt="Black and white photograph of author"
                    />
                    <IconContainer>
                        <SocialIcon
                            url="https://github.com/Bushuo"
                            target="_blank"
                            style={{
                                width: 40,
                                height: 40,
                                marginLeft: 10,
                                marginTop: 10,
                            }}
                            bgColor="#17202f"
                        />
                        <SocialIcon
                            url="https://instagram.com/le_pole"
                            target="_blank"
                            style={{
                                width: 40,
                                height: 40,
                                marginLeft: 10,
                                marginTop: 10,
                            }}
                            bgColor="#17202f"
                        />
                    </IconContainer>
                </div>
                <TextContainer>
                    <H1>{author.name}</H1>
                    <H2>{author.tagline}</H2>
                    <Bio blocks={author.bio} />
                </TextContainer>
                <ScrollDown />
            </Section>
        )
    );
};

const Section = styled.section`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    position: relative;
`;

const IconContainer = styled.div`
    display: flex;
`;

const H1 = styled.h1`
    font-size: 4rem;
`;

const H2 = styled.h2`
    margin-top: 1rem;
    font-size: 2rem;
    @media (max-width: 1550px) {
        font-size: 1.5rem;
    }
`;

const AuthorImg = styled.img`
    height: 500px;
    width: auto;
    border-bottom-right-radius: 80px;
    @media (max-width: 1550px) {
        height: 300px;
    }
`;

const Bio = styled(BlockContent)`
    margin-top: 1rem;
    font-size: 1rem;
    max-width: 700px;
    p {
        margin-top: 1rem;
    }
    a {
        text-decoration: none;
    }
`;

const TextContainer = styled.div`
    padding-left: 3rem;
    padding-right: 3rem;
    color: #17202f;
`;

export default Intro;
