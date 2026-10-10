// ==========================================
// CITYFORGE
// STEP 6 - SMART BUILDING PLACEMENT
// ==========================================


// ==========================================
// GAME VARIABLES
// ==========================================

let budget = 10;

let houses = 0;
let hospitals = 0;
let parks = 0;
let factories = 0;
let solarPlants = 0;
let roads = 0;

let population = 50000;

let happiness = 65;
let pollution = 35;
let environment = 70;

let year = 2026;


// ==========================================
// THREE.JS SETUP
// ==========================================

const city = document.getElementById("city");

const scene = new THREE.Scene();

let isNightMode = false;

// Premium cinematic daytime atmosphere
scene.background = new THREE.Color(0x9bb7cc);

scene.fog = new THREE.Fog(
    0x9bb7cc,
    38,
    90
);

// ==========================================
// CAMERA
// ==========================================

const camera = new THREE.PerspectiveCamera(
    60,
    city.clientWidth / city.clientHeight,
    0.1,
    1000
);

camera.position.set(25, 25, 25);

camera.lookAt(0, 0, 0);


// ==========================================
// RENDERER
// ==========================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    city.clientWidth,
    city.clientHeight
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

document.getElementById(
    "cityObjects"
).appendChild(renderer.domElement);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

// Cinematic lighting and richer colors
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

// Improve color accuracy
renderer.outputColorSpace = THREE.SRGBColorSpace;


// ==========================================
// CINEMATIC LIGHTING
// ==========================================

const ambientLight = new THREE.AmbientLight(
    0xc5dcff,
    0.8
);

scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(
    0xffe6c4,
    2
);

sunLight.position.set(
    -20,
    35,
    15
);

sunLight.castShadow = true;

// Higher-quality building shadows
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;

sunLight.shadow.camera.left = -30;
sunLight.shadow.camera.right = 30;
sunLight.shadow.camera.top = 30;
sunLight.shadow.camera.bottom = -30;

sunLight.shadow.bias = -0.0005;
sunLight.shadow.normalBias = 0.03;

scene.add(sunLight);

// ==========================================
// GROUND
// ==========================================

const groundGeometry =
    new THREE.PlaneGeometry(
        40,
        40
    );


const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x455d58,
    roughness: 0.88,
    metalness: 0.08
});


const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


// ==========================================
// SUBTLE CITY GRID
// ==========================================

const grid = new THREE.GridHelper(
    40,
    40,
    0x244957,
    0x385563
);

grid.position.y = 0.025;

// Keep the grid subtle against the ground
grid.material.transparent = true;
grid.material.opacity = 0.38;

scene.add(grid);

// ==========================================
// CITY OBJECTS
// ==========================================

const cityObjects =
    new THREE.Group();

scene.add(cityObjects);


// ==========================================
// PLACED OBJECT POSITIONS
// ==========================================

let placedBuildings = [];
// ==========================================
// MOVING VEHICLES
// ==========================================

let cars = [];


// ==========================================
// ROAD MATERIAL
// ==========================================


const roadMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x202630,
        roughness: 0.82,
        metalness: 0.12
    });



const sidewalkMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x89949b,
        roughness: 0.75,
        metalness: 0.08
    });


const lineMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    });


// ==========================================
// HORIZONTAL ROAD
// ==========================================

function createHorizontalRoad() {

    const road =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                40,
                0.25,
                4
            ),
            roadMaterial
        );

    road.position.set(
        0,
        0.15,
        0
    );

    road.receiveShadow = true;

    cityObjects.add(road);


    const sidewalkGeometry =
        new THREE.BoxGeometry(
            40,
            0.12,
            1
        );


    const sidewalk1 =
        new THREE.Mesh(
            sidewalkGeometry,
            sidewalkMaterial
        );

    sidewalk1.position.set(
        0,
        0.30,
        2.5
    );

    cityObjects.add(sidewalk1);


    const sidewalk2 =
        new THREE.Mesh(
            sidewalkGeometry,
            sidewalkMaterial
        );

    sidewalk2.position.set(
        0,
        0.30,
        -2.5
    );

    cityObjects.add(sidewalk2);


    for (
        let x = -18;
        x <= 18;
        x += 4
    ) {

        const line =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2,
                    0.04,
                    0.12
                ),
                lineMaterial
            );

        line.position.set(
            x,
            0.30,
            0
        );

        cityObjects.add(line);
    }
}


// ==========================================
// VERTICAL ROAD
// ==========================================

function createVerticalRoad() {

    const road =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                4,
                0.25,
                40
            ),
            roadMaterial
        );

    road.position.set(
        0,
        0.16,
        0
    );

    road.receiveShadow = true;

    cityObjects.add(road);


    const sidewalkGeometry =
        new THREE.BoxGeometry(
            1,
            0.12,
            40
        );


    const sidewalk1 =
        new THREE.Mesh(
            sidewalkGeometry,
            sidewalkMaterial
        );

    sidewalk1.position.set(
        2.5,
        0.30,
        0
    );

    cityObjects.add(sidewalk1);


    const sidewalk2 =
        new THREE.Mesh(
            sidewalkGeometry,
            sidewalkMaterial
        );

    sidewalk2.position.set(
        -2.5,
        0.30,
        0
    );

    cityObjects.add(sidewalk2);


    for (
        let z = -18;
        z <= 18;
        z += 4
    ) {

        const line =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.12,
                    0.04,
                    2
                ),
                lineMaterial
            );

        line.position.set(
            0,
            0.31,
            z
        );

        cityObjects.add(line);
    }
}


createHorizontalRoad();

createVerticalRoad();


// ==========================================
// TREES
// ==========================================

function createTree(x, z) {

    const tree =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.15,
                0.2,
                1.2,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x704214
            })
        );

    trunk.position.y = 0.6;

    trunk.castShadow = true;

    tree.add(trunk);


    const leaves =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.8,
                12,
                12
            ),
            new THREE.MeshStandardMaterial({
                color: 0x228b22
            })
        );

    leaves.position.y = 1.5;

    leaves.castShadow = true;

    tree.add(leaves);


    tree.position.set(
        x,
        0,
        z
    );

    cityObjects.add(tree);
}
// ==========================================
// SMALL BUSH
// ==========================================

function createBush(x, z) {

    const bush =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.5,
                10,
                10
            ),
            new THREE.MeshStandardMaterial({
                color: 0x2e8b57
            })
        );

    bush.position.set(
        x,
        0.45,
        z
    );

    bush.scale.y = 0.7;

    bush.castShadow = true;

    cityObjects.add(bush);
}
// ==========================================
// CLOUD
// ==========================================

function createCloud(x, y, z) {

    const cloud =
        new THREE.Group();


    const cloudMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        });


    const part1 =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                1.2,
                16,
                16
            ),
            cloudMaterial
        );

    part1.position.set(
        0,
        0,
        0
    );

    cloud.add(part1);


    const part2 =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.9,
                16,
                16
            ),
            cloudMaterial
        );

    part2.position.set(
        1,
        -0.1,
        0
    );

    cloud.add(part2);


    const part3 =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.8,
                16,
                16
            ),
            cloudMaterial
        );

    part3.position.set(
        -1,
        -0.1,
        0
    );

    cloud.add(part3);

cloud.position.set(
    x,
    y,
    z
);

cloud.userData.isCloud = true;

scene.add(cloud);
}

createTree(-8, 8);
createTree(-11, 8);
createTree(-14, 8);

createTree(8, -8);
createTree(11, -8);
createTree(14, -8);

createTree(-8, -8);
createTree(-11, -8);
// ==========================================
// CITY BUSHES
// ==========================================

createBush(-6, 6);
createBush(-9, 6);
createBush(6, 6);
createBush(9, 6);

createBush(-6, -6);
createBush(6, -6);

createBush(6, 9);
createBush(-6, -9);
// ==========================================
// CITY CLOUDS
// ==========================================

createCloud(
    -12,
    12,
    -8
);

createCloud(
    0,
    14,
    -5
);

createCloud(
    12,
    11,
    -10
);

createCloud(
    -5,
    13,
    10
);


// ==========================================
// LOCATION SYSTEM
// ==========================================

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();

let selectedPosition = null;

let placementValid = false;


let selectedBuildingType = null;
let ghostBuilding = null;

function createGhostBuilding(type) {
    const ghost = new THREE.Group();

    let color = 0x00ffff;
    let width = 2.5;
    let height = 2.4;
    let depth = 2.5;

    if (type === "house") {
        color = 0xffcc88;
        width = 2.5;
        height = 2.4;
        depth = 2.5;
    } else if (type === "hospital") {
        color = 0xff5555;
        width = 3.5;
        height = 3.5;
        depth = 3.5;
    } else if (type === "factory") {
        color = 0xaaaaaa;
        width = 4;
        height = 3;
        depth = 3;
    } else if (type === "park") {
        color = 0x22ff66;
        width = 4;
        height = 0.5;
        depth = 4;
    } else if (type === "solar") {
        color = 0x00ccff;
        width = 3.5;
        height = 0.7;
        depth = 3;
    } else if (type === "road") {
        color = 0xcccccc;
        width = 4;
        height = 0.12;
        depth = 4;
    }

    const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: 0.45,
        roughness: 0.4,
        metalness: 0.2,
        depthWrite: false
    });

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        material
    );

    body.position.y = height / 2;
    ghost.add(body);

    ghost.userData.previewMaterial = material;
    ghost.userData.buildingType = type;

    return ghost;
}

function setGhostColor(valid) {
    if (!ghostBuilding) return;

    ghostBuilding.userData.previewMaterial.color.set(
        valid ? 0x00ff66 : 0xff2222
    );
}



// ==========================================
// PLACEMENT MARKER
// ==========================================

const marker =
    new THREE.Mesh(
        new THREE.RingGeometry(
            0.5,
            0.7,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide
        })
    );

marker.rotation.x =
    -Math.PI / 2;

marker.visible = false;

scene.add(marker);


// ==========================================
// CHANGE MARKER COLOR
// ==========================================

function setMarkerColor(valid) {

    if (valid) {

        marker.material.color.set(
            0x00ff00
        );

    } else {

        marker.material.color.set(
            0xff0000
        );
    }
}


// ==========================================
// CHECK ROAD
// ==========================================

function isOnRoad(position) {

    const x =
        position.x;

    const z =
        position.z;


    // Main horizontal road

    if (
        Math.abs(z) < 3
    ) {

        return true;
    }


    // Main vertical road

    if (
        Math.abs(x) < 3
    ) {

        return true;
    }


    return false;
}


// ==========================================
// CHECK CITY BOUNDARY
// ==========================================

function isInsideCity(position, size) {

    if (
        position.x - size < -19 ||
        position.x + size > 19 ||
        position.z - size < -19 ||
        position.z + size > 19
    ) {

        return false;
    }


    return true;
}


// ==========================================
// CHECK OTHER BUILDINGS
// ==========================================

function isTooClose(position, size) {

    for (
        let i = 0;
        i < placedBuildings.length;
        i++
    ) {

        let building =
            placedBuildings[i];


        let dx =
            position.x -
            building.x;


        let dz =
            position.z -
            building.z;


        let distance =
            Math.sqrt(
                dx * dx +
                dz * dz
            );


        let requiredDistance =
            size +
            building.size +
            0.5;


        if (
            distance <
            requiredDistance
        ) {

            return true;
        }
    }


    return false;
}


// ==========================================
// CHECK PLACEMENT
// ==========================================

function checkPlacement(
    position,
    size
) {

    if (
        !isInsideCity(
            position,
            size
        )
    ) {

        return false;
    }


    if (
        isOnRoad(position)
    ) {

        return false;
    }


    if (
        isTooClose(
            position,
            size
        )
    ) {

        return false;
    }


    return true;
}


// ==========================================
// SELECT LOCATION
// ==========================================


renderer.domElement.addEventListener(
    "click",
    function(event) {

        if (isDragging) {
            return;
        }

        const rect =
            renderer.domElement.getBoundingClientRect();

        mouse.x =
            ((event.clientX - rect.left) /
                rect.width) * 2 - 1;

        mouse.y =
            -((event.clientY - rect.top) /
                rect.height) * 2 + 1;

        raycaster.setFromCamera(
            mouse,
            camera
        );

        const intersects =
            raycaster.intersectObject(ground);

        if (intersects.length > 0) {

            const point = intersects[0].point;

            
            // Snap the selected location to the grid
            selectedPosition = new THREE.Vector3(
                Math.round(point.x),
                0,
                Math.round(point.z)
            );

            marker.position.set(
                selectedPosition.x,
                0.35,
                selectedPosition.z
            );

            marker.visible = true;

            let placementSize = 1.5;

            if (selectedBuildingType === "house") {
                placementSize = 1.7;
            } else if (selectedBuildingType === "hospital") {
                placementSize = 2.3;
            } else if (selectedBuildingType === "park") {
                placementSize = 2.8;
            } else if (selectedBuildingType === "factory") {
                placementSize = 2.5;
            } else if (selectedBuildingType === "solar") {
                placementSize = 2.5;
            }

            if (selectedBuildingType === "road") {
                placementValid =
                    isInsideCity(selectedPosition, 2.5) &&
                    !isTooClose(selectedPosition, 1.5);
            } else {
                placementValid = checkPlacement(
                    selectedPosition,
                    placementSize
                );
            }

            setMarkerColor(placementValid);

            const message =
                document.getElementById("locationMessage");

            if (selectedBuildingType && placementValid) {
                placeSelectedBuilding();
            } else if (message) {
                if (placementValid) {
                    message.innerText =
                        "🟢 Valid location! Select a building to place.";
                } else {
                    message.innerText =
                        "🔴 Invalid location! Avoid roads or existing buildings.";
                }
            }

        }
    }
);



renderer.domElement.addEventListener("pointermove", function(event) {

    if (isDragging) {
        return;
    }

    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(ground);

    if (intersects.length > 0) {

        const point = intersects[0].point;

        const previewPosition = new THREE.Vector3(
            Math.round(point.x),
            0,
            Math.round(point.z)
        );

        // Save the position under the mouse
        selectedPosition = previewPosition.clone();

        // Move the placement marker
        marker.position.set(
            previewPosition.x,
            0.35,
            previewPosition.z
        );

        marker.visible = true;

        // Move the ghost building with the mouse
        if (ghostBuilding) {
            ghostBuilding.position.copy(previewPosition);
            ghostBuilding.visible = true;
        }

        let previewSize = 1.5;

        if (selectedBuildingType === "house") {
            previewSize = 1.7;
        } else if (selectedBuildingType === "hospital") {
            previewSize = 2.3;
        } else if (selectedBuildingType === "park") {
            previewSize = 2.8;
        } else if (selectedBuildingType === "factory") {
            previewSize = 2.5;
        } else if (selectedBuildingType === "solar") {
            previewSize = 2.5;
        }

        let valid;

        if (selectedBuildingType === "road") {
            valid =
                isInsideCity(previewPosition, 2.5) &&
                !isTooClose(previewPosition, 1.5);
        } else if (selectedBuildingType) {
            valid = checkPlacement(previewPosition, previewSize);
        } else {
            valid = false;
        }

        placementValid = valid;

        setMarkerColor(valid);
        setGhostColor(valid);

    } else {

        if (ghostBuilding) {
            ghostBuilding.visible = false;
        }

        marker.visible = false;
    }
});




// ==========================================
// BUILDING ANIMATION
// ==========================================

// ==========================================
// BUILDING ANIMATION
// ==========================================

// ==========================================
// BUILDING EFFECT
// ==========================================

function animateBuilding(object) {
    const originalY = object.position.y;

    object.scale.set(0.2, 0.2, 0.2);
    object.position.y = originalY - 2;

    let progress = 0;

    function grow() {
        progress += 0.05;

        let scale = 0.2 + progress * 0.8;

        object.scale.set(
            scale,
            scale,
            scale
        );

        object.position.y =
            originalY - 2 + progress * 2;

        if (progress < 1) {
            requestAnimationFrame(grow);
        } else {
            object.scale.set(1, 1, 1);
            object.position.y = originalY;
        }
    }

    grow();
}

function createConstructionEffect(object) {
    const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.2, 1.5, 32),
        new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        })
    );

    ring.rotation.x = -Math.PI / 2;

    ring.position.copy(object.position);
    ring.position.y += 0.1;

    scene.add(ring);

    let size = 1;

    function animateRing() {
        size += 0.03;

        ring.scale.set(size, size, size);
        ring.material.opacity -= 0.015;

        if (ring.material.opacity > 0) {
            requestAnimationFrame(animateRing);
        } else {
            scene.remove(ring);
        }
    }

    animateRing();
}
// ==========================================
// REGISTER BUILDING
// ==========================================

function registerBuilding(
    position,
    size
) {

    placedBuildings.push({
        x: position.x,
        z: position.z,
        size: size
    });
}


// ==========================================
// WINDOW
// ==========================================

function createWindow(
    x,
    y,
    z,
    parent
) {

    const window =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.35,
                0.45,
                0.06
            ),
           new THREE.MeshStandardMaterial({
    color: 0xffdd88,
    emissive: 0xffaa44,
    emissiveIntensity: 0.8
})
        );


    window.position.set(
        x,
        y,
        z
    );


    parent.add(window);
}



// ==========================================
// PREMIUM MODERN HOUSE
// ==========================================

function createHouse(position) {

    const house = new THREE.Group();

    // Main architectural structure
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x29394b,
        roughness: 0.3,
        metalness: 0.35
    });

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 2.4, 2.5),
        bodyMaterial
    );

    body.position.y = 1.2;
    body.castShadow = true;
    body.receiveShadow = true;
    house.add(body);

    // Upper glass floor
    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0x527e99,
        roughness: 0.16,
        metalness: 0.55,
        emissive: 0x102b42,
        emissiveIntensity: 0.35
    });

    const upper = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 1.5, 2.2),
        glassMaterial
    );

    upper.position.y = 3.15;
    upper.castShadow = true;
    upper.receiveShadow = true;
    house.add(upper);

    // Flat premium rooftop
    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0x151e2b,
        roughness: 0.28,
        metalness: 0.65
    });

    const roof = new THREE.Mesh(
        new THREE.BoxGeometry(2.65, 0.18, 2.65),
        roofMaterial
    );

    roof.position.y = 3.99;
    roof.castShadow = true;
    house.add(roof);

    // Metallic roof rim
    const rimMaterial = new THREE.MeshStandardMaterial({
        color: 0x40c9ff,
        emissive: 0x087da8,
        emissiveIntensity: 1.2,
        metalness: 0.7,
        roughness: 0.25
    });

    const rim = new THREE.Mesh(
        new THREE.BoxGeometry(2.72, 0.06, 2.72),
        rimMaterial
    );

    rim.position.y = 4.1;
    house.add(rim);

    // Modern entrance
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 1.15, 0.08),
        new THREE.MeshStandardMaterial({
            color: 0x111923,
            metalness: 0.45,
            roughness: 0.3
        })
    );

    door.position.set(0, 0.575, 1.29);
    house.add(door);

    // Warm illuminated ground-floor windows
    createWindow(-0.72, 1.45, 1.29, house);
    createWindow(0.72, 1.45, 1.29, house);

    // Upper-floor glass windows
    createWindow(-0.65, 3.15, 1.13, house);
    createWindow(0.65, 3.15, 1.13, house);

    // Slim architectural side details
    const trimMaterial = new THREE.MeshStandardMaterial({
        color: 0x8ca8bd,
        metalness: 0.75,
        roughness: 0.25
    });

    for (const x of [-1.22, 1.22]) {

        const trim = new THREE.Mesh(
            new THREE.BoxGeometry(0.07, 2.35, 0.08),
            trimMaterial
        );

        trim.position.set(x, 1.2, 1.28);
        house.add(trim);
    }

    // Position the house before adding its light
    house.position.copy(position);

    // Warm light for nighttime appearance
    const houseLight = new THREE.PointLight(
        0xffbd72,
        1.4,
        6
    );

    houseLight.position.set(0, 2.2, 0);
    houseLight.visible = isNightMode;
    house.add(houseLight);

    // Add to the city and register its footprint
    cityObjects.add(house);

    registerBuilding(position, 1.7);

    // Existing construction effects
    animateBuilding(house);
    createConstructionEffect(house);
}


// ==========================================
// PREMIUM FUTURISTIC HOSPITAL
// ==========================================

function createHospital(position) {

    const hospital = new THREE.Group();

    // Main hospital structure
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xd6e5f0,
        roughness: 0.28,
        metalness: 0.25
    });

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(4, 3, 3),
        bodyMaterial
    );

    body.position.y = 1.5;
    body.castShadow = true;
    body.receiveShadow = true;
    hospital.add(body);

    // Modern glass upper facade
    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0x4e8eae,
        roughness: 0.18,
        metalness: 0.55,
        emissive: 0x12394f,
        emissiveIntensity: 0.4
    });

    const upperGlass = new THREE.Mesh(
        new THREE.BoxGeometry(3.65, 1.15, 0.08),
        glassMaterial
    );

    upperGlass.position.set(0, 2.15, 1.55);
    hospital.add(upperGlass);

    // Roof slab
    const roof = new THREE.Mesh(
        new THREE.BoxGeometry(4.3, 0.25, 3.3),
        new THREE.MeshStandardMaterial({
            color: 0x24384b,
            roughness: 0.3,
            metalness: 0.6
        })
    );

    roof.position.y = 3.12;
    roof.castShadow = true;
    hospital.add(roof);

    // Cyan roof accent
    const roofAccent = new THREE.Mesh(
        new THREE.BoxGeometry(4.15, 0.06, 3.15),
        new THREE.MeshStandardMaterial({
            color: 0x36d9ff,
            emissive: 0x08a8e0,
            emissiveIntensity: 1.5,
            metalness: 0.5
        })
    );

    roofAccent.position.y = 3.28;
    hospital.add(roofAccent);

    // Ground-floor entrance
    const entrance = new THREE.Mesh(
        new THREE.BoxGeometry(0.85, 1.5, 0.12),
        new THREE.MeshStandardMaterial({
            color: 0x29485c,
            metalness: 0.35,
            roughness: 0.25
        })
    );

    entrance.position.set(0, 0.75, 1.56);
    hospital.add(entrance);

    // Entrance glass
    const entranceGlass = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 1.15, 0.04),
        new THREE.MeshStandardMaterial({
            color: 0x73c9e8,
            emissive: 0x174b65,
            emissiveIntensity: 0.5,
            metalness: 0.35,
            roughness: 0.2
        })
    );

    entranceGlass.position.set(0, 0.82, 1.64);
    hospital.add(entranceGlass);

    // Ground-floor windows
    for (const x of [-1.35, 1.35]) {
        createWindow(x, 1.35, 1.55, hospital);
    }

    // Medical cross on the front facade
    const crossMaterial = new THREE.MeshStandardMaterial({
        color: 0xff4058,
        emissive: 0x8b1024,
        emissiveIntensity: 0.65,
        roughness: 0.25
    });

    const crossVertical = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 1.1, 0.14),
        crossMaterial
    );

    crossVertical.position.set(0, 3.95, 1.1);
    hospital.add(crossVertical);

    const crossHorizontal = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.38, 0.14),
        crossMaterial
    );

    crossHorizontal.position.set(0, 3.95, 1.1);
    hospital.add(crossHorizontal);

    // Hospital lighting
    const hospitalLight = new THREE.PointLight(
        0x66ccff,
        1.8,
        8
    );

    hospitalLight.position.set(0, 2.5, 0);
    hospitalLight.visible = isNightMode;
    hospital.add(hospitalLight);

    // Place the hospital in the city
    hospital.position.copy(position);
    cityObjects.add(hospital);

    // Preserve placement and construction systems
    registerBuilding(position, 2.3);

    animateBuilding(hospital);
    createConstructionEffect(hospital);
}


// ==========================================
// PARK
// ==========================================


function createPark(position) {
    const park = new THREE.Group();

    // Premium landscaped foundation
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(5.5, 0.3, 5.5),
        new THREE.MeshStandardMaterial({
            color: 0x183d36,
            roughness: 0.8,
            metalness: 0.15
        })
    );

    base.position.y = 0.15;
    base.receiveShadow = true;
    park.add(base);

    // Raised inner lawn
    const lawn = new THREE.Mesh(
        new THREE.BoxGeometry(5.1, 0.12, 5.1),
        new THREE.MeshStandardMaterial({
            color: 0x286b50,
            roughness: 0.9
        })
    );

    lawn.position.y = 0.34;
    lawn.receiveShadow = true;
    park.add(lawn);

    // Cross-shaped stone pathways
    const pathMaterial = new THREE.MeshStandardMaterial({
        color: 0x657b86,
        roughness: 0.6,
        metalness: 0.25
    });

    const path1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.06, 4.9),
        pathMaterial
    );

    path1.position.y = 0.43;
    park.add(path1);

    const path2 = new THREE.Mesh(
        new THREE.BoxGeometry(4.9, 0.06, 0.65),
        pathMaterial
    );

    path2.position.y = 0.44;
    park.add(path2);

    // Cyan pathway lighting
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x20eaff,
        transparent: true,
        opacity: 0.8
    });

    for (const z of [-2.15, 2.15]) {
        const strip = new THREE.Mesh(
            new THREE.BoxGeometry(0.09, 0.035, 0.5),
            glowMaterial
        );

        strip.position.set(0, 0.48, z);
        park.add(strip);
    }

    for (const x of [-2.15, 2.15]) {
        const strip = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.035, 0.09),
            glowMaterial
        );

        strip.position.set(x, 0.48, 0);
        park.add(strip);
    }

    // Four premium trees
    for (const x of [-1.7, 1.7]) {
        for (const z of [-1.7, 1.7]) {

            // Tree trunk
            const trunk = new THREE.Mesh(
                new THREE.CylinderGeometry(0.12, 0.18, 0.9, 8),
                new THREE.MeshStandardMaterial({
                    color: 0x75503a,
                    roughness: 0.9
                })
            );

            trunk.position.set(x, 0.85, z);
            trunk.castShadow = true;
            park.add(trunk);

            // Layered green canopy
            const leavesMaterial = new THREE.MeshStandardMaterial({
                color: 0x39a96b,
                roughness: 0.75
            });

            const lowerLeaves = new THREE.Mesh(
                new THREE.ConeGeometry(0.8, 1.15, 8),
                leavesMaterial
            );

            lowerLeaves.position.set(x, 1.65, z);
            lowerLeaves.castShadow = true;
            park.add(lowerLeaves);

            const upperLeaves = new THREE.Mesh(
                new THREE.ConeGeometry(0.57, 0.9, 8),
                new THREE.MeshStandardMaterial({
                    color: 0x55d98a,
                    roughness: 0.7
                })
            );

            upperLeaves.position.set(x, 2.25, z);
            upperLeaves.castShadow = true;
            park.add(upperLeaves);
        }
    }

    // Decorative glowing central feature
    const fountainBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.65, 0.18, 20),
        new THREE.MeshStandardMaterial({
            color: 0x344d5b,
            metalness: 0.7,
            roughness: 0.25
        })
    );

    fountainBase.position.set(0, 0.55, 0);
    park.add(fountainBase);

    const fountainCore = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.22, 0),
        new THREE.MeshStandardMaterial({
            color: 0x42f5ff,
            emissive: 0x00cfff,
            emissiveIntensity: 1.8
        })
    );

    fountainCore.position.set(0, 0.9, 0);
    park.add(fountainCore);

    // Local atmospheric lighting
    const parkLight = new THREE.PointLight(
        0x21eaff,
        1.1,
        7
    );

    parkLight.position.set(0, 1.5, 0);
    parkLight.visible = isNightMode;
    park.add(parkLight);

    // Add park to the city
    park.position.copy(position);
    cityObjects.add(park);

    // Preserve existing placement and animation
    registerBuilding(position, 2.8);
    animateBuilding(park);
    createConstructionEffect(park);
}


// ==========================================
// PARK TREE
// ==========================================

function createSmallParkTree(
    x,
    z,
    group
) {

    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.15,
                0.8,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x704214
            })
        );


    trunk.position.set(
        x,
        0.5,
        z
    );


    group.add(trunk);


    const leaves =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.5,
                10,
                10
            ),
            new THREE.MeshStandardMaterial({
                color: 0x228b22
            })
        );


    leaves.position.set(
        x,
        1.1,
        z
    );


    group.add(leaves);
}


// ==========================================
// FACTORY
// ==========================================
// FACTORY SMOKE

let smokeParticles = [];

// ==========================================
// IMPROVED FACTORY SMOKE
// ==========================================

function createSmoke(x, y, z) {

    const smoke = new THREE.Group();

    for (let i = 0; i < 15; i++) {

        const geometry =
            new THREE.SphereGeometry(
                0.3,
                12,
                12
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: 0x555555,
                transparent: true,
                opacity: 0.35
            });

        const particle =
            new THREE.Mesh(
                geometry,
                material
            );


        particle.position.set(
            (Math.random() - 0.5) * 0.5,
            i * 0.35,
            (Math.random() - 0.5) * 0.5
        );


        let size =
            0.7 +
            Math.random() * 0.6;

        particle.scale.set(
            size,
            size,
            size
        );


        particle.userData.speed =
            0.01 +
            Math.random() * 0.02;

        particle.userData.drift =
            (Math.random() - 0.5) * 0.01;


        smoke.add(particle);
    }


    smoke.position.set(
        x,
        y,
        z
    );


    cityObjects.add(smoke);

    smokeParticles.push(smoke);
}


function createFactory(position) {

    const factory = new THREE.Group();

    // Industrial metal body
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(4, 2.5, 3.5),
        new THREE.MeshStandardMaterial({
            color: 0x293543,
            roughness: 0.38,
            metalness: 0.65
        })
    );

    body.position.y = 1.25;
    body.castShadow = true;
    body.receiveShadow = true;
    factory.add(body);

    // Metallic roof
    const roof = new THREE.Mesh(
        new THREE.BoxGeometry(4.3, 0.25, 3.8),
        new THREE.MeshStandardMaterial({
            color: 0x111b27,
            roughness: 0.3,
            metalness: 0.75
        })
    );

    roof.position.y = 2.55;
    roof.castShadow = true;
    factory.add(roof);

    // Orange safety stripe
    const stripe = new THREE.Mesh(
        new THREE.BoxGeometry(4.04, 0.16, 0.06),
        new THREE.MeshStandardMaterial({
            color: 0xff8a24,
            emissive: 0x8a3000,
            emissiveIntensity: 0.7
        })
    );

    stripe.position.set(0, 0.65, 1.78);
    factory.add(stripe);

    // Main chimney
    const chimneyMaterial = new THREE.MeshStandardMaterial({
        color: 0x515e6c,
        roughness: 0.35,
        metalness: 0.7
    });

    const chimney = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.48, 4, 12),
        chimneyMaterial
    );

    chimney.position.set(1.2, 4, 0.5);
    chimney.castShadow = true;
    factory.add(chimney);

    // Orange chimney rim
    const chimneyRim = new THREE.Mesh(
        new THREE.CylinderGeometry(0.46, 0.46, 0.16, 12),
        new THREE.MeshStandardMaterial({
            color: 0xff8a24,
            emissive: 0x9c3900,
            emissiveIntensity: 0.8
        })
    );

    chimneyRim.position.set(1.2, 6.02, 0.5);
    factory.add(chimneyRim);

    // Secondary chimney
    const chimney2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.3, 2.5, 10),
        chimneyMaterial
    );

    chimney2.position.set(-1, 3.2, -0.5);
    chimney2.castShadow = true;
    factory.add(chimney2);

    // Factory windows
    for (const x of [-1.3, 0, 1.3]) {
        createWindow(x, 1.55, 1.78, factory);
    }

    // Glowing furnace
    const furnace = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.65, 0.08),
        new THREE.MeshStandardMaterial({
            color: 0xff7026,
            emissive: 0xff4a0a,
            emissiveIntensity: 1.6,
            roughness: 0.3
        })
    );

    furnace.position.set(0, 1.05, 1.8);
    factory.add(furnace);

    // Position the factory
    factory.position.copy(position);
    cityObjects.add(factory);

    // SMOKE FROM BOTH CHIMNEYS — KEEP THESE CALLS
    createSmoke(
        position.x + 1.2,
        6,
        position.z + 0.5
    );

    createSmoke(
        position.x - 1,
        4.5,
        position.z - 0.5
    );

    // Night lighting: local to the factory
    const factoryLight = new THREE.PointLight(
        0xff8844,
        1.6,
        8
    );

    factoryLight.position.set(0, 2.5, 0);
    factoryLight.visible = isNightMode;
    factory.add(factoryLight);

    // Preserve placement and effects
    registerBuilding(position, 2.5);

    animateBuilding(factory);
    createConstructionEffect(factory);
}


// ==========================================
// SOLAR PLANT
// ==========================================


function createSolarPlant(position) {
    const solar = new THREE.Group();

    // Metallic foundation
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(6, 0.25, 4.5),
        new THREE.MeshStandardMaterial({
            color: 0x202d3b,
            metalness: 0.75,
            roughness: 0.3
        })
    );

    base.position.y = 0.15;
    base.castShadow = true;
    base.receiveShadow = true;
    solar.add(base);

    // Solar panel materials
    const panelMaterial = new THREE.MeshStandardMaterial({
        color: 0x082b59,
        metalness: 0.65,
        roughness: 0.22,
        emissive: 0x003b80,
        emissiveIntensity: 0.35
    });

    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x8298ac,
        metalness: 0.85,
        roughness: 0.25
    });

    // Three premium solar panels
    for (let x = -2; x <= 2; x += 2) {

        // Panel frame
        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(1.65, 0.12, 2.15),
            frameMaterial
        );

        frame.position.set(x, 1.35, 0);
        frame.rotation.x = -Math.PI / 6;
        frame.castShadow = true;
        solar.add(frame);

        // Glass solar surface
        const panel = new THREE.Mesh(
            new THREE.BoxGeometry(1.52, 0.06, 2.02),
            panelMaterial
        );

        panel.position.set(x, 1.43, 0);
        panel.rotation.x = -Math.PI / 6;
        panel.castShadow = true;
        solar.add(panel);

        // Panel grid lines
        const gridMaterial = new THREE.MeshBasicMaterial({
            color: 0x20cfff,
            transparent: true,
            opacity: 0.65
        });

        for (let i = -1; i <= 1; i++) {
            const line = new THREE.Mesh(
                new THREE.BoxGeometry(0.018, 0.012, 1.85),
                gridMaterial
            );

            line.position.set(x + i * 0.38, 1.48, 0);
            line.rotation.x = -Math.PI / 6;
            solar.add(line);
        }

        for (let i = -1; i <= 1; i++) {
            const line = new THREE.Mesh(
                new THREE.BoxGeometry(1.4, 0.012, 0.018),
                gridMaterial
            );

            line.position.set(x, 1.48, i * 0.48);
            line.rotation.x = -Math.PI / 6;
            solar.add(line);
        }

        // Metallic support legs
        for (const z of [-0.65, 0.65]) {
            const support = new THREE.Mesh(
                new THREE.CylinderGeometry(0.065, 0.09, 1.1, 8),
                frameMaterial
            );

            support.position.set(x, 0.75, z);
            support.castShadow = true;
            solar.add(support);
        }
    }

    // Glowing central energy core
    const core = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.32, 0),
        new THREE.MeshStandardMaterial({
            color: 0x21e6ff,
            emissive: 0x00bfff,
            emissiveIntensity: 2,
            metalness: 0.4,
            roughness: 0.2
        })
    );

    core.position.set(0, 0.85, 1.65);
    solar.add(core);

    // Local cyan illumination
    const energyLight = new THREE.PointLight(
        0x00cfff,
        1.8,
        6
    );

    energyLight.position.set(0, 1.3, 1.65);
    energyLight.visible = isNightMode;
    solar.add(energyLight);

    // Position and add to city
    solar.position.copy(position);
    cityObjects.add(solar);

    // Preserve existing placement and construction effects
    registerBuilding(position, 2.5);
    animateBuilding(solar);
    createConstructionEffect(solar);
}


// ==========================================
// ROAD
// ==========================================


function createRoad(position) {
    const road = new THREE.Group();

    // Dark asphalt road
    const asphalt = new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.18, 2.4),
        new THREE.MeshStandardMaterial({
            color: 0x171e29,
            roughness: 0.85,
            metalness: 0.15
        })
    );

    asphalt.position.y = 0.15;
    asphalt.receiveShadow = true;
    road.add(asphalt);

    // Roadside metallic borders
    const borderMaterial = new THREE.MeshStandardMaterial({
        color: 0x536878,
        metalness: 0.8,
        roughness: 0.3
    });

    for (const z of [-1.25, 1.25]) {
        const border = new THREE.Mesh(
            new THREE.BoxGeometry(5, 0.2, 0.12),
            borderMaterial
        );

        border.position.set(0, 0.19, z);
        road.add(border);
    }

    // Cyan smart-road edge lighting
    const edgeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00dfff
    });

    for (const z of [-1.19, 1.19]) {
        const edge = new THREE.Mesh(
            new THREE.BoxGeometry(4.8, 0.035, 0.035),
            edgeMaterial
        );

        edge.position.set(0, 0.27, z);
        road.add(edge);
    }

    // White dashed center lane markings
    const laneMaterial = new THREE.MeshBasicMaterial({
        color: 0xe5f4ff
    });

    for (let x = -1.8; x <= 1.8; x += 1.2) {
        const dash = new THREE.Mesh(
            new THREE.BoxGeometry(0.55, 0.025, 0.055),
            laneMaterial
        );

        dash.position.set(x, 0.255, 0);
        road.add(dash);
    }

    // Roadside smart sensor lights
    for (const x of [-2, 2]) {
        for (const z of [-1.05, 1.05]) {
            const sensor = new THREE.Mesh(
                new THREE.BoxGeometry(0.16, 0.08, 0.16),
                new THREE.MeshStandardMaterial({
                    color: 0x00cfff,
                    emissive: 0x00aaff,
                    emissiveIntensity: 1.5
                })
            );

            sensor.position.set(x, 0.3, z);
            road.add(sensor);
        }
    }

    // Position and add to city
    road.position.copy(position);
    cityObjects.add(road);

    // Preserve construction animation and effect
    animateBuilding(road);
    createConstructionEffect(road);
}



// ==========================================
// CHECK BUILDING BEFORE PLACING
// ==========================================

function canBuild(size) {

    if (
        selectedPosition === null
    ) {

        alert(
            "📍 Click on the ground first!"
        );

        return false;
    }


    if (
        !checkPlacement(
            selectedPosition,
            size
        )
    ) {

        alert(
            "🚫 Invalid location!\n\nChoose an empty area away from roads and other buildings."
        );

        return false;
    }


    return true;
}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStats() {

    document.getElementById(
        "year"
    ).innerText = year;


    document.getElementById(
        "budget"
    ).innerText =
        "₹" + budget + " Cr";


    document.getElementById(
        "population"
    ).innerText =
        Math.round(
            population
        ).toLocaleString();


    document.getElementById(
        "pollution"
    ).innerText =
        pollution + "%";


    document.getElementById(
        "happiness"
    ).innerText =
        happiness + "%";


    document.getElementById(
        "environment"
    ).innerText =
        environment + "%";


    document.getElementById(
        "houseCount"
    ).innerText =
        houses;


    document.getElementById(
        "hospitalCount"
    ).innerText =
        hospitals;


    document.getElementById(
        "parkCount"
    ).innerText =
        parks;


    document.getElementById(
        "factoryCount"
    ).innerText =
        factories;


    document.getElementById(
        "solarCount"
    ).innerText =
        solarPlants;


    document.getElementById(
        "roadCount"
    ).innerText =
        roads;
}

function placeSelectedBuilding() {
    if (!selectedBuildingType || !selectedPosition) {
        return;
    }

    const type = selectedBuildingType;

    let cost = 0;
    let size = 1.5;

    if (type === "house") {
        cost = 1;
        size = 1.7;
    } else if (type === "hospital") {
        cost = 2;
        size = 2.3;
    } else if (type === "park") {
        cost = 1;
        size = 2.8;
    } else if (type === "factory") {
        cost = 3;
        size = 2.5;
    } else if (type === "solar") {
        cost = 2;
        size = 2.5;
    } else if (type === "road") {
        cost = 1;
    }

    if (budget < cost) {
        alert("Not enough budget!");
        return;
    }

    if (!placementValid) {
        return;
    }

    if (type === "house") {
        budget -= cost;
        houses++;
        population += 1000;
        createHouse(selectedPosition);
    } else if (type === "hospital") {
        budget -= cost;
        hospitals++;
        happiness += 5;
        createHospital(selectedPosition);
    } else if (type === "park") {
        budget -= cost;
        parks++;
        happiness += 3;
        createPark(selectedPosition);
    } else if (type === "factory") {
        budget -= cost;
        factories++;
        pollution += 10;
        createFactory(selectedPosition);
    } else if (type === "solar") {
        budget -= cost;
        solarPlants++;
        environment += 5;
        createSolarPlant(selectedPosition);
    } else if (type === "road") {
        budget -= cost;
        roads++;
        createRoad(selectedPosition);
    }

    updateStats();

    selectedBuildingType = null;

    if (ghostBuilding) {
        scene.remove(ghostBuilding);
        ghostBuilding = null;
    }

    const message =
        document.getElementById("locationMessage");

    if (message) {
        message.innerText =
            "✅ Building placed successfully! Select another building.";
    }
}




function selectBuilding(type) {
    selectedBuildingType = type;

    if (ghostBuilding) {
        scene.remove(ghostBuilding);
    }

    ghostBuilding = createGhostBuilding(type);
    scene.add(ghostBuilding);

    ghostBuilding.visible = true;

    if (selectedPosition) {
        ghostBuilding.position.copy(selectedPosition);
    }

    const message = document.getElementById("locationMessage");

    if (message) {
        message.innerText =
            "🏗️ " + type.toUpperCase() +
            " selected! Move your mouse and click to place.";
    }
}


// ==========================================
// BUILDING BUTTONS
// ==========================================

document.getElementById("houseButton").addEventListener("click", function () {
    selectBuilding("house");
});

document.getElementById("hospitalButton").addEventListener("click", function () {
    selectBuilding("hospital");
});

document.getElementById("parkButton").addEventListener("click", function () {
    selectBuilding("park");
});

document.getElementById("factoryButton").addEventListener("click", function () {
    selectBuilding("factory");
});

document.getElementById("solarButton").addEventListener("click", function () {
    selectBuilding("solar");
});

document.getElementById("roadButton").addEventListener("click", function () {
    selectBuilding("road");
});


// ==========================================
// SIMULATION
// ==========================================

document.getElementById(
    "simulationButton"
).addEventListener(
    "click",
    function() {

        year += 1;
        updateCityEra();    


        let growth =
            0.02 +
            houses * 0.001 +
            roads * 0.0005;


        population +=
            population * growth;


        pollution +=
            factories * 2;


        environment +=
            solarPlants;


        happiness +=
            parks +
            hospitals;


        let event =
            Math.random();


        if (
            event < 0.30
        ) {

            happiness -= 5;

            environment -= 10;

            alert(
                "🌊 Flood occurred!"
            );

        }

        else if (
            event < 0.50
        ) {

            pollution += 15;

            happiness -= 5;

            alert(
                "🏭 Pollution crisis!"
            );

        }

        else if (
            event < 0.70
        ) {

            population += 5000;

            happiness -= 3;

            alert(
                "👨‍👩‍👧 Population surge!"
            );

        }

        else if (
            event < 0.85
        ) {

            happiness -= 8;

            environment -= 5;

            alert(
                "💧 Water shortage!"
            );

        }

        else {

            environment -= 8;

            happiness -= 5;

            alert(
                "⚡ Energy shortage!"
            );
        }


        if (
            pollution > 100
        ) {
            pollution = 100;
        }

        if (
            pollution < 0
        ) {
            pollution = 0;
        }


        if (
            happiness > 100
        ) {
            happiness = 100;
        }

        if (
            happiness < 0
        ) {
            happiness = 0;
        }


        if (
            environment > 100
        ) {
            environment = 100;
        }

        if (
            environment < 0
        ) {
            environment = 0;
        }


        updateStats();
    }
);


// ==========================================
// CAMERA DRAG
// ==========================================

let isDragging = false;

let previousMouseX = 0;
let previousMouseY = 0;


renderer.domElement.addEventListener(
    "mousedown",
    function(event) {

        isDragging = true;

        previousMouseX =
            event.clientX;

        previousMouseY =
            event.clientY;
    }
);


renderer.domElement.addEventListener(
    "mouseup",
    function() {

        isDragging = false;
    }
);


renderer.domElement.addEventListener(
    "mouseleave",
    function() {

        isDragging = false;
    }
);


renderer.domElement.addEventListener(
    "mousemove",
    function(event) {

        if (
            !isDragging
        ) {

            return;
        }


        let movementX =
            event.clientX -
            previousMouseX;


        let movementY =
            event.clientY -
            previousMouseY;


        camera.position.x -=
            movementX * 0.05;


        camera.position.z -=
            movementY * 0.05;


        camera.lookAt(
            0,
            0,
            0
        );


        previousMouseX =
            event.clientX;


        previousMouseY =
            event.clientY;
    }
);


// ==========================================
// ZOOM
// ==========================================

renderer.domElement.addEventListener(
    "wheel",
    function(event) {

        camera.position.y +=
            event.deltaY * 0.01;


        camera.position.y =
            Math.max(
                8,
                Math.min(
                    60,
                    camera.position.y
                )
            );


        camera.lookAt(
            0,
            0,
            0
        );
    }
);


// ==========================================
// RESIZE
// ==========================================

window.addEventListener(
    "resize",
    function() {

        camera.aspect =
            city.clientWidth /
            city.clientHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            city.clientWidth,
            city.clientHeight
        );
    }
);


// ==========================================
// ANIMATION LOOP
// ==========================================

// ==========================================
// CREATE CAR
// ==========================================

function createCar(x, z, color, direction) {

    let car = new THREE.Group();


    // Car body

    let body = new THREE.Mesh(
        new THREE.BoxGeometry(
            1.2,
            0.4,
            0.7
        ),
        new THREE.MeshStandardMaterial({
            color: color
        })
    );

    body.position.y = 0.5;

    car.add(body);


    // Car roof

    let roof = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.6,
            0.3,
            0.5
        ),
        new THREE.MeshStandardMaterial({
            color: color
        })
    );

    roof.position.y = 0.8;

    car.add(roof);


    // Wheels

    let wheelMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111111
        });


    let wheel1 = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.16,
            0.16,
            0.12,
            8
        ),
        wheelMaterial
    );

    wheel1.rotation.z =
        Math.PI / 2;

    wheel1.position.set(
        -0.4,
        0.35,
        0.38
    );

    car.add(wheel1);


    let wheel2 = wheel1.clone();

    wheel2.position.x = 0.4;

    car.add(wheel2);


    let wheel3 = wheel1.clone();

    wheel3.position.z = -0.38;

    car.add(wheel3);


    let wheel4 = wheel2.clone();

    wheel4.position.z = -0.38;

    car.add(wheel4);


    car.position.set(
        x,
        0,
        z
    );


    scene.add(car);


    cars.push({
        object: car,
        direction: direction
    });
}
// ==========================================
// STREET LIGHT
// ==========================================

function createStreetLight(x, z) {

    let lightGroup = new THREE.Group();

    // Pole
    let pole = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.08,
            0.08,
            2.5,
            8
        ),
        new THREE.MeshStandardMaterial({
            color: 0x333333
        })
    );

    pole.position.y = 1.25;

    lightGroup.add(pole);


    // Lamp
    let lamp = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.18,
            12,
            12
        ),
        new THREE.MeshStandardMaterial({
    color: 0xffffaa,
    emissive: 0xffff66,
    emissiveIntensity: 2
})
    );

    lamp.position.y = 2.55;

    lightGroup.add(lamp);


    // Lamp arm
    let arm = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.5,
            0.08,
            0.08
        ),
        new THREE.MeshStandardMaterial({
            color: 0x333333
        })
    );

    arm.position.set(
        0.2,
        2.45,
        0
    );

    lightGroup.add(arm);


  
    // Light
    let pointLight = new THREE.PointLight(
        0xffc777,
        3,
        10
    );

    pointLight.visible = false;
    pointLight.position.set(
        0.2,
        2.5,
        0
    );

    lightGroup.add(pointLight);



    lightGroup.position.set(
        x,
        0,
        z
    );

    scene.add(lightGroup);
}



function toggleDayNight() {

    isNightMode = !isNightMode;

    if (isNightMode) {

        // Deep cinematic night sky
        scene.background.set(0x030914);
        scene.fog.color.set(0x030914);

        // Reduce daylight
        ambientLight.intensity = 0.22;
        sunLight.intensity = 0.12;

        // Dark ground
        ground.material.color.set(0x182b25);

        // Subtle night grid
        grid.material.opacity = 0.16;

        // Enable existing point lights
        scene.traverse(function(object) {
            if (object.isPointLight) {
                object.visible = true;
            }
        });

        renderer.toneMappingExposure = 0.9;

    } else {

        // Restore cinematic daytime
        scene.background.set(0x9bb7cc);
        scene.fog.color.set(0x9bb7cc);

        ambientLight.intensity = 0.8;
        sunLight.intensity = 2;

        ground.material.color.set(0x455d58);

        grid.material.opacity = 0.38;

        scene.traverse(function(object) {
            if (object.isPointLight) {
                object.visible = false;
            }
        });

        renderer.toneMappingExposure = 1.1;
    }

    const button = document.getElementById("dayNightBtn");

    if (button) {
        button.textContent = isNightMode
            ? "☀️ Switch to Day"
            : "🌙 Switch to Night";
    }
}

function updateCityEra() {
    const eraElement = document.getElementById("cityEra");

    if (!eraElement) return;

    if (year < 2030) {
        eraElement.textContent = "Emerging";
    } else if (year < 2040) {
        eraElement.textContent = "Developing";
    } else if (year < 2050) {
        eraElement.textContent = "Modern";
    } else {
        eraElement.textContent = "Advanced";
    }
}



document.getElementById("dayNightBtn").addEventListener("click", function() {
    toggleDayNight();
});



// ==========================================
// CITY TRAFFIC
// ==========================================

createCar(
    -15,
    -0.8,
    0xff3333,
    1
);

createCar(
    -5,
    0.8,
    0x3366ff,
    1
);

createCar(
    8,
    -0.8,
    0xffff00,
    1 
);
// ==========================================
// CITY STREET LIGHTS
// ==========================================

createStreetLight(-15, 3.2);
createStreetLight(-5, 3.2);
createStreetLight(5, 3.2);
createStreetLight(15, 3.2);

createStreetLight(-15, -3.2);
createStreetLight(-5, -3.2);
createStreetLight(5, -3.2);
createStreetLight(15, -3.2);

function animate() {

    requestAnimationFrame(
        animate
    );
    // ==========================================
// MOVE CLOUDS
// ==========================================

for (
    let i = 0;
    i < scene.children.length;
    i++
) {

    let object =
        scene.children[i];

    if (
        object.userData.isCloud
    ) {

        object.position.x += 0.005;

        if (
            object.position.x > 25
        ) {

            object.position.x = -25;
        }
    }
}
  // ==========================================
// MOVE FACTORY SMOKE
// ==========================================

smokeParticles.forEach(smoke => {

    smoke.children.forEach(particle => {

        // Move upward
        particle.position.y +=
            particle.userData.speed;


        // Natural sideways movement
        particle.position.x +=
            particle.userData.drift;


        // Slight expansion
        particle.scale.x += 0.001;
        particle.scale.y += 0.001;
        particle.scale.z += 0.001;


        // Fade as smoke rises
        particle.material.opacity -=
            0.0008;


        // Reset particle
        if (
            particle.material.opacity <= 0
        ) {

            particle.position.y = 0;

            particle.position.x =
                (Math.random() - 0.5) * 0.5;

            particle.position.z =
                (Math.random() - 0.5) * 0.5;

            particle.material.opacity =
                0.35;

            let size =
                0.7 +
                Math.random() * 0.6;

            particle.scale.set(
                size,
                size,
                size
            );
        }

    });

});
    // ==========================================
// MOVE CARS
// ==========================================

for (
    let i = 0;
    i < cars.length;
    i++
) {

    cars[i].object.position.x +=
        0.03 *
        cars[i].direction;


    if (
        cars[i].object.position.x > 21
    ) {

        cars[i].object.position.x =
            -21;
    }
}


    renderer.render(
        scene,
        camera
    );
}


animate();


// ==========================================
// INITIAL STATISTICS
// ==========================================

updateStats();
