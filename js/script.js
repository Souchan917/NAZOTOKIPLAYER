// ステージのジャケット要素を取得
const jackets = document.querySelectorAll('.stage-jacket');
let currentStageIndex = 0;
let currentAudioElement = null; // 現在のオーディオ要素を保持

// 曲名のリスト
const trackList = [
    "01-Couper le vent",
    "02-Sesquifractal",
    "03-Madoromi Chronoscope",
    "04-Refreqt",
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

// スタートボタン
document.getElementById('startButton').addEventListener('click', () => {
    // game-containerを非表示にして重くならないようにする
    document.querySelector('.game-container').style.display = 'none';
    
    // 表示するステージのコンテンツを選択
    const stageContentId = `stage${currentStageIndex + 1}-content`;
    document.getElementById(stageContentId).style.display = 'block';

    // ステージごとの背景とゲームロジックを読み込み
    switch (currentStageIndex) {
        case 0:
            import('./backgroundStage1.js').then(module => {
                module.setTutorialBackground(scene);
            });
            import('./gameLogicStage1.js').then(module => {
                module.initTutorialGame();
            });
            break;
        case 1:
            import('./backgroundStage2.js').then(module => {
                module.setStage1Background(scene);
            });
            import('./gameLogicStage2.js').then(module => {
                module.initStage1Game();
            });
            break;
        case 2:
            import('./backgroundStage3.js').then(module => {
                module.setStage2Background(scene);
            });
            import('./gameLogicStage3.js').then(module => {
                module.initStage2Game();
            });
            break;
        case 3:
            import('./backgroundStage4.js').then(module => {
                module.setStage3Background(scene);
            });
            import('./gameLogicStage4.js').then(module => {
                module.initStage3Game();
            });
            break;
        case 4:
            import('./backgroundStage5.js').then(module => {
                module.setStage4Background(scene);
            });
            import('./gameLogicStage5.js').then(module => {
                module.initStage4Game();
            });
            break;
        // 他のステージも同様に設定
    }
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
    
    // 背景の更新
    setBackgroundForStage(currentStageIndex);
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


function goBackToHome() {
    // 現在表示されているステージのコンテンツを非表示にする
    document.querySelectorAll('.game-stage').forEach(stage => stage.style.display = 'none');

    // ホーム画面を表示
    document.querySelector('.game-container').style.display = 'block';

    // 必要に応じてCSSクラスを再適用
    const backButton = document.querySelector('.backButton');
    if (backButton) {
        backButton.classList.add('fixed'); // 例: 'fixed'クラスを再適用
    }

    // 音楽を停止
    stopStageAudio(currentAudioElement);
}
