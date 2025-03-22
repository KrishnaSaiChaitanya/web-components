import { describe, it, expect } from '@jest/globals';
import { ImageHarness } from './image_harness.js';
import { Image } from './image.js';

describe('Image', () => {
  it('renders image with src attribute', async () => {
    const testSrc = './image.jpeg';
    const image = await ImageHarness.newImageComponent({
      src: testSrc
    });

    expect(image.src).toBe(testSrc);
  });

  it('sets alt attribute from props', async () => {
    const testAlt = 'Test image alt text';
    const image = await ImageHarness.newImageComponent({
      src: './image.jpeg',
      alt: testAlt
    });

    expect(image.alt).toBe(testAlt);
  });

  it('uses default alt text when not provided', async () => {
    const image = await ImageHarness.newImageComponent({
      src: './image.jpeg'
    });

    expect(image.alt).toBe('Image');
  });

  it('sets loading attribute from props', async () => {
    const testLoading = 'eager';
    const image = await ImageHarness.newImageComponent({
      src: './image.jpeg',
      loading: testLoading
    });

    expect(image.loading).toBe(testLoading);
  });

  it('uses lazy loading by default when not specified', async () => {
    const image = await ImageHarness.newImageComponent({
      src: './image.jpeg'
    });

    expect(image.loading).toBe('lazy');
  });

});