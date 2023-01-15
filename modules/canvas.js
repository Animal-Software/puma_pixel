"use.strict";

export default class CANVAS {
	element;
	#ctx;
	#drawing;
	#bounds;
	#active_layer;
	#layer;
	#mouse;
	#style;

	constructor() {
		this.element = document.querySelector('#canvas');
		this.#ctx = this.element.getContext("2d", { willReadFrequently: true });
		this.#drawing = false;
		this.#active_layer = 0;
		this.#mouse = null;
		this.#style = { WIDTH: 0, HEIGHT: 0, SCALE: 0 };
	}

	update_bounds() { this.#bounds = this.element.getBoundingClientRect() }

	zoom(scale) {
		this.#style.SCALE = scale;
		this.element.style.setProperty("--canvas-scale", this.#style.SCALE.toString());
	}

	resize(width, height) {
		this.#style.WIDTH = width;
		this.#style.HEIGHT = height;
		this.element.width = this.#style.WIDTH;
		this.element.height = this.#style.HEIGHT;
		this.#layer = new Uint8ClampedArray(this.#style.WIDTH * this.#style.HEIGHT * 4);
	}

	draw_image(source) {
		this.#ctx.drawImage(source, 0, 0);
		// update this#layer with the image data or it will reset
	}

	pixel_colour(x, y, width, height) { return this.#ctx.getImageData(x, y, width, height) }

	draw_layer(event, red, green, blue, alpha) {
		if (!this.#drawing) return;
		const x = Math.floor((event.clientX - this.#bounds.left) / this.#style.SCALE);
		const y = Math.floor((event.clientY - this.#bounds.top) / this.#style.SCALE);
		const i = (x * 4) + ((y * 4) * this.#style.WIDTH);
		switch (this.#mouse) {
			case 0:
					this.#layer[i + 0] = red;
					this.#layer[i + 1] = green;
					this.#layer[i + 2] = blue;
					this.#layer[i + 3] = alpha;
					break;
			case 1:
					this.#layer[i + 0] = 24;
					this.#layer[i + 1] = 26;
					this.#layer[i + 2] = 27;
					this.#layer[i + 3] = 255;
				break;
			case 2:
					this.#layer[i + 0] = 0;
					this.#layer[i + 1] = 0;
					this.#layer[i + 2] = 0;
					this.#layer[i + 3] = 0;
			break;
		}
		const layer_data = new ImageData(this.#layer, this.#style.WIDTH, this.#style.HEIGHT);
		this.#ctx.putImageData(layer_data, 0, 0);
	}

	start_drawing(event) {
		this.#drawing = true;
		this.update_bounds();
		this.#mouse = event.button;
		this.draw_layer(event, 255, 0, 85, 255);
	}

	end_drawing() {
		this.#drawing = false;
		this.#mouse = null;
	}
}