import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { Button } from 'react-bootstrap';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const routeChange = () => {
    let path = '/logupmain';
    navigate(path);
  };

  return (
    <animated.div className="hero-container" style={props}>
      <h1 className="vibrant-text">Discover Your Needs</h1>
      <p className="line1"><b>Welcome to Our Services!!</b></p>
      <div className="line2">
     
      </div>
      
      <div className="hero-btns">
        <Button
          onClick={routeChange}
          className="btns"
          variant="outline-light"
          size="lg"
        >
          <b>GET STARTED</b>
        </Button>
      </div>
    </animated.div>
  );
}

export default HeroSection;
