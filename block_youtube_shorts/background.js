chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url.includes("youtube.com/shorts/")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: showFullScreenToast
        });
    }
});

function showFullScreenToast() {
    // 영상 멈추기
    document.querySelector('video')?.pause();  // 영상이 있을 경우 멈추기

    // 토스트 메시지 생성
    const toast = document.createElement("div");
    toast.style.position = "fixed";
    toast.style.top = "0";
    toast.style.left = "0";
    toast.style.width = "100%";
    toast.style.height = "100%";
    toast.style.backgroundColor = "rgba(0, 0, 0, 0.9)"; // 배경 어둡게
    toast.style.color = "#fff";
    toast.style.display = "flex";
    toast.style.flexDirection = "column";
    toast.style.justifyContent = "center";
    toast.style.alignItems = "center";
    toast.style.zIndex = "10000";
    toast.style.fontSize = "24px"; // 메시지 크기 키움
    toast.style.textAlign = "center";

    // 메시지 텍스트
    const message = document.createElement("span");
    message.textContent = "🚫 유튜브 쇼츠는 차단되었습니다!";
    message.style.marginBottom = "20px"; // 메시지와 버튼 사이 간격
    toast.appendChild(message);

    // 확인 버튼
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "확인";
    confirmButton.style.backgroundColor = "#4CAF50";
    confirmButton.style.color = "#fff";
    confirmButton.style.border = "none";
    confirmButton.style.padding = "15px 30px"; // 버튼 크기 키움
    confirmButton.style.borderRadius = "10px";
    confirmButton.style.cursor = "pointer";
    confirmButton.style.fontSize = "20px"; // 버튼 텍스트 크기 키움
    confirmButton.onclick = () => {
        window.location.href = "https://www.youtube.com/";  // 확인 클릭 시 홈으로 리디렉션
    };
    toast.appendChild(confirmButton);

    // 토스트를 문서에 추가
    document.body.appendChild(toast);

    // 쇼츠 페이지로의 접근을 방지
    if (window.location.href.includes("youtube.com/shorts/")) {
        window.location.href = "https://www.youtube.com/";  // 이미 쇼츠 페이지라면 홈으로 리디렉션
    }
}
