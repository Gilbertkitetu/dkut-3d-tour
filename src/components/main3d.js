import React , { useRef, useState } from "react";

import { Canvas, useFrame } from "react-three-fiber";

import { softShadows, MeshWobbleMaterial, OrbitControls  } from "drei";

import { useSpring, a } from "react-spring/three";
import Geometry from "three"; tbg


//call shadows
softShadows();

const SpinningMesh = ({ position, color, speed, args }) => {
    //reference the target mesh
    const mesh = useRef();

    //re-render and update new positions and rotations on each frame
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

    //Expand the mesh state
    const [expand, setExpand] = useState(false);

    //using react spring to expand
    const props = useSpring({
        scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
    });
    
    //render
    return (
        <a.mesh
        position={position}
        ref={mesh}
        onClick={() => setExpand(!expand)}
        scale={props.scale}
        castShadow
        >
            <boxBufferGeometry attach='geometry' args={args} />
            <MeshWobbleMaterial
            color={color}
            speed={speed}
            attach='material'
            factor={0.6}
            />

        </a.mesh>
    );
};

function Main3d () {
    <>
    <Canvas
        colorManagement
        shadowMap
        camera = {{ position: [-5, 2, 10], fov: 60 }}>
            {/* add ambient light */}
            <ambientLight intensity={0.3} />
            {/* Add main source of light wich also casts out shadows */}
            <directionalLight 
            castShadow
            positon = {[0, 10, 0]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            swadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            />
            
            {/* adding pointlights */}
            <pointLight positon= {[-10, 0, -20]} intensity={0.5}/>
            <pointLight positon = {[0, -10, 0]} intensity={1.5} />
            <group>
                {/* The floor */}
                <mesh 
                rotation = {[-Math.PI / 2,0,0]}
                position={[0, -3, 0]}
                receiveShadow>
                    <planeBufferGeometry attach='geometry' args={[100, 100]} />
                    <shaderMaterial attach='material' opacity={0.3} />

                </mesh>
                <SpinningMesh
                position={[0, 1, 0]}
                color='lightblue'
                args={[3,2,1]}
                speed={2}
                />
                <SpinningMesh position={[-2, 1, -5]} color='pink' speed={6} />
                <SpinningMesh position={[5, 1, -2]} color='pink' speed={6} />

            </group>

            <OrbitControls />

    </Canvas>
    </>
};

export default Main3d;