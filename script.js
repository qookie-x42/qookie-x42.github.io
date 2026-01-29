document.addEventListener("DOMContentLoaded", () => {
	const overlay = document.querySelector("#overlay");
	const overlayImg = document.querySelector("#overlay-img");
	const painting = document.querySelectorAll("div.p-art");
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

	painting.forEach(item => {
		const img = item.querySelector("img").src;
		const button = item.querySelector(".heart");

		if (checkPainting(img)) {
			setHeartActive(button);
		}
		else {
			setHeartInactive(button);
		}
	});

	function checkPainting(img) {
		let savedImg = JSON.parse(localStorage.getItem("likedPaintings")) || [];
		return savedImg.some(item => item.img === img);
	}

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
	function createPainting(item) {
		const storedItem = document.createElement("div");
		storedItem.className = "box p-art";
		storedItem.style.width = "85%";

		const storedImg = document.createElement("img");
		storedImg.className = "p-art zoomable";
		storedImg.src = item.img;

		const storedText = document.createElement("div");
		storedText.className = "text p-text";
		storedText.innerText = item.title;

		const storedButton = document.createElement("button");
		storedButton.className = "heart";
		const storedHeart = document.createElement("i");
		storedHeart.className = "fa fa-heart";
		storedHeart.style.color = "#f00";

		storedButton.appendChild(storedHeart);
		storedItem.appendChild(storedImg);
		storedText.appendChild(storedButton);
		storedItem.appendChild(storedText);
		return storedItem;
	}
});