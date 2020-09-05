



//const initListeners = _ => {}

//const setCanvasSize = _ => {}

const writeText = text => {}

const convertTextToData = () => {}

const positionData = () => {}

//!const generateIsoField = interval => {}

const mergeTextGridIntoField = () => {}

//const makeGridIsometric = array2D => {}

//const applyZHeightToField = () => {}

const drawMeshFromField = () => {}

//const drawPointsByZHeight = () => {}




function perlinNoise(p) {
    // p is float
    const p0 = Math.floor(p);
    const p1 = p0 + 1.0;
      
    const t = p - p0;
    const fade_t = fade(t);
  
    const g0 = grad(p0);
    const g1 = grad(p1);
    
    return (1.0-fade_t)*g0*(p - p0) + fade_t*g1*(p - p1);
  }