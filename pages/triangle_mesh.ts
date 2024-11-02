export class TriangleMesh {
  buffer: GPUBuffer;
  bufferLayout: GPUVertexBufferLayout;

  constructor(device: GPUDevice) {
    // x y r g b
    // prettier-ignore
    const vertices: Float32Array = new Float32Array([
      0.0, 0.0, 0.5, 1.0, 0.0, 0.0, 
      0.0, -0.5, -0.5, 0.0, 1.0, 0.0, 
      0.0, 0.5, -0.5, 0.0, 0.0, 1.0,
    ]);

    const usage: GPUBufferUsageFlags =
      GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;

    const descriptor: GPUBufferDescriptor = {
      size: vertices.byteLength,
      usage: usage,
      mappedAtCreation: true,
    };

    this.buffer = device.createBuffer(descriptor);

    new Float32Array(this.buffer.getMappedRange()).set(vertices);
    this.buffer.unmap();

    // per-line buffer layout
    // numbers are float32 = 4 bytes
    // 24 bytes (float32*6)
    // 3 float32 for position and 3 for color (with 8 bytes offset (3*float32 for position))
    this.bufferLayout = {
      arrayStride: 24,
      attributes: [
        {
          shaderLocation: 0,
          format: "float32x3",
          offset: 0,
        },
        {
          shaderLocation: 1,
          format: "float32x3",
          offset: 12,
        },
      ],
    };
  }
}
