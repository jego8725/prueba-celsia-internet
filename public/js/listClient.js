var listClients;
window.onload = ()=> {

    var btnAddClient = document.getElementById('btn-add-client');
	if(btnAddClient !== null) {
		btnAddClient.addEventListener('click', onBtnAddClient);
	}

    onLoadClients();
};

const onBtnAddClient = ()=> {
    window.location.href = '/client';
}

const onLoadClients = async ()=> {
    var urlService = `${location.protocol}//${location.host}/getClients`;
    let request = fetch(urlService, {
        method: 'POST',
        body: JSON.stringify({})
    }).catch(error => {
        console.log('Ocurrio un error en la petición del servicio: '+error);
    });

    let response = await request;
    if (response !== undefined && response.status === 200 && response.ok === true) {
        let jsonResponse = await response.json();
        if(jsonResponse.status === 'OK') {
            listClients = jsonResponse?.data !== undefined ? jsonResponse.data : [];
            let component = '';
            let itemData;
            for(let i = 0, len = listClients.length; i < len; i++) {
                itemData = listClients[i];
                component += `
                <div class="card-client" data-item="${i}">
                    <div class="content-data">
                        <div class="group-info-client">
                            <label>Identificación</label>
                            <span>${itemData.identification}</span>
                        </div>

                        <div class="group-info-client">
                            <label>Nombre</label>
                            <span>${itemData.name}</span>
                        </div>

                        <div class="group-info-client">
                            <label>Apellido</label>
                            <span>${itemData.lastName}</span>
                        </div>

                        <div class="group-info-client">
                            <label>Fecha de nacimiento</label>
                            <span>${itemData.birthday}</span>
                        </div>

                        <div class="group-info-client">
                            <label>Celular</label>
                            <span>${itemData.cellphone}</span>
                        </div>

                        <div class="group-info-client">
                            <label>Celular</label>
                            <span>${itemData.email}</span>
                        </div>
                    </div>

                    <div class="content-options">
                        <button id="btn-edit" class="btn" >Editar</button>
                        <button id="btn-delete" class="btn" >Eliminar</button>
                        <button id="btn-add-service" class="btn">Agregar Servicios</button>
                        <button id="btn-show-services" class="btn">Ver Servicios</button>
                    </div>
                </div>
                `;
            }

            let contentListClientes = document.getElementById('content-list-clientes');
            contentListClientes.innerHTML = component;

            var btnEditar = document.getElementById('btn-edit');
            if(btnEditar !== null) {
                btnEditar.addEventListener('click', onBtnEditar);
            }
            var btnAddService = document.getElementById('btn-add-service');
            if(btnAddService !== null) {
                btnAddService.addEventListener('click', onBtnAddservice);
            }
            var btnShowServices = document.getElementById('btn-show-services');
            if(btnShowServices !== null) {
                btnShowServices.addEventListener('click', onBtnShowService);
            }
        } else {
            alert('Ocurrio un error consultando los clientes.'+jsonResponse.message);
        }
    } else {
        console.log('Error de comunicación el servicio no response.');
    }
}

const onBtnEditar = (event)=> {
    let element = event.currentTarget;
    let content = element.parentElement;
    let card = content.parentElement;
    let dataItem = card?.getAttribute('data-item');
    let itemData = listClients[dataItem];

    window.location.href = `/client/?id=${itemData.identification}`;
}

const onBtnAddservice = ()=> {
    let element = event.currentTarget;
    let content = element.parentElement;
    let card = content.parentElement;
    let dataItem = card?.getAttribute('data-item');
    let itemData = listClients[dataItem];

    window.location.href = `/service/?id=${itemData.identification}`;
}

const onBtnShowService = ()=> {
    let element = event.currentTarget;
    let content = element.parentElement;
    let card = content.parentElement;
    let dataItem = card?.getAttribute('data-item');
    let itemData = listClients[dataItem];

    window.location.href = `/getServices/?id=${itemData.identification}`;
}