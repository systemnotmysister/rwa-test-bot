import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; 
import monetki3 from "/monetki3.png"; 
import ezgifcrop from "/ezgifcrop.gif"
import monetki7 from "/monetki7.png"; 
import { useAppContext } from "../AppContext";
import qwe1 from "/qwe1.jpg"; 
import qwe from "/qwe.gif"

import axios from "axios";


function Speed() {


  const [isPlaying, setIsPlaying] = useState(false);
  const animationDuration = 2250;
  const [showGif, setShowGif] = useState(false);
  const { nextLevelRule, findNextLevelRule, userData ,setUserData,setNextLevelRule,isLoading,configData,setCurrentFarmingRule } = useAppContext();
;
console.log("Next level rule updated:123", userData.farmingLevel);


useEffect(() => {
  if (userData.farmingLevel > 0 && configData.farmingRules.length > 0) {
    const rule = findNextLevelRule(userData.farmingLevel);
    if (rule) {
      console.log('Next level rule:', rule); // Логирование nextLevelRule
    } else {
      console.log('No next level rule found');
    }
  }
}, [userData.farmingLevel, configData.farmingRules]);





  const handlePlayAnimation = async () => {
    setIsPlaying(true);

   
    try {
      const response = await axios.post("/api/v1/farming/level", {}, {
        headers: {
          Authorization: window.Telegram.WebApp.initData || "",
          "Content-Type": "application/json",
        },
      });
  
      if (response.data?.state === "success") {
        const updatedUserData = { ...userData, ...response.data.data };
        setUserData(updatedUserData); // Обновляем данные пользователя
  
        // Проверяем и обновляем правила фарминга
        if (updatedUserData.farmingLevel > userData.farmingLevel) {
          const nextLevel = updatedUserData.farmingLevel + 1;
          const currentRule = response.data.farmingRules[updatedUserData.farmingLevel];
          const nextRule = response.data.farmingRules[nextLevel];
          setCurrentFarmingRule(currentRule);
          setNextLevelRule(nextRule);
        }
      }
    } catch (error) {
      console.error("Error during upgre lvl request:", error);
    }
  };



  useEffect(() => {
    if (isPlaying) {
      const showGifTimeout = setTimeout(() => setShowGif(true));
      const hideGifTimeout = setTimeout(() => {
        setShowGif(false);
        setIsPlaying(false);
      }, animationDuration);

      return () => {
        clearTimeout(showGifTimeout);
        clearTimeout(hideGifTimeout);
      };
    }
  }, [isPlaying, animationDuration]);

  return (
    <>
      <img
        src={qwe1}
        alt="Static preview"
        onClick={handlePlayAnimation}
        className={`ttime ${isPlaying ? "fade-out" : "fade-in"}`}
        style={{
          cursor: "pointer",
          position: "absolute",
          marginTop: "20%",
          height: "328px",
        }}
      />

      {showGif && (
        <img
          src={qwe}
          alt="GIF animation"
          style={{
            cursor: "pointer",
            position: "absolute",
            marginTop: "20%",
            height: "328px",
            opacity: isPlaying ? 1 : 0,
          }}
          className={`ttime fade-in`}
        />
      )}
<p
        style={{
          marginLeft: '275px',
          zIndex: '100',
          transform: 'rotate(-0deg)',
          marginTop:'67%',
          color:'black',
          // backgroundColor:'white',
          width:'50px',
          justifyContent:'center',
          display:'flex',
          height:'15px',
          borderRadius:'5px',
          fontSize:'x-medium'

        }}
      >
     {nextLevelRule?.cost}
      </p>  



      <p
        style={{
          marginLeft: '125px',
          zIndex: '100',
          transform: 'rotate(-5deg)',
          marginTop:'94.5%',
          position:'absolute',
          color:'black',
          // backgroundColor:'black',
          borderRadius:'10px',
                fontSize:'15px',
                fontStyle:'bold 6deg'
        }}
      >
      {nextLevelRule?.speed}
     </p>  

    </>
  );
}

export default Speed;