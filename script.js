document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530214&Type=json";
    const menuElement = document.getElementById("menu");
  
    // 오늘 날짜를 yyyyMMdd 형식으로 변환
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0].replace(/-/g, "");
    console.log(today);
    console.log(today.toISOString());
  
    // API 요청 URL 설정
    const urlWithDate = `${API_URL}&MLSV_YMD=${todayDate}`;
  
    // API 호출
    fetch(urlWithDate)
      .then(response => {
        if (!response.ok) throw new Error("API 요청 실패");
        return response.json();
      })
      .then(data => {
        try {
          const mealServiceDietInfo = data.mealServiceDietInfo[1].row[0];
          const menu = mealServiceDietInfo.DDISH_NM.replace(/<br\/>/g, "\n"); // 줄바꿈 처리
          menuElement.textContent = menu;
        } catch (error) {
          menuElement.textContent = "오늘의 급식 정보가 없습니다.";
        }
      })
      .catch(error => {
        console.error("API 요청 오류:", error);
        menuElement.textContent = "급식 정보를 불러오지 못했습니다.";
      });
  });
  