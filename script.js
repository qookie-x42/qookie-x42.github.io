document.addEventListener("DOMContentLoaded", () => {
	const overlay = document.querySelector("#overlay");
	const overlayImg = document.querySelector("#overlay-img");

	document.addEventListener("click", zoomImage);
	function zoomImage(e) {
		if (e.target.classList.contains("zoomable")) {
			overlayImg.src = e.target.src;
			overlay.classList.add("active");

			if (overlayImg.src.includes("photo-rene-magritte.jpg")) {
				overlayImg.src = "walter-white.jpg";
			}
			else if (overlayImg.src.includes("magritte-image.webp")) {
				overlayImg.src = "jochen.jpg";
			}
		}
	}

	overlay.addEventListener("click", hideOverlay);
	function hideOverlay() {
		overlay.classList.remove("active");
	}

	document.querySelectorAll(".heart").forEach(button => {
		button.addEventListener("click", () => savePainting(button));
	});
	/* document.querySelectorAll(".p-art").forEach(art => {
		const img = art.querySelector("img").src;
		const button = art.querySelector(".heart");

		if (isPaintingSaved(img)) {
			setHeartActive(button);
		} 
		else {
			setHeartInactive(button);
		}
	}); */
	function savePainting(button) {
		const art = button.closest(".p-art");
		const img = art.querySelector("img").src;
		const title = art.querySelector(".p-text").innerText;
		let savedImg = JSON.parse(localStorage.getItem("likedPaintings")) || [];
		const exists = savedImg.find(item => item.img === img);

		if (!exists) {
			const id = self.crypto.randomUUID();
			savedImg.push({ id, img, title });
			setHeartActive(button)
		}
		else {
			savedImg = savedImg.filter(item => item.img !== img);
			setHeartInactive(button)
		}
		localStorage.setItem("likedPaintings", JSON.stringify(savedImg));
	}

	function setHeartActive(button) {
		const heart = button.querySelector("i");
		heart.className = "fa fa-heart";
		heart.style.color = "#f00";
	}

	function setHeartInactive(button) {
		const heart = button.querySelector("i");
		heart.className = "fa fa-heart-o";
		heart.style.color = "#000";
	}

	if (window.location.pathname.includes("saved.html")) {
		loadPainting()
	}
	function loadPainting() {
		const page = document.querySelector("div#saved");
		const loadImg = JSON.parse(localStorage.getItem("likedPaintings")) || [];

		if (loadImg.length == 0) {
			const empty = document.createElement("p");
			empty.className = "text";
			page.appendChild(empty);
			empty.innerText = "You haven't saved any images yet..."
		}
		loadImg.forEach(item => page.appendChild(createPainting(item)));
	}
	function createPainting() {
		const storedItem = document.createElement("div");
		storedItem.className = "box p-art";
		storedItem.style.width = "80%"

		const storedImg = document.createElement("img");
		storedImg.className = "p-art zoomable";
		storedImg.src = item.img;

		const storedText = document.createElement("div");
		storedText.className = "text p-text";
		storedText.innerText = item.title;

		storedItem.appendChild(storedImg, storedText);
		return storedItem;
	}
});