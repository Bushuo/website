import React, { useEffect, useState } from "react";
import styled from "styled-components";

import IProject from "../types/IProject";
import sanityClient from "../utils/client";
import extractYearFromDateString from "../utils/extractYearFromDateString";
import { ReactComponent as Logo } from "../pblogo.svg";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const [projectYears, setProjectsYears] = useState<string[] | null>(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "project"] {
                    when
                }`
            )
            .then((data) => {
                const years: { [key: string]: number } = {};
                (data as IProject[]).forEach((project) => {
                    const year = extractYearFromDateString(project.when);
                    if (year) {
                        years[year] = 1;
                    }
                });

                setProjectsYears(
                    Object.keys(years).sort((a, b) => Number(b) - Number(a))
                );
            })
            .catch(console.error);
    }, []);

    return (
        <Header>
            <Nav>
                <Logo width={50} height={50} viewBox="0 0 252 252" />
                <NavLink href="#projects">Projects</NavLink>
                {projectYears &&
                    projectYears.map((year, index) => (
                        <NavLink href={`#projects-${year}`} key={index}>
                            {year}
                        </NavLink>
                    ))}
            </Nav>
        </Header>
    );
};

const Header = styled.header`
    background-color: #17202f;
`;

const Nav = styled.nav`
    height: 60px;
    color: white;
    display: flex;
    align-items: center;
`;

const NavLink = styled.a`
    color: white;
    text-decoration: none;
    padding: 1rem;
`;

export default Navbar;
