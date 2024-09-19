let idClient;
let nameService;
let pathService;

window.onload = ()=> {
    var btnSaveService = document.getElementById('btn-save');
	if(btnSaveService !== null) {
		btnSaveService.addEventListener('click', onBtnSaveService);
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
    nameService = urlParams.get('service');
    pathService = 'saveService';

    if(idClient !== undefined && idClient !== null && idClient !== '' &&
        nameService !== undefined && nameService !== null && nameService !== ''
    ) {
        console.log('Es para actualizar');
        pathService = 'updateService';
        getDataService();
    }
}

const listFields = [
    'service','last-facturer', 'last-pay'
];
const onValidateFields = ()=> {
    let itemField;
    let dataField = {};
    let input;
    let spanError;
    let flag = true;
    for(let i = 0, len = listFields.length; i < len; i++) {
        itemField = listFields[i];
        input = document.getElementById(itemField);
        spanError = document.getElementById(`${itemField}-error`);

        if (input.validity.patternMismatch) {
            flag = false;
            spanError.innerText = 'No cumple con el formato del campo.';
        }
    
        if (input.validity.valueMissing) {
            flag = false;
            spanError.innerText = 'Campo requerido.';
        }

        dataField[itemField] = input.value;
    }

    return flag ? dataField : 'FAIL';
}


const onBtnSaveService = async ()=> {
    let dataFields = onValidateFields();
    if(dataFields !== 'FAIL') {
        const dataSend = {
            service: dataFields.service,
            lastFacturer: dataFields['last-facturer'],
            lastPay: dataFields['last-pay'],
            identification: idClient
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var urlService = `${location.protocol}//${location.host}/${pathService}`;
        let request = fetch(urlService, {
            headers: myHeaders,
            method: 'POST',
            body: JSON.stringify(dataSend)        
        }).catch(error => {
            console.log('Ocurrio un error en la petición del servicio: '+error);
        });

        let response = await request;
        if (response !== undefined && response.status === 200 && response.ok === true) {
            let jsonResponse = await response.json();
            if(jsonResponse.status === 'OK') {
                alert('Los datos del servicio se guardaron exitosamente.');
                window.location.href = '/';
            } else {
                alert('Ocurrio un error guardando el servicio.'+jsonResponse.message);
            }
        } else {
            console.log('Error de comunicación el servicio no response.');
        }
    }
}

const getDataService = async ()=> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var urlService = `${location.protocol}//${location.host}/getServiceById`;
    let request = fetch(urlService, {
        headers: myHeaders,
        method: 'POST',
        body: JSON.stringify({identification: idClient, service: nameService})        
    }).catch(error => {
        console.log('Ocurrio un error en la petición del servicio: '+error);
    });

    let response = await request;
    if (response !== undefined && response.status === 200 && response.ok === true) {
        let jsonResponse = await response.json();
        if(jsonResponse.status === 'OK') {
            let dataServ = jsonResponse?.data !== undefined && jsonResponse.data.length > 0 ? jsonResponse.data[0] : {};
            
            if(Object.keys(dataServ).length > 0) {
                let service = document.getElementById('service');
                let lastFacturer = document.getElementById('last-facturer');
                let lastPay = document.getElementById('last-pay');

                service.value = dataServ.service;
                lastFacturer.value = dataServ.lastFacturer.substring(0, 10);; 
                lastPay.value = dataServ.lastPay; 
            } else {
                alert('No existe el servicio con identificación: '+idClient+ ' y nombre de servicio:'+nameService);    
                window.location.href = '/';
            }
        } else {
            alert('Ocurrio un error consultando los datos del cliente.'+jsonResponse.message);
        }
    } else {
        console.log('Error de comunicación el servicio no response.');
    }
}