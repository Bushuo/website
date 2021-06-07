import BlockContent from "@sanity/block-content-to-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import IProject from "../types/IProject";
import urlFor from "../utils/urlFor";

interface ProjectCardProps {
    project: IProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [dateParts, setDateParts] = useState<string[]>([]);
    const [imgUrl, setImgUrl] = useState<string | null>(null);

    useEffect(() => {
        setImgUrl(urlFor(project.mainImage).url());
        setDateParts(project.when.split("-").slice(1, 3));
    }, [project]);

    if (!imgUrl) return null;

    return (
        <Container url={imgUrl}>
            <Grid>
                <DateColumn>
                    {dateParts.map((part) => (
                        <Date>{part}</Date>
                    ))}
                    <H3>{project.title}</H3>
                </DateColumn>
                <Description blocks={project.description} />
            </Grid>
        </Container>
    );
};

const ImgContainer: React.FC<
    { url: string } & React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    >
> = ({ children, ...props }) => <article {...props}>{children}</article>;

const Container = styled(ImgContainer)`
    background-image: linear-gradient(#17202fbb, #17202fbb),
        url(${(props) => props.url});
    background-size: cover;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    height: 400px;
    width: 40%;
    color: white;
    padding: 1rem;
`;

const Date = styled.span`
    font-size: 2rem;
    font-weight: 900;
`;

const DateColumn = styled.div`
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > :nth-child(2) {
        border-bottom: 5px solid white;
        width: min-content;
        margin-bottom: 1rem;
    }
`;

const H3 = styled.h3`
    font-size: 2rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
`;

const Description = styled(BlockContent)`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    justify-content: center;
    p {
        margin-top: 1rem;
    }
    a {
        color: turquoise;
        text-decoration: none;
    }
    a:hover {
        color: azure;
    }
`;

export default ProjectCard;
