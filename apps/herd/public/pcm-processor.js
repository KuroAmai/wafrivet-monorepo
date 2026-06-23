class PCMProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this._targetRate =
      (options.processorOptions && options.processorOptions.targetRate) ||
      16_000;
    this._chunkFrames = Math.round(sampleRate * 0.04);
    this._buffer = [];
    this._bufferedFrames = 0;
  }

  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (!channel) return true;

    this._buffer.push(channel.slice());
    this._bufferedFrames += channel.length;

    if (this._bufferedFrames >= this._chunkFrames) {
      const combined = new Float32Array(this._bufferedFrames);
      let offset = 0;
      for (const chunk of this._buffer) {
        combined.set(chunk, offset);
        offset += chunk.length;
      }
      this._buffer = [];
      this._bufferedFrames = 0;

      let samples;
      if (sampleRate === this._targetRate) {
        samples = combined;
      } else {
        const ratio = sampleRate / this._targetRate;
        const outLen = Math.round(combined.length / ratio);
        samples = new Float32Array(outLen);
        for (let i = 0; i < outLen; i++) {
          const pos = i * ratio;
          const lo = Math.floor(pos);
          const hi = Math.min(lo + 1, combined.length - 1);
          samples[i] = combined[lo] + (combined[hi] - combined[lo]) * (pos - lo);
        }
      }

      const pcm16 = new Int16Array(samples.length);
      for (let i = 0; i < samples.length; i++) {
        const s = Math.max(-1, Math.min(1, samples[i]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }

      this.port.postMessage(pcm16.buffer, [pcm16.buffer]);
    }

    return true;
  }
}

registerProcessor("pcm-processor", PCMProcessor);
