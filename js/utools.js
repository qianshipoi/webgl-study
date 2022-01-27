function getShaderSource (scriptId) {
  var shaderScript = document.getElementById(scriptId)
  if (shaderScript == null) return null
  let sourceCode = ''
  var child = shaderScript.firstChild
  while (child) {
    if (child.nodeType == child.TEXT_NODE) sourceCode += child.textContent
    child = child.nextSibling
  }
  return sourceCode
}

/**
 * 创建着色器
 * @param {*} gl  webgl 实例
 * @param {*} type  类型
 * @param {*} source  数据源
 * @returns 着色器实例
 */
function createShader (gl, type, source) {
  let shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    return null
  }
  return shader
}

/**
 * 创建执行程序
 * @param {*} gl  webgl 实例
 * @param {*} vertexShaderObject 顶点着色器
 * @param {*} fragmentShaderObject 片元着色器
 * @returns 程序
 */
function createProgram (gl, vertexShaderObject, fragmentShaderObject) {
  let program = gl.createProgram()

  gl.attachShader(program, vertexShaderObject)
  gl.attachShader(program, fragmentShaderObject)

  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    return null
  }

  return program
}

/**
 * 创建索引缓冲区
 * @param {*} gl webgl 实例
 * @param {*} data 索引数据
 * @returns Index Buffer Object
 */
function createIndexBuffer (gl, data) {
  let ibo = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW)
  return ibo
}

/**
 * 创建顶点缓冲区
 * @param {*} gl webgl 实例
 * @param {*} data 顶点数据
 * @returns Vertex Buffer Object
 */
function createVertexBuffer (gl, data) {
  let vbo = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  return vbo
}

/**
 * 创建动态纹理
 * @param {*} gl  webgl 实例
 * @param {*} width 纹理宽度
 * @param {*} height  纹理高度
 * @returns 纹理实例
 */
function createDynamicTexture (gl, width, height) {
  let texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return texture
}
