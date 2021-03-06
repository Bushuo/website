import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    useGetProjectsDescQuery,
    GetProjectsDescQuery,
} from "../generated/graphql";

import extractYearFromDateString from "../utils/extractYearFromDateString";
import ProjectCard from "./ProjectCard";

interface ProjectsProps {}

interface ProjectMap {
    [year: string]: GetProjectsDescQuery["projects"];
}

const Projects: React.FC<ProjectsProps> = () => {
    const [projectMap, setProjectMap] = useState<ProjectMap | null>(null);

    const { data, loading } = useGetProjectsDescQuery();

    useEffect(() => {
        if (!data?.projects) return;

        const map: ProjectMap = {};
        data.projects.forEach((p) => {
            const year = extractYearFromDateString(p.endDate);
            if (!map[year]) {
                map[year] = [];
            }
            map[year].push(p);
        });
        setProjectMap(map);
    }, [data, setProjectMap]);

    if (!data?.projects || loading) return null;

    return (
        <Container>
            <H2 id="projects">Projects</H2>
            {projectMap &&
                Object.keys(projectMap)
                    .sort((a, b) => Number(b) - Number(a))
                    .map((key) => (
                        <ProjectGroup
                            key={`projects-${key}`}
                            id={`projects-${key}`}
                        >
                            <H3>{key}</H3>
                            {projectMap[key].map((project, index) => (
                                <ProjectCard
                                    key={`project-${index}`}
                                    {...{ project }}
                                />
                            ))}
                        </ProjectGroup>
                    ))}
        </Container>
    );
};

const Container = styled.section`
    background-color: #eee;
    padding-bottom: 2rem;
`;

const H2 = styled.h2`
    padding-left: 2rem;
    padding-top: 1rem;
    font-size: 2rem;
    @media (max-width: 1550px) {
        font-size: 1.5rem;
    }
`;

const H3 = styled.h2`
    font-size: 2rem;
    background-color: #17202f;
    color: white;
    width: min-content;

    padding-left: 2rem;
    padding-right: 1rem;

    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const ProjectGroup = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    article:nth-child(2n + 1) {
        align-self: flex-end;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
    }

    article:nth-child(2n) {
        align-self: flex-start;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
    }
`;

export default Projects;
