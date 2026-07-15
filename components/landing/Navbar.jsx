'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

function LandingNavbar({ isMuted, setIsMuted }) {

    const clickNormalButton = useRef(null);
    const hoverNormalButton = useRef(null);

    useEffect(() => {
        clickNormalButton.current = new Audio("/assets/Landing/Audio/Click.m4a");
        hoverNormalButton.current = new Audio("/assets/Landing/Audio/HoverButtons.m4a");
    }, []);
    
    const [toggleHovered, setToggleHovered] = useState(false);
    const [hovered, setHovered] = useState({
        discord: false,
        tg: false,
        x: false,
    });

    const handleMouseEnter = (icon) => {
        setHovered({ ...hovered, [icon]: true });
    };

    const handleMouseLeave = (icon) => {
        setHovered({ ...hovered, [icon]: false });
    };

    const toggleSound = () => {
        setIsMuted(!isMuted);
      };

    const playNormalClick = () => {
        if (!isMuted && clickNormalButton.current) {
            clickNormalButton.current.currentTime = 0;
            clickNormalButton.current.play();
        }
    };

    const playNormalHover = () => {
        if (!isMuted && hoverNormalButton.current) {
            hoverNormalButton.current.currentTime = 0;
            hoverNormalButton.current.play();
        }
    };
    
    const getSoundIcon = () => {
        if (isMuted) {
            return toggleHovered
                ? "/assets/Landing/Buttons/soundOff_.webp"
                : "/assets/Landing/Buttons/soundOff.webp";
        }

        return toggleHovered
            ? "/assets/Landing/Buttons/soundOn_.webp"
            : "/assets/Landing/Buttons/soundOn.webp";
    };

    return (
       <>
        <SocialContainer>

            <ul>
                <StyledLi> 
                    <SoundToggleButton
                        src={getSoundIcon()}
                        alt="Toggle Sound"
                        onClick={() => { toggleSound(); playNormalClick(); }}
                        onMouseEnter={() => {
                            setToggleHovered(true);
                            playNormalHover();
                        }}
                        onMouseLeave={() => setToggleHovered(false)}
                    />
                </StyledLi>
                <StyledLi> 
                </StyledLi>
                <StyledLi> 
                    <a href="https://discord.gg/3y4y268Hwk" target="_blank" rel="noopener noreferrer">
                        <Icons
                            src={
                                hovered.discord
                                    ? "/assets/SocialMedia/discord_.webp"
                                    : "/assets/SocialMedia/discord.webp"
                            }
                            onClick={() => { playNormalClick(); }}
                            alt="Discord"
                            onMouseEnter={() => { handleMouseEnter('discord'); playNormalHover() }}
                            onMouseLeave={() => handleMouseLeave('discord')}
                        />
                    </a>
                </StyledLi>
                <StyledLi>
                    <a href="https://t.me/metaversalwar" target="_blank" rel="noopener noreferrer">
                        <Icons
                            src={
                                hovered.tg
                                    ? "/assets/SocialMedia/telegram_.webp"
                                    : "/assets/SocialMedia/telegram.webp"
                            }
                            onClick={() => { playNormalClick(); }}
                            alt="Telegram"
                            onMouseEnter={() => { handleMouseEnter('tg'); playNormalHover() }}
                            onMouseLeave={() => handleMouseLeave('tg')}
                        />
                    </a>
                </StyledLi>
                <StyledLi>
                    <a href="https://x.com/metaversalwar" target="_blank" rel="noopener noreferrer">
                        <Icons
                            src={
                                hovered.x
                                    ? "/assets/SocialMedia/x_.webp"
                                    : "/assets/SocialMedia/x.webp"
                            }
                            onClick={() => { playNormalClick(); }}
                            alt="X"
                            onMouseEnter={() => { handleMouseEnter('x'); playNormalHover() }}
                            onMouseLeave={() => handleMouseLeave('x')}
                        />
                    </a>
                </StyledLi>
            </ul>
        </SocialContainer>
        </> 
    );
}
const SocialContainer = styled.footer`
    bottom: 0;
    background-color: transparent;
    padding-right: 40px;
    width: 60%;
    height: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: right;
    

    ul {
        list-style-type: none;
        display: flex;
        gap: 4rem;
        color: #FFFFFF;
        background-color: transparent;
        transition: 0.7s ease-in-out;
        &:hover {
            color:#2d69fd;
        }

        @media (max-width: 576px) {
            gap: 2rem;
        }
    }

    @media (max-width: 1000px) {
        left: 25%;
        right: 25%;
    }

    @media (max-width: 630px) {
        left: 0%;
        right: 0%;

        ul {
            justify-content: space-around;
        }
    }
`;

const Icons = styled.img`
    width: 3vh;
    height: auto;
    opacity: 95%;
    background-color: transparent;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
    @media (max-width: 630px){
        width: 1.8vh;
    }

`;

const StyledLi = styled.li`
    position: relative;
    background-color: transparent;

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        height: 70%;
        width: 1px;
        background: linear-gradient(transparent 0%, #1b1b1b 30%, #1b1b1b 70%, transparent 100%),
        linear-gradient(transparent 0%, transparent 40%, #1b1b1b 60%, transparent 100%);
        top: 10%;
        right: -2rem;
    }

    @media (max-width: 630px) {
        &:not(:last-child)::after {
            right: -1rem;
        }
    }
`;

//***********************************************************************************

const SoundToggleButton = styled.img`
    width: 3vh;
    height: auto;
    opacity: 95%;
    background-color: transparent;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
    @media (max-width: 630px){
        width: 1.8vh;
    }

`;

export default LandingNavbar;
