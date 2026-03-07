"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Dock from "./Dock";

import * as THREE from "three";

type Uniforms = {
    [key: string]: {
        value: number[] | number[][] | number;
        type: string;
    };
};

interface ShaderProps {
    source: string;
    uniforms: {
        [key: string]: {
            value: number[] | number[][] | number;
            type: string;
        };
    };
    maxFps?: number;
}

interface SignInPageProps {
    className?: string;
    onClose?: () => void;
    theme?: 'light' | 'dark';
}

export const CanvasRevealEffect = ({
    animationSpeed = 10,
    opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
    colors = [[0, 255, 255]],
    containerClassName,
    dotSize,
    showGradient = true,
    reverse = false, // This controls the direction
}: {
    animationSpeed?: number;
    opacities?: number[];
    colors?: number[][];
    containerClassName?: string;
    dotSize?: number;
    showGradient?: boolean;
    reverse?: boolean; // This prop determines the direction
}) => {
    return (
        <div className={cn("h-full relative w-full", containerClassName)}>
            <div className="h-full w-full">
                <DotMatrix
                    colors={colors ?? [[0, 255, 255]]}
                    dotSize={dotSize ?? 3}
                    opacities={
                        opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
                    }
                    // Pass reverse state and speed via string flags in the empty shader prop
                    shader={`
            ${reverse ? 'u_reverse_active' : 'false'}_;
            animation_speed_factor_${animationSpeed.toFixed(1)}_;
          `}
                    center={["x", "y"]}
                />
            </div>
            {showGradient && (
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            )}
        </div>
    );
};


interface DotMatrixProps {
    colors?: number[][];
    opacities?: number[];
    totalSize?: number;
    dotSize?: number;
    shader?: string;
    center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
    colors = [[0, 0, 0]],
    opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
    totalSize = 20,
    dotSize = 2,
    shader = "", // This shader string will now contain the animation logic
    center = ["x", "y"],
}) => {
    const uniforms = React.useMemo(() => {
        let colorsArray = [
            colors[0],
            colors[0],
            colors[0],
            colors[0],
            colors[0],
            colors[0],
        ];
        if (colors.length === 2) {
            colorsArray = [
                colors[0],
                colors[0],
                colors[0],
                colors[1],
                colors[1],
                colors[1],
            ];
        } else if (colors.length === 3) {
            colorsArray = [
                colors[0],
                colors[0],
                colors[1],
                colors[1],
                colors[2],
                colors[2],
            ];
        }
        return {
            u_colors: {
                value: colorsArray.map((color) => [
                    color[0] / 255,
                    color[1] / 255,
                    color[2] / 255,
                ]),
                type: "uniform3fv",
            },
            u_opacities: {
                value: opacities,
                type: "uniform1fv",
            },
            u_total_size: {
                value: totalSize,
                type: "uniform1f",
            },
            u_dot_size: {
                value: dotSize,
                type: "uniform1f",
            },
            u_reverse: {
                value: shader.includes("u_reverse_active") ? 1 : 0,
                type: "uniform1i",
            },
        };
    }, [colors, opacities, totalSize, dotSize, shader]);

    return (
        <Shader
            source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        uniform int u_reverse; 

        out vec4 fragColor;

        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
            vec2 st = fragCoord.xy;
            ${center.includes("x")
                    ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
                    : ""
                }
            ${center.includes("y")
                    ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
                    : ""
                }

            float opacity = step(0.0, st.x);
            opacity *= step(0.0, st.y);

            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

            float frequency = 5.0;
            float show_offset = random(st2); 
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

            vec3 color = u_colors[int(show_offset * 6.0)];

            float animation_speed_factor = 0.5; 
            vec2 center_grid = u_resolution / 2.0 / u_total_size;
            float dist_from_center = distance(center_grid, st2);

            float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);

            float max_grid_dist = distance(center_grid, vec2(0.0, 0.0));
            float timing_offset_outro = (max_grid_dist - dist_from_center) * 0.02 + (random(st2 + 42.0) * 0.2);


            float current_timing_offset;
            if (u_reverse == 1) {
                current_timing_offset = timing_offset_outro;
                 opacity *= 1.0 - step(current_timing_offset, u_time * animation_speed_factor);
                 opacity *= clamp((step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            } else {
                current_timing_offset = timing_offset_intro;
                 opacity *= step(current_timing_offset, u_time * animation_speed_factor);
                 opacity *= clamp((1.0 - step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            }


            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a; 
        }`}
            uniforms={uniforms}
            maxFps={60}
        />
    );
};


const ShaderMaterial = ({
    source,
    uniforms,
}: {
    source: string;
    hovered?: boolean;
    uniforms: Uniforms;
}) => {
    const { size } = useThree();
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const timestamp = clock.getElapsedTime();

        const material: any = ref.current.material;
        const timeLocation = material.uniforms.u_time;
        timeLocation.value = timestamp;
    });

    const getUniforms = () => {
        const preparedUniforms: any = {};

        for (const uniformName in uniforms) {
            const uniform: any = uniforms[uniformName];

            switch (uniform.type) {
                case "uniform1f":
                    preparedUniforms[uniformName] = { value: uniform.value, type: "1f" };
                    break;
                case "uniform1i":
                    preparedUniforms[uniformName] = { value: uniform.value, type: "1i" };
                    break;
                case "uniform3f":
                    preparedUniforms[uniformName] = {
                        value: new THREE.Vector3().fromArray(uniform.value),
                        type: "3f",
                    };
                    break;
                case "uniform1fv":
                    preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" };
                    break;
                case "uniform3fv":
                    preparedUniforms[uniformName] = {
                        value: uniform.value.map((v: number[]) =>
                            new THREE.Vector3().fromArray(v)
                        ),
                        type: "3fv",
                    };
                    break;
                case "uniform2f":
                    preparedUniforms[uniformName] = {
                        value: new THREE.Vector2().fromArray(uniform.value),
                        type: "2f",
                    };
                    break;
                default:
                    console.error(`Invalid uniform type for '${uniformName}'.`);
                    break;
            }
        }

        preparedUniforms["u_time"] = { value: 0, type: "1f" };
        preparedUniforms["u_resolution"] = {
            value: new THREE.Vector2(size.width * 2, size.height * 2),
        };
        return preparedUniforms;
    };

    const material = useMemo(() => {
        const materialObject = new THREE.ShaderMaterial({
            vertexShader: `
      precision mediump float;
      in vec2 coordinates;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        float x = position.x;
        float y = position.y;
        gl_Position = vec4(x, y, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
      `,
            fragmentShader: source,
            uniforms: getUniforms(),
            glslVersion: THREE.GLSL3,
            blending: THREE.CustomBlending,
            blendSrc: THREE.SrcAlphaFactor,
            blendDst: THREE.OneFactor,
        });

        return materialObject;
    }, [size.width, size.height, source]);

    return (
        <mesh ref={ref as any}>
            <planeGeometry args={[2, 2]} />
            <primitive object={material} attach="material" />
        </mesh>
    );
};

const Shader: React.FC<ShaderProps> = ({ source, uniforms }) => {
    return (
        <Canvas className="absolute inset-0  h-full w-full">
            <ShaderMaterial source={source} uniforms={uniforms} />
        </Canvas>
    );
};


export const SignInPage = ({ className, onClose, theme = 'light' }: SignInPageProps) => {
    const isDark = theme === 'dark';
    const [email, setEmail] = useState("");
    const [step, setStep] = useState<"email" | "code" | "success">("email");
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [initialCanvasVisible, setInitialCanvasVisible] = useState(true);
    const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false);

    const socialItems = [
        { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill={isDark ? 'white' : '#333'}><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z" /></svg>, label: 'Google', onClick: () => console.log('Google Signup') },
        { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill={isDark ? 'white' : '#333'}><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.88 3.65-.7 1.63.15 2.93.81 3.86 2.06-3.24 1.96-2.73 5.92.55 7.23-.74 1.89-1.63 3.61-3.14 5.2v-1.6zM12.03 7.25c-.15-1.98 1.53-3.8 3.51-4 1.01 2.43-1.47 4.19-3.51 4z" /></svg>, label: 'Apple', onClick: () => console.log('Apple Signup') }
    ];

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setStep("code");
        }
    };

    // Focus first input when code screen appears
    useEffect(() => {
        if (step === "code") {
            setTimeout(() => {
                codeInputRefs.current[0]?.focus();
            }, 500);
        }
    }, [step]);

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                codeInputRefs.current[index + 1]?.focus();
            }

            if (index === 5 && value) {
                const isComplete = newCode.every(digit => digit.length === 1);
                if (isComplete) {
                    setReverseCanvasVisible(true);

                    setTimeout(() => {
                        setInitialCanvasVisible(false);
                    }, 50);

                    setTimeout(() => {
                        setStep("success");
                    }, 2000);
                }
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            codeInputRefs.current[index - 1]?.focus();
        }
    };

    const handleBackClick = () => {
        setStep("email");
        setCode(["", "", "", "", "", ""]);
        setReverseCanvasVisible(false);
        setInitialCanvasVisible(true);
    };

    return (
        <div className={cn("flex w-[100%] flex-col min-h-screen relative", className)} style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc' }}>
            <div className="absolute inset-0 z-0">
                {initialCanvasVisible && (
                    <div className="absolute inset-0">
                        <CanvasRevealEffect
                            animationSpeed={1.5}
                            containerClassName={isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}
                            colors={isDark
                                ? [[255, 255, 255], [200, 200, 200]]
                                : [[14, 165, 233], [56, 189, 248]]
                            }
                            dotSize={2}
                            reverse={false}
                        />
                    </div>
                )}

                {reverseCanvasVisible && (
                    <div className="absolute inset-0">
                        <CanvasRevealEffect
                            animationSpeed={2}
                            containerClassName={isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}
                            colors={isDark
                                ? [[255, 255, 255], [200, 200, 200]]
                                : [[14, 165, 233], [56, 189, 248]]
                            }
                            dotSize={2}
                            reverse={true}
                        />
                    </div>
                )}

                <div className="absolute inset-0 backdrop-blur-[2px]" style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(248,250,252,0.6)' }} />
                <div className="absolute inset-0" style={{ background: isDark ? 'radial-gradient(circle at center, rgba(0,0,0,0.8), transparent)' : 'radial-gradient(circle at center, rgba(248,250,252,0.8), transparent)' }} />
            </div>

            <div className="relative z-10 flex flex-col flex-1">
                {onClose && (
                    <button
                        onClick={onClose}
                        className={`absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md transition-all z-50 text-2xl font-light scale-100 hover:scale-110 active:scale-95 ${isDark ? 'text-white bg-white/5 hover:bg-white/10 border border-white/10' : 'text-gray-800 bg-black/5 hover:bg-black/10 border border-black/10'}`}
                    >
                        ×
                    </button>
                )}

                <div className="flex flex-1 flex-col lg:flex-row items-center justify-center">
                    <div className="flex-1 flex flex-col justify-center items-center p-6">
                        <div className="w-full max-w-sm">
                            <AnimatePresence mode="wait">
                                {step === "email" ? (
                                    <motion.div
                                        key="email-step"
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="space-y-6 text-center"
                                    >
                                        <div className="space-y-1">
                                            <h1 className={`text-[2.5rem] font-bold leading-[1.1] tracking-tight m-0 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome Donator</h1>
                                            <p className={`text-[1.8rem] font-light mt-2 ${isDark ? 'text-white/70' : 'text-gray-500'}`}>Sign in to track impact</p>
                                        </div>


                                        <div className="space-y-4 mt-6">
                                            <div className="flex justify-center w-full mb-4">
                                                <Dock
                                                    items={socialItems}
                                                    panelHeight={55}
                                                    baseItemSize={40}
                                                    magnification={60}
                                                />
                                            </div>

                                            <div className="flex flex-row items-center gap-4">
                                                <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
                                                <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>or</span>
                                                <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
                                            </div>

                                            <form onSubmit={handleEmailSubmit}>
                                                <div className="relative">
                                                    <input
                                                        type="email"
                                                        placeholder="info@gmail.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className={`w-full backdrop-blur-[1px] border-1 rounded-full py-3 px-4 focus:outline-none text-center ${isDark ? 'text-white border-white/10 focus:border-white/30' : 'text-gray-900 border-gray-300 focus:border-gray-500 bg-white/50'}`}
                                                        required
                                                    />
                                                    <button
                                                        type="submit"
                                                        className={`absolute right-1.5 top-1.5 w-9 h-9 flex items-center justify-center rounded-full transition-colors group overflow-hidden ${isDark ? 'text-white bg-white/10 hover:bg-white/20' : 'text-gray-800 bg-black/10 hover:bg-black/20'}`}
                                                    >
                                                        <span className="relative w-full h-full block overflow-hidden">
                                                            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
                                                                →
                                                            </span>
                                                            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0">
                                                                →
                                                            </span>
                                                        </span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        <p className={`text-xs pt-10 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                            By signing up, you agree to the <a href="#" className={`underline transition-colors ${isDark ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'}`}>Arunya Terms</a>, <a href="#" className={`underline transition-colors ${isDark ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'}`}>Policies</a>, and <a href="#" className={`underline transition-colors ${isDark ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'}`}>Privacy Notice</a>.
                                        </p>
                                    </motion.div>
                                ) : step === "code" ? (
                                    <motion.div
                                        key="code-step"
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="space-y-6 text-center"
                                    >
                                        <div className="space-y-1">
                                            <h1 className={`text-[2.5rem] font-bold leading-[1.1] tracking-tight m-0 ${isDark ? 'text-white' : 'text-gray-900'}`}>We sent you a code</h1>
                                            <p className={`text-[1.25rem] font-light mt-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Please enter it</p>
                                        </div>

                                        <div className="w-full mt-6">
                                            <div className={`relative rounded-full py-4 px-5 border bg-transparent flex flex-row ${isDark ? 'border-white/10' : 'border-gray-300'}`}>
                                                <div className="flex flex-row items-center justify-center gap-1">
                                                    {code.map((digit, i) => (
                                                        <div key={i} className="flex flex-row items-center">
                                                            <div className="relative w-8 h-8">
                                                                <input
                                                                    ref={(el) => {
                                                                        codeInputRefs.current[i] = el;
                                                                    }}
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                    pattern="[0-9]*"
                                                                    maxLength={1}
                                                                    value={digit}
                                                                    onChange={e => handleCodeChange(i, e.target.value)}
                                                                    onKeyDown={e => handleKeyDown(i, e)}
                                                                    className={`absolute top-0 left-0 w-full h-full text-center text-xl bg-transparent border-none focus:outline-none focus:ring-0 appearance-none p-0 m-0 z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}
                                                                    style={{ caretColor: 'transparent' }}
                                                                />
                                                                {!digit && (
                                                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
                                                                        <span className={`text-xl ${isDark ? 'text-white/30' : 'text-gray-300'}`}>0</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {i < 5 && <span className={`text-xl mx-2 ${isDark ? 'text-white/20' : 'text-gray-300'}`}>|</span>}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <motion.p
                                                className={`transition-colors cursor-pointer text-sm ${isDark ? 'text-white/50 hover:text-white/70' : 'text-gray-500 hover:text-gray-700'}`}
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                Resend code
                                            </motion.p>
                                        </div>

                                        <div className="flex w-full gap-3 mt-6">
                                            <motion.button
                                                onClick={handleBackClick}
                                                className={`rounded-full font-medium px-8 py-3 transition-colors w-[30%] ${isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                Back
                                            </motion.button>
                                            <motion.button
                                                className={`flex-1 rounded-full font-medium py-3 border transition-all duration-300 ${code.every(d => d !== "")
                                                    ? isDark ? "bg-white text-black border-transparent hover:bg-white/90 cursor-pointer" : "bg-gray-900 text-white border-transparent hover:bg-gray-800 cursor-pointer"
                                                    : isDark ? "bg-[#111] text-white/50 border-white/10 cursor-not-allowed" : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                                                    }`}
                                                disabled={!code.every(d => d !== "")}
                                            >
                                                Continue
                                            </motion.button>
                                        </div>

                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success-step"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                                        className="space-y-6 text-center"
                                    >
                                        <div className="space-y-1">
                                            <h1 className={`text-[2.5rem] font-bold leading-[1.1] tracking-tight m-0 ${isDark ? 'text-white' : 'text-gray-900'}`}>You're in!</h1>
                                            <p className={`text-[1.25rem] font-light mt-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Welcome Back</p>
                                        </div>

                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                            className="py-10"
                                        >
                                            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-white to-white/70' : 'bg-gradient-to-br from-green-500 to-emerald-400'}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isDark ? 'text-black' : 'text-white'}`} viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </motion.div>

                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1 }}
                                            onClick={onClose}
                                            className={`w-full rounded-full font-medium py-3 transition-colors ${isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                                        >
                                            Continue to Dashboard
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
