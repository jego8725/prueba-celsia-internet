var listServices;
var idClient;
window.onload = ()=> {

    var btnAddService = document.getElementById('btn-add-service');
	if(btnAddService !== null) {
		btnAddService.addEventListener('click', onBtnAddService);
	}

    var btnCancel = document.getElementById('btn-cancel');
	if(btnCancel !== null) {
		btnCancel.addEventListener('click', ()=>{
            window.location.href = '/';
        });
	}

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    idClient = urlParams.get('id');

    onLoadServices();
};

const onBtnAddService = ()=> {
    window.location.href = `/service/?id=${idClient}`;
}

const onLoadServices = async ()=> {
    var urlService = `${location.protocol}//${location.host}/getServices`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let request = fetch(urlService, {
        method: 'POST',
        body: JSON.stringify({identification: idClient}),
        headers: myHeaders
    }).catch(error => {
        console.log('Ocurrio un error en la petición del servicio: '+error);
    });

    let response = await request;
    if (response !== undefined && response.status === 200 && response.ok === true) {
        let jsonResponse = await response.json();
        if(jsonResponse.status === 'OK') {
            listServices = jsonResponse?.data !== undefined ? jsonResponse.data : [];
            let component = '';
            let itemData;
            for(let i = 0, len = listServices.length; i < len; i++) {
                itemData = listServices[i];
                component += `
                <div class="card-service" data-item="${i}">
                    <div class="content-data">

                        <div class="group-info-service">
                            <label>Identificación</label>
                            <span>${itemData.identification}</span>
                        </div>
                        
                        <div class="group-info-service">
                            <label>Servicio</label>
                            <span>${itemData.service}</span>
                        </div>

                        <div class="group-info-service">
                            <label>Fecha de inicio</label>
                            <span>${itemData.initDate}</span>
                        </div>

                        <div class="group-info-service">
                            <label>Última fecha de facturación</label>
                            <span>${itemData.lastFacturer}</span>
                        </div>

                        <div class="group-info-service">
                            <label>Último pago</label>
                            <span>${itemData.lastPay}</span>
                        </div>
                    </div>

                    <div class="content-options">
                        <button id="btn-edit" class="btn" >Editar</button>
                        <button id="btn-delete" class="btn" >Eliminar</button>
                    </div>
                </div>
                `;
            }

            let contentListServices = document.getElementById('content-list-services');
            contentListServices.innerHTML = component;

            var btnEditar = document.getElementById('btn-edit');
            if(btnEditar !== null) {
                btnEditar.addEventListener('click', onBtnEditar);
            }

            var btnDelete = document.getElementById('btn-delete');
            if(btnDelete !== null) {
                btnDelete.addEventListener('click', onBtnDelete);
            }
        } else {
            alert('Ocurrio un error consultando los servicios.'+jsonResponse.message);
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
    let itemData = listServices[dataItem];

    window.location.href = `/service/?id=${itemData.identification}&service=${itemData.service}`;
}

const onBtnDelete = (event)=> {
    let element = event.currentTarget;
    let content = element.parentElement;
    let card = content.parentElement;
    let dataItem = card?.getAttribute('data-item');
    let itemData = listServices[dataItem];

    window.location.href = `/service/?id=${itemData.identification}&service=${itemData.service}`;
}