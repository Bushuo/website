import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ScrollDownProps {}

function useEventListener(
    eventName: string,
    handler: (e: Event) => void,
    element = window
) {
    const savedHandler = useRef<typeof handler>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported || savedHandler.current === undefined) return;

        const eventListener = (e: Event) => savedHandler.current!(e);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}

const ScrollDown: React.FC<ScrollDownProps> = () => {
    const [hasScrolled, setHasScrolled] = useState(false);

    const scrollHandler = useCallback(() => {
        setHasScrolled(true);
    }, [setHasScrolled]);

    useEventListener("scroll", scrollHandler);

    return !hasScrolled ? <Container>Scroll Down</Container> : null;
};

const Container = styled.div`
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    padding: 0.5rem;
    background-color: #17202f;
    writing-mode: vertical-lr;
    color: white;
`;

export default ScrollDown;
