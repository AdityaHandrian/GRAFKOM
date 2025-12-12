function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");
    
    // Set global variables untuk kontrol
    glContext = gl;

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    var vertexShaderCode = `
        attribute vec3 aPosition;
        attribute vec3 aColor;
        attribute vec3 aNormal;
        
        varying vec3 vPosition;
        varying vec3 vColor;
        varying vec3 vNormal;
        
        uniform mat4 uFormMatrix;
        uniform mat4 uNormalMatrix;
        
        void main(){
            vec4 worldPosition = uFormMatrix * vec4(aPosition, 1.0);
            vPosition = worldPosition.xyz;
            vColor = aColor;
            vNormal = (uNormalMatrix * vec4(aNormal, 0.0)).xyz;
            gl_Position = worldPosition;
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = `
        precision mediump float;
        varying vec3 vPosition;
        varying vec3 vColor;
        varying vec3 vNormal;
        
        uniform vec3 uAmbientColor;
        uniform float uAmbientIntensity;
        uniform vec3 uLightColor;
        uniform vec3 uLightPosition;
        uniform vec3 uViewPosition;
        uniform float uShininess;
        
        void main(){
            vec3 normal = normalize(vNormal);
            
            // Ambient lighting (cahaya dasar)
            vec3 ambient = vColor * uAmbientColor * uAmbientIntensity;
            
            // Diffuse lighting (cahaya tersebar)
            vec3 lightDirection = normalize(uLightPosition - vPosition);
            float diffuseFactor = max(dot(normal, lightDirection), 0.0);
            vec3 diffuse = vColor * uLightColor * diffuseFactor;
            
            // Specular lighting (efek pantulan cahaya yang mengkilap)
            vec3 viewDirection = normalize(uViewPosition - vPosition);
            vec3 reflectDirection = reflect(-lightDirection, normal);
            float specularFactor = pow(max(dot(viewDirection, reflectDirection), 0.0), uShininess);
            vec3 specular = uLightColor * specularFactor * 0.6;
            
            vec3 finalColor = ambient + diffuse + specular;
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    
    // Set global program untuk kontrol
    programContext = program;

    // Setup vertex attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPos = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPos);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var aColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aColor);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    var aNormal = gl.getAttribLocation(program, "aNormal");
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aNormal);

    // Setup lighting uniforms
    var uAmbientColor = gl.getUniformLocation(program, 'uAmbientColor');
    gl.uniform3fv(uAmbientColor, [1.0, 1.0, 1.0]);
    
    var uAmbientIntensity = gl.getUniformLocation(program, 'uAmbientIntensity');
    gl.uniform1f(uAmbientIntensity, 0.3);
    
    var uLightColor = gl.getUniformLocation(program, 'uLightColor');
    gl.uniform3fv(uLightColor, [1.0, 1.0, 1.0]);
    
    var uLightPosition = gl.getUniformLocation(program, 'uLightPosition');
    gl.uniform3fv(uLightPosition, [2.0, 2.0, 2.0]);
    
    var uViewPosition = gl.getUniformLocation(program, 'uViewPosition');
    gl.uniform3fv(uViewPosition, [0.0, 0.0, 5.0]);
    
    var uShininess = gl.getUniformLocation(program, 'uShininess');
    gl.uniform1f(uShininess, 32.0);

    // Get uniform locations for matrices
    var uFormMatrix = gl.getUniformLocation(program, 'uFormMatrix');
    var uNormalMatrix = gl.getUniformLocation(program, 'uNormalMatrix');

    var angle = 0;
    function render(time){
        if (!freeze){
            angle += 0.01;
        }

        // Create rotation matrix
        var sa = Math.sin(angle);
        var ca = Math.cos(angle);
        var rotationMatrix = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, ca, -sa, 0.0,
            0.0, sa, ca, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);

        // Set transformation matrix
        gl.uniformMatrix4fv(uFormMatrix, false, rotationMatrix);
        
        // Normal matrix untuk transformasi normal dengan benar
        gl.uniformMatrix4fv(uNormalMatrix, false, rotationMatrix);

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.clearColor(0.1, 0.1, 0.1, 1.0);
        gl.clearDepth(1.0);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        window.requestAnimationFrame(render);
    }

    render(1);    
}