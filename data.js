// Vertices untuk "AD2" model (sama seperti sebelumnya)
var vertices = [
    // Letter A
    // left bar
    -0.9, -0.5, 0.0,   -0.8, -0.5, 0.0,   -0.8, 0.5, 0.0,   -0.9, 0.5, 0.0,
    -0.9, -0.5, 0.2,   -0.8, -0.5, 0.2,   -0.8, 0.5, 0.2,   -0.9, 0.5, 0.2,
    // right bar
    -0.6, -0.5, 0.0,   -0.5, -0.5, 0.0,   -0.5, 0.5, 0.0,   -0.6, 0.5, 0.0,
    -0.6, -0.5, 0.2,   -0.5, -0.5, 0.2,   -0.5, 0.5, 0.2,   -0.6, 0.5, 0.2,
    // middle bar
    -0.8, 0.0, 0.0,   -0.6, 0.0, 0.0,   -0.6, 0.1, 0.0,   -0.8, 0.1, 0.0,
    -0.8, 0.0, 0.2,   -0.6, 0.0, 0.2,   -0.6, 0.1, 0.2,   -0.8, 0.1, 0.2,
    // top bar
    -0.8, 0.4, 0.0,   -0.6, 0.4, 0.0,   -0.6, 0.5, 0.0,   -0.8, 0.5, 0.0,
    -0.8, 0.4, 0.2,   -0.6, 0.4, 0.2,   -0.6, 0.5, 0.2,   -0.8, 0.5, 0.2,

    // Letter D
    // left bar
    -0.3, -0.5, 0.0,  -0.2, -0.5, 0.0,  -0.2, 0.5, 0.0,  -0.3, 0.5, 0.0,
    -0.3, -0.5, 0.2,  -0.2, -0.5, 0.2,  -0.2, 0.5, 0.2,  -0.3, 0.5, 0.2,
    // top curve
    -0.2, 0.4, 0.0,   0.1, 0.4, 0.0,   0.1, 0.5, 0.0,   -0.2, 0.5, 0.0,
    -0.2, 0.4, 0.2,   0.1, 0.4, 0.2,   0.1, 0.5, 0.2,   -0.2, 0.5, 0.2,
    // bottom curve
    -0.2, -0.5, 0.0,  0.1, -0.5, 0.0,  0.1, -0.4, 0.0,  -0.2, -0.4, 0.0,
    -0.2, -0.5, 0.2,  0.1, -0.5, 0.2,  0.1, -0.4, 0.2,  -0.2, -0.4, 0.2,
    // right vertical bar
    0.1, -0.4, 0.0,   0.2, -0.4, 0.0,   0.2, 0.4, 0.0,   0.1, 0.4, 0.0,
    0.1, -0.4, 0.2,   0.2, -0.4, 0.2,   0.2, 0.4, 0.2,   0.1, 0.4, 0.2,

    // Number 2
    // top line
    0.4, 0.4, 0.0,   0.8, 0.4, 0.0,   0.8, 0.5, 0.0,   0.4, 0.5, 0.0,
    0.4, 0.4, 0.2,   0.8, 0.4, 0.2,   0.8, 0.5, 0.2,   0.4, 0.5, 0.2,
    // right vertical line
    0.7, 0.0, 0.0,   0.8, 0.0, 0.0,   0.8, 0.4, 0.0,   0.7, 0.4, 0.0,
    0.7, 0.0, 0.2,   0.8, 0.0, 0.2,   0.8, 0.4, 0.2,   0.7, 0.4, 0.2,
    // diagonal line
    0.4, -0.4, 0.0,   0.5, -0.4, 0.0,   0.8, 0.0, 0.0,   0.7, 0.0, 0.0,
    0.4, -0.4, 0.2,   0.5, -0.4, 0.2,   0.8, 0.0, 0.2,   0.7, 0.0, 0.2,
    // bottom line
    0.4, -0.5, 0.0,   0.8, -0.5, 0.0,   0.8, -0.4, 0.0,   0.4, -0.4, 0.0,
    0.4, -0.5, 0.2,   0.8, -0.5, 0.2,   0.8, -0.4, 0.2,   0.4, -0.4, 0.2,
];

// Generate colors dengan variasi warna untuk setiap huruf/angka
var colors = [];
var blockColors = [
    [1.0, 0.2, 0.2], // Merah untuk A
    [1.0, 0.2, 0.2],
    [1.0, 0.2, 0.2],
    [1.0, 0.2, 0.2],
    [0.2, 1.0, 0.2], // Hijau untuk D
    [0.2, 1.0, 0.2],
    [0.2, 1.0, 0.2],
    [0.2, 1.0, 0.2],
    [0.2, 0.2, 1.0], // Biru untuk 2
    [0.2, 0.2, 1.0],
    [0.2, 0.2, 1.0],
    [0.2, 0.2, 1.0]
];

for (let blockIdx = 0; blockIdx < 12; blockIdx++) {
    for (let i = 0; i < 8; i++) { // 8 vertices per block
        colors.push(...blockColors[blockIdx]);
    }
}

// Generate normals yang benar untuk setiap vertex dari kubus
function generateCubeNormals() {
    var normals = [];
    
    // Untuk setiap block (ada 12 blocks)
    for (let block = 0; block < 12; block++) {
        // 8 vertices per cube
        // Vertices 0-3: front face (z = 0.0) - normal ke arah -Z
        for (let i = 0; i < 4; i++) {
            normals.push(0.0, 0.0, -1.0);
        }
        // Vertices 4-7: back face (z = 0.2) - normal ke arah +Z
        for (let i = 0; i < 4; i++) {
            normals.push(0.0, 0.0, 1.0);
        }
    }
    
    return normals;
}

var normals = generateCubeNormals();

function makeCubeIndices(offset) {
    return [
        // Front face
        0,1,2, 0,2,3,
        // Back face
        4,5,6, 4,6,7,
        // Bottom face
        0,1,5, 0,5,4,
        // Top face
        2,3,7, 2,7,6,
        // Right face
        1,2,6, 1,6,5,
        // Left face
        0,3,7, 0,7,4
    ].map(i => i + offset);
}

// Indices
var indices = [
    ...makeCubeIndices(0),   // A - block 1
    ...makeCubeIndices(8),   // A - block 2
    ...makeCubeIndices(16),  // A - block 3
    ...makeCubeIndices(24),  // A - block 4
    ...makeCubeIndices(32),  // D - block 1
    ...makeCubeIndices(40),  // D - block 2
    ...makeCubeIndices(48),  // D - block 3
    ...makeCubeIndices(56),  // D - block 4
    ...makeCubeIndices(64),  // 2 - block 1
    ...makeCubeIndices(72),  // 2 - block 2
    ...makeCubeIndices(80),  // 2 - block 3
    ...makeCubeIndices(88)   // 2 - block 4
];