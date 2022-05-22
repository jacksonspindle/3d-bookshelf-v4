import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import rainbowVideo from "./rainbow.mp4"
import * as THREE from 'three'
import bookPages from './bookPages.jpeg'

 function BookMesh(props) {

    // Rotation Animation

    const mesh = useRef();
    // useFrame(() => (mesh.current.rotation.z = mesh.current.rotation.y += 0.001));

    // console.log(props.cover)

 
    
    // THIS GIVES CORS ERROR
    // const texture = useLoader(THREE.TextureLoader, props.cover )


    return (
        
        <mesh ref={mesh} >

            <boxGeometry
                args={[2, 3, props.width ? props.width : .5]
                }
                />
            <meshBasicMaterial
                wireframe={true}
                // map={texture}
                color={'#ffffff'}>
            </meshBasicMaterial>
        </mesh>
        
    )
    
}

export default function Book(props) {


    // console.log(props)

    return (
        <div>
           
            
            <div className="canvas">
                <Canvas>
                
                    <Suspense>

                    
                    <BookMesh width={props.width} cover={props.cover}/>

                    

                    <Html  position={[-.8,0, props.width - .39  ]}  transform occlude>
                        <div className="canvas-book-cover">
                            <img src={props.cover} className="book-cover"></img>
                        </div>
                    </Html>
                    <Html  position={[-.8,0, props.width - .83  ]}  transform occlude>
                        <div className="canvas-book-cover">
                            <img src={props.cover} className="book-cover"></img>
                        </div>
                    </Html>
                    <Html  position={[-1.1,-1.3, props.width - .25  ]} rotation={[0,- Math.PI / 2,Math.PI / 2]}  transform occlude>
                        <div className="canvas-book-cover" style={{"height": "50px", "transform": `scaleY(${props.width})`}} >
                        <div className="assembled-book-spine">
                        <h1 >{props.title}</h1>
                        </div>
                        </div>
                    </Html>
                    <Html  position={[1.01,-1.2, props.width - .6  ]} rotation={[0, Math.PI / 2,Math.PI / 2]}  transform occlude>
                        <div className="canvas-book-cover" >
                        <img className="book-pages-image" src="./bookPages.jpeg" style={{"height": props.width * 17}} ></img>
                        </div>
                    </Html>
                
                    <OrbitControls />


                    </Suspense>
                </Canvas>
                
            </div>
            
             <div className="book-info-container">
             {/* <img src={props.cover}></img> */}
                <h1 className="book-info">{props.title}</h1>
                <h1 className="book-info">{props.author}</h1>
                <img src={props.cover} className="book-cover"></img>



            </div>
        </div>
    )
}