document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector("#overlay");
  const overlayImg = document.querySelector("#overlay-img");
  let key = "";

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("zoomable")) {
      overlayImg.src = e.target.src;
      if (overlayImg.src.includes("photo-rene-magritte.jpg")){
        overlayImg.src = "walter-white.jpg";
      }
      else if (overlayImg.src.includes("magritte-image.webp")){
        overlayImg.src = "jochen.jpg";
      }
      overlay.classList.add("active");
    }
    overlay.addEventListener("click", () => {
      overlay.classList.remove("active");
    });
  });

  document.querySelectorAll(".heart").forEach(button => {
    button.addEventListener("click", () => {
      const art = button.closest(".p-art");
      const id = self.crypto.randomUUID();
      const img = art.querySelector("img").src;
      const text = art.querySelector(".p-text");
      const title = text.innerText;
      const heart = button.querySelector("i");
      let savedImg = JSON.parse(localStorage.getItem("likedPaintings")) || [];
      const check = savedImg.find(item => item.id == id);
      for(i=0;i<localStorage.length;i++){
        key = savedImg[i].id;
        if (key != check){
          savedImg.push({ id, img, title });
          localStorage.setItem("likedPaintings", JSON.stringify(savedImg));
          heart.className = "fa fa-heart";
          heart.style.color = "#f00";
        }
        else{
          savedImg = savedImg.filter(item => item.id !== id);
          localStorage.setItem("likedPaintings", JSON.stringify(savedImg));
          heart.className = "fa fa-heart-o";
          heart.style.color = "#000";
        }
      }
    });
  });

  if (window.location.pathname.includes("saved.html")) {
    const page = document.querySelector("div#saved");
    const loadImg = JSON.parse(localStorage.getItem("likedPaintings")) || [];

    if (loadImg.length == 0) {
      const empty = document.createElement("p");
      empty.className = "text";
      page.appendChild(empty);
      empty.innerText = " You haven't saved any images yet..."
    }

    loadImg.forEach(item => {
      const storedItem = document.createElement("div");
      storedItem.className = "box p-art";
      storedItem.style.width = "80%"
      const storedImg = document.createElement("img");
      storedImg.className = "p-art zoomable";
      storedImg.src = item.img;
      const storedText = document.createElement("div");
      storedText.className = "text p-text";
      storedText.innerText = item.title;
      page.appendChild(storedItem);
      storedItem.appendChild(storedImg);
      storedItem.appendChild(storedText);
    });
  }
});