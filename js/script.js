// ステージのジャケット要素を取得
const jackets = document.querySelectorAll('.stage-jacket');
let currentStageIndex = 0;
let currentAudioElement = null; // 現在のオーディオ要素を保持

// 曲名のリスト
const trackList = [
    "01-Couper le vent",
    "02-Sesquifractal",
    "03-Refreqt",
    "04-Madoromi Chronoscope",
    "05-Flip Up"
];

// 初期ステージの表示と音楽再生
playStageAudio(trackList[currentStageIndex]);
jackets[currentStageIndex].classList.add('active');

// 次のステージに進むボタン
document.getElementById('nextButton').addEventListener('click', () => {
    stopStageAudio(currentAudioElement);
    changeStage(1);
});

// 前のステージに戻るボタン
document.getElementById('prevButton').addEventListener('click', () => {
    stopStageAudio(currentAudioElement);
    changeStage(-1);
});

function changeStage(direction) {
    // 現在のステージを非表示
    jackets[currentStageIndex].classList.remove('active');

    // ステージインデックスの更新
    currentStageIndex += direction;

    // ステージインデックスの範囲チェック
    if (currentStageIndex >= jackets.length) {
        currentStageIndex = 0; // 最初のステージに戻る
    } else if (currentStageIndex < 0) {
        currentStageIndex = jackets.length - 1; // 最後のステージに戻る
    }

    // 次のステージを表示
    jackets[currentStageIndex].classList.add('active');
    playStageAudio(trackList[currentStageIndex]);
}

function playStageAudio(trackName) {
    const trackId = `audio${trackList.indexOf(trackName) + 1}`;
    currentAudioElement = document.getElementById(trackId);
    if (currentAudioElement) {
        currentAudioElement.currentTime = 0;
        currentAudioElement.volume = 0; // フェードイン開始時は音量ゼロ
        currentAudioElement.play();

        // フェードイン
        const fadeInInterval = setInterval(() => {
            if (currentAudioElement.volume < 1) {
                currentAudioElement.volume += 0.03; // 音量を徐々に上げる
            } else {
                clearInterval(fadeInInterval);
            }
        }, 200); // フェードインの速度調整（200msごとに音量を上げる）

        // 10秒後にフェードアウトを開始
        setTimeout(() => {
            stopStageAudio(currentAudioElement);
        }, 30000); // フェードアウトのタイミング調整
    }
}

function fadeOutAudio(audioElement) {
    // フェードアウト
    const fadeOutInterval = setInterval(() => {
        if (audioElement.volume > 0.1) {
            audioElement.volume -= 0.1; // 音量を徐々に下げる
        } else {
            audioElement.volume = 0;
            audioElement.pause();
            audioElement.currentTime = 0;
            clearInterval(fadeOutInterval);
        }
    }, 100); // フェードアウトの速度調整（100msごとに音量を下げる）
}

function stopStageAudio(audioElement) {
    if (audioElement) {
        fadeOutAudio(audioElement); // フェードアウト
    }
}
