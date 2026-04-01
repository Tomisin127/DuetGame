(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/game/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUDIO_TRACKS",
    ()=>AUDIO_TRACKS,
    "BUILDER_CODE",
    ()=>BUILDER_CODE,
    "COLORS",
    ()=>COLORS,
    "GAME_CONFIG",
    ()=>GAME_CONFIG
]);
const GAME_CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    CENTER_X: 400,
    CENTER_Y: 520,
    ORBIT_RADIUS: 60,
    CIRCLE_RADIUS: 15,
    OBSTACLE_SIZE: 20,
    BASE_OBSTACLE_SPEED: 2.5,
    OBSTACLE_SPAWN_INTERVAL: 800,
    DIFFICULTY_INCREASE_INTERVAL: 10000,
    DIFFICULTY_SPEED_MULTIPLIER: 0.2,
    MAX_DIFFICULTY: 10,
    FPS_TARGET: 60,
    ROTATION_SPEED: 0.06
};
const BUILDER_CODE = 'bc_928el9vb';
const COLORS = {
    BACKGROUND: '#050a0f',
    CIRCLE_1: '#38bdf8',
    CIRCLE_2: '#2dd4bf',
    OBSTACLE: '#ffffff',
    OBSTACLE_ACCENT: 'rgba(255, 255, 255, 0.8)',
    HUD_TEXT: '#ffffff',
    HUD_SECONDARY: '#94a3b8',
    PULSE_COLOR: '#2dd4bf20',
    ORBIT_COLOR: '#1e293b',
    GLOW_PRIMARY: '#2dd4bf',
    GLOW_SECONDARY: '#38bdf8'
};
const AUDIO_TRACKS = [
    'https://cdn.pixabay.com/audio/2022/03/10/audio_4ca5d8ee86.mp3',
    'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/game/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateComboMultiplier",
    ()=>calculateComboMultiplier,
    "calculateDifficulty",
    ()=>calculateDifficulty,
    "checkCollision",
    ()=>checkCollision,
    "checkPowerUpCollision",
    ()=>checkPowerUpCollision,
    "createParticles",
    ()=>createParticles,
    "formatTime",
    ()=>formatTime,
    "getRandomAudioTrack",
    ()=>getRandomAudioTrack,
    "spawnObstacle",
    ()=>spawnObstacle,
    "spawnPowerUp",
    ()=>spawnPowerUp,
    "updateObstacles",
    ()=>updateObstacles,
    "updateParticles",
    ()=>updateParticles,
    "updatePowerUps",
    ()=>updatePowerUps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/game/constants.ts [app-client] (ecmascript)");
;
function checkCollision(circles, obstacles) {
    const { CENTER_X, CENTER_Y, ORBIT_RADIUS, CIRCLE_RADIUS } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"];
    for (const obstacle of obstacles){
        for (const circle of circles){
            const circleX = CENTER_X + Math.cos(circle.angle) * ORBIT_RADIUS;
            const circleY = CENTER_Y + Math.sin(circle.angle) * ORBIT_RADIUS;
            const closestX = Math.max(obstacle.x, Math.min(circleX, obstacle.x + obstacle.width));
            const closestY = Math.max(obstacle.y, Math.min(circleY, obstacle.y + obstacle.height));
            const distanceX = circleX - closestX;
            const distanceY = circleY - closestY;
            const distanceSquared = distanceX * distanceX + distanceY * distanceY;
            if (distanceSquared < CIRCLE_RADIUS * CIRCLE_RADIUS) {
                return true;
            }
        }
    }
    return false;
}
function spawnObstacle(difficulty) {
    const types = [
        'left',
        'right',
        'center'
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    const size = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].OBSTACLE_SIZE;
    const width = size;
    const height = size;
    let x;
    const minX = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ORBIT_RADIUS * 2.5;
    const maxX = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ORBIT_RADIUS * 2.5 - width;
    x = minX + Math.random() * (maxX - minX);
    const speed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].BASE_OBSTACLE_SPEED + difficulty * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].DIFFICULTY_SPEED_MULTIPLIER;
    return {
        id: Date.now() + Math.random(),
        x,
        y: -height,
        width,
        height,
        speed,
        type
    };
}
function updateObstacles(obstacles, difficulty) {
    return obstacles.map((obstacle)=>({
            ...obstacle,
            y: obstacle.y + obstacle.speed
        })).filter((obstacle)=>obstacle.y < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CANVAS_HEIGHT + 100);
}
function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
function calculateDifficulty(elapsedTime) {
    const difficulty = Math.floor(elapsedTime / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].DIFFICULTY_INCREASE_INTERVAL);
    return Math.min(difficulty, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].MAX_DIFFICULTY);
}
function getRandomAudioTrack(tracks) {
    return tracks[Math.floor(Math.random() * tracks.length)];
}
function spawnPowerUp(difficulty, centerX, centerY) {
    // 5% chance per frame to spawn a power-up, increases slightly with difficulty
    const spawnChance = 0.05 + difficulty * 0.005;
    if (Math.random() > spawnChance) return null;
    const types = [
        'shield',
        'slowmo',
        'doubleSpin'
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
        id: Date.now() + Math.random(),
        type,
        angle: Math.random() * Math.PI * 2,
        duration: type === 'shield' ? 5000 : type === 'slowmo' ? 3000 : 4000,
        createdAt: Date.now()
    };
}
function checkPowerUpCollision(circles, powerUps, centerX, centerY, orbitRadius) {
    const { CIRCLE_RADIUS } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"];
    const checkRadius = CIRCLE_RADIUS * 2;
    for (const powerUp of powerUps){
        for (const circle of circles){
            const circleX = centerX + Math.cos(circle.angle) * orbitRadius;
            const circleY = centerY + Math.sin(circle.angle) * orbitRadius;
            const puX = centerX + Math.cos(powerUp.angle) * orbitRadius * 1.5;
            const puY = centerY + Math.sin(powerUp.angle) * orbitRadius * 1.5;
            const distanceX = circleX - puX;
            const distanceY = circleY - puY;
            const distanceSquared = distanceX * distanceX + distanceY * distanceY;
            if (distanceSquared < checkRadius * checkRadius) {
                return powerUp;
            }
        }
    }
    return null;
}
function updatePowerUps(powerUps) {
    const now = Date.now();
    return powerUps.filter((pu)=>now - pu.createdAt < pu.duration);
}
function createParticles(x, y, color, count = 8) {
    const particles = [];
    for(let i = 0; i < count; i++){
        const angle = i / count * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            color
        });
    }
    return particles;
}
function updateParticles(particles) {
    return particles.map((p)=>({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            life: p.life - 0.02
        })).filter((p)=>p.life > 0);
}
function calculateComboMultiplier(comboCount) {
    return Math.min(1 + comboCount * 0.1, 2);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/GameCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/game/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const GameCanvas = ({ gameState, pulseIntensity })=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const gameStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(gameState);
    const pulseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(pulseIntensity);
    // Update refs when props change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameCanvas.useEffect": ()=>{
            gameStateRef.current = gameState;
            pulseRef.current = pulseIntensity;
        }
    }["GameCanvas.useEffect"], [
        gameState,
        pulseIntensity
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameCanvas.useEffect": ()=>{
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;
            const resizeCanvas = {
                "GameCanvas.useEffect.resizeCanvas": ()=>{
                    const dpr = window.devicePixelRatio || 1;
                    canvas.width = window.innerWidth * dpr;
                    canvas.height = window.innerHeight * dpr;
                    canvas.style.width = `${window.innerWidth}px`;
                    canvas.style.height = `${window.innerHeight}px`;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.scale(dpr, dpr);
                    }
                }
            }["GameCanvas.useEffect.resizeCanvas"];
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            return ({
                "GameCanvas.useEffect": ()=>{
                    window.removeEventListener('resize', resizeCanvas);
                }
            })["GameCanvas.useEffect"];
        }
    }["GameCanvas.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameCanvas.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const render = {
                "GameCanvas.useEffect.render": ()=>{
                    const state = gameStateRef.current;
                    const pulse = pulseRef.current;
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    const scaleX = width / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CANVAS_WIDTH;
                    const scaleY = height / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CANVAS_HEIGHT;
                    const scale = Math.min(scaleX, scaleY);
                    const scaledWidth = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CANVAS_WIDTH * scale;
                    const scaledHeight = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CANVAS_HEIGHT * scale;
                    const offsetX = (width - scaledWidth) / 2;
                    const offsetY = (height - scaledHeight) / 2;
                    // Clear canvas
                    ctx.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].BACKGROUND;
                    ctx.fillRect(0, 0, width, height);
                    ctx.save();
                    ctx.translate(offsetX, offsetY);
                    ctx.scale(scale, scale);
                    // Pulse effect
                    const pulseGlow = Math.floor(pulse * 20);
                    ctx.fillStyle = `rgb(${pulseGlow}, ${Math.floor(pulseGlow * 0.4)}, ${Math.floor(pulseGlow * 0.5)})`;
                    ctx.fillRect(0, 0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CANVAS_WIDTH, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CANVAS_HEIGHT);
                    if (pulse > 0.3) {
                        ctx.shadowBlur = 60;
                        ctx.shadowColor = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].PULSE_COLOR;
                        ctx.beginPath();
                        ctx.arc(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_Y, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ORBIT_RADIUS + 40, 0, Math.PI * 2);
                        ctx.strokeStyle = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].PULSE_COLOR;
                        ctx.lineWidth = 3;
                        ctx.stroke();
                        ctx.shadowBlur = 0;
                    }
                    // Orbit circle
                    ctx.strokeStyle = '#3f3f46';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_Y, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ORBIT_RADIUS, 0, Math.PI * 2);
                    ctx.stroke();
                    // Center dot
                    ctx.fillStyle = '#52525b';
                    ctx.beginPath();
                    ctx.arc(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_Y, 8, 0, Math.PI * 2);
                    ctx.fill();
                    // Draw obstacles with glow effect for difficulty waves
                    state.obstacles.forEach({
                        "GameCanvas.useEffect.render": (obstacle)=>{
                            if (state.difficultyWave > 3) {
                                ctx.shadowBlur = 20;
                                ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
                            }
                            ctx.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].OBSTACLE;
                            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                            ctx.shadowBlur = 0;
                        }
                    }["GameCanvas.useEffect.render"]);
                    // Draw power-ups
                    state.powerUps.forEach({
                        "GameCanvas.useEffect.render": (powerUp)=>{
                            const puX = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X + Math.cos(powerUp.angle) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ORBIT_RADIUS * 1.5;
                            const puY = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_Y + Math.sin(powerUp.angle) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ORBIT_RADIUS * 1.5;
                            const puColors = {
                                shield: '#FFD700',
                                slowmo: '#00D9FF',
                                doubleSpin: '#FF00FF'
                            };
                            const puColor = puColors[powerUp.type] || '#FFFF00';
                            ctx.shadowBlur = 25;
                            ctx.shadowColor = puColor;
                            ctx.beginPath();
                            ctx.arc(puX, puY, 12, 0, Math.PI * 2);
                            ctx.fillStyle = puColor;
                            ctx.fill();
                            ctx.strokeStyle = '#ffffff';
                            ctx.lineWidth = 2;
                            ctx.stroke();
                            ctx.shadowBlur = 0;
                            // Draw type indicator
                            ctx.fillStyle = '#000000';
                            ctx.font = 'bold 10px Arial';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const typeChar = powerUp.type === 'shield' ? 'S' : powerUp.type === 'slowmo' ? 'T' : 'D';
                            ctx.fillText(typeChar, puX, puY);
                        }
                    }["GameCanvas.useEffect.render"]);
                    // Draw particles
                    state.particles.forEach({
                        "GameCanvas.useEffect.render": (particle)=>{
                            ctx.globalAlpha = particle.life;
                            ctx.fillStyle = particle.color;
                            ctx.beginPath();
                            ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.globalAlpha = 1;
                        }
                    }["GameCanvas.useEffect.render"]);
                    // Draw shield indicator
                    if (state.activeShield) {
                        ctx.globalAlpha = 0.3;
                        ctx.strokeStyle = '#FFD700';
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.arc(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_Y, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ORBIT_RADIUS + 50, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                    // Draw circles
                    state.circles.forEach({
                        "GameCanvas.useEffect.render": (circle)=>{
                            const x = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X + Math.cos(circle.angle) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ORBIT_RADIUS;
                            const y = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_Y + Math.sin(circle.angle) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ORBIT_RADIUS;
                            ctx.shadowBlur = 30;
                            ctx.shadowColor = circle.color;
                            ctx.beginPath();
                            ctx.arc(x, y, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CIRCLE_RADIUS, 0, Math.PI * 2);
                            ctx.fillStyle = circle.color;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.strokeStyle = '#ffffff';
                            ctx.lineWidth = 3;
                            ctx.stroke();
                        }
                    }["GameCanvas.useEffect.render"]);
                    ctx.restore();
                    // Continue animation loop
                    if (state.isPlaying) {
                        animationFrameRef.current = requestAnimationFrame(render);
                    }
                }
            }["GameCanvas.useEffect.render"];
            // Start animation loop
            animationFrameRef.current = requestAnimationFrame(render);
            return ({
                "GameCanvas.useEffect": ()=>{
                    if (animationFrameRef.current) {
                        cancelAnimationFrame(animationFrameRef.current);
                    }
                }
            })["GameCanvas.useEffect"];
        }
    }["GameCanvas.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            className: "w-full h-full",
            style: {
                imageRendering: 'crisp-edges'
            }
        }, void 0, false, {
            fileName: "[project]/src/components/game/GameCanvas.tsx",
            lineNumber: 242,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/game/GameCanvas.tsx",
        lineNumber: 241,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GameCanvas, "GejUFWBhYnP9O0plBbfqRTNEE54=");
_c = GameCanvas;
const __TURBOPACK__default__export__ = GameCanvas;
var _c;
__turbopack_context__.k.register(_c, "GameCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/HUD.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/game/utils.ts [app-client] (ecmascript)");
'use client';
;
;
const HUD = ({ score, highScore, elapsedTime, difficulty, combo = 0, shield = false, slowMoActive = false })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-8 left-1/2 -translate-x-1/2 z-20 px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-8 md:gap-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-widest mb-1",
                                children: "Score"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/HUD.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl md:text-4xl font-light text-white tabular-nums",
                                children: score
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/HUD.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/HUD.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center border-l border-r border-gray-700 px-8 md:px-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-widest mb-1",
                                children: "Time"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/HUD.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl md:text-4xl font-light text-white tabular-nums",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(elapsedTime)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/HUD.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/HUD.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-widest mb-1",
                                children: "Level"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/HUD.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl md:text-4xl font-light text-white tabular-nums",
                                children: difficulty + 1
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/HUD.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/HUD.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/HUD.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            combo > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mt-4 animate-pulse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] md:text-xs font-medium text-yellow-400 uppercase tracking-widest mb-1",
                        children: "Combo"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/HUD.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-2xl md:text-3xl font-light text-yellow-400 tabular-nums",
                        children: [
                            combo,
                            "x"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/HUD.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/HUD.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 justify-center mt-4",
                children: [
                    shield && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-1 border border-yellow-500 rounded-full text-xs text-yellow-400 font-medium uppercase tracking-widest",
                        children: "⚔ Shield"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/HUD.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    slowMoActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-1 border border-cyan-500 rounded-full text-xs text-cyan-400 font-medium uppercase tracking-widest animate-pulse",
                        children: "⏱ Slow-Mo"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/HUD.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/HUD.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mt-6 text-xs text-gray-500 uppercase tracking-widest font-light",
                children: [
                    "Best: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white font-medium ml-1",
                        children: highScore
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/HUD.tsx",
                        lineNumber: 57,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/HUD.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/HUD.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = HUD;
const __TURBOPACK__default__export__ = HUD;
var _c;
__turbopack_context__.k.register(_c, "HUD");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/MobileControls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const MobileControls = ({ onLeftControl, onRightControl })=>{
    _s();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [leftActive, setLeftActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rightActive, setRightActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileControls.useEffect": ()=>{
            const checkMobile = {
                "MobileControls.useEffect.checkMobile": ()=>{
                    setIsMobile(window.innerWidth < 768);
                }
            }["MobileControls.useEffect.checkMobile"];
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return ({
                "MobileControls.useEffect": ()=>{
                    window.removeEventListener('resize', checkMobile);
                }
            })["MobileControls.useEffect"];
        }
    }["MobileControls.useEffect"], []);
    const handleTouchStart = (side, e)=>{
        e.preventDefault();
        if (side === 'left') {
            setLeftActive(true);
            onLeftControl(true);
        } else {
            setRightActive(true);
            onRightControl(true);
        }
    };
    const handleTouchEnd = (side, e)=>{
        e.preventDefault();
        if (side === 'left') {
            setLeftActive(false);
            onLeftControl(false);
        } else {
            setRightActive(false);
            onRightControl(false);
        }
    };
    if (!isMobile) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-10 pointer-events-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-1/2 h-full transition-colors duration-75 ${leftActive ? 'bg-white/10' : 'bg-transparent'}`,
                    onTouchStart: (e)=>handleTouchStart('left', e),
                    onTouchEnd: (e)=>handleTouchEnd('left', e),
                    onMouseDown: (e)=>handleTouchStart('left', e),
                    onMouseUp: (e)=>handleTouchEnd('left', e),
                    onMouseLeave: (e)=>handleTouchEnd('left', e),
                    style: {
                        touchAction: 'none'
                    },
                    children: leftActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-white/60 text-sm font-light tracking-widest",
                            children: "← CCW"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/MobileControls.tsx",
                            lineNumber: 75,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/MobileControls.tsx",
                        lineNumber: 74,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/game/MobileControls.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-1/2 h-full transition-colors duration-75 ${rightActive ? 'bg-white/10' : 'bg-transparent'}`,
                    onTouchStart: (e)=>handleTouchStart('right', e),
                    onTouchEnd: (e)=>handleTouchEnd('right', e),
                    onMouseDown: (e)=>handleTouchStart('right', e),
                    onMouseUp: (e)=>handleTouchEnd('right', e),
                    onMouseLeave: (e)=>handleTouchEnd('right', e),
                    style: {
                        touchAction: 'none'
                    },
                    children: rightActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-white/60 text-sm font-light tracking-widest",
                            children: "CW →"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/MobileControls.tsx",
                            lineNumber: 94,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/MobileControls.tsx",
                        lineNumber: 93,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/game/MobileControls.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game/MobileControls.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/game/MobileControls.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MobileControls, "C4ApVIuNMcEAXtCO4cPuNrPHkzQ=");
_c = MobileControls;
const __TURBOPACK__default__export__ = MobileControls;
var _c;
__turbopack_context__.k.register(_c, "MobileControls");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/AudioManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const AudioManager = ({ isPlaying, onBeat })=>{
    _s();
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const beatIntervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [audioInitialized, setAudioInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AudioManager.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && !audioRef.current) {
                audioRef.current = new Audio();
                audioRef.current.loop = true;
                audioRef.current.volume = 0.5;
                audioRef.current.preload = 'auto';
                // Using a reliable cinematic dark ambient track
                audioRef.current.src = 'https://cdn.pixabay.com/audio/2023/10/30/audio_3c9b2c00e7.mp3';
            }
            return ({
                "AudioManager.useEffect": ()=>{
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current = null;
                    }
                    if (beatIntervalRef.current) {
                        clearInterval(beatIntervalRef.current);
                    }
                }
            })["AudioManager.useEffect"];
        }
    }["AudioManager.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AudioManager.useEffect": ()=>{
            if (!audioRef.current) return;
            if (isPlaying) {
                // Initialize audio on first play (requires user interaction)
                if (!audioInitialized) {
                    audioRef.current.load();
                    setAudioInitialized(true);
                }
                // Attempt to play audio
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then({
                        "AudioManager.useEffect": ()=>{
                            console.log('Audio playing successfully');
                        }
                    }["AudioManager.useEffect"]).catch({
                        "AudioManager.useEffect": (error)=>{
                            console.log('Audio autoplay prevented:', error);
                            // Try again after a short delay
                            setTimeout({
                                "AudioManager.useEffect": ()=>{
                                    if (audioRef.current) {
                                        audioRef.current.play().catch({
                                            "AudioManager.useEffect": ()=>{}
                                        }["AudioManager.useEffect"]);
                                    }
                                }
                            }["AudioManager.useEffect"], 100);
                        }
                    }["AudioManager.useEffect"]);
                }
                // Set up beat interval
                beatIntervalRef.current = setInterval({
                    "AudioManager.useEffect": ()=>{
                        onBeat();
                    }
                }["AudioManager.useEffect"], 600);
            } else {
                audioRef.current.pause();
                if (beatIntervalRef.current) {
                    clearInterval(beatIntervalRef.current);
                }
            }
            return ({
                "AudioManager.useEffect": ()=>{
                    if (beatIntervalRef.current) {
                        clearInterval(beatIntervalRef.current);
                    }
                }
            })["AudioManager.useEffect"];
        }
    }["AudioManager.useEffect"], [
        isPlaying,
        onBeat,
        audioInitialized
    ]);
    return null;
};
_s(AudioManager, "hKPOWg9QoVmJqRGBNqWc7aZsKaY=");
_c = AudioManager;
const __TURBOPACK__default__export__ = AudioManager;
var _c;
__turbopack_context__.k.register(_c, "AudioManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/ControlsGuide.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const ControlsGuide = ()=>{
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isMinimized, setIsMinimized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ControlsGuide.useEffect": ()=>{
            const timer = setTimeout({
                "ControlsGuide.useEffect.timer": ()=>{
                    setIsVisible(false);
                }
            }["ControlsGuide.useEffect.timer"], 7000);
            return ({
                "ControlsGuide.useEffect": ()=>clearTimeout(timer)
            })["ControlsGuide.useEffect"];
        }
    }["ControlsGuide.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `hidden md:block fixed top-20 left-4 z-20 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`,
        children: !isMinimized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-zinc-900/90 backdrop-blur-md border-2 border-zinc-700 rounded-2xl p-6 shadow-2xl max-w-xs",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-white font-bold text-lg uppercase tracking-wider",
                            children: "🎮 Controls"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/ControlsGuide.tsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsMinimized(true),
                            className: "text-zinc-400 hover:text-white transition-colors",
                            children: "➖"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/ControlsGuide.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game/ControlsGuide.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3 text-zinc-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "bg-zinc-700 px-3 py-1 rounded-lg font-mono text-white font-bold",
                                    children: "←"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/ControlsGuide.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "or"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/ControlsGuide.tsx",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "bg-zinc-700 px-3 py-1 rounded-lg font-mono text-white font-bold",
                                    children: "A"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/ControlsGuide.tsx",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: "Left Circle"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/ControlsGuide.tsx",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/ControlsGuide.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "bg-zinc-700 px-3 py-1 rounded-lg font-mono text-white font-bold",
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/ControlsGuide.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "or"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/ControlsGuide.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "bg-zinc-700 px-3 py-1 rounded-lg font-mono text-white font-bold",
                                    children: "D"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/ControlsGuide.tsx",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: "Right Circle"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/ControlsGuide.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/ControlsGuide.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game/ControlsGuide.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game/ControlsGuide.tsx",
            lineNumber: 25,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>setIsMinimized(false),
            className: "bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-xl font-bold shadow-xl border-2 border-zinc-600 transition-all",
            children: "🎮 Controls"
        }, void 0, false, {
            fileName: "[project]/src/components/game/ControlsGuide.tsx",
            lineNumber: 53,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/game/ControlsGuide.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ControlsGuide, "3QzE6vAL6WnXE+tBK9PMidX52RY=");
_c = ControlsGuide;
const __TURBOPACK__default__export__ = ControlsGuide;
var _c;
__turbopack_context__.k.register(_c, "ControlsGuide");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/StyledButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const StyledButton = ({ onClick, disabled = false, variant = 'primary', size = 'lg', children, className = '' })=>{
    const baseStyles = "font-medium transition-smooth cursor-pointer uppercase tracking-widest select-none";
    const variantStyles = {
        primary: "bg-white text-black hover:bg-gray-200 active:bg-gray-300 border border-white shadow-sm",
        secondary: "bg-black text-white hover:bg-gray-900 active:bg-black border border-white shadow-sm",
        outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black active:bg-gray-200"
    };
    const sizeStyles = {
        sm: "px-6 py-2 text-xs",
        md: "px-8 py-3 text-sm",
        lg: "px-12 py-4 text-base",
        xl: "px-16 py-5 text-lg"
    };
    const disabledStyles = "opacity-40 cursor-not-allowed";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: `
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? disabledStyles : ''}
        ${className}
      `,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/game/StyledButton.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = StyledButton;
const __TURBOPACK__default__export__ = StyledButton;
var _c;
__turbopack_context__.k.register(_c, "StyledButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useBaseAppWallet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseAppWallet",
    ()=>useBaseAppWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useBaseAppWallet() {
    _s();
    const [isBaseApp, setIsBaseApp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoConnect, setAutoConnect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBaseAppWallet.useEffect": ()=>{
            // Check if we're running in Base App environment
            const isInBaseApp = ("TURBOPACK compile-time value", "object") !== 'undefined' && window.ethereum?.isBaseApp;
            setIsBaseApp(!!isInBaseApp);
            setAutoConnect(!!isInBaseApp);
        }
    }["useBaseAppWallet.useEffect"], []);
    return {
        isBaseApp,
        autoConnect
    };
}
_s(useBaseAppWallet, "jSfiHGdo7jbpuNxT5KCDivSEh2w=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/WalletConnectButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WalletConnectButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/hooks/useConnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBaseAppWallet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useBaseAppWallet.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function WalletConnectButton() {
    _s();
    const { connect, connectors, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"])();
    const { isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { isBaseApp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBaseAppWallet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseAppWallet"])();
    if (isConnected) {
        return null; // Don't show button when connected
    }
    const handleConnect = ()=>{
        // In Base App environment, auto-connect with injected wallet
        if (isBaseApp) {
            const injectedConnector = connectors.find((c)=>c.id === 'injected');
            if (injectedConnector) {
                connect({
                    connector: injectedConnector
                });
                return;
            }
        }
        // Otherwise show the full wallet selection modal
        setShowModal(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleConnect,
                disabled: isPending,
                className: "bg-white text-black hover:bg-gray-200 active:bg-gray-300 font-medium px-12 py-5 border border-white shadow-sm uppercase tracking-widest text-lg transition-smooth disabled:opacity-40",
                children: isPending ? 'Connecting...' : 'Connect Wallet'
            }, void 0, false, {
                fileName: "[project]/src/components/WalletConnectButton.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm",
                onClick: ()=>setShowModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black border border-white p-8 max-w-md w-full mx-4 shadow-lg animate-fade-in",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-white uppercase tracking-widest",
                                    children: "Select Wallet"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/WalletConnectButton.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowModal(false),
                                    className: "text-gray-400 hover:text-white text-2xl leading-none",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/WalletConnectButton.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/WalletConnectButton.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 divide-y divide-gray-800",
                            children: connectors.map((connector)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        connect({
                                            connector
                                        });
                                        setShowModal(false);
                                    },
                                    disabled: isPending,
                                    className: "w-full bg-black hover:bg-gray-900 border border-gray-800 hover:border-white px-6 py-4 text-white font-medium transition-smooth disabled:opacity-40 text-left flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg",
                                            children: connector.name.includes('MetaMask') ? '🦊' : connector.name.includes('Coinbase') ? '⭐' : connector.name.includes('Rainbow') ? '🌈' : connector.name.includes('WalletConnect') ? '🔗' : '👛'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WalletConnectButton.tsx",
                                            lineNumber: 64,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: connector.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WalletConnectButton.tsx",
                                            lineNumber: 70,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, connector.id, true, {
                                    fileName: "[project]/src/components/WalletConnectButton.tsx",
                                    lineNumber: 55,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/WalletConnectButton.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/WalletConnectButton.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/WalletConnectButton.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(WalletConnectButton, "m1WR46KbUNpmHVa0GHwxx3cyHgc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBaseAppWallet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseAppWallet"]
    ];
});
_c = WalletConnectButton;
var _c;
__turbopack_context__.k.register(_c, "WalletConnectButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/DuetGame.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DuetGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/hooks/useConnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/hooks/useDisconnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/hooks/useBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSendCalls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/hooks/useSendCalls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useCallsStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/hooks/useCallsStatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/viem@2.47.6_bufferutil@4.1.0_typescript@5.7.3_utf-8-validate@6.0.6_zod@3.25.76/node_modules/viem/_esm/chains/definitions/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/viem@2.47.6_bufferutil@4.1.0_typescript@5.7.3_utf-8-validate@6.0.6_zod@3.25.76/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/viem@2.47.6_bufferutil@4.1.0_typescript@5.7.3_utf-8-validate@6.0.6_zod@3.25.76/node_modules/viem/_esm/utils/unit/parseEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ox$40$0$2e$12$2e$4_typescript$40$5$2e$7$2e$3_zod$40$3$2e$25$2e$76$2f$node_modules$2f$ox$2f$_esm$2f$erc8021$2f$Attribution$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Attribution$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ox@0.12.4_typescript@5.7.3_zod@3.25.76/node_modules/ox/_esm/erc8021/Attribution.js [app-client] (ecmascript) <export * as Attribution>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/game/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$GameCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/GameCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$HUD$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/HUD.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$MobileControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/MobileControls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$AudioManager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/AudioManager.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$ControlsGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/ControlsGuide.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$StyledButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/StyledButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WalletConnectButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/WalletConnectButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBaseAppWallet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useBaseAppWallet.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const MINIMUM_USD_REQUIRED = 0.0001;
const GAME_FEE_RECIPIENT = '0xEA549e458e77Fd93bf330e5EAEf730c50d8F5249';
function DuetGame() {
    _s();
    const { address, isConnected, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { connect, connectors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"])();
    const { disconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisconnect"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"])();
    const { sendCalls } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSendCalls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSendCalls"])();
    const { data: balanceData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBalance"])({
        address: address,
        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id
    });
    const [pendingCallsId, setPendingCallsId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConfirmingTransaction, setIsConfirmingTransaction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { data: callsStatus, isLoading: isCheckingStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useCallsStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallsStatus"])({
        id: pendingCallsId || undefined,
        query: {
            enabled: !!pendingCallsId,
            refetchInterval: pendingCallsId ? 1000 : undefined
        }
    });
    const [gameStatus, setGameStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('menu');
    const [pulseIntensity, setPulseIntensity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [elapsedTime, setElapsedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isCheckingBalance, setIsCheckingBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [balanceError, setBalanceError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [ethPrice, setEthPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2500);
    const [walletBalance, setWalletBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('0.0000');
    const [walletBalanceUSD, setWalletBalanceUSD] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('0.00');
    const [audioEnabled, setAudioEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [audioReady, setAudioReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { isBaseApp, autoConnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBaseAppWallet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseAppWallet"])();
    const gameStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        isPlaying: false,
        isPaused: false,
        score: 0,
        highScore: 0,
        difficulty: 0,
        startTime: 0,
        obstacles: [],
        circles: [
            {
                angle: 0,
                direction: 'cw',
                color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].CIRCLE_1
            },
            {
                angle: Math.PI,
                direction: 'cw',
                color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].CIRCLE_2
            }
        ],
        isTransactionPending: false,
        lastObstacleSpawn: 0
    });
    const [, forceUpdate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const animationFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastFrameTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const leftControlActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const rightControlActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const fetchEthPrice = async ()=>{
        try {
            const response = await fetch('/api/eth-price');
            const data = await response.json();
            return data.ethPrice;
        } catch (error) {
            console.error('Failed to fetch ETH price:', error);
            return 2500;
        }
    };
    const checkBalance = async ()=>{
        if (!isConnected || !address) {
            setBalanceError('Please connect your wallet');
            return false;
        }
        try {
            setIsCheckingBalance(true);
            setBalanceError('');
            const currentEthPrice = await fetchEthPrice();
            setEthPrice(currentEthPrice);
            if (chain?.id !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id) {
                await switchChain?.({
                    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id
                });
            }
            // Get fresh balance data with a small delay to ensure latest balance
            const balanceInEth = balanceData ? parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(balanceData.value)) : 0;
            const balanceInUSD = balanceInEth * currentEthPrice;
            setWalletBalance(balanceInEth.toFixed(6));
            setWalletBalanceUSD(balanceInUSD.toFixed(2));
            const minimumEthRequired = MINIMUM_USD_REQUIRED / currentEthPrice;
            // Add gas buffer (0.001 ETH ≈ $2.50 at $2500/ETH) for Base network transaction
            const gasBufferEth = 0.001;
            const totalEthNeeded = minimumEthRequired + gasBufferEth;
            const totalUsdNeeded = totalEthNeeded * currentEthPrice;
            console.log('[v0] Balance check:');
            console.log('[v0] - Your balance:', balanceInEth.toFixed(6), 'ETH ($' + balanceInUSD.toFixed(2) + ')');
            console.log('[v0] - Transaction fee:', MINIMUM_USD_REQUIRED.toFixed(6), 'USD');
            console.log('[v0] - Gas buffer:', gasBufferEth, 'ETH');
            console.log('[v0] - Total needed:', totalEthNeeded.toFixed(6), 'ETH ($' + totalUsdNeeded.toFixed(2) + ')');
            if (balanceInEth < totalEthNeeded) {
                setBalanceError(`Insufficient funds. You need ${totalEthNeeded.toFixed(6)} ETH ($${totalUsdNeeded.toFixed(2)}) including gas fees. You have ${balanceInEth.toFixed(6)} ETH.`);
                return false;
            }
            return true;
        } catch (error) {
            console.error('Balance check error:', error);
            setBalanceError('Failed to check balance');
            return false;
        } finally{
            setIsCheckingBalance(false);
        }
    };
    const sendGameTransaction = async ()=>{
        if (!address) {
            console.error('[v0] No address available for transaction');
            return null;
        }
        try {
            console.log('[v0] Starting transaction with builder code: bc_928el9vb');
            console.log('[v0] Address:', address);
            console.log('[v0] Current chain:', chain?.id, 'Base chain ID:', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id);
            if (chain?.id !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id) {
                console.log('[v0] Switching to Base chain...');
                await switchChain?.({
                    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id
                });
                await new Promise((resolve)=>setTimeout(resolve, 1000));
            }
            const amountInEth = MINIMUM_USD_REQUIRED / ethPrice;
            const amountInWei = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(amountInEth.toFixed(18));
            // Verify we have enough balance including gas
            const currentBalance = balanceData ? parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(balanceData.value)) : 0;
            const gasBufferEth = 0.001;
            const totalNeeded = amountInEth + gasBufferEth;
            if (currentBalance < totalNeeded) {
                setBalanceError(`Insufficient balance for transaction. Need ${totalNeeded.toFixed(6)} ETH, have ${currentBalance.toFixed(6)} ETH`);
                return null;
            }
            console.log('[v0] Sending transaction with:');
            console.log('[v0] - Amount:', amountInWei.toString(), 'wei');
            console.log('[v0] - To:', GAME_FEE_RECIPIENT);
            console.log('[v0] - Builder Code:', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUILDER_CODE"]);
            console.log('[v0] - Gas buffer included:', gasBufferEth, 'ETH');
            // Generate DATA_SUFFIX using Attribution.toDataSuffix with builder code
            const DATA_SUFFIX = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ox$40$0$2e$12$2e$4_typescript$40$5$2e$7$2e$3_zod$40$3$2e$25$2e$76$2f$node_modules$2f$ox$2f$_esm$2f$erc8021$2f$Attribution$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Attribution$3e$__["Attribution"].toDataSuffix({
                codes: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUILDER_CODE"]
                ]
            });
            console.log('[v0] - Generated DATA_SUFFIX:', DATA_SUFFIX);
            const callsId = await sendCalls({
                calls: [
                    {
                        to: GAME_FEE_RECIPIENT,
                        value: amountInWei
                    }
                ],
                capabilities: {
                    dataSuffix: {
                        value: DATA_SUFFIX,
                        optional: false
                    }
                }
            });
            console.log('[v0] Transaction sent successfully with ID:', callsId);
            console.log('[v0] CallsId type:', typeof callsId, 'Value:', JSON.stringify(callsId));
            return callsId;
        } catch (error) {
            console.error('[v0] Transaction error:', error);
            console.error('[v0] Error type:', typeof error);
            console.error('[v0] Error keys:', error && typeof error === 'object' ? Object.keys(error) : 'N/A');
            if (error && typeof error === 'object' && 'message' in error) {
                const errorMessage = error.message;
                console.error('[v0] Error message:', errorMessage);
                if (errorMessage.includes('insufficient')) {
                    setBalanceError('Insufficient funds including gas fees. Try adding more ETH to your wallet.');
                } else if (errorMessage.includes('rejected') || errorMessage.includes('denied') || errorMessage.includes('User rejected')) {
                    setBalanceError('Transaction cancelled. Please sign the transaction to play.');
                } else {
                    setBalanceError(`Transaction failed: ${errorMessage}`);
                }
            } else {
                setBalanceError('Transaction failed. Please try again.');
            }
            return null;
        }
    };
    const startGameAfterConfirmation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DuetGame.useCallback[startGameAfterConfirmation]": ()=>{
            console.log('[v0] startGameAfterConfirmation() called');
            console.log('[v0] Current gameStatus before change:', gameStatus);
            // Critical: Reset all transaction state FIRST
            setPendingCallsId(null);
            setIsConfirmingTransaction(false);
            setBalanceError('');
            // Update game state with fresh start
            const now = Date.now();
            gameStateRef.current = {
                ...gameStateRef.current,
                isPlaying: true,
                isPaused: false,
                score: 0,
                difficulty: 0,
                startTime: now,
                obstacles: [],
                isTransactionPending: false,
                lastObstacleSpawn: now,
                circles: [
                    {
                        angle: Math.PI * 1.5,
                        direction: 'cw',
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].CIRCLE_1
                    },
                    {
                        angle: Math.PI * 0.5,
                        direction: 'cw',
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].CIRCLE_2
                    }
                ],
                powerUps: [],
                particles: [],
                comboCount: 0,
                lastSuccessTime: now,
                activeShield: false,
                slowMoEndTime: 0,
                difficultyWave: 0
            };
            console.log('[v0] Updated gameStateRef:', {
                isPlaying: gameStateRef.current.isPlaying,
                startTime: gameStateRef.current.startTime,
                now: now
            });
            // Enable audio
            setAudioEnabled(true);
            // Force immediate re-render
            forceUpdate({
                "DuetGame.useCallback[startGameAfterConfirmation]": (n)=>n + 1
            }["DuetGame.useCallback[startGameAfterConfirmation]"]);
            // Then update game status to trigger game loop
            setTimeout({
                "DuetGame.useCallback[startGameAfterConfirmation]": ()=>{
                    console.log('[v0] Setting gameStatus to playing');
                    setGameStatus('playing');
                    forceUpdate({
                        "DuetGame.useCallback[startGameAfterConfirmation]": (n)=>n + 1
                    }["DuetGame.useCallback[startGameAfterConfirmation]"]);
                }
            }["DuetGame.useCallback[startGameAfterConfirmation]"], 0);
            console.log('[v0] Game initialization complete - game should start now');
        }
    }["DuetGame.useCallback[startGameAfterConfirmation]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DuetGame.useEffect": ()=>{
            if (!pendingCallsId) {
                console.log('[v0] No pending calls ID, skipping status check');
                return;
            }
            console.log('[v0] Checking calls status for:', pendingCallsId);
            console.log('[v0] Current callsStatus:', JSON.stringify(callsStatus, null, 2));
            console.log('[v0] callsStatus?.status:', callsStatus?.status);
            console.log('[v0] callsStatus?.receipts:', callsStatus?.receipts);
            console.log('[v0] isCheckingStatus:', isCheckingStatus);
            if (!callsStatus) {
                console.log('[v0] callsStatus not yet available, waiting...');
                return;
            }
            const status = callsStatus?.status ? callsStatus.status.toUpperCase() : '';
            console.log('[v0] Normalized status:', status);
            // Check for successful transaction completion
            const hasReceipts = callsStatus?.receipts && Array.isArray(callsStatus.receipts) && callsStatus.receipts.length > 0;
            const hasAnyValidReceipt = hasReceipts && callsStatus.receipts.some({
                "DuetGame.useEffect": (r)=>r !== null && r !== undefined
            }["DuetGame.useEffect"]);
            // Success conditions: CONFIRMED, SUCCESS status, or has valid receipts
            const isConfirmed = status === 'CONFIRMED' || status === 'SUCCESS' || status === 'COMPLETED' || hasAnyValidReceipt;
            console.log('[v0] Debug check:');
            console.log('[v0] - status:', status);
            console.log('[v0] - hasReceipts:', hasReceipts);
            console.log('[v0] - hasAnyValidReceipt:', hasAnyValidReceipt);
            console.log('[v0] - isConfirmed:', isConfirmed);
            if (isConfirmed) {
                console.log('[v0] ✅ Transaction CONFIRMED! Starting game now...');
                startGameAfterConfirmation();
            } else if (status === 'FAILED' || status?.includes('FAILED') || status?.includes('ERROR') || status?.includes('REJECTED')) {
                console.log('[v0] ❌ Transaction FAILED with status:', status);
                setBalanceError('Transaction failed. Please try again.');
                setPendingCallsId(null);
                setIsConfirmingTransaction(false);
                gameStateRef.current.isTransactionPending = false;
                forceUpdate({
                    "DuetGame.useEffect": (n)=>n + 1
                }["DuetGame.useEffect"]);
            } else {
                console.log('[v0] ⏳ Transaction pending with status:', status);
            }
        }
    }["DuetGame.useEffect"], [
        callsStatus,
        pendingCallsId,
        startGameAfterConfirmation
    ]);
    const startGame = async ()=>{
        if (!isConnected) {
            setBalanceError('Please connect your wallet to play');
            return;
        }
        const hasBalance = await checkBalance();
        if (!hasBalance) return;
        gameStateRef.current.isTransactionPending = true;
        setBalanceError('Signing transaction in your wallet...');
        setIsConfirmingTransaction(false);
        forceUpdate((n)=>n + 1);
        const callsId = await sendGameTransaction();
        if (!callsId) {
            gameStateRef.current.isTransactionPending = false;
            setIsConfirmingTransaction(false);
            forceUpdate((n)=>n + 1);
            return;
        }
        setBalanceError('Confirming transaction on-chain...');
        setIsConfirmingTransaction(true);
        setPendingCallsId(callsId);
    };
    const endGame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DuetGame.useCallback[endGame]": ()=>{
            gameStateRef.current.isPlaying = false;
            if (gameStateRef.current.score > gameStateRef.current.highScore) {
                gameStateRef.current.highScore = gameStateRef.current.score;
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.setItem('duet-highscore', gameStateRef.current.highScore.toString());
                }
            }
            setGameStatus('gameOver');
        }
    }["DuetGame.useCallback[endGame]"], []);
    const resetGame = ()=>{
        setGameStatus('menu');
        setBalanceError('');
    };
    const handleBeat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DuetGame.useCallback[handleBeat]": ()=>{
            setPulseIntensity(1);
            setTimeout({
                "DuetGame.useCallback[handleBeat]": ()=>setPulseIntensity(0)
            }["DuetGame.useCallback[handleBeat]"], 200);
        }
    }["DuetGame.useCallback[handleBeat]"], []);
    const gameLoop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DuetGame.useCallback[gameLoop]": (timestamp)=>{
            if (!gameStateRef.current.isPlaying) return;
            const deltaTime = lastFrameTimeRef.current ? (timestamp - lastFrameTimeRef.current) / (1000 / 60) : 1;
            lastFrameTimeRef.current = timestamp;
            const currentTime = Date.now();
            const elapsed = currentTime - gameStateRef.current.startTime;
            setElapsedTime(elapsed);
            const newDifficulty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDifficulty"])(elapsed);
            gameStateRef.current.difficulty = newDifficulty;
            gameStateRef.current.difficultyWave = Math.floor(newDifficulty / 5);
            const rotationSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ROTATION_SPEED * deltaTime;
            // Apply slow-mo effect if active
            const effectiveDeltaTime = currentTime < gameStateRef.current.slowMoEndTime ? deltaTime * 0.5 : deltaTime;
            if (leftControlActive.current) {
                gameStateRef.current.circles[0].angle -= rotationSpeed * (currentTime < gameStateRef.current.slowMoEndTime ? 0.5 : 1);
                gameStateRef.current.circles[1].angle -= rotationSpeed * (currentTime < gameStateRef.current.slowMoEndTime ? 0.5 : 1);
                gameStateRef.current.circles[0].direction = 'ccw';
                gameStateRef.current.circles[1].direction = 'ccw';
            }
            if (rightControlActive.current) {
                gameStateRef.current.circles[0].angle += rotationSpeed * (currentTime < gameStateRef.current.slowMoEndTime ? 0.5 : 1);
                gameStateRef.current.circles[1].angle += rotationSpeed * (currentTime < gameStateRef.current.slowMoEndTime ? 0.5 : 1);
                gameStateRef.current.circles[0].direction = 'cw';
                gameStateRef.current.circles[1].direction = 'cw';
            }
            // Spawn power-ups
            const newPowerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spawnPowerUp"])(newDifficulty, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_Y);
            if (newPowerUp) {
                gameStateRef.current.powerUps.push(newPowerUp);
            }
            // Check power-up collisions
            const collectedPowerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkPowerUpCollision"])(gameStateRef.current.circles, gameStateRef.current.powerUps, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_Y, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ORBIT_RADIUS);
            if (collectedPowerUp) {
                // Create particles at collection
                gameStateRef.current.particles.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createParticles"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_Y, collectedPowerUp.type === 'shield' ? '#FFD700' : collectedPowerUp.type === 'slowmo' ? '#00D9FF' : '#FF00FF', 12));
                if (collectedPowerUp.type === 'shield') {
                    gameStateRef.current.activeShield = true;
                    setTimeout({
                        "DuetGame.useCallback[gameLoop]": ()=>{
                            gameStateRef.current.activeShield = false;
                        }
                    }["DuetGame.useCallback[gameLoop]"], 5000);
                } else if (collectedPowerUp.type === 'slowmo') {
                    gameStateRef.current.slowMoEndTime = currentTime + 3000;
                } else if (collectedPowerUp.type === 'doubleSpin') {
                    gameStateRef.current.comboCount = Math.min(gameStateRef.current.comboCount + 10, 100);
                }
                gameStateRef.current.powerUps = gameStateRef.current.powerUps.filter({
                    "DuetGame.useCallback[gameLoop]": (pu)=>pu.id !== collectedPowerUp.id
                }["DuetGame.useCallback[gameLoop]"]);
                gameStateRef.current.score += Math.floor(50 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateComboMultiplier"])(gameStateRef.current.comboCount));
            }
            // Update power-ups
            gameStateRef.current.powerUps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePowerUps"])(gameStateRef.current.powerUps);
            // Update particles
            gameStateRef.current.particles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateParticles"])(gameStateRef.current.particles);
            if (currentTime - gameStateRef.current.lastObstacleSpawn > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].OBSTACLE_SPAWN_INTERVAL - newDifficulty * 100) {
                gameStateRef.current.obstacles.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spawnObstacle"])(newDifficulty));
                gameStateRef.current.lastObstacleSpawn = currentTime;
            }
            gameStateRef.current.obstacles = gameStateRef.current.obstacles.map({
                "DuetGame.useCallback[gameLoop]": (obstacle)=>({
                        ...obstacle,
                        y: obstacle.y + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].BASE_OBSTACLE_SPEED + newDifficulty * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].DIFFICULTY_SPEED_MULTIPLIER) * effectiveDeltaTime
                    })
            }["DuetGame.useCallback[gameLoop]"]);
            gameStateRef.current.obstacles = gameStateRef.current.obstacles.filter({
                "DuetGame.useCallback[gameLoop]": (obstacle)=>obstacle.y < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CANVAS_HEIGHT
            }["DuetGame.useCallback[gameLoop]"]);
            gameStateRef.current.score = Math.floor(elapsed / 100);
            // Update combo
            if (currentTime - gameStateRef.current.lastSuccessTime > 1000) {
                gameStateRef.current.comboCount = Math.max(0, gameStateRef.current.comboCount - 1);
                gameStateRef.current.lastSuccessTime = currentTime;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkCollision"])(gameStateRef.current.circles, gameStateRef.current.obstacles)) {
                if (!gameStateRef.current.activeShield) {
                    endGame();
                    return;
                } else {
                    // Shield absorbs hit, remove one obstacle
                    gameStateRef.current.obstacles = gameStateRef.current.obstacles.slice(1);
                    gameStateRef.current.activeShield = false;
                    gameStateRef.current.particles.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createParticles"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_X, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAME_CONFIG"].CENTER_Y, '#FFD700', 20));
                }
            }
            if (gameStateRef.current.isPlaying) {
                animationFrameRef.current = requestAnimationFrame(gameLoop);
            }
        }
    }["DuetGame.useCallback[gameLoop]"], [
        endGame
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DuetGame.useEffect": ()=>{
            console.log('[v0] gameStatus changed to:', gameStatus);
            console.log('[v0] gameStateRef.current.isPlaying:', gameStateRef.current.isPlaying);
            console.log('[v0] Rendering game with status:', gameStatus);
            if (gameStatus === 'playing' && gameStateRef.current.isPlaying) {
                console.log('[v0] ✅ Conditions met for game loop - gameStatus=playing AND isPlaying=true');
                lastFrameTimeRef.current = 0;
                // Start the game loop immediately with requestAnimationFrame
                const startLoop = {
                    "DuetGame.useEffect.startLoop": ()=>{
                        console.log('[v0] Game loop requestAnimationFrame started');
                        animationFrameRef.current = requestAnimationFrame(gameLoop);
                    }
                }["DuetGame.useEffect.startLoop"];
                // Use setTimeout to ensure React has finished rendering
                const timeoutId = setTimeout(startLoop, 0);
                return ({
                    "DuetGame.useEffect": ()=>{
                        clearTimeout(timeoutId);
                        console.log('[v0] Cleaning up game loop effect');
                        if (animationFrameRef.current) {
                            cancelAnimationFrame(animationFrameRef.current);
                        }
                    }
                })["DuetGame.useEffect"];
            } else {
                console.log('[v0] Game loop conditions not met - cancelling animation frame');
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            }
        }
    }["DuetGame.useEffect"], [
        gameStatus,
        gameLoop
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DuetGame.useEffect": ()=>{
            const handleKeyDown = {
                "DuetGame.useEffect.handleKeyDown": (e)=>{
                    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') leftControlActive.current = true;
                    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') rightControlActive.current = true;
                }
            }["DuetGame.useEffect.handleKeyDown"];
            const handleKeyUp = {
                "DuetGame.useEffect.handleKeyUp": (e)=>{
                    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') leftControlActive.current = false;
                    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') rightControlActive.current = false;
                }
            }["DuetGame.useEffect.handleKeyUp"];
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            return ({
                "DuetGame.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                    window.removeEventListener('keyup', handleKeyUp);
                }
            })["DuetGame.useEffect"];
        }
    }["DuetGame.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DuetGame.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const savedHighScore = localStorage.getItem('duet-highscore');
                if (savedHighScore) {
                    gameStateRef.current.highScore = parseInt(savedHighScore, 10);
                }
            }
        }
    }["DuetGame.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DuetGame.useEffect": ()=>{
            const audio = new Audio('https://ia601905.us.archive.org/27/items/tvtunes_17714/28%20Days%20Later.mp3');
            audio.loop = true;
            audio.volume = 0.5;
            audioRef.current = audio;
            let audioStarted = false;
            const startAudioOnInteraction = {
                "DuetGame.useEffect.startAudioOnInteraction": ()=>{
                    if (audioRef.current && audioRef.current.paused && !audioStarted) {
                        audioRef.current.play().then({
                            "DuetGame.useEffect.startAudioOnInteraction": ()=>{
                                audioStarted = true;
                            }
                        }["DuetGame.useEffect.startAudioOnInteraction"]).catch({
                            "DuetGame.useEffect.startAudioOnInteraction": ()=>{}
                        }["DuetGame.useEffect.startAudioOnInteraction"]);
                    }
                }
            }["DuetGame.useEffect.startAudioOnInteraction"];
            audio.play().catch({
                "DuetGame.useEffect": ()=>{}
            }["DuetGame.useEffect"]);
            const events = [
                'click',
                'touchstart',
                'touchend',
                'keydown',
                'pointerdown'
            ];
            events.forEach({
                "DuetGame.useEffect": (event)=>document.addEventListener(event, startAudioOnInteraction, {
                        capture: true
                    })
            }["DuetGame.useEffect"]);
            return ({
                "DuetGame.useEffect": ()=>{
                    audio.pause();
                    audio.src = '';
                    audioRef.current = null;
                    events.forEach({
                        "DuetGame.useEffect": (event)=>document.removeEventListener(event, startAudioOnInteraction, {
                                capture: true
                            })
                    }["DuetGame.useEffect"]);
                }
            })["DuetGame.useEffect"];
        }
    }["DuetGame.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$AudioManager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isPlaying: gameStatus === 'playing' && audioEnabled,
                onBeat: handleBeat
            }, void 0, false, {
                fileName: "[project]/src/components/game/DuetGame.tsx",
                lineNumber: 620,
                columnNumber: 7
            }, this),
            isConnected && gameStatus !== 'playing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>disconnect(),
                className: "fixed top-6 right-6 z-50 bg-black border border-white px-4 py-2 text-white text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-smooth",
                title: "Disconnect Wallet",
                children: "Disconnect"
            }, void 0, false, {
                fileName: "[project]/src/components/game/DuetGame.tsx",
                lineNumber: 626,
                columnNumber: 9
            }, this),
            gameStatus === 'menu' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center gap-12 z-10 px-4 min-h-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center animate-fade-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-8xl md:text-9xl font-light text-white tracking-tight mb-4",
                                children: "DUET"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 638,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px bg-white opacity-40 w-32 mx-auto mb-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 641,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest",
                                children: "On-Chain Survival Game"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 642,
                                columnNumber: 13
                            }, this),
                            gameStateRef.current.highScore > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 text-center border-t border-gray-800 pt-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-medium text-gray-500 uppercase tracking-widest mb-2",
                                        children: "Personal Best"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/DuetGame.tsx",
                                        lineNumber: 648,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-5xl md:text-6xl font-light text-white",
                                        children: gameStateRef.current.highScore
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/DuetGame.tsx",
                                        lineNumber: 649,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 647,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/DuetGame.tsx",
                        lineNumber: 637,
                        columnNumber: 11
                    }, this),
                    balanceError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-900/30 backdrop-blur-md border border-red-700 px-6 py-4 max-w-md shadow-sm animate-fade-in",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-300 text-sm font-medium text-center",
                            children: balanceError
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/DuetGame.tsx",
                            lineNumber: 658,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/DuetGame.tsx",
                        lineNumber: 657,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-8 items-center mt-8",
                        children: [
                            !isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WalletConnectButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/src/components/game/DuetGame.tsx",
                                        lineNumber: 665,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 text-xs text-center max-w-md uppercase tracking-widest font-light",
                                        children: [
                                            "Connect your Base wallet. Entry fee: $",
                                            MINIMUM_USD_REQUIRED.toFixed(6),
                                            " USD ETH"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/game/DuetGame.tsx",
                                        lineNumber: 666,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 664,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$StyledButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClick: startGame,
                                disabled: isCheckingBalance || gameStateRef.current.isTransactionPending || isConfirmingTransaction,
                                variant: "primary",
                                size: "xl",
                                children: isConfirmingTransaction ? 'Confirming on-chain...' : gameStateRef.current.isTransactionPending ? 'Sign in wallet...' : isCheckingBalance ? 'Checking balance...' : 'Start Game'
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 671,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-md border border-gray-800 pt-8 mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-400 text-xs text-center space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium text-white mb-1 uppercase tracking-widest",
                                                    children: "Controls"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/DuetGame.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-light",
                                                    children: "Hold left/right side of screen to rotate"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/DuetGame.tsx",
                                                    lineNumber: 691,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/game/DuetGame.tsx",
                                            lineNumber: 689,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium text-white mb-1 uppercase tracking-widest",
                                                    children: "Objective"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/DuetGame.tsx",
                                                    lineNumber: 694,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-light",
                                                    children: "Avoid the white obstacles to advance"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/DuetGame.tsx",
                                                    lineNumber: 695,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/game/DuetGame.tsx",
                                            lineNumber: 693,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 font-light pt-2",
                                            children: "(Desktop: Arrow Keys or A/D)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/DuetGame.tsx",
                                            lineNumber: 697,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/game/DuetGame.tsx",
                                    lineNumber: 688,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 687,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/DuetGame.tsx",
                        lineNumber: 662,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/DuetGame.tsx",
                lineNumber: 636,
                columnNumber: 9
            }, this),
            gameStatus === 'playing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 w-full h-full overflow-hidden bg-black",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$GameCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            gameState: gameStateRef.current,
                            pulseIntensity: pulseIntensity
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/DuetGame.tsx",
                            lineNumber: 707,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/DuetGame.tsx",
                        lineNumber: 706,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$ControlsGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/game/DuetGame.tsx",
                        lineNumber: 713,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$HUD$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        score: gameStateRef.current.score,
                        highScore: gameStateRef.current.highScore,
                        elapsedTime: elapsedTime,
                        difficulty: gameStateRef.current.difficulty,
                        combo: gameStateRef.current.comboCount,
                        shield: gameStateRef.current.activeShield,
                        slowMoActive: Date.now() < gameStateRef.current.slowMoEndTime
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/DuetGame.tsx",
                        lineNumber: 715,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setAudioEnabled(!audioEnabled),
                        className: "fixed bottom-6 left-6 z-40 bg-black border border-white px-4 py-3 text-white text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-smooth",
                        title: audioEnabled ? 'Mute Audio' : 'Unmute Audio',
                        children: audioEnabled ? 'Sound On' : 'Sound Off'
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/DuetGame.tsx",
                        lineNumber: 725,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$MobileControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onLeftControl: (active)=>{
                            leftControlActive.current = active;
                        },
                        onRightControl: (active)=>{
                            rightControlActive.current = active;
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/DuetGame.tsx",
                        lineNumber: 733,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            gameStatus === 'gameOver' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center gap-12 z-10 px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center animate-fade-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-5xl md:text-7xl font-light text-white tracking-wider mb-2",
                                children: "GAME OVER"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 743,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30 my-8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 746,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-medium text-gray-500 uppercase tracking-widest mb-3",
                                        children: "Score"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/DuetGame.tsx",
                                        lineNumber: 749,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-6xl md:text-7xl font-light text-white tabular-nums",
                                        children: gameStateRef.current.score
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/DuetGame.tsx",
                                        lineNumber: 750,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 748,
                                columnNumber: 13
                            }, this),
                            gameStateRef.current.highScore > gameStateRef.current.score && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 text-gray-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-medium uppercase tracking-widest mb-2",
                                        children: "Best Score"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/DuetGame.tsx",
                                        lineNumber: 757,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-light text-gray-300",
                                        children: gameStateRef.current.highScore
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/DuetGame.tsx",
                                        lineNumber: 758,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 756,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/DuetGame.tsx",
                        lineNumber: 742,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$StyledButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClick: startGame,
                                disabled: isCheckingBalance || gameStateRef.current.isTransactionPending || isConfirmingTransaction,
                                variant: "primary",
                                size: "lg",
                                children: isConfirmingTransaction ? 'Confirming...' : gameStateRef.current.isTransactionPending ? 'Signing...' : 'Play Again'
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 766,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$StyledButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClick: resetGame,
                                variant: "outline",
                                size: "lg",
                                children: "Menu"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/DuetGame.tsx",
                                lineNumber: 779,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/DuetGame.tsx",
                        lineNumber: 765,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/DuetGame.tsx",
                lineNumber: 741,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/DuetGame.tsx",
        lineNumber: 619,
        columnNumber: 5
    }, this);
}
_s(DuetGame, "/JQB+IkLD7Y9Udr6R716K6PCrBA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisconnect"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSendCalls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSendCalls"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBalance"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useCallsStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallsStatus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBaseAppWallet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseAppWallet"]
    ];
});
_c = DuetGame;
var _c;
__turbopack_context__.k.register(_c, "DuetGame");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/DuetGame.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/game/DuetGame.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_49f8c48c._.js.map