'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const MAX_RAYS = 300;
const RAY_COLOR = new THREE.Color("rgba(141, 81, 207, 1)");
const SPHERE_COLOR = new THREE.Color("rgba(141, 81, 207, 0.5)");
const params = {
    count: 150,
    firstHitOnly: true,
    useBVH: true,
    displayHelper: false,
    helperDepth: 10,
};

function RaycastScene() {
    const { scene, gl } = useThree();
    const glbMeshRef = useRef();
    const collisionSphereRef = useRef();
    const sphereInstanceRef = useRef();
    const lineSegmentsRef = useRef();

    useEffect(() => {
        // Configura el renderizador para tener un fondo transparente
        gl.setClearColor(0x000000, 0); // Fondo transparente en el renderizador

        // Configura la escena para que no tenga ningún fondo
        scene.background = null;
    }, [gl, scene]);

    const _raycaster = new THREE.Raycaster();
    const _position = new THREE.Vector3();
    const _quaternion = new THREE.Quaternion();
    const _scale = new THREE.Vector3(1, 1, 1);
    const _matrix = new THREE.Matrix4();
    const _axis = new THREE.Vector3();

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load('/assets/furry_orb.glb', (gltf) => {
            const glbMesh = gltf.scene;

            if (glbMesh) {
                glbMesh.scale.set(1.8, 1.8, 1.8);
                glbMesh.position.set(0, 0, 0);

                const collisionSphere = new THREE.Mesh(
                    new THREE.SphereGeometry(1.4, 32, 32),
                    new THREE.MeshBasicMaterial({ color: SPHERE_COLOR, transparent: true, opacity: 0.4, visible: true })
                );

                collisionSphere.position.set(0, 0, 0);
                collisionSphereRef.current = collisionSphere;
                glbMesh.add(collisionSphere);
                glbMeshRef.current = glbMesh;
                scene.add(glbMesh);
            }
        });

        return () => {
            if (glbMeshRef.current) {
                scene.remove(glbMeshRef.current);
            }
        };
    }, [scene]);

    const initRays = useCallback(() => {
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3();

        for (let i = 0; i < MAX_RAYS * 2; i++) {
            position.randomDirection().multiplyScalar(4.5);
            matrix.compose(position, _quaternion, _scale);
            sphereInstanceRef.current.setMatrixAt(i, matrix);
        }
    }, []);

    useEffect(() => {
        const sphereGeometry = new THREE.SphereGeometry();
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: RAY_COLOR });
        const sphereInstance = new THREE.InstancedMesh(sphereGeometry, sphereMaterial, MAX_RAYS * 2);
        sphereInstance.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        sphereInstance.count = 0;
        sphereInstanceRef.current = sphereInstance;
        scene.add(sphereInstance);

        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_RAYS * 2 * 3), 3));
        const lineMaterial = new THREE.LineBasicMaterial({
            color: RAY_COLOR,
            transparent: true,
            opacity: 0.25,
            depthWrite: false
        });
        const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
        lineSegmentsRef.current = lineSegments;
        scene.add(lineSegments);

        initRays();
    }, [scene, initRays]);

    const updateRays = () => {
        if (!collisionSphereRef.current) return;

        _raycaster.firstHitOnly = params.firstHitOnly;
        const rayCount = params.count;
        let lineNum = 0;

        for (let i = 0; i < rayCount; i++) {
            sphereInstanceRef.current.getMatrixAt(i * 2, _matrix);
            _matrix.decompose(_position, _quaternion, _scale);
            const offset = 1e-4 * window.performance.now();
            _axis.set(
                Math.sin(i * 100 + offset),
                Math.cos(-i * 10 + offset),
                Math.sin(i * 1 + offset),
            ).normalize();
            _position.applyAxisAngle(_axis, 0.001);
            _scale.setScalar(0.02);
            _matrix.compose(_position, _quaternion, _scale);
            sphereInstanceRef.current.setMatrixAt(i * 2, _matrix);

            _raycaster.ray.origin.copy(_position);
            _raycaster.ray.direction.copy(_position).multiplyScalar(-1).normalize();

            const hits = _raycaster.intersectObject(collisionSphereRef.current);
            if (hits.length !== 0) {
                const hit = hits[0];
                const point = hit.point;
                _scale.setScalar(0.01);
                _matrix.compose(point, _quaternion, _scale);
                sphereInstanceRef.current.setMatrixAt(i * 2 + 1, _matrix);

                lineSegmentsRef.current.geometry.attributes.position.setXYZ(lineNum++, _position.x, _position.y, _position.z);
                lineSegmentsRef.current.geometry.attributes.position.setXYZ(lineNum++, point.x, point.y, point.z);
            } else {
                sphereInstanceRef.current.setMatrixAt(i * 2 + 1, _matrix);
                lineSegmentsRef.current.geometry.attributes.position.setXYZ(lineNum++, _position.x, _position.y, _position.z);
                lineSegmentsRef.current.geometry.attributes.position.setXYZ(lineNum++, 0, 0, 0);
            }
        }

        sphereInstanceRef.current.count = rayCount * 2;
        sphereInstanceRef.current.instanceMatrix.needsUpdate = true;
        lineSegmentsRef.current.geometry.setDrawRange(0, lineNum);
        lineSegmentsRef.current.geometry.attributes.position.needsUpdate = true;
    };

    useFrame(() => {
        if (glbMeshRef.current) {
            glbMeshRef.current.rotation.y += 0.002;
        }

        updateRays();
    });

    return (
        <>
            <OrbitControls minDistance={10} maxDistance={10} />
        </>
    );
}

export default function Background() {
    return (
        <MainContainer>
            <BackgroundLayer />
            <ContainerAnimation>
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 10], fov: 60 }}
                >
                    <ambientLight intensity={0.9} />
                    <directionalLight
                        castShadow
                        position={[5, 10, 5]}
                        intensity={1}
                    />
                    <RaycastScene />
                </Canvas>
            </ContainerAnimation>
        </MainContainer>
    );
}

const fadeIn = keyframes `
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const MainContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    overflow: hidden;
`;

const ContainerAnimation = styled.div`
    animation: ${fadeIn} 3s ease-in-out;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
    overflow: hidden;
    z-index: 1;
`;

const BackgroundLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    background-image: url('/assets/Landing/background.webp');
    background-size: cover;
    background-position: center;
    z-index: 0;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://www.transparenttextures.com/patterns/noise.png');
        opacity: 0.2;
        pointer-events: none;
    }
`;


