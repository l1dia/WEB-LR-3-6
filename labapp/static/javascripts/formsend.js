/*
Реализация AJAX с помощью асинхронного метода fetch. Современный вариант реализации AJAX.
*/

var sendbtn = document.getElementById("submit");

// Привязываем к элементу обработчик события "click"
sendbtn.addEventListener("click", function (e) {
    /* Инструкция preventDefault позволяет переопределить стандартное поведение браузера,
    если ее убрать, то браузер по-умолчанию обновит страницу после отправки данных формы */
    e.preventDefault();
    // Получаем данные полей формы
    let fname = document.getElementsByName("author")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let reqtype = document.getElementsByName("subject")[0].value
    let reqtext = document.getElementsByName("text")[0].value
    // Преобразуем полученные данные в JSON
    var formdata = JSON.stringify({ firstname: fname, email: email, reqtype: reqtype, reqtext: reqtext});
    
    // Отправляем запрос через fetch (необходимо выставить соответствующий заголовок (headers)!)
    fetch("/api/contactrequest",
    {
        method: "POST",
        body: formdata,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
        // fetch в случае успешной отправки возвращает Promise, содержащий response объект (ответ на запрос)
        // Возвращаем json-объект из response и получаем данные из поля message
        response.json().then(function(data) {
            console.log(data)
            let statfield = document.getElementById("statusfield");
            statfield.textContent = data.message;
            getbtn.click();
            //statfield.textContent.bold();
            //alert(data.message);
        });
    })
    .catch( error => {
        alert(error);
        console.error('error:', error);
    });

});


var getbtn = document.getElementById("get");



getbtn.addEventListener("click", function (e) {
    fetch("/previous_requests",
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(request => {
            request.json().then(function (data) {
                let contactrequest = data['contactrequest'];
                var pages = document.getElementById("postreq");
                pages.textContent = "";

                for (let ownerId in contactrequest) {
                    pages.innerHTML += `
                    <div class="previous_requests_obj">
                    <p>` + contactrequest[ownerId]['reqtext'] + " " + "("+ contactrequest[ownerId]['createdAt'] + ")" + `</p>
                    </div>
                `;

                };
            });
        })
        .catch(error => {
            alert(error);
            console.error('error:', error);
        });

});


