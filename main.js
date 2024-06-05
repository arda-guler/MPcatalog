const scene = new THREE.Scene();
const width = window.innerWidth - 20;
const camera = new THREE.PerspectiveCamera(75, width / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const toRadians = (degrees) => degrees * (Math.PI / 180);

const createOrbit = (a, e, i, Ω, ω, segments, color, dashed = false) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    const i_rad = toRadians(i);
    const Ω_rad = toRadians(Ω);
    const ω_rad = toRadians(ω);

    for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * 2 * Math.PI;

        const r = (a * (1 - e * e)) / (1 + e * Math.cos(theta));
        const x_orb = r * Math.cos(theta);
        const y_orb = r * Math.sin(theta);

        // Rotate to 3D space
        const x = x_orb * (Math.cos(ω_rad) * Math.cos(Ω_rad) - Math.sin(ω_rad) * Math.sin(Ω_rad) * Math.cos(i_rad)) -
                  y_orb * (Math.sin(ω_rad) * Math.cos(Ω_rad) + Math.cos(ω_rad) * Math.sin(Ω_rad) * Math.cos(i_rad));
        const y = x_orb * (Math.cos(ω_rad) * Math.sin(Ω_rad) + Math.sin(ω_rad) * Math.cos(Ω_rad) * Math.cos(i_rad)) +
                  y_orb * (Math.cos(ω_rad) * Math.cos(Ω_rad) * Math.cos(i_rad) - Math.sin(ω_rad) * Math.sin(Ω_rad));
        const z = x_orb * Math.sin(ω_rad) * Math.sin(i_rad) + y_orb * Math.cos(ω_rad) * Math.sin(i_rad);

        vertices.push(x, y, z);
    }

	if (!dashed) {
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		const material = new THREE.LineBasicMaterial({ color });
		return new THREE.Line(geometry, material);
	} else {
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		geometry.computeBoundingSphere();

		const material = new THREE.LineDashedMaterial({
			color: color,
			dashSize: 0.2,
			gapSize: 0.1,
		});

		const line = new THREE.Line(geometry, material);
		line.computeLineDistances(); // Necessary for dashed lines to appear
		return line;
	}
};

const sunGeometry = new THREE.SphereGeometry(0.004649184, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const mercuryOrbit = createOrbit(0.38709893, 0.20563069 , 7.00487, 48.33167, 77.45645, 128, 0xb1b1b1, true);
const venusOrbit = createOrbit(0.72333199, 0.00677323 , 3.39471, 76.68069, 131.53298, 128, 0xEEDC82, true);
const earthOrbit = createOrbit(1, 0.0167, 0, 348.73936, 102.94719, 128, 0x0000ff, true);
const marsOrbit = createOrbit(1.523679, 0.0934, 1.850, 49.558, 336.04084, 128, 0xC1440E, true);
const jupiterOrbit = createOrbit(5.20336301, 0.04839266 , 1.30530, 100.55615, 14.75385, 128, 0xD1C185, true);
const saturnOrbit = createOrbit(9.53707032, 0.05415060 , 2.48446, 113.71504, 92.43194, 128, 0xFDD9B5, true);
const uranusOrbit = createOrbit(19.19126393, 0.04716771 , 0.76986, 74.22988, 170.96424, 128, 0x7FFFD4, true);
const neptuneOrbit = createOrbit(30.06896348, 0.00858587 , 1.76917, 131.72169, 44.97135, 128, 0x4169E1, true);

const MP697402 = createOrbit(3.2293354, 0.0895422, 8.94157, 190.52881, 78.85784, 128, 0x00ff00);
const MP2017FG226 = createOrbit(45.8646576, 0.1835635, 11.40397, 208.46209, 291.97561, 128, 0x00ff00);
const MP2017AC64 = createOrbit(75.6113218, 0.4646029, 28.06481, 312.84076, 150.19920, 128, 0x00ff00);
const MP2017DW159 = createOrbit(28.9428103, 0.2502867, 29.56769, 165.66725, 177.04690, 128, 0x00ff00);
const MP2017BM230 = createOrbit(5.2307477, 0.0676544, 34.29463, 159.35124, 166.66665, 128, 0x00ff00);
const MP2017AD62 = createOrbit(41.5441927, 0.0817914, 23.64737, 307.69251, 309.11937, 128, 0x00ff00);
const MP2017DK163 = createOrbit(68.2115976, 0.4643996, 11.60015, 285.33907, 307.30210, 128, 0x00ff00);
const MP2017EE52 = createOrbit(45.7166719, 0.1041076, 6.18180, 109.26569, 120.03861, 128, 0x00ff00);
const MP2017EV51 = createOrbit(44.3949376, 0.1813485, 20.54720, 175.60350, 111.92644, 128, 0x00ff00);

const orbits = [
    mercuryOrbit,
    venusOrbit,
    earthOrbit,
    marsOrbit,
    jupiterOrbit,
    saturnOrbit,
    uranusOrbit,
    neptuneOrbit,
    MP697402,
    MP2017FG226,
    MP2017AC64,
    MP2017DW159,
    MP2017BM230,
    MP2017AD62,
    MP2017DK163,
    MP2017EE52,
    MP2017EV51
];

const checkboxIds = [
    'mercuryOrbitCheckbox',
    'venusOrbitCheckbox',
    'earthOrbitCheckbox',
    'marsOrbitCheckbox',
    'jupiterOrbitCheckbox',
    'saturnOrbitCheckbox',
    'uranusOrbitCheckbox',
    'neptuneOrbitCheckbox',
    'MP697402Checkbox',
    'MP2017FG226Checkbox',
    'MP2017AC64Checkbox',
    'MP2017DW159Checkbox',
    'MP2017BM230Checkbox',
    'MP2017AD62Checkbox',
    'MP2017DK163Checkbox',
    'MP2017EE52Checkbox',
    'MP2017EV51Checkbox'
];

orbits.forEach((orbit, index) => {
    orbit.visible = document.getElementById("mercuryOrbitCheckbox");
	if (document.getElementById("mercuryOrbitCheckbox").checked) {
		console.log('Checkbox is checked');
	}
    scene.add(orbit);
});

const orbitSpeed = 0.0003; // Speed of the orbit

const animate = () => {
	requestAnimationFrame(animate);
	
    // Calculate the new position of the camera
    const time = Date.now() * orbitSpeed;
	/*
    const x = Math.sin(time) * orbitRadius;
	const y = -55;
    const z = Math.cos(time) * orbitRadius;
	*/
	const orbitRadius = 50 + 48 * Math.sin(time * 0.225);
	const x = orbitRadius * Math.sin(time);
	const y = orbitRadius * Math.cos(time);
	const z = 20 + 19.5 * Math.sin(time * 0.225);

    // Update the camera's position
    camera.position.x = x;
	camera.position.y = y;
    camera.position.z = z;

    // Point the camera towards the center of the scene
    camera.lookAt(scene.position);
	camera.rotation.z = 0;
	
	renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
	const width = window.innerWidth - 20;
    camera.aspect = width / window.innerHeight;
	camera.updateProjectionMatrix();
    renderer.setSize(width, window.innerHeight);
});


checkboxIds.forEach((id, index) => {
    document.getElementById(id).addEventListener('change', (event) => {
        orbits[index].visible = event.target.checked;
    });
});
