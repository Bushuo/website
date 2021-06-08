import React, { useEffect, useState } from "react";
import styled from "styled-components";

import extractYearFromDateString from "../utils/extractYearFromDateString";
import { ReactComponent as Logo } from "../pblogo.svg";
import { useGetProjectDatesQuery } from "../generated/graphql";

interface YearMap {
    [date: string]: boolean;
}
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const { data, loading } = useGetProjectDatesQuery();

    const [projectYears, setProjectsYears] = useState<string[] | null>(null);

    useEffect(() => {
        if (!data?.projects) return;

        const yearMap: YearMap = {};
        data.projects.forEach((p) => {
            yearMap[extractYearFromDateString(p.endDate)] = true;
        });
        setProjectsYears(
            Object.keys(yearMap).sort((a, b) => Number(b) - Number(a))
        );
    }, [data, setProjectsYears]);

    return (
        <Header>
            <Nav>
                <Logo width={50} height={50} viewBox="0 0 252 252" />
                <NavLink href="#projects">Projects</NavLink>
                {!loading &&
                    projectYears &&
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
