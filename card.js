let carts = [];

// ============================
// PROTEGER PÁGINA
// ============================

if (localStorage.getItem("session") !== "active") {
  alert("Debes iniciar sesión primero");
  window.location.href = "login.html";
}



const containerCard = document.getElementById('containerCard');
const buttonAgregar = document.getElementById('buttonAgregar');
const buttonDelete = document.getElementById('buttonDelete');
const containerFromAgregar = document.getElementById('containerFromAgregar');
const containerFromDelete = document.getElementById('containerFromDelete');

const imgHeart = './IMG/CONTENT/card/icons/heart.svg';
const imgLike = './IMG/CONTENT/card/icons/Like.svg';

function logout() {
  localStorage.removeItem("session");
  window.location.href = "login.html";
}


function renderCards() {
    containerCard.innerHTML = '';

    carts.forEach((car, index) => {
        containerCard.innerHTML += `
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="card h-100 p-3">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6>${car.title}</h6>
                            <small class="text-secondary">${car.subTitle}</small>
                        </div>
                        <button class="rounded-5" style="border:none" onclick="toggleLike(this)">
                            <img src="${car.imagenHeart}" width="24">
                        </button>
                    </div>

                    <img src="${car.imageCard}" class="img-fluid my-4 mx-auto w-75 h-50">

                    <ul class="list-unstyled d-flex justify-content-between text-secondary small">
                        <li><img src="${car.iconOne}"> 90L</li>
                        <li><img src="${car.iconThwo}"> Manual</li>
                        <li><img src="${car.iconThree}"> 2 People</li>
                    </ul>

                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <h5>${car.price}<span class="fs-6 text-secondary">${car.textPrice}</span></h5>
                        <button class="btn btn-primary btn-sm">${car.button}</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function toggleLike(button) {
    const img = button.querySelector('img');
    img.src = img.src.includes('Like.svg') ? imgHeart : imgLike;
}

buttonAgregar.addEventListener('click', () => {
    containerFromAgregar.innerHTML = `
        <form id="formAddCar" class=" p-3 mt-3 bg-info rounded shadow">
            <div class="mb-3">
                <input type="text" id="nameCar" class="form-control" placeholder="Nombre del carro" required>
            </div>
            <div class="mb-3">
                <input type="number" id="priceCar" class="form-control" placeholder="Precio" required>
            </div>
            <div class="mb-3">
                <input type="text" id="imageCar" class="form-control" placeholder="Ruta de imagen" required>
            </div>
            <button class="btn btn-primary " type="submit">Agregar</button>
        </form>
    `;

    const formAddCar = document.getElementById('formAddCar');

    formAddCar.addEventListener('submit', (e) => {
        e.preventDefault();

        const newCar = {
            title: document.getElementById('nameCar').value,
            subTitle: 'Sport',
            imagenHeart: imgLike,
            imageCard: document.getElementById('imageCar').value,
            iconOne: './IMG/CONTENT/card/icons/Vector.svg',
            iconThwo: './IMG/CONTENT/card/icons/Car (7).svg',
            iconThree: './IMG/CONTENT/card/icons/profile-2user.svg',
            price: `$${document.getElementById('priceCar').value}`,
            textPrice: '/day',
            button: 'Rent Now'
        };

        carts.push(newCar);
        renderCards();
        containerFromAgregar.innerHTML = '';
    });
});

buttonDelete.addEventListener('click', () => {
    containerFromDelete.innerHTML = `
        <form id="formDeleteCar" class="p-3 mt-3 bg-danger rounded shadow text-white">
            <div class="mb-3">
                <input type="number" id="indexCar" class="form-control" placeholder="Posición del carro (0,1,2...)" required>
            </div>
            <button class="btn btn-light w-100" type="submit">Eliminar</button>
        </form>
    `;

    const formDeleteCar = document.getElementById('formDeleteCar');

    formDeleteCar.addEventListener('submit', (e) => {
        e.preventDefault();

        const index = parseInt(document.getElementById('indexCar').value);

        if (index >= 0 && index < carts.length) {
            if (confirm('¿Seguro que deseas eliminar este carro?')) {
                carts.splice(index, 1);
                renderCards();
                containerFromDelete.innerHTML = '';
            }
        } else {
            alert('Posición inválida');
        }
    });
});