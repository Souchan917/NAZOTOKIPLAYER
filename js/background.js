let scene, camera, renderer;
let particles = [];
let currentBackground;
let ambientLight, directionalLight;

function initThreeJS() {
    // シーンの作成
    scene = new THREE.Scene();

    // カメラの作成
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    // レンダラーの作成
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('backgroundCanvas'), alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 初期の背景を設定
    setBackgroundForStage(0);

    // パーティクルの作成
    createParticles();

    // ライトの追加
    ambientLight = new THREE.AmbientLight(0x404040); // 環境光
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // 平行光源
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // アニメーションループ
    animate();
}

function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 20;
        particlePositions[i * 3 + 1] = Math.random() * 10;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.2,
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    particles.push(particleSystem);
}

function setBackgroundForStage(stageIndex) {
    // 既存の背景オブジェクトを削除
    if (currentBackground) {
        scene.remove(currentBackground);
        currentBackground.geometry.dispose();
        currentBackground.material.dispose();
    }

    // ステージごとの背景設定
    let geometry, material;
    switch (stageIndex) {
        case 0:
            // 背景の白色
            scene.background = new THREE.Color(0xf0f0f0);

            // 球形ワイヤーフレームの作成
            geometry = new THREE.SphereGeometry(5, 32, 32);
            material = new THREE.MeshBasicMaterial({ color: 0x8AB4EB, wireframe: true });
            const wireframeSphere = new THREE.Mesh(geometry, material);

            // 球の位置を調整
            wireframeSphere.position.set(0, 0, -20);
            scene.add(wireframeSphere);
            currentBackground = wireframeSphere;
            break;

        // 他のステージの設定...
        case 1:
            // 背景の白色
            scene.background = new THREE.Color(0xf0f0f0);

            // 球形ワイヤーフレームの作成
            geometry = new THREE.SphereGeometry(5, 32, 32);
            material = new THREE.MeshBasicMaterial({ color: 0xB92212, wireframe: true });
            const wireframeSphere1 = new THREE.Mesh(geometry, material);

            // 球の位置を調整
            wireframeSphere1.position.set(0, 0, -20);
            scene.add(wireframeSphere1);
            currentBackground = wireframeSphere1;
            break;

    }
}


function animate() {
    requestAnimationFrame(animate);

    // パーティクルの回転
    particles.forEach(particle => {
        particle.rotation.y += 0.001;
    });

    // シーンのレンダリング
    renderer.render(scene, camera);
}

// ページ読み込み時にThree.jsを初期化
window.addEventListener('load', initThreeJS);
