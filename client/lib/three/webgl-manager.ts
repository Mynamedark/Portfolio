/**
 * WebGL Manager
 * Handles cleanup and disposal of WebGL resources on route change
 */

import * as THREE from "three";

class WebGLManager {
  private static instance: WebGLManager;
  private renderers: Map<string, THREE.WebGLRenderer> = new Map();
  private scenes: Map<string, THREE.Scene> = new Map();
  private geometries: Set<THREE.BufferGeometry> = new Set();
  private materials: Set<THREE.Material> = new Set();
  private textures: Set<THREE.Texture> = new Set();

  private constructor() {}

  static getInstance(): WebGLManager {
    if (!WebGLManager.instance) {
      WebGLManager.instance = new WebGLManager();
    }
    return WebGLManager.instance;
  }

  /**
   * Register a renderer for tracking
   */
  registerRenderer(id: string, renderer: THREE.WebGLRenderer): void {
    this.renderers.set(id, renderer);
  }

  /**
   * Register a scene for tracking
   */
  registerScene(id: string, scene: THREE.Scene): void {
    this.scenes.set(id, scene);
  }

  /**
   * Track geometry for cleanup
   */
  trackGeometry(geometry: THREE.BufferGeometry): void {
    this.geometries.add(geometry);
  }

  /**
   * Track material for cleanup
   */
  trackMaterial(material: THREE.Material): void {
    this.materials.add(material);
  }

  /**
   * Track texture for cleanup
   */
  trackTexture(texture: THREE.Texture): void {
    this.textures.add(texture);
  }

  /**
   * Dispose a specific scene
   */
  disposeScene(id: string): void {
    const scene = this.scenes.get(id);
    if (!scene) return;

    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) {
          object.geometry.dispose();
          this.geometries.delete(object.geometry);
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => {
              this.disposeMaterial(m);
            });
          } else {
            this.disposeMaterial(object.material);
          }
        }
      }
    });

    this.scenes.delete(id);
  }

  /**
   * Dispose a specific renderer
   */
  disposeRenderer(id: string): void {
    const renderer = this.renderers.get(id);
    if (!renderer) return;

    renderer.dispose();
    this.renderers.delete(id);
  }

  /**
   * Dispose all WebGL resources for a page
   */
  disposePage(pageId: string): void {
    this.disposeScene(pageId);
    this.disposeRenderer(pageId);
  }

  /**
   * Dispose all resources
   */
  disposeAll(): void {
    // Dispose geometries
    this.geometries.forEach((geom) => geom.dispose());
    this.geometries.clear();

    // Dispose materials
    this.materials.forEach((mat) => this.disposeMaterial(mat));
    this.materials.clear();

    // Dispose textures
    this.textures.forEach((tex) => tex.dispose());
    this.textures.clear();

    // Dispose scenes
    this.scenes.forEach((_, id) => this.disposeScene(id));
    this.scenes.clear();

    // Dispose renderers
    this.renderers.forEach((_, id) => this.disposeRenderer(id));
    this.renderers.clear();
  }

  /**
   * Dispose a material safely
   */
  private disposeMaterial(material: THREE.Material): void {
    material.dispose();
    this.materials.delete(material);

    // Dispose material textures
    Object.values(material).forEach((value) => {
      if (value instanceof THREE.Texture) {
        value.dispose();
        this.textures.delete(value);
      }
    });
  }

  /**
   * Get renderer count
   */
  getRendererCount(): number {
    return this.renderers.size;
  }

  /**
   * Get scene count
   */
  getSceneCount(): number {
    return this.scenes.size;
  }
}

export const webglManager = WebGLManager.getInstance();
