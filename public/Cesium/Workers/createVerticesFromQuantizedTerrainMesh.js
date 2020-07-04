/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./when-1faa3867","./AttributeCompression-5601f533","./IndexDatatype-2bcfc06b","./IntersectionTests-59cef209","./Plane-b1ca737b","./WebMercatorProjection-1ecca5ba","./createTaskProcessorWorker","./EllipsoidTangentPlane-8dc9a637","./OrientedBoundingBox-656f9e92","./TerrainEncoding-9126cc77"],function(Te,e,t,r,pe,ye,i,be,n,a,o,s,xe,Ne,c,u,Me,d,Ce,ve,we){"use strict";var Ee=32767,Ae=new ye.Cartesian3,Pe=new ye.Cartesian3,Se=new ye.Cartesian3,Be=new ye.Cartographic,Fe=new ye.Cartesian2,Ve=new ye.Cartesian3,He=new be.Matrix4,We=new be.Matrix4;function _e(e,t,r,i,n,a,o,s,c){var u=Number.POSITIVE_INFINITY,d=n.north,h=n.south,l=n.east,m=n.west;l<m&&(l+=pe.CesiumMath.TWO_PI);for(var I=e.length,g=0;g<I;++g){var f=e[g],T=r[f],p=i[f];Be.longitude=pe.CesiumMath.lerp(m,l,p.x),Be.latitude=pe.CesiumMath.lerp(h,d,p.y),Be.height=T-t;var y=a.cartographicToCartesian(Be,Ae);be.Matrix4.multiplyByPoint(o,y,y),ye.Cartesian3.minimumByComponent(y,s,s),ye.Cartesian3.maximumByComponent(y,c,c),u=Math.min(u,Be.height)}return u}function ke(e,t,r,i,n,a,o,s,c,u,d,h,l,m,I,g,f,T){var p,y,b;b=l?(p=n.length-1,y=-1):(p=0,y=n.length,1);var x=-1,N=Te.defined(c),M=t/a.getStride(),C=d.north,v=d.south,w=d.east,E=d.west;w<E&&(w+=pe.CesiumMath.TWO_PI);for(var A=p;A!==y;A+=b){var P=n[A],S=o[P],B=s[P];Be.longitude=pe.CesiumMath.lerp(E,w,B.x)+f,Be.latitude=pe.CesiumMath.lerp(v,C,B.y)+T,Be.height=S-h;var F,V=u.cartographicToCartesian(Be,Ae);if(N){var H=2*P;if(Fe.x=c[H],Fe.y=c[1+H],1!==m){var W=xe.AttributeCompression.octDecode(Fe.x,Fe.y,Ve),_=be.Transforms.eastNorthUpToFixedFrame(Ae,u,We),k=be.Matrix4.inverseTransformation(_,He);be.Matrix4.multiplyByPointAsVector(k,W,W),W.z*=m,ye.Cartesian3.normalize(W,W),be.Matrix4.multiplyByPointAsVector(_,W,W),ye.Cartesian3.normalize(W,W),xe.AttributeCompression.octEncode(W,Fe)}}a.hasWebMercatorT&&(F=(Me.WebMercatorProjection.geodeticLatitudeToMercatorAngle(Be.latitude)-I)*g),t=a.encode(e,t,V,B,Be.height,Fe,F),-1!==x&&(r[i++]=x,r[i++]=M-1,r[i++]=P,r[i++]=M-1,r[i++]=M,r[i++]=P),x=P,++M}return i}function Oe(e,t){var r;return"function"==typeof e.slice&&"function"!=typeof(r=e.slice()).sort&&(r=void 0),Te.defined(r)||(r=Array.prototype.slice.call(e)),r.sort(t),r}return d(function(e,t){var r,i,n=e.quantizedVertices,a=n.length/3,o=e.octEncodedNormals,s=e.westIndices.length+e.eastIndices.length+e.southIndices.length+e.northIndices.length,c=e.includeWebMercatorT,u=ye.Rectangle.clone(e.rectangle),d=u.west,h=u.south,l=u.east,m=u.north,I=ye.Ellipsoid.clone(e.ellipsoid),g=e.exaggeration,f=e.minimumHeight*g,T=e.maximumHeight*g,p=e.relativeToCenter,y=be.Transforms.eastNorthUpToFixedFrame(p,I),b=be.Matrix4.inverseTransformation(y,new be.Matrix4);c&&(r=Me.WebMercatorProjection.geodeticLatitudeToMercatorAngle(h),i=1/(Me.WebMercatorProjection.geodeticLatitudeToMercatorAngle(m)-r));var x=n.subarray(0,a),N=n.subarray(a,2*a),M=n.subarray(2*a,3*a),C=Te.defined(o),v=new Array(a),w=new Array(a),E=new Array(a),A=c?new Array(a):[],P=Pe;P.x=Number.POSITIVE_INFINITY,P.y=Number.POSITIVE_INFINITY,P.z=Number.POSITIVE_INFINITY;var S=Se;S.x=Number.NEGATIVE_INFINITY,S.y=Number.NEGATIVE_INFINITY,S.z=Number.NEGATIVE_INFINITY;for(var B=Number.POSITIVE_INFINITY,F=Number.NEGATIVE_INFINITY,V=Number.POSITIVE_INFINITY,H=Number.NEGATIVE_INFINITY,W=0;W<a;++W){var _=x[W],k=N[W],O=_/Ee,z=k/Ee,Y=pe.CesiumMath.lerp(f,T,M[W]/Ee);Be.longitude=pe.CesiumMath.lerp(d,l,O),Be.latitude=pe.CesiumMath.lerp(h,m,z),Be.height=Y,B=Math.min(Be.longitude,B),F=Math.max(Be.longitude,F),V=Math.min(Be.latitude,V),H=Math.max(Be.latitude,H);var j=I.cartographicToCartesian(Be);v[W]=new ye.Cartesian2(O,z),w[W]=Y,E[W]=j,c&&(A[W]=(Me.WebMercatorProjection.geodeticLatitudeToMercatorAngle(Be.latitude)-r)*i),be.Matrix4.multiplyByPoint(b,j,Ae),ye.Cartesian3.minimumByComponent(Ae,P,P),ye.Cartesian3.maximumByComponent(Ae,S,S)}var G,D,L,U=Oe(e.westIndices,function(e,t){return v[e].y-v[t].y}),R=Oe(e.eastIndices,function(e,t){return v[t].y-v[e].y}),q=Oe(e.southIndices,function(e,t){return v[t].x-v[e].x}),J=Oe(e.northIndices,function(e,t){return v[e].x-v[t].x});1!==g&&(D=be.BoundingSphere.fromPoints(E),G=ve.OrientedBoundingBox.fromRectangle(u,f,T,I)),(1!==g||f<0)&&(L=new we.EllipsoidalOccluder(I).computeHorizonCullingPointPossiblyUnderEllipsoid(p,E,f));var K=f;K=Math.min(K,_e(e.westIndices,e.westSkirtHeight,w,v,u,I,b,P,S)),K=Math.min(K,_e(e.southIndices,e.southSkirtHeight,w,v,u,I,b,P,S)),K=Math.min(K,_e(e.eastIndices,e.eastSkirtHeight,w,v,u,I,b,P,S)),K=Math.min(K,_e(e.northIndices,e.northSkirtHeight,w,v,u,I,b,P,S));for(var Q=new Ce.AxisAlignedBoundingBox(P,S,p),X=new we.TerrainEncoding(Q,K,T,y,C,c),Z=X.getStride(),$=new Float32Array(a*Z+s*Z),ee=0,te=0;te<a;++te){if(C){var re=2*te;if(Fe.x=o[re],Fe.y=o[1+re],1!==g){var ie=xe.AttributeCompression.octDecode(Fe.x,Fe.y,Ve),ne=be.Transforms.eastNorthUpToFixedFrame(E[te],I,We),ae=be.Matrix4.inverseTransformation(ne,He);be.Matrix4.multiplyByPointAsVector(ae,ie,ie),ie.z*=g,ye.Cartesian3.normalize(ie,ie),be.Matrix4.multiplyByPointAsVector(ne,ie,ie),ye.Cartesian3.normalize(ie,ie),xe.AttributeCompression.octEncode(ie,Fe)}}ee=X.encode($,ee,E[te],v[te],w[te],Fe,A[te])}var oe=Math.max(0,2*(s-4)),se=e.indices.length+3*oe,ce=Ne.IndexDatatype.createTypedArray(a+s,se);ce.set(e.indices,0);var ue=1e-4*(F-B),de=1e-4*(H-V),he=-ue,le=ue,me=de,Ie=-de,ge=a*Z,fe=e.indices.length;return fe=ke($,ge,ce,fe,e.westIndices,X,w,v,o,I,u,e.westSkirtHeight,!0,g,r,i,he,0),fe=ke($,ge+=e.westIndices.length*Z,ce,fe,e.southIndices,X,w,v,o,I,u,e.southSkirtHeight,!1,g,r,i,0,Ie),fe=ke($,ge+=e.southIndices.length*Z,ce,fe,e.eastIndices,X,w,v,o,I,u,e.eastSkirtHeight,!1,g,r,i,le,0),ke($,ge+=e.eastIndices.length*Z,ce,fe,e.northIndices,X,w,v,o,I,u,e.northSkirtHeight,!0,g,r,i,0,me),t.push($.buffer,ce.buffer),{vertices:$.buffer,indices:ce.buffer,westIndicesSouthToNorth:U,southIndicesEastToWest:q,eastIndicesNorthToSouth:R,northIndicesWestToEast:J,vertexStride:Z,center:p,minimumHeight:f,maximumHeight:T,boundingSphere:D,orientedBoundingBox:G,occludeePointInScaledSpace:L,encoding:X,skirtIndex:e.indices.length}})});
