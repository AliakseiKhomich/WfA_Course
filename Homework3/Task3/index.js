// Disabling form submissions if there are invalid fields
(
    function () {
        window.addEventListener('load', function () {
            // Fetch all the fields for validation
            var forms = document.getElementsByClassName('needs-validation')
        
            // Loop over them
            Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
                }, false)
            })
        }, false)
  } ()
)
  