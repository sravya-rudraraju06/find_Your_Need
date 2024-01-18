// import styled from 'styled-components'

// export const ServicesContainer = styled.div`
//     height: 1200px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     background: #B9B9BA;
//     padding-right:130px;
//     @media screen and (max-width: 1000px){
//         height: 1100px;
//     }
    
//     @media screen and (max-width: 1000px){
//         height: 1800px;
//     } 
// `

// export const ServicesWrapper = styled.div`
//     max-width:1000px;
//     margin: 0 auto;
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     align-items: center;
//     grid-gap:50px;
//     padding: 0 50px;

//     @media screen and (max-width: 1000px){
//         grid-template-columns: 1fr 1fr;
//     }

//     @media screen and (max-width: 1000px){
//         grid-template-columns: 1fr;
//         padding: 0 20px;
//     } 
// `

// export const ServicesCard = styled.div`
//     background: #fff;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//     align-items:center;
//     border-radius: 10px;
//     height:500px;
//     width:500px;
//     box-shadow: 0 1px 3px rgba(0,0,0,0.2);
//     transition: all 0.2s ease-in-out;

//     &:hover{
//         transform: scale(1.02);
//         transition: all 0.2s ease-in-out;
//         cursor: pointer;
//     }
// `


// export const ServicesIcon = styled.img`
//     border-radius: 10px;
//     height: 300px;
//     width: 500px;
// `

// export const ServicesH1 = styled.h1`
//     font-size: 2.5rem;
//     color: #000000;
//     margin-bottom: 30px;
//     padding-left: 120px;
//     @media screen and (max-width: 480px){
//     } 
// `

// export const ServicesH2 = styled.h2`
//     font-size: 2rem;
//     margin-bottom: 10px;
//     padding-top:10px;
// `

// export const ServicesP = styled.p`
//     font-size: 1rem;
//     text-align: center;
// `
// ServicesElements.js
// ServicesElements.js
// ServicesElements.js

import styled from 'styled-components';

export const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0; /* Adjust the padding according to your design */
`;

export const ServicesH1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 64px;
`;

export const ServicesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin: 0 auto;
  max-width: 1000px;
  gap: 32px;
  justify-content: center;
`;

export const ServicesCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  max-height: 480px; /* Adjust the max-height according to your design */
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }
`;

export const ServicesIcon = styled.img`
  height: 160px;
  width: 160px;
  margin-bottom: 10px;
`;

export const ServicesH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export const ServicesP = styled.p`
  font-size: 1.2rem; /* Adjust the font size according to your design */
  text-align: center;
  overflow: hidden;
  max-height: 200px; /* Adjust the max-height according to your design */
`;
