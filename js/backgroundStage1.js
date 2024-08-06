// backgroundStage1.js
export function setStage1Background(scene) {
    // ステージ1用の背景設定
    scene.background = new THREE.Color(0xf0f0f0);

    // 仮の背景オブジェクト（例：赤い立方体）
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);

    // 立方体の位置を設定
    cube.position.set(0, 0, -5);

    // シーンに追加
    scene.add(cube);

    // キャンバスのレンダリング設定
    const canvas = document.getElementById('stage1Canvas');
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // アニメーションループ
    animate();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
}
