let scene, camera, renderer;
let particles = [];
let currentBackground;
let ambientLight, directionalLight;

function initThreeJS() {
    // シーンの作成
    scene = new THREE.Scene();

    // カメラの作成
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 20);
    camera.lookAt(0, 0, -20);

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
    }

    // ステージごとの背景設定
    let geometry, material;
    switch (stageIndex) {
        case 0:
            // 地面の作成
            const groundTexture = new THREE.TextureLoader().load('textures/ground.jpg');
            groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
            groundTexture.repeat.set(20, 20);

            const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });
            const groundGeometry = new THREE.PlaneGeometry(100, 100);
            const ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.rotation.x = -Math.PI / 2;
            ground.receiveShadow = true;
            scene.add(ground);

            // 背景の壁の作成
            const wallGeometry = new THREE.PlaneGeometry(100, 30);
            const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
            const wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(0, 15, -50);
            scene.add(wall);

            // 左の大きな立方体
            geometry = new THREE.BoxGeometry(10, 10, 10);
            material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
            const bigCube = new THREE.Mesh(geometry, material);
            bigCube.position.set(-20, 2.5, 0);
            bigCube.castShadow = true;
            scene.add(bigCube);

            // 右の積み重なった立方体
            geometry = new THREE.BoxGeometry(3, 3, 3);
            material = new THREE.MeshStandardMaterial({ color: 0x3333ff });
            const stackedCube1 = new THREE.Mesh(geometry, material);
            stackedCube1.position.set(10, 1.5, 0);
            stackedCube1.rotation.y = Math.PI / 8;
            stackedCube1.castShadow = true;

            const stackedCube2 = new THREE.Mesh(geometry, material);
            stackedCube2.position.set(10, 4.5, 0);
            stackedCube2.rotation.y = -Math.PI / 8;
            stackedCube2.castShadow = true;

            scene.add(stackedCube1);
            scene.add(stackedCube2);

            break;

        case 1:
            // 他のステージの設定を追加可能
            break;
        default:
            // デフォルト設定
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
