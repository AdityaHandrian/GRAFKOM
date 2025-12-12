// Konfigurasi pencahayaan yang bisa dimodifikasi
var lightingConfig = {
    // Ambient Light (cahaya sekitar)
    ambientColor: [1.0, 1.0, 1.0],
    ambientIntensity: 0.3,
    
    // Directional/Point Light (cahaya utama)
    lightColor: [1.0, 1.0, 1.0],
    lightPosition: [2.0, 2.0, 2.0],
    
    // View/Camera Position
    viewPosition: [0.0, 0.0, 5.0],
    
    // Specular Properties (kilau pantulan)
    shininess: 32.0,
    specularIntensity: 0.5
};

// Fungsi untuk setup lighting uniforms
function setupLighting(gl, program) {
    var uAmbientColor = gl.getUniformLocation(program, 'uAmbientColor');
    gl.uniform3fv(uAmbientColor, lightingConfig.ambientColor);
    
    var uAmbientIntensity = gl.getUniformLocation(program, 'uAmbientIntensity');
    gl.uniform1f(uAmbientIntensity, lightingConfig.ambientIntensity);
    
    var uLightColor = gl.getUniformLocation(program, 'uLightColor');
    gl.uniform3fv(uLightColor, lightingConfig.lightColor);
    
    var uLightPosition = gl.getUniformLocation(program, 'uLightPosition');
    gl.uniform3fv(uLightPosition, lightingConfig.lightPosition);
    
    var uViewPosition = gl.getUniformLocation(program, 'uViewPosition');
    gl.uniform3fv(uViewPosition, lightingConfig.viewPosition);
    
    var uShininess = gl.getUniformLocation(program, 'uShininess');
    gl.uniform1f(uShininess, lightingConfig.shininess);
}