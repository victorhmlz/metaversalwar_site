'use client';

import styled, { keyframes } from 'styled-components';

const slideLeft = keyframes`
  0% {
    transform: translateX(30%); 
  }
  100% {
    transform: translateX(-150%); 
  }
`;

const slideRight = keyframes`
  0% {
    transform: translateX(-30%); 
  }
  100% {
    transform: translateX(155%); 
  }
`;

const slideRightBack = keyframes`
  0% {
    transform: translateX(200%); 
  }
  100% {
    transform: translateX(-30%); 
  }
`;

const slideLeftBack = keyframes`
  0% {
    transform: translateX(-195%); 
  }
  100% {
    transform: translateX(30%);
  }
`;

const flickerIn = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  10.1% {
    opacity: 1;
  }
  10.2% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  20.1% {
    opacity: 1;
  }
  20.6% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  30.1% {
    opacity: 1;
  }
  30.5% {
    opacity: 1;
  }
  30.6% {
    opacity: 0;
  }
  45% {
    opacity: 0;
  }
  45.1% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  55.1% {
    opacity: 0;
  }
  57% {
    opacity: 0;
  }
  57.1% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  60.1% {
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  65.1% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75.1% {
    opacity: 0;
  }
  77% {
    opacity: 0;
  }
  77.1% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  85.1% {
    opacity: 0;
  }
  86% {
    opacity: 0;
  }
  86.1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const HologramButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: 150px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover .left-icon {
    animation: ${slideLeft} 0.5s forwards;
  }

  &:hover .right-icon {
    animation: ${slideRight} 0.5s forwards;
  }

  &:not(:hover) .left-icon {
    animation: ${slideLeftBack} 0.5s forwards;
  }

  &:not(:hover) .right-icon {
    animation: ${slideRightBack} 0.5s forwards;
  }

  &:hover .back-icon {
    animation: ${flickerIn} 0.5s forwards;
    visibility: visible;
    opacity: 0.9;
  }

  &:hover .backbutton-icon {
    opacity: 1;
  }

  &:not(:hover) .backbutton-icon {
    animation: ${flickerIn} 0.5s forwards;
  }

  &:hover .spabutton-icon {
    opacity: 1;
  }

  &:not(:hover) .spabutton-icon {
    animation: ${flickerIn} 0.5s forwards;
    opacity: 0.8;
  }

  &:hover .legbutton-icon {
    opacity: 1;
  }

  &:not(:hover) .legbutton-icon {
    animation: ${flickerIn} 0.5s forwards;
    opacity: 0.8;
  }
  
  &:hover .primary-icon {
    opacity: 0;
  }

  &:not(:hover) .primary-icon {
    animation: ${flickerIn} 0.5s forwards;
    opacity: 0.9;
  }
  
  &:hover .secondary-icon {
    animation: ${flickerIn} 0.5s forwards;
    opacity: 1;
  }

  &:not(:hover) .secondary-icon {
    opacity: 0;
  }
`;

const LeftIcon = styled.img.attrs({
    src: "/assets/Landing/Buttons/left.webp"
  })`
    position: absolute;
    left: 25%;
    width: 14%;
    height: auto;
    z-index: 2;
  `;
  
  const RightIcon = styled.img.attrs({
    src: "/assets/Landing/Buttons/right.webp"
  })`
    position: absolute;
    right: 25%;
    width: 14%;
    height: auto;
    z-index: 2; 
  `;
  
  const BackIcon = styled.img.attrs({
      src: "/assets/Landing/Buttons/back.webp"
    })`
      position: absolute;
      width: 90%;
      height: auto;
      z-index: 1; 
      visibility: hidden; 
      opacity: 0;
    `;

    const GameIcon = styled.img.attrs({
      src: "/assets/Landing/Buttons/game.webp"
      })`
          position: absolute;
          width: 95%;
          height: auto;
          z-index: 1;
      `;

    const MainGameIcon = styled.img.attrs({
      src: "/assets/Landing/Buttons/maingamesite.webp"
      })`
          position: absolute;
          width: 95%;
          height: auto;
          z-index: 1;
      `;

    const EarnIcon = styled.img.attrs({
      src: "/assets/Landing/Buttons/earn.webp"
      })`
          position: absolute;
          width: 95%;
          height: auto;
          z-index: 1;
      `;

    const ClickToEarnIcon = styled.img.attrs({
      src: "/assets/Landing/Buttons/clicktoearn.webp"
      })`
          position: absolute;
          width: 95%;
          height: auto;
          z-index: 1;
      `;
    
    const KnowUsIcon = styled.img.attrs({
      src: "/assets/Landing/Buttons/know.webp"
      })`
          position: absolute;
          width: 95%;
          height: auto;
          z-index: 1;
      `;

    const WhitepaperIcon = styled.img.attrs({
      src: "/assets/Landing/Buttons/gotowhitepaper.webp"
      })`
          position: absolute;
          width: 95%;
          height: auto;
          z-index: 1;
      `;
    
    const ScanIcon = styled.img.attrs({
      src: "/assets/Landing/Buttons/scan.webp"
      })`
          position: absolute;
          width: 95%;
          height: auto;
          z-index: 1;
      `;

    const ScanPrimarisIcon = styled.img.attrs({
      src: "/assets/Landing/Buttons/primaristoken.webp"
      })`
          position: absolute;
          width: 95%;
          height: auto;
          z-index: 1;
      `;
  
    export const MainGameButton = ({ onClick, onMouseEnter, onMouseLeave }) => {
      return (
          <HologramButton onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <BackIcon className="back-icon" />
              <LeftIcon className="left-icon" />
              <RightIcon className="right-icon" />
              <GameIcon className="primary-icon" />
              <MainGameIcon className="secondary-icon" />
          </HologramButton>
      );
    };

    export const ClickToEarnButton = ({ onClick, onMouseEnter, onMouseLeave }) => {
      return (
          <HologramButton onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <BackIcon className="back-icon" />
              <LeftIcon className="left-icon" />
              <RightIcon className="right-icon" />
              <EarnIcon className="primary-icon" />
              <ClickToEarnIcon className="secondary-icon" />
          </HologramButton>
      );
    };

    export const KnowUsButton = ({ onClick, onMouseEnter, onMouseLeave }) => {
      return (
          <HologramButton onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <BackIcon className="back-icon" />
              <LeftIcon className="left-icon" />
              <RightIcon className="right-icon" />
              <KnowUsIcon className="primary-icon" />
              <WhitepaperIcon className="secondary-icon" />
          </HologramButton>
      );
    };

    export const ScanButton = ({ onClick, onMouseEnter, onMouseLeave }) => {
      return (
          <HologramButton onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <BackIcon className="back-icon" />
              <LeftIcon className="left-icon" />
              <RightIcon className="right-icon" />
              <ScanIcon className="primary-icon" />
              <ScanPrimarisIcon className="secondary-icon" />
          </HologramButton>
      );
    };



