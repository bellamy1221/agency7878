"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[400],{4030:function(e,t,r){r.d(t,{r:function(){return u}});var i=r(1119),n=r(2265),o=r(1448),a=r(4231),l=r(4573);let s=function(e,t,r,i){let n=class extends o.ShaderMaterial{constructor(i={}){let n=Object.entries(e);super({uniforms:n.reduce((e,[t,r])=>{let i=o.UniformsUtils.clone({[t]:{value:r}});return{...e,...i}},{}),vertexShader:t,fragmentShader:r}),this.key="",n.forEach(([e])=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:t=>this.uniforms[e].value=t})),Object.assign(this,i)}};return n.key=o.MathUtils.generateUUID(),n}({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new o.Color,sectionColor:new o.Color,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new o.Vector3,worldPlanePosition:new o.Vector3},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${l.i>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),u=n.forwardRef(({args:e,cellColor:t="#000000",sectionColor:r="#2080ff",cellSize:l=.5,sectionSize:u=1,followCamera:c=!1,infiniteGrid:f=!1,fadeDistance:d=100,fadeStrength:h=1,fadeFrom:m=1,cellThickness:v=.5,sectionThickness:p=1,side:x=o.BackSide,...g},y)=>{(0,a.e)({GridMaterial:s});let _=n.useRef(null);n.useImperativeHandle(y,()=>_.current,[]);let w=new o.Plane,M=new o.Vector3(0,1,0),S=new o.Vector3(0,0,0);return(0,a.F)(e=>{w.setFromNormalAndCoplanarPoint(M,S).applyMatrix4(_.current.matrixWorld);let t=_.current.material,r=t.uniforms.worldCamProjPosition,i=t.uniforms.worldPlanePosition;w.projectPoint(e.camera.position,r.value),i.value.set(0,0,0).applyMatrix4(_.current.matrixWorld)}),n.createElement("mesh",(0,i.Z)({ref:_,frustumCulled:!1},g),n.createElement("gridMaterial",(0,i.Z)({transparent:!0,"extensions-derivatives":!0,side:x},{cellSize:l,sectionSize:u,cellColor:t,sectionColor:r,cellThickness:v,sectionThickness:p},{fadeDistance:d,fadeStrength:h,fadeFrom:m,infiniteGrid:f,followCamera:c})),n.createElement("planeGeometry",{args:e}))})},3867:function(e,t,r){r.d(t,{Q:function(){return f}});var i=r(1119),n=r(2265),o=r(1448),a=r(4231),l=r(4573);class s extends o.ShaderMaterial{constructor(e=new o.Vector2){super({uniforms:{inputBuffer:new o.Uniform(null),depthBuffer:new o.Uniform(null),resolution:new o.Uniform(new o.Vector2),texelSize:new o.Uniform(new o.Vector2),halfTexelSize:new o.Uniform(new o.Vector2),kernel:new o.Uniform(0),scale:new o.Uniform(1),cameraNear:new o.Uniform(0),cameraFar:new o.Uniform(1),minDepthThreshold:new o.Uniform(0),maxDepthThreshold:new o.Uniform(1),depthScale:new o.Uniform(0),depthToBlurRatioBias:new o.Uniform(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${l.i>=154?"colorspace_fragment":"encodings_fragment"}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:o.NoBlending,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class u{constructor({gl:e,resolution:t,width:r=500,height:i=500,minDepthThreshold:n=0,maxDepthThreshold:a=1,depthScale:l=0,depthToBlurRatioBias:u=.25}){this.renderToScreen=!1,this.renderTargetA=new o.WebGLRenderTarget(t,t,{minFilter:o.LinearFilter,magFilter:o.LinearFilter,stencilBuffer:!1,depthBuffer:!1,type:o.HalfFloatType}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new s,this.convolutionMaterial.setTexelSize(1/r,1/i),this.convolutionMaterial.setResolution(new o.Vector2(r,i)),this.scene=new o.Scene,this.camera=new o.Camera,this.convolutionMaterial.uniforms.minDepthThreshold.value=n,this.convolutionMaterial.uniforms.maxDepthThreshold.value=a,this.convolutionMaterial.uniforms.depthScale.value=l,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=u,this.convolutionMaterial.defines.USE_DEPTH=l>0;let c=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),f=new Float32Array([0,0,2,0,0,2]),d=new o.BufferGeometry;d.setAttribute("position",new o.BufferAttribute(c,3)),d.setAttribute("uv",new o.BufferAttribute(f,2)),this.screen=new o.Mesh(d,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,r){let i,n,o;let a=this.scene,l=this.camera,s=this.renderTargetA,u=this.renderTargetB,c=this.convolutionMaterial,f=c.uniforms;f.depthBuffer.value=t.depthTexture;let d=c.kernel,h=t;for(n=0,o=d.length-1;n<o;++n)i=(1&n)==0?s:u,f.kernel.value=d[n],f.inputBuffer.value=h.texture,e.setRenderTarget(i),e.render(a,l),h=i;f.kernel.value=d[n],f.inputBuffer.value=h.texture,e.setRenderTarget(this.renderToScreen?null:r),e.render(a,l)}}class c extends o.MeshStandardMaterial{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;null!=(t=e.defines)&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}let f=n.forwardRef(({mixBlur:e=0,mixStrength:t=1,resolution:r=256,blur:l=[0,0],minDepthThreshold:s=.9,maxDepthThreshold:f=1,depthScale:d=0,depthToBlurRatioBias:h=.25,mirror:m=0,distortion:v=1,mixContrast:p=1,distortionMap:x,reflectorOffset:g=0,...y},_)=>{(0,a.e)({MeshReflectorMaterialImpl:c});let w=(0,a.D)(({gl:e})=>e),M=(0,a.D)(({camera:e})=>e),S=(0,a.D)(({scene:e})=>e),D=(l=Array.isArray(l)?l:[l,l])[0]+l[1]>0,T=n.useRef(null);n.useImperativeHandle(_,()=>T.current,[]);let[U]=n.useState(()=>new o.Plane),[b]=n.useState(()=>new o.Vector3),[P]=n.useState(()=>new o.Vector3),[B]=n.useState(()=>new o.Vector3),[F]=n.useState(()=>new o.Matrix4),[C]=n.useState(()=>new o.Vector3(0,0,-1)),[R]=n.useState(()=>new o.Vector4),[E]=n.useState(()=>new o.Vector3),[k]=n.useState(()=>new o.Vector3),[z]=n.useState(()=>new o.Vector4),[W]=n.useState(()=>new o.Matrix4),[V]=n.useState(()=>new o.PerspectiveCamera),j=n.useCallback(()=>{var e;let t=T.current.parent||(null==(e=T.current)?void 0:e.__r3f.parent);if(!t||(P.setFromMatrixPosition(t.matrixWorld),B.setFromMatrixPosition(M.matrixWorld),F.extractRotation(t.matrixWorld),b.set(0,0,1),b.applyMatrix4(F),P.addScaledVector(b,g),E.subVectors(P,B),E.dot(b)>0))return;E.reflect(b).negate(),E.add(P),F.extractRotation(M.matrixWorld),C.set(0,0,-1),C.applyMatrix4(F),C.add(B),k.subVectors(P,C),k.reflect(b).negate(),k.add(P),V.position.copy(E),V.up.set(0,1,0),V.up.applyMatrix4(F),V.up.reflect(b),V.lookAt(k),V.far=M.far,V.updateMatrixWorld(),V.projectionMatrix.copy(M.projectionMatrix),W.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),W.multiply(V.projectionMatrix),W.multiply(V.matrixWorldInverse),W.multiply(t.matrixWorld),U.setFromNormalAndCoplanarPoint(b,P),U.applyMatrix4(V.matrixWorldInverse),R.set(U.normal.x,U.normal.y,U.normal.z,U.constant);let r=V.projectionMatrix;z.x=(Math.sign(R.x)+r.elements[8])/r.elements[0],z.y=(Math.sign(R.y)+r.elements[9])/r.elements[5],z.z=-1,z.w=(1+r.elements[10])/r.elements[14],R.multiplyScalar(2/R.dot(z)),r.elements[2]=R.x,r.elements[6]=R.y,r.elements[10]=R.z+1,r.elements[14]=R.w},[M,g]),[A,I,$,N]=n.useMemo(()=>{let i={minFilter:o.LinearFilter,magFilter:o.LinearFilter,type:o.HalfFloatType},n=new o.WebGLRenderTarget(r,r,i);n.depthBuffer=!0,n.depthTexture=new o.DepthTexture(r,r),n.depthTexture.format=o.DepthFormat,n.depthTexture.type=o.UnsignedShortType;let a=new o.WebGLRenderTarget(r,r,i),c=new u({gl:w,resolution:r,width:l[0],height:l[1],minDepthThreshold:s,maxDepthThreshold:f,depthScale:d,depthToBlurRatioBias:h}),g={mirror:m,textureMatrix:W,mixBlur:e,tDiffuse:n.texture,tDepth:n.depthTexture,tDiffuseBlur:a.texture,hasBlur:D,mixStrength:t,minDepthThreshold:s,maxDepthThreshold:f,depthScale:d,depthToBlurRatioBias:h,distortion:v,distortionMap:x,mixContrast:p,"defines-USE_BLUR":D?"":void 0,"defines-USE_DEPTH":d>0?"":void 0,"defines-USE_DISTORTION":x?"":void 0};return[n,a,c,g]},[w,l,W,r,m,D,e,t,s,f,d,h,v,x,p]);return(0,a.F)(()=>{var e;let t=T.current.parent||(null==(e=T.current)?void 0:e.__r3f.parent);if(!t)return;t.visible=!1;let r=w.xr.enabled,i=w.shadowMap.autoUpdate;j(),w.xr.enabled=!1,w.shadowMap.autoUpdate=!1,w.setRenderTarget(A),w.state.buffers.depth.setMask(!0),w.autoClear||w.clear(),w.render(S,V),D&&$.render(w,A,I),w.xr.enabled=r,w.shadowMap.autoUpdate=i,t.visible=!0,w.setRenderTarget(null)}),n.createElement("meshReflectorMaterialImpl",(0,i.Z)({attach:"material",key:"key"+N["defines-USE_BLUR"]+N["defines-USE_DEPTH"]+N["defines-USE_DISTORTION"],ref:T},N,y))})},4823:function(e,t,r){r.d(t,{A:function(){return a}});var i=r(2265),n=r(4231);let o=(0,i.createContext)(null);function a({iterations:e=10,ms:t=250,threshold:r=.75,step:a=.1,factor:l=.5,flipflops:s=1/0,bounds:u=e=>e>100?[60,100]:[40,60],onIncline:c,onDecline:f,onChange:d,onFallback:h,children:m}){let[v,p]=(0,i.useState)(()=>({fps:0,index:0,factor:l,flipped:0,refreshrate:0,fallback:!1,frames:[],averages:[],subscriptions:new Map,subscribe:e=>{let t=Symbol();return v.subscriptions.set(t,e.current),()=>void v.subscriptions.delete(t)}})),x=0;return(0,n.F)(()=>{let{frames:i,averages:n}=v;if(!v.fallback&&n.length<e){i.push(performance.now());let o=i[i.length-1]-i[0];if(o>=t){if(v.fps=Math.round(i.length/o*1e3)/1,v.refreshrate=Math.max(v.refreshrate,v.fps),n[v.index++%e]=v.fps,n.length===e){let[t,i]=u(v.refreshrate),o=n.filter(e=>e>=i),l=n.filter(e=>e<t);o.length>e*r&&(v.factor=Math.min(1,v.factor+a),v.flipped++,c&&c(v),v.subscriptions.forEach(e=>e.onIncline&&e.onIncline(v))),l.length>e*r&&(v.factor=Math.max(0,v.factor-a),v.flipped++,f&&f(v),v.subscriptions.forEach(e=>e.onDecline&&e.onDecline(v))),x!==v.factor&&(x=v.factor,d&&d(v),v.subscriptions.forEach(e=>e.onChange&&e.onChange(v))),v.flipped>s&&!v.fallback&&(v.fallback=!0,h&&h(v),v.subscriptions.forEach(e=>e.onFallback&&e.onFallback(v))),v.averages=[]}v.frames=[]}}}),i.createElement(o.Provider,{value:v},m)}},4573:function(e,t,r){r.d(t,{i:function(){return i}});let i=parseInt(r(1448).REVISION.replace(/\D+/g,""))},8328:function(e,t,r){let i,n;r.d(t,{V:function(){return y}});var o=r(1119),a=r(2265),l=r(4040),s=r(1448),u=r(4231);let c=new s.Vector3,f=new s.Vector3,d=new s.Vector3,h=new s.Vector2;function m(e,t,r){let i=c.setFromMatrixPosition(e.matrixWorld);i.project(t);let n=r.width/2,o=r.height/2;return[i.x*n+n,-(i.y*o)+o]}let v=e=>1e-10>Math.abs(e)?0:e;function p(e,t,r=""){let i="matrix3d(";for(let r=0;16!==r;r++)i+=v(t[r]*e.elements[r])+(15!==r?",":")");return r+i}let x=(i=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>p(e,i)),g=(n=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>p(e,n(t),"translate(-50%,-50%)")),y=a.forwardRef(({children:e,eps:t=.001,style:r,className:i,prepend:n,center:p,fullscreen:y,portal:_,distanceFactor:w,sprite:M=!1,transform:S=!1,occlude:D,onOcclude:T,castShadow:U,receiveShadow:b,material:P,geometry:B,zIndexRange:F=[16777271,0],calculatePosition:C=m,as:R="div",wrapperClass:E,pointerEvents:k="auto",...z},W)=>{let{gl:V,camera:j,scene:A,size:I,raycaster:$,events:N,viewport:L}=(0,u.D)(),[O]=a.useState(()=>document.createElement(R)),H=a.useRef(),G=a.useRef(null),Z=a.useRef(0),K=a.useRef([0,0]),Q=a.useRef(null),X=a.useRef(null),q=(null==_?void 0:_.current)||N.connected||V.domElement.parentNode,J=a.useRef(null),Y=a.useRef(!1),ee=a.useMemo(()=>{var e;return D&&"blending"!==D||Array.isArray(D)&&D.length&&(e=D[0])&&"object"==typeof e&&"current"in e},[D]);a.useLayoutEffect(()=>{let e=V.domElement;D&&"blending"===D?(e.style.zIndex=`${Math.floor(F[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[D]),a.useLayoutEffect(()=>{if(G.current){let e=H.current=l.createRoot(O);if(A.updateMatrixWorld(),S)O.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=C(G.current,j,I);O.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return q&&(n?q.prepend(O):q.appendChild(O)),()=>{q&&q.removeChild(O),e.unmount()}}},[q,S]),a.useLayoutEffect(()=>{E&&(O.className=E)},[E]);let et=a.useMemo(()=>S?{position:"absolute",top:0,left:0,width:I.width,height:I.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:p?"translate3d(-50%,-50%,0)":"none",...y&&{top:-I.height/2,left:-I.width/2,width:I.width,height:I.height},...r},[r,p,y,I,S]),er=a.useMemo(()=>({position:"absolute",pointerEvents:k}),[k]);a.useLayoutEffect(()=>{var t,n;Y.current=!1,S?null==(t=H.current)||t.render(a.createElement("div",{ref:Q,style:et},a.createElement("div",{ref:X,style:er},a.createElement("div",{ref:W,className:i,style:r,children:e})))):null==(n=H.current)||n.render(a.createElement("div",{ref:W,style:et,className:i,children:e}))});let ei=a.useRef(!0);(0,u.F)(e=>{if(G.current){j.updateMatrixWorld(),G.current.updateWorldMatrix(!0,!1);let e=S?K.current:C(G.current,j,I);if(S||Math.abs(Z.current-j.zoom)>t||Math.abs(K.current[0]-e[0])>t||Math.abs(K.current[1]-e[1])>t){let t=function(e,t){let r=c.setFromMatrixPosition(e.matrixWorld),i=f.setFromMatrixPosition(t.matrixWorld),n=r.sub(i),o=t.getWorldDirection(d);return n.angleTo(o)>Math.PI/2}(G.current,j),r=!1;ee&&(Array.isArray(D)?r=D.map(e=>e.current):"blending"!==D&&(r=[A]));let i=ei.current;if(r){let e=function(e,t,r,i){let n=c.setFromMatrixPosition(e.matrixWorld),o=n.clone();o.project(t),h.set(o.x,o.y),r.setFromCamera(h,t);let a=r.intersectObjects(i,!0);if(a.length){let e=a[0].distance;return n.distanceTo(r.ray.origin)<e}return!0}(G.current,j,$,r);ei.current=e&&!t}else ei.current=!t;i!==ei.current&&(T?T(!ei.current):O.style.display=ei.current?"block":"none");let n=Math.floor(F[0]/2),o=D?ee?[F[0],n]:[n-1,0]:F;if(O.style.zIndex=`${function(e,t,r){if(t instanceof s.PerspectiveCamera||t instanceof s.OrthographicCamera){let i=c.setFromMatrixPosition(e.matrixWorld),n=f.setFromMatrixPosition(t.matrixWorld),o=i.distanceTo(n),a=(r[1]-r[0])/(t.far-t.near),l=r[1]-a*t.far;return Math.round(a*o+l)}}(G.current,j,o)}`,S){let[e,t]=[I.width/2,I.height/2],r=j.projectionMatrix.elements[5]*t,{isOrthographicCamera:i,top:n,left:o,bottom:a,right:l}=j,s=x(j.matrixWorldInverse),u=i?`scale(${r})translate(${v(-(l+o)/2)}px,${v((n+a)/2)}px)`:`translateZ(${r}px)`,c=G.current.matrixWorld;M&&((c=j.matrixWorldInverse.clone().transpose().copyPosition(c).scale(G.current.scale)).elements[3]=c.elements[7]=c.elements[11]=0,c.elements[15]=1),O.style.width=I.width+"px",O.style.height=I.height+"px",O.style.perspective=i?"":`${r}px`,Q.current&&X.current&&(Q.current.style.transform=`${u}${s}translate(${e}px,${t}px)`,X.current.style.transform=g(c,1/((w||10)/400)))}else{let t=void 0===w?1:function(e,t){if(t instanceof s.OrthographicCamera)return t.zoom;if(!(t instanceof s.PerspectiveCamera))return 1;{let r=c.setFromMatrixPosition(e.matrixWorld),i=f.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*r.distanceTo(i))}}(G.current,j)*w;O.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}K.current=e,Z.current=j.zoom}}if(!ee&&J.current&&!Y.current){if(S){if(Q.current){let e=Q.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=j;if(t||B)z.scale&&(Array.isArray(z.scale)?z.scale instanceof s.Vector3?J.current.scale.copy(z.scale.clone().divideScalar(1)):J.current.scale.set(1/z.scale[0],1/z.scale[1],1/z.scale[2]):J.current.scale.setScalar(1/z.scale));else{let t=(w||10)/400,r=e.clientWidth*t,i=e.clientHeight*t;J.current.scale.set(r,i,1)}Y.current=!0}}}else{let t=O.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/L.factor,r=t.clientWidth*e,i=t.clientHeight*e;J.current.scale.set(r,i,1),Y.current=!0}J.current.lookAt(e.camera.position)}}});let en=a.useMemo(()=>({vertexShader:S?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[S]);return a.createElement("group",(0,o.Z)({},z,{ref:G}),D&&!ee&&a.createElement("mesh",{castShadow:U,receiveShadow:b,ref:J},B||a.createElement("planeGeometry",null),P||a.createElement("shaderMaterial",{side:s.DoubleSide,vertexShader:en.vertexShader,fragmentShader:en.fragmentShader})))})},7600:function(e,t,r){let i;function n(e){return new Promise((t,r)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>r(e.error)})}function o(){return i||(i=function(e,t){let r=indexedDB.open(e);r.onupgradeneeded=()=>r.result.createObjectStore(t);let i=n(r);return(e,r)=>i.then(i=>r(i.transaction(t,e).objectStore(t)))}("keyval-store","keyval")),i}function a(e,t=o()){return t("readonly",t=>n(t.get(e)))}function l(e,t,r=o()){return r("readwrite",r=>(r.put(t,e),n(r.transaction)))}function s(e,t=o()){return t("readwrite",t=>(t.delete(e),n(t.transaction)))}function u(e=o()){return e("readonly",e=>{var t;if(e.getAllKeys)return n(e.getAllKeys());let r=[];return(t=e=>r.push(e.key),e.openCursor().onsuccess=function(){this.result&&(t(this.result),this.result.continue())},n(e.transaction)).then(()=>r)})}r.d(t,{IV:function(){return s},U2:function(){return a},XP:function(){return u},t8:function(){return l}})}}]);