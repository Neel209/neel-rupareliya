/**
 * Interactive 3D CyberCore Hero Canvas (Three.js) & Ambient Particle Network
 * Direct port of HeroCanvas from the next-level portfolio architecture
 */

(function () {
  const container = document.getElementById('hero3DCanvas');
  if (!container) return;

  // Check if Three.js is available
  if (typeof THREE === 'undefined') {
    init2DFallback(container);
    return;
  }

  try {
    initThreeScene(container);
  } catch (err) {
    console.warn("Three.js initialization notice, falling back to 2D canvas:", err);
    init2DFallback(container);
  }

  function initThreeScene(holder) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, holder.clientWidth / holder.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(holder.clientWidth, holder.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    holder.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const greenLight = new THREE.PointLight(0x10b981, 32, 50);
    greenLight.position.set(6, 6, 6);
    scene.add(greenLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 14, 50);
    cyanLight.position.set(-6, -4, -4);
    scene.add(cyanLight);

    // Group for the CyberCore
    const cyberGroup = new THREE.Group();
    scene.add(cyberGroup);

    // Outer wireframe icosahedron
    const wireGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    cyberGroup.add(wireMesh);

    // Inner glowing solid icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(1.05, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0d111a,
      emissive: 0x10b981,
      emissiveIntensity: 0.85,
      flatShading: true
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    cyberGroup.add(innerMesh);

    // Orbiting cyan torus ring
    const torusGeo = new THREE.TorusGeometry(3.1, 0.012, 8, 90);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.5
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = Math.PI / 2.4;
    cyberGroup.add(torusMesh);

    // 3D Particle Field Sphere (700 points)
    const particleCount = 700;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.2 + Math.random() * 4.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x34d399,
      transparent: true,
      opacity: 0.65
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    cyberGroup.add(particleField);

    // Responsive Positioning
    function updatePosition() {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        cyberGroup.position.set(2.4, 0, 0);
        cyberGroup.scale.set(1.05, 1.05, 1.05);
      } else {
        cyberGroup.position.set(0, 0, 0);
        cyberGroup.scale.set(0.65, 0.65, 0.65);
      }
    }
    updatePosition();

    // Mouse Interaction
    const mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
      if (!holder) return;
      camera.aspect = holder.clientWidth / holder.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(holder.clientWidth, holder.clientHeight);
      updatePosition();
    });

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const t = clock.getElapsedTime();

      // Core rotation
      wireMesh.rotation.y += delta * 0.22;
      wireMesh.rotation.x += delta * 0.08;
      innerMesh.rotation.y -= delta * 0.35;
      particleField.rotation.y += delta * 0.04;

      // Mouse tracking smooth tilt
      cyberGroup.rotation.x += (mouse.y * 0.35 - cyberGroup.rotation.x) * 0.05;
      cyberGroup.rotation.y += (mouse.x * 0.5 - cyberGroup.rotation.y) * 0.05;

      // Floating sine bob
      cyberGroup.position.y = Math.sin(t * 0.8) * 0.18;

      renderer.render(scene, camera);
    }
    animate();
  }

  // Fallback 2D Canvas
  function init2DFallback(holder) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    holder.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = holder.clientWidth;
      height = canvas.height = holder.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(16, 185, 129, ' : 'rgba(6, 182, 212, '
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.6)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 * (1 - dist / 110)})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(render);
    }
    render();
  }
})();
