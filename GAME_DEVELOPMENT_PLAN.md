# Phase 1: Pixi.js Fundamentals (1-2 weeks)

Learn Pixi.js basics: renderer, stage, sprites, containers
Understand the game loop and animation with requestAnimationFrame
Master event handling for keyboard input
Study asset loading and resource management

# Phase 2: Game Architecture (1 week)

Design game structure with proper separation of concerns
Set up collision detection system
Implement basic physics for movement and bouncing
Create entity component system for game objects

# Phase 3: Core Game Mechanics (2 weeks)

Build player cannon with x-axis movement
Implement firing mechanics with 500ms cooldown
Create enemy spawning system with 1-minute interval
Develop HP system for both player (3 lives) and enemies (5 HP)
Implement collision detection between bullets/enemies and player/enemies

# Phase 4: Polish and Refinement (1 week)

Add visual feedback (explosions, hit effects)
Implement score system
Create game states (start, playing, game over)
Optimize performance

# Phase 5: Testing and Deployment (1 week)

Test game across different devices
Fix bugs and edge cases
Deploy game to web

structure

```
src/
├── engine/
│   ├── Game.ts          - Main game loop and initialization
│   ├── AssetLoader.ts   - Handle loading game assets
│   └── Collision.ts     - Collision detection system
├── entities/
│   ├── Entity.ts        - Base entity class
│   ├── Player.ts        - Cannon player implementation
│   ├── Enemy.ts         - Enemy ball implementation
│   └── Bullet.ts        - Projectile implementation
├── managers/
│   ├── EntityManager.ts - Manages all game entities
│   ├── ScoreManager.ts  - Handles scoring and game stats
│   └── InputManager.ts  - Processes keyboard/mouse input
├── states/
│   ├── GameState.ts     - State interface
│   ├── PlayState.ts     - Main gameplay state
│   ├── MenuState.ts     - Menu screen
│   └── GameOverState.ts - Game over screen
├── utils/
│   ├── Vector.ts        - Vector calculations
│   └── Timer.ts         - Time-based events (spawning, cooldowns)
└── config/
    └── GameConfig.ts    - Game constants and settings

```

Arhitecture for simple things that I should use

# UI

```
src/
├── ui/
│   ├── HUD.ts             - Player lives, score display
│   ├── MainMenu.ts        - Start screen, options
│   ├── GameOverScreen.ts  - End game screen
│   └── Button.ts          - Reusable UI elements
```

# Services Responsibility

Yes, services contain game logic, but organized by function:
GameStateService - Core game rules, win/lose conditions
EntityService - Manages player cannon, enemies, bullets
PhysicsService - Movement, collision detection
RenderService - Drawing entities to screen
TimerService - Enemy spawning intervals, weapon cooldowns

# Levels

```
src/
├── levels/
│   ├── LevelConfig.ts     - Level parameters
│   ├── Level1.ts          - Level-specific data
│   ├── Level2.ts
└── services/
    └── LevelService.ts    - Level loading, progression
```

# Cannon Shooter Implementation

```
// EntityService.ts
// Define a common interface
interface Entity {
  id: string;
  update(delta: number): void;
  render(): void;
  isActive(): boolean;
}
```
