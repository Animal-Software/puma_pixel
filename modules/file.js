"use strict";

import CANVAS from "./canvas.js";

export default class FILE {

	new_file(canvas, width, height, zoom) {
		canvas.resize(width, height);
		canvas.zoom(zoom);
	}

	
	open_file(canvas) {
		// create a file input element
		const i = document.createElement('input');
		// append to body
		document.body.append(i);
		// set type attributes
		i.setAttribute("type", "file");
		i.setAttribute("accept", "image/png");
		// click the element
		i.click();
		// when the file loads
		i.addEventListener('change', () => {
			// get the file
			const file = i.files[0];
			// create a new image element
			let image = new Image();
			// set its source to the file
			image.src = URL.createObjectURL(file);
			// wait for it to load
			image.addEventListener('load', () => {
				// remove file input element
				document.body.removeChild(i);
				// resize the canvas
				canvas.resize(image.width, image.height);
				// draw the image on the canvas
				canvas.draw_image(image);
			}, false);
		}, false);
	}

	save_file(canvas_element) {
		canvas_element.toBlob(blob => {
			const a = document.createElement('a');
			document.body.append(a);
			a.download = 'puma_pixel.png';
			a.href = URL.createObjectURL(blob);
			a.click();
			document.body.removeChild(a);
		})
	}
};