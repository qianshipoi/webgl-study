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


