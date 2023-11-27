const provinciaSelect = document.getElementById('provincia');
const cantonSelect = document.getElementById('canton');
const distritoSelect = document.getElementById('distrito');
let datosJson; // Declarar datosJson en el ámbito global

// Función para cargar las provincias al cargar la página
function cargarProvincias() {
  fetch('https://gist.githubusercontent.com/josuenoel/80daca657b71bc1cfd95a4e27d547abe/raw')
    .then(response => response.json())
    .then(data => {
      datosJson = data; // Asignar los datos a la variable global
      for (const provinciaId in datosJson.provincias) {
        const provincia = datosJson.provincias[provinciaId];
        const option = document.createElement('option');
        option.value = provinciaId;
        option.text = provincia.nombre;
        provinciaSelect.add(option);
      }
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

// Llamada a la función para cargar las provincias al cargar la página
cargarProvincias();

// Función para cargar los cantones según la provincia seleccionada
function cargarCantones() {
  const provinciaId = provinciaSelect.value;
  cantonSelect.innerHTML = '<option value="">Seleccione su cantón</option>';
  distritoSelect.innerHTML = '<option value="">Seleccione su distrito</option>';

  if (provinciaId) {
    const cantones = datosJson.provincias[provinciaId].cantones;
    for (const cantonId in cantones) {
      const canton = cantones[cantonId];
      const option = document.createElement('option');
      option.value = cantonId;
      option.text = canton.nombre;
      cantonSelect.add(option);
    }
  }
}

// Función para cargar los distritos según el cantón seleccionado
function cargarDistritos() {
  const provinciaId = provinciaSelect.value;
  const cantonId = cantonSelect.value;
  distritoSelect.innerHTML = '<option value="">Seleccione su distrito</option>';

  if (provinciaId && cantonId) {
    const distritos = datosJson.provincias[provinciaId].cantones[cantonId].distritos;
    for (const distritoId in distritos) {
      const option = document.createElement('option');
      option.value = distritoId;
      option.text = distritos[distritoId];
      distritoSelect.add(option);
    }
  }
}
