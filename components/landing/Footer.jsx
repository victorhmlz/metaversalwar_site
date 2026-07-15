'use client';

import { useRef, useEffect } from 'react';
import styled from 'styled-components';

function Footer({ isMuted}) {

    const clickNormalButton = useRef(null);
    const hoverNormalButton = useRef(null);

    useEffect(() => {
        clickNormalButton.current = new Audio("/assets/Landing/Audio/Click.m4a");
        hoverNormalButton.current = new Audio("/assets/Landing/Audio/HoverButtons.m4a");
    }, []);

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

    return (
     
        <SocialContainer>

            <ul>
                <PartnersImage
                    src="/assets/Landing/Footer/Partners.webp"
                    alt="Partners"
                />
                <StyledLi> 
                    <a href="https://pinksale.finance" target="_blank" rel="noopener noreferrer">
                        <Icons
                            src="/assets/Landing/Footer/PinksaleLogo.webp"
                            onClick={() => { playNormalClick(); }}
                            alt="Pinksale"
                            onMouseEnter={() => { playNormalHover() }}
                        />
                    </a>
                </StyledLi>
                <StyledLi>
                    <a href="https://dexview.com" target="_blank" rel="noopener noreferrer">
                        <Icons
                            src="/assets/Landing/Footer/DexViewLogo.webp"
                            onClick={() => { playNormalClick(); }}
                            alt="DexView"
                            onMouseEnter={() => { playNormalHover() }}
                        />
                    </a>
                </StyledLi>
            </ul>
        </SocialContainer>
    
    );
}
const SocialContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: transparent;
  padding-right: 40px;
  width: 100%;
  height: 60px; 
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

    ul {
        position: relative;
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
    width: 100px;
    height: auto;
    opacity: 85%;
    background-color: transparent;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
        opacity: 100%;
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

const PartnersImage = styled.img`
    width: 80px;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    opacity: 0.8;
`;

export default Footer;
