'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { MainGameButton, ClickToEarnButton, KnowUsButton, ScanButton } from './HolographicButtons';
import LandingNavbar from './Navbar';
import Footer from './Footer';
import Background from './Background';
import LoadingScreen from './Loading';

function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClickToContinue, setShowClickToContinue] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const soundtrack = useRef();
  const hoverHolographicButton = useRef();
  const leaveHolographicButton = useRef();
  const clickHolographicButton = useRef();

  useEffect(() => {
    soundtrack.current = new Audio("/assets/Landing/Audio/Soundtrack.m4a");

    hoverHolographicButton.current =
        new Audio("/assets/Landing/Audio/HologButtonEnter.m4a");

    leaveHolographicButton.current =
        new Audio("/assets/Landing/Audio/HologButtonLeave.m4a");

    clickHolographicButton.current =
        new Audio("/assets/Landing/Audio/ClickHologram.m4a");

    // Mostrar pantalla de carga y luego "Click to Continue" solo en el primer montaje
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setLoading(false);
        setShowClickToContinue(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
      setShowClickToContinue(false);
    }
  }, [hasInteracted]);

  // Control de sonido de fondo
  useEffect(() => {
    if (isPlaying && !isMuted) {
      soundtrack.current.loop = true;
      soundtrack.current.volume = 0.4;
      hoverHolographicButton.current.volume = 0.4;
      soundtrack.current.play().catch((error) => console.log("Error al reproducir el soundtrack:", error));
    } else {
      soundtrack.current.pause();
    }
  }, [isPlaying, isMuted]);

  // Maneja el clic en "Click to Continue"
  const handleContinueClick = () => {
    setIsPlaying(true);
    setIsMuted(false);
    setHasInteracted(true);
    playHolographicClick();
    setShowClickToContinue(false);
  };

  // Función para manejar el silencio
  const handleStop = () => {
    soundtrack.current.pause();
  }

  // Reproduce sonido de hover si no está en silencio y el usuario ha interactuado
  const playHolographicHover = () => {
    if (!isMuted && isPlaying) {
      hoverHolographicButton.current.currentTime = 0.1;
      hoverHolographicButton.current.play().catch((error) => console.log("Error al reproducir hover:", error));
    }
  };

  const playHolographicLeave = () => {
    if (!isMuted && isPlaying) {
      leaveHolographicButton.current.currentTime = 1.1;
      leaveHolographicButton.current.volume= 0.1;
      leaveHolographicButton.current.play().catch((error) => console.log("Error al reproducir leave:", error));
    }
  };

  // Reproduce sonido de click si no está en silencio
  const playHolographicClick = () => {
    if (!isMuted) {
      clickHolographicButton.current.currentTime = 0;
      clickHolographicButton.current.play().catch((error) => console.log("Error al reproducir click:", error));
    }
  };

  return (
    <MainContainer>
      {loading ? (
        <LoadingContainer>
          <LoadingScreen />
        </LoadingContainer>
      ) : showClickToContinue ? (
        <LoadingContainer onClick={handleContinueClick}>
          <ContinueImage
              src="/assets/Landing/Buttons/continuebutton.webp"
              alt="Continue"
          />
        </LoadingContainer>
      ) : (
        <>
          <FrontContainer>
            <TopContainer>
              <TokenLogoContainer>
                <TokenLogo
                    src="/assets/Landing/PrimarisLogo.webp"
                    alt="Logo"
                />
              </TokenLogoContainer>
              <LandingNavbar isMuted={isMuted} setIsMuted={setIsMuted} />
            </TopContainer>
            <CentralContainer>
              <LogoImage
                  src="/assets/Landing/METAVERSALWARLOGO.webp"
                  alt="Logo"
              />
              <ButtonsContainer>
                <MainGameButton 
                    onClick={() => { window.open('https://odesofwar.com', '_blank'); playHolographicClick(); handleStop() }}
                    onMouseEnter={playHolographicHover}
                    onMouseLeave={playHolographicLeave}
                />
                <ClickToEarnButton 
                    onClick={() => { window.open('https://primaris.metaversalwar.com', '_blank'); playHolographicClick(); }}
                    onMouseEnter={playHolographicHover}
                    onMouseLeave={playHolographicLeave}
                />
                <KnowUsButton 
                    onClick={() => { window.open('https://docs.metaversalwar.com/', '_blank'); playHolographicClick(); }}
                    onMouseEnter={playHolographicHover}
                    onMouseLeave={playHolographicLeave}
                />
                <ScanButton 
                    onClick={() => { window.open('https://polygonscan.com/token/0x529515c23c44c0d4057e13427cb54a2f52dc5c61', '_blank'); playHolographicClick(); }}
                    onMouseEnter={playHolographicHover}
                    onMouseLeave={playHolographicLeave}
                />
              </ButtonsContainer>
              
            </CentralContainer>
          </FrontContainer>
          <AnimationContainer>
            <Background />
          </AnimationContainer>
          <Footer />
        </>
      )}
    </MainContainer>
  );
}

export default function PrimarisWebsite() {
    return (
      <LandingPage />
    );
}

//************************************************************

const fadeIn = keyframes `
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
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
  }
`;

const flicker = keyframes`
  0%,
  100% {
    opacity: 1;
  }
  -0.02% {
    opacity: 1;
  }
  0% {
    opacity: 1;
  }
  1% {
    opacity: 1;
  }
  1.02% {
    opacity: 1;
  }
  8.98% {
    opacity: 1;
  }
  9% {
    opacity: 0;
  }
  9.8% {
    opacity: 0;
  }
  9.82% {
    opacity: 1;
  }
  9.48% {
    opacity: 1;
  }
  9.5% {
    opacity: 1;
  }
  9.6% {
    opacity: 1;
  }
  9.62% {
    opacity: 1;
  }
  14.98% {
    opacity: 1;
  }
  15% {
    opacity: 0.5;
  }
  15.8% {
    opacity: 0.5;
  }
  15.82% {
    opacity: 1;
  }
  15.18% {
    opacity: 1;
  }
  15.2% {
    opacity: 0.7;
  }
  16% {
    opacity: 0.7;
  }
  16.02% {
    opacity: 1;
  }
  15.48% {
    opacity: 1;
  }
  15.5% {
    opacity: 0.5;
  }
  16.2% {
    opacity: 0.5;
  }
  16.22% {
    opacity: 1;
  }
  16.98% {
    opacity: 1;
  }
  17% {
    opacity: 1;
  }
  17.8% {
    opacity: 1;
  }
  17.82% {
    opacity: 1;
  }
  20.48% {
    opacity: 1;
  }
  20.5% {
    opacity: 0.9;
  }
  21.3% {
    opacity: 0.9;
  }
  21.32% {
    opacity: 1;
  }
  20.98% {
    opacity: 1;
  }
  21% {
    opacity: 1;
  }
  22% {
    opacity: 1;
  }
  22.02% {
    opacity: 1;
  }
  39.98% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  41% {
    opacity: 1;
  }
  41.02% {
    opacity: 1;
  }
  40.48% {
    opacity: 1;
  }
  40.5% {
    opacity: 0.6;
  }
  41.4% {
    opacity: 0.6;
  }
  41.42% {
    opacity: 1;
  }
  41.98% {
    opacity: 1;
  }
  42% {
    opacity: 1;
  }
  42.8% {
    opacity: 1;
  }
  42.82% {
    opacity: 1;
  }
  59.98% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  61% {
    opacity: 1;
  }
  61.02% {
    opacity: 1;
  }
  60.18% {
    opacity: 1;
  }
  60.2% {
    opacity: 0.2;
  }
  61% {
    opacity: 0.2;
  }
  61.02% {
    opacity: 1;
  }
  60.78% {
    opacity: 1;
  }
  60.8% {
    opacity: 0.4;
  }
  61.6% {
    opacity: 0.4;
  }
  61.62% {
    opacity: 1;
  }
  61.38% {
    opacity: 1;
  }
  61.4% {
    opacity: 0;
  }
  62.2% {
    opacity: 0;
  }
  62.22% {
    opacity: 1;
  }
  61.78% {
    opacity: 1;
  }
  61.8% {
    opacity: 1;
  }
  62.8% {
    opacity: 1;
  }
  62.82% {
    opacity: 1;
  }
  75.98% {
    opacity: 1;
  }
  76% {
    opacity: 1;
  }
  77% {
    opacity: 1;
  }
  77.02% {
    opacity: 1;
  }
  77.98% {
    opacity: 1;
  }
  78% {
    opacity: 0.7;
  }
  78.8% {
    opacity: 0.7;
  }
  78.82% {
    opacity: 1;
  }
  78.98% {
    opacity: 1;
  }
  79% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  80.02% {
    opacity: 1;
  }
  99.98% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
  101% {
    opacity: 1;
  }
  101.02% {
    opacity: 1;
  }
}
`;

//************************************************************  

const MainContainer = styled.div`
  background-color: #0c0d10;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row; 
`;

const FrontContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(12, 13, 16, 0.7); 
  position: fixed; 
  display: flex;
  flex-direction: column;
  z-index: 3;
  pointer-events: none; 
`;

//**************************************************

const TopContainer = styled.div`
  position: relative;
  z-index: 99;
  display: flex;
  width: 100%;
  height: 10%;
  max-height: 60px;
  pointer-events: auto;
`;

const TokenLogoContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
`;

const TokenLogo = styled.img`
  background-color: transparent;
  opacity: 0.6;
  width: auto;
  height: 80%;
`;

//******************************************************* 

const CentralContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
  align-items: center;  
  justify-content: center; 
  width: 100%;
`;

const LogoImage = styled.img`
  background-color: transparent;
  animation: ${fadeIn} 1.5s ease-in-out;
  width: 100%;
  max-width: 1000px;
  height: auto;
`;

const ButtonsContainer = styled.div`
  animation: ${flickerIn} 1.5s ease-in-out;
  width: 100%;
  max-width: 900px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  padding: 0 20px;
  pointer-events: auto;
  margin-top: 30px;
`;

//****************************************************

const AnimationContainer = styled.div`
  animation: ${fadeIn} 2s ease-in-out;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const LoadingContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #0c0d10;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const ContinueImage = styled.img`
  width: 200px;
  animation: ${flicker} 8s ease-in-out infinite;
  height: auto;
  transition: transform 0.3s ease;
`;
