function fetchdata () {
    fetch("http://localhost:8080/gallery")
        .then(res => res.json())
        .then(res => {
            const gallery = document.querySelector("#gallery");
            gallery.innerHTML = res.data.map(i => `
                <div data-id="${i.id}">
                    <p>${i.title}</p>
                    <img src="http://localhost:8080${i.image}" width="200" alt="">
                    <button class="delete">Delete</button>
                </div>
            `).join("");
  
            document.querySelectorAll(".delete").forEach(button => {
                button.addEventListener("click", (e) => {
                    const id = e.target.parentElement.getAttribute("data-id");
                    fetch(`http://localhost:8080/gallery/${id}`, {
                        method: 'DELETE'
                    })
                    .then(() => fetchdata())
                    .catch(err => console.log(err));
                });
            });
        })
        .catch(err => console.log(err));
  }
  
  fetchdata();
  
  document.querySelector('#f1').addEventListener('submit', (e) => {
    e.preventDefault();
    const i1 = document.querySelector('#i1');
    const i2 = document.querySelector('#i2');
  
    const formData = new FormData();
    formData.append("title", i1.value);
    formData.append("image", i2.files[0]);
  
    fetch("http://localhost:8080/gallery", {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(() => {
        fetchdata();
        i1.value = "";
        i2.value = "";
    })
    .catch(err => console.log(err));
  });
  