let idClient;

window.onload = ()=> {
    var btnSaveClient = document.getElementById('btn-save');
	if(btnSaveClient !== null) {
		btnSaveClient.addEventListener('click', onBtnSaveClient);
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

    let ident = document.getElementById('identification');
    if(idClient !== undefined && idClient !== null && idClient !== '') {
        console.log('Es para actualizar');        
        ident.disabled = true;
        getDataCliet();
    } else {
        ident.disabled = false;
    }
}

const listFields = [
    'identification','type-identification', 'name','last-name', 'birthday', 'cellphone', 'email'
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


const onBtnSaveClient = async ()=> {
    let dataFields = onValidateFields();
    if(dataFields !== 'FAIL') {
        const dataSend = {
            typeId: dataFields['type-identification'],
            identification: dataFields.identification,
            name: dataFields.name,
            lastName: dataFields['last-name'],
            birthday: dataFields.birthday,
            cellphone: dataFields.cellphone,
            email: dataFields.email
        }

        let compPath = idClient !== undefined && idClient !== null && idClient !== '' ? 'updateClient' : 'saveClient';
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var urlService = `${location.protocol}//${location.host}/${compPath}`;
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
                alert('Los datos del cliente se guardaron exitosamente.');
                window.location.href = '/';
            } else {
                alert('Ocurrio un error guardando el cliente.'+jsonResponse.message);
            }
        } else {
            console.log('Error de comunicación el servicio no response.');
        }
    }
}

const getDataCliet = async ()=> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var urlService = `${location.protocol}//${location.host}/getClientById`;
    let request = fetch(urlService, {
        headers: myHeaders,
        method: 'POST',
        body: JSON.stringify({identification: idClient})        
    }).catch(error => {
        console.log('Ocurrio un error en la petición del servicio: '+error);
    });

    let response = await request;
    if (response !== undefined && response.status === 200 && response.ok === true) {
        let jsonResponse = await response.json();
        if(jsonResponse.status === 'OK') {
            let dataCli = jsonResponse?.data !== undefined && jsonResponse.data.length > 0 ? jsonResponse.data[0] : {};
            
            if(Object.keys(dataCli).length > 0) {
                let ident = document.getElementById('identification');
                let typeId = document.getElementById('type-identification');
                let name = document.getElementById('name');
                let lastName = document.getElementById('last-name');    
                let birthday = document.getElementById('birthday');
                let cellphone = document.getElementById('cellphone');
                let email = document.getElementById('email');

                ident.value = dataCli.identification;
                typeId.value = dataCli.typeId; 
                name.value = dataCli.name; 
                lastName.value = dataCli.lastName; 
                birthday.value = dataCli.birthday.substring(0, 10); 
                cellphone.value = dataCli.cellphone; 
                email.value = dataCli.email; 
            } else {
                alert('No existe el cliente con identificación.'+idClient);    
                window.location.href = '/';
            }
        } else {
            alert('Ocurrio un error consultando los datos del cliente.'+jsonResponse.message);
        }
    } else {
        console.log('Error de comunicación el servicio no response.');
    }
}